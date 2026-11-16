"use client";

import { useEffect, useRef, useState } from "react";
import BrandText from "./BrandText";

// Lanceflows' Cloudflare Turnstile gate, shown once per browser session.
// Ported from the Lanceflows site; it fails open (reveals the site) if the
// Turnstile script is blocked so real visitors are never locked out.

const KEY = "lf_human_verified";
// Cloudflare's "always passes" TEST key — replace via NEXT_PUBLIC_TURNSTILE_SITE_KEY
// with your real site key for production.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type TurnstileOpts = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileOpts) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export default function HumanVerify() {
  const [show, setShow] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [error, setError] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);
  const widgetIdRef = useRef<string | null>(null);
  const errorsRef = useRef(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* sessionStorage unavailable — show the gate anyway */
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";

    const pass = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setHiding(true);
      window.setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
      }, 500);
    };

    const renderWidget = () => {
      if (renderedRef.current || !window.turnstile || !hostRef.current) return;
      renderedRef.current = true;
      try {
        widgetIdRef.current = window.turnstile.render(hostRef.current, {
          sitekey: SITE_KEY,
          theme: "auto",
          callback: () => pass(),
          "error-callback": () => {
            errorsRef.current += 1;
            if (errorsRef.current <= 2) {
              try {
                window.turnstile?.reset(widgetIdRef.current ?? undefined);
              } catch {
                /* ignore */
              }
              return;
            }
            setError(true);
            window.setTimeout(pass, 1500);
          },
          "expired-callback": () => {
            try {
              window.turnstile?.reset(widgetIdRef.current ?? undefined);
            } catch {
              /* ignore */
            }
          },
        });
      } catch {
        setError(true);
        window.setTimeout(pass, 1500);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      let script = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.dataset.turnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", renderWidget);
    }

    const failOpen = window.setTimeout(() => {
      if (!renderedRef.current) pass();
    }, 8000);

    return () => {
      window.clearTimeout(failOpen);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={"vh-overlay" + (hiding ? " vh-hide" : "")} role="dialog" aria-modal="true" aria-label="Human verification">
      <div className="vh-card">
        <div className="vh-logo">
          <BrandText tagline={false} />
        </div>
        <h2>Quick check</h2>
        <p>Confirm you&rsquo;re human to continue to Lanceflows.</p>
        <div ref={hostRef} className="vh-turnstile" />
        {error && <p className="vh-error">Couldn&rsquo;t load the security check. Please disable blockers and refresh.</p>}
        <div className="vh-foot">Protected by Cloudflare Turnstile</div>
      </div>
    </div>
  );
}
