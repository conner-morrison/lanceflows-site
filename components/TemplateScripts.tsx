"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// The template's jQuery plugins and main.js, in the template's order.
// They run once per page load, after React has hydrated the markup, and
// drive the sliders, mobile menu, sticky header, popups, counters,
// portfolio filter, WOW animations and scroll-to-top exactly as in the
// HTML version. Pages change client-side (so a Tavus call survives), so
// after each page change the page-level setup in main.js runs again for the
// new markup via window.lfInitPage.
const SCRIPTS = [
  "/js/vendor/modernizr-3.5.0.min.js",
  "/js/vendor/jquery-3.6.0.min.js",
  "/js/popper.min.js",
  "/js/bootstrap.min.js",
  "/js/slick.min.js",
  "/js/ajax-form.js",
  "/js/paroller.js",
  "/js/wow.min.js",
  "/js/js_isotope.pkgd.min.js",
  "/js/imagesloaded.min.js",
  "/js/parallax.min.js",
  "/js/jquery.waypoints.min.js",
  "/js/jquery.counterup.min.js",
  "/js/jquery.scrollUp.min.js",
  "/js/jquery.meanmenu.min.js",
  "/js/parallax-scroll.js",
  "/js/jquery.magnific-popup.min.js",
  "/js/element-in-view.js",
  "/js/main.js",
];

function load(src: string) {
  return new Promise<void>((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

declare global {
  interface Window {
    __sumoloScripts?: boolean;
    lfInitPage?: () => void;
    Waypoint?: { destroyAll: () => void };
  }
}

export default function TemplateScripts() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    // React runs effects twice in development; the plugins must init once.
    if (window.__sumoloScripts) return;
    window.__sumoloScripts = true;
    (async () => {
      for (const src of SCRIPTS) await load(src);
    })();
  }, []);

  // Re-run the page-level plugins for the new page's markup.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    // Close the off-canvas menu if it was open when a link was clicked.
    document.querySelectorAll(".offcanvas-menu.active, .offcanvas-overly.active").forEach((el) => el.classList.remove("active"));
    if (!window.lfInitPage) return; // first load still in progress; main.js will init this page itself
    const id = requestAnimationFrame(() => {
      window.Waypoint?.destroyAll(); // counters of the previous page
      window.lfInitPage?.();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
