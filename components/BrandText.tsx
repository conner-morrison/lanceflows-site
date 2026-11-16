// The Lanceflows wordmark, set in text where the template had its logo image.
export default function BrandText({ tagline = true }: { tagline?: boolean }) {
  return (
    <span className="lf-brand">
      <span className="lf-brand-name">
        Lance<b>flows</b>
      </span>
      {tagline && <span className="lf-brand-tag">{"Software Engineering & AI Services"}</span>}
    </span>
  );
}
