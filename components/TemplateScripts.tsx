"use client";

import { useEffect } from "react";

// The template's jQuery plugins and main.js, in the template's order.
// They run once per page load, after React has hydrated the markup, and
// drive the sliders, mobile menu, sticky header, popups, counters,
// portfolio filter, WOW animations and scroll-to-top exactly as in the
// HTML version. Internal links are plain <a> tags, so every navigation is
// a full page load, as in the original site.
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
  }
}

export default function TemplateScripts() {
  useEffect(() => {
    // React runs effects twice in development; the plugins must init once.
    if (window.__sumoloScripts) return;
    window.__sumoloScripts = true;
    (async () => {
      for (const src of SCRIPTS) await load(src);
    })();
  }, []);
  return null;
}
