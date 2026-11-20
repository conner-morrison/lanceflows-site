"use client";

import "@tavus/widget";
import { TavusIntegration } from "@tavus/widget";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  TAVUS_DEPLOYMENT_ID,
  TAVUS_OVERRIDE_CONFIG,
  SITE_PAGES,
  describePage,
  findSection,
  listSections,
  scrollToSection,
  siteBriefing,
  type CaseRef,
} from "@/lib/tavus";

// Floating Tavus launcher, mounted once in the root layout so a call keeps
// going while the visitor moves between pages (links use client-side routing).
//
// - Any element with a data-tavus-start attribute ("Talk to us" buttons) opens
//   the popup and starts the call directly.
// - When the call starts, and on every page change during it, the agent is told
//   what the current page shows.
// - The agent acts on the page through PAL tools delivered as tavus:tool-call.

type ToolCall = { name: string; arguments: string; tool_call_id?: string };
type ToolOutput = { status: "success" | "error"; output: string | Record<string, unknown> };
type Pending = { path: string; id?: string; after: () => ToolOutput };

// Run after the browser has laid out freshly rendered page content.
const afterPaint = (fn: () => void) => requestAnimationFrame(() => requestAnimationFrame(fn));
// After a route change: also give Next.js a moment to apply the new page's <title>.
const afterRoute = (fn: () => void) => afterPaint(() => window.setTimeout(fn, 250));

export default function TavusAgent({ cases, groups }: { cases: CaseRef[]; groups: string[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const integration = useRef<TavusIntegration | null>(null);
  const ready = useRef(false);
  const startQueued = useRef(false);
  const live = useRef(false);
  const pending = useRef<Pending | null>(null);
  const lastPath = useRef(pathname);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  // Sends a tool result back to the agent, paired by tool_call_id.
  const reply = (id: string | undefined, r: ToolOutput) => {
    if (!id) return;
    integration.current?.sendMessage({
      event_type: "conversation.tool_result",
      properties: { tool_call_id: id, output: r.output, status: r.status },
    });
  };

  // Navigates if needed, then finishes the tool once the new page is on screen.
  const goThen = (path: string, id: string | undefined, after: () => ToolOutput) => {
    if (pathRef.current === path) {
      afterPaint(() => reply(id, after()));
      return;
    }
    pending.current = { path, id, after };
    router.push(path);
  };

  const pageResult = (note: string): ToolOutput => ({
    status: "success",
    output: `${note}\n${describePage()}`,
  });

  useEffect(() => {
    const t = new TavusIntegration("tavus-widget");
    integration.current = t;
    const el = document.querySelector("tavus-widget");

    const start = () => {
      // The visitor already chose to talk by pressing our button: skip the device check.
      t.updateConfig({ customization: { show_haircheck: false } });
      t.startConversation();
    };

    const onReady = () => {
      ready.current = true;
      if (startQueued.current) {
        startQueued.current = false;
        start();
      }
    };
    const onStarted = () => {
      live.current = true;
      t.sendMessage({
        event_type: "conversation.append_llm_context",
        properties: { context: `${siteBriefing(cases, groups)}\n\n${describePage()}` },
      });
    };
    const onEnded = () => {
      live.current = false;
    };

    const onTool = (e: CustomEvent<ToolCall>) => {
      const { name, tool_call_id: id } = e.detail;
      let args: Record<string, unknown> = {};
      try {
        args = e.detail.arguments ? JSON.parse(e.detail.arguments) : {};
      } catch {
        reply(id, { status: "error", output: "Arguments were not valid JSON." });
        return;
      }
      const str = (k: string) => (typeof args[k] === "string" ? (args[k] as string).trim() : "");

      switch (name) {
        case "navigate_to_page": {
          const page = SITE_PAGES[str("page")];
          if (!page) {
            reply(id, { status: "error", output: `Unknown page. Valid pages: ${Object.keys(SITE_PAGES).join(", ")}.` });
            return;
          }
          const section = str("section");
          goThen(page.path, id, () => {
            const s = section ? findSection(section) : undefined;
            if (s) scrollToSection(s.el);
            return pageResult(`Opened ${page.label}${s ? ` and scrolled to "${s.heading}"` : ""}.`);
          });
          return;
        }

        case "open_case_study": {
          const q = str("case_id").toLowerCase();
          const c =
            cases.find((x) => x.id === q) ??
            cases.find((x) => x.title.toLowerCase().includes(q) || x.category.toLowerCase().includes(q));
          if (!q || !c) {
            reply(id, { status: "error", output: `No matching case study. Valid case_id values: ${cases.map((x) => x.id).join(", ")}.` });
            return;
          }
          goThen(`/case-study/${c.id}`, id, () => pageResult(`Opened the case study "${c.title}".`));
          return;
        }

        case "filter_case_studies": {
          const want = str("industry").toLowerCase();
          const group = want === "all" ? "All" : groups.find((g) => g.toLowerCase() === want || g.toLowerCase().includes(want));
          if (!want || !group) {
            reply(id, { status: "error", output: `Unknown industry. Valid values: All, ${groups.join(", ")}.` });
            return;
          }
          goThen("/case-study", id, () => {
            window.dispatchEvent(new CustomEvent("lf:case-filter", { detail: group }));
            const s = document.getElementById("cases");
            if (s) scrollToSection(s);
            return {
              status: "success",
              output: `Showing ${group === "All" ? "all case studies" : `${group} case studies`} in the grid.`,
            };
          });
          return;
        }

        case "scroll_to_section": {
          const s = findSection(str("section"));
          if (!s) {
            reply(id, {
              status: "error",
              output: `No such section on this page. Sections: ${listSections().map((x) => x.heading).join("; ") || "none"}.`,
            });
            return;
          }
          scrollToSection(s.el);
          reply(id, { status: "success", output: `Scrolled to "${s.heading}".` });
          return;
        }

        case "prefill_contact_form": {
          const values = { name: str("name"), email: str("email"), msg: str("message") };
          goThen("/contact", id, () => {
            const form = document.getElementById("lf-contact-form");
            if (!form) return { status: "error", output: "The contact form is not on the page." };
            const filled: string[] = [];
            for (const [field, value] of Object.entries(values)) {
              const input = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement | null;
              if (!input || !value) continue;
              input.value = value;
              input.dispatchEvent(new Event("input", { bubbles: true }));
              filled.push(field === "msg" ? "message" : field);
            }
            scrollToSection(form);
            return {
              status: "success",
              output: filled.length
                ? `Prefilled ${filled.join(", ")}. The visitor must review the form and press "Send message" themselves.`
                : "Opened the contact form; nothing was prefilled.",
            };
          });
          return;
        }

        default:
          reply(id, { status: "error", output: `This page has no handler for the tool "${name}".` });
      }
    };

    // "Talk to us" triggers: delegated, so it also works on copies the
    // template's mobile menu makes of header links.
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.("[data-tavus-start]");
      if (!trigger) return;
      e.preventDefault();
      if (ready.current) start();
      else startQueued.current = true;
    };

    t.on("tavus:ready", onReady);
    t.on("tavus:conversation-started", onStarted);
    t.on("tavus:conversation-ended", onEnded);
    t.on("tavus:tool-call", onTool);
    document.addEventListener("click", onClick);
    // Ready may already have fired (e.g. React re-running this effect in development).
    if (el && typeof el.startConversation === "function") onReady();

    return () => {
      t.off("tavus:ready", onReady);
      t.off("tavus:conversation-started", onStarted);
      t.off("tavus:conversation-ended", onEnded);
      t.off("tavus:tool-call", onTool);
      document.removeEventListener("click", onClick);
    };
    // cases/groups come from the server and never change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Page changes: finish a tool that navigated, or tell the agent where the visitor went.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    afterRoute(() => {
      const p = pending.current;
      if (p && p.path === pathname) {
        pending.current = null;
        reply(p.id, p.after());
        return;
      }
      if (live.current) {
        integration.current?.sendMessage({
          event_type: "conversation.append_llm_context",
          properties: { context: `The visitor moved to another page.\n${describePage()}` },
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <tavus-widget deployment-id={TAVUS_DEPLOYMENT_ID} override-config={TAVUS_OVERRIDE_CONFIG} />;
}
