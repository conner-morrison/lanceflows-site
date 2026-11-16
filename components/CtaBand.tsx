// Lanceflows call-to-action, set in the template's red newsletter band.
export default function CtaBand({
  title,
  text,
  href = "/#contact",
  button = "Contact us",
}: {
  title: string;
  text: string;
  href?: string;
  button?: string;
}) {
  return (
    <section className="newslater-area pt-60 pb-60" style={{ backgroundImage: "url(/img/bg/subscibe-bg.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8">
            <div className="section-title newslater-title">
              <div className="icon">
                <img src="/img/icon/send-mail.png" alt="img" />
              </div>
              <div className="text">
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 text-lg-right">
            <a href={href} className="btn lf-btn-light">
              {button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
