"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Routes plain internal <a> clicks through the Next.js router, so pages change
// without a full reload (which would end a Tavus call). <Link>s handle their own
// clicks; this catches the rest, such as the copies of the header menu the
// template's mobile menu script creates.
export default function ClientNav() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.hasAttribute("download") || a.hasAttribute("data-tavus-start")) return;
      if (a.target && a.target !== "_self") return;
      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#")) return; // in-page anchors keep their template behaviour
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files (images, PDFs)
      if (url.pathname === location.pathname && url.hash) return; // same-page anchor
      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
