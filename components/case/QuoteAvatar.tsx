"use client";

import { useState } from "react";

// Client portrait beside the testimonial; falls back to an initials badge
// if the photo is missing or fails to load (ported from lanceflows CaseAvatar).
export default function QuoteAvatar({ src, person, initials }: { src?: string; person: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className="lf-quote-avatar">{initials}</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="lf-quote-avatar lf-quote-photo" src={src} alt={`Portrait of ${person}`} loading="lazy" onError={() => setFailed(true)} />
  );
}
