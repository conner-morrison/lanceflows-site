// Page title banner with the breadcrumb pill. Lanceflows page heroes have an
// eyebrow and an intro paragraph; they sit above and below the title.
export default function Breadcrumb({
  title,
  current = title,
  eyebrow,
  text,
  trail,
}: {
  title: string;
  current?: string;
  eyebrow?: string;
  text?: React.ReactNode;
  trail?: { href: string; label: string }[];
}) {
  return (
    <section className="breadcrumb-area d-flex  p-relative align-items-center" style={{ backgroundImage: "url(/img/testimonial/test-bg.png)" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-12 col-lg-12">
            <div className="breadcrumb-wrap text-left">
              <div className="breadcrumb-title">
                {eyebrow && <h5 className="lf-crumb-eyebrow">{eyebrow}</h5>}
                <h2>{title}</h2>
                {text && <p className="lf-crumb-text">{text}</p>}
              </div>
            </div>
          </div>
          <div className="breadcrumb-wrap2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {" "}
                <li className="breadcrumb-item">
                  <a href="/">Overview</a>
                </li>
                {" "}
                {trail?.map((t) => (
                  <li className="breadcrumb-item" key={t.href}>
                    <a href={t.href}>{t.label}</a>
                  </li>
                ))}
                <li className="breadcrumb-item active" aria-current="page">{current}</li>
                {" "}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
