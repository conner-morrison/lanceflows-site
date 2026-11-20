// Tavus Conversational Video Interface (floating <tavus-widget>) settings and
// the helpers the agent uses to understand and act on the current page.

// Deployment created in the Tavus PAL Maker (Widget channel). Not a secret.
export const TAVUS_DEPLOYMENT_ID = "8fc1c7c5-111b-440c-8968-03d91960c60e";

// Pages the agent can open with the navigate_to_page tool.
export const SITE_PAGES: Record<string, { path: string; label: string }> = {
  home: { path: "/", label: "Overview (home)" },
  services: { path: "/services", label: "Services" },
  case_studies: { path: "/case-study", label: "Case Studies" },
  contact: { path: "/contact", label: "Contact us" },
  privacy: { path: "/privacy", label: "Privacy Policy" },
  terms: { path: "/terms", label: "Terms of Service" },
};

// Compact case-study index, built on the server in the root layout.
export type CaseRef = { id: string; title: string; category: string };

export type PageSection = { id: string; heading: string; el: HTMLElement };

const clean = (s: string | null | undefined) => (s ?? "").replace(/\s+/g, " ").trim();

// Every <section> in <main> with a readable heading, in page order.
// Sections without an id get a stable generated one so they can be targeted.
export function listSections(): PageSection[] {
  const out: PageSection[] = [];
  document.querySelectorAll<HTMLElement>("main section").forEach((el, i) => {
    const h = el.querySelector("h2, h1, h3");
    const eyebrow = el.querySelector(".section-title h5, h5");
    const heading = clean([eyebrow?.textContent, h?.textContent].filter(Boolean).join(" — "));
    if (!heading) return;
    if (!el.id) el.id = `lf-section-${i + 1}`;
    out.push({ id: el.id, heading, el });
  });
  return out;
}

// Finds a section by id or by words in its heading ("pricing", "faq", "why lanceflows").
export function findSection(query: string): PageSection | undefined {
  const q = clean(query).toLowerCase().replace(/^#/, "");
  if (!q) return undefined;
  const sections = listSections();
  const exact = sections.find((s) => s.id.toLowerCase() === q);
  if (exact) return exact;
  const byText = sections.find((s) => s.heading.toLowerCase().includes(q));
  if (byText) return byText;
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let best: PageSection | undefined;
  let bestScore = 0;
  for (const s of sections) {
    const h = s.heading.toLowerCase();
    const score = words.filter((w) => h.includes(w)).length;
    if (score > bestScore) [best, bestScore] = [s, score];
  }
  return best;
}

// Scrolls a section into view below the sticky header.
export function scrollToSection(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

// A short, plain-text description of what the visitor currently sees,
// read from the rendered page so it always matches the real content.
export function describePage(): string {
  const path = location.pathname;
  const title = clean(document.title);
  const description = clean(document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content);
  const heroEl = document.querySelector<HTMLElement>("main h1, main h2");
  const hero = clean(heroEl?.innerText || heroEl?.textContent);
  const sections = listSections();
  const main = document.querySelector("main");
  let excerpt = clean(main?.innerText);
  if (excerpt.length > 1500) excerpt = excerpt.slice(0, 1500) + "…";
  return [
    `Current page: ${title || hero || path} (path ${path}).`,
    description && `Page description: ${description}`,
    hero && `Hero headline: ${hero}`,
    sections.length > 0 &&
      `Sections on this page (id: heading): ${sections.map((s) => `${s.id}: ${s.heading}`).join("; ")}`,
    excerpt && `Visible text (excerpt): ${excerpt}`,
  ]
    .filter(Boolean)
    .join("\n");
}

// What the agent is told about the site and its abilities once the call starts.
export function siteBriefing(cases: CaseRef[], groups: string[]): string {
  return [
    "You are talking with a visitor on the Lanceflows website (a senior software engineering and AI services team).",
    "The visitor can see the web page described below; refer to what is on screen when helpful.",
    "You can act on the page with these tools: navigate_to_page, open_case_study, filter_case_studies, scroll_to_section, prefill_contact_form.",
    "When the visitor asks to see something (e.g. 'show me case studies', 'take me to pricing', 'open the healthcare project'), use the matching tool instead of only describing it.",
    `Pages: ${Object.entries(SITE_PAGES).map(([k, v]) => `${k} = ${v.label}`).join("; ")}.`,
    `Case studies (case_id — title — industry): ${cases.map((c) => `${c.id} — ${c.title} — ${c.category}`).join("; ")}.`,
    `Case study industry filters: ${groups.join(", ")}.`,
    "Never submit the contact form yourself; after prefilling it, ask the visitor to review it and press Send.",
  ].join("\n");
}
