import Link from "next/link";
import BrandText from "./BrandText";

export default function Footer() {
  return (
    <footer className="footer-bg footer-p">
      <div className="footer-top pt-70 pb-40  p-relative" style={{ background: "#2d2d2d", backgroundImage: "url(/img/bg/footer-bg.png)", backgroundRepeat: "no-repeat" }}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title">
                  <h2>Lanceflows</h2>
                  <p>
                    A senior software engineering and AI team that turns your ideas into reliable, scalable products — with clear architecture, disciplined delivery, and zero chaos.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30 pl-60">
                <div className="f-widget-title">
                  <h2>Company</h2>
                </div>
                <div className="footer-link">
                  <ul>
                    <li>
                      <Link href="/services">Services</Link>
                    </li>
                    <li>
                      <Link href="/case-study">Case Studies</Link>
                    </li>
                    <li>
                      <Link href="/#about">About us</Link>
                    </li>
                    <li>
                      <Link href="/#why">Why Lanceflows</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title">
                  <h2>Get started</h2>
                </div>
                <div className="footer-link">
                  <ul>
                    <li>
                      <Link href="/contact">Request a quote</Link>
                    </li>
                    <li>
                      <a href="https://cal.com/lanceflows" target="_blank" rel="noopener">
                        Book a call
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title mb-30">
                  <h2>Contact us</h2>
                </div>
                <div className="f-contact">
                  <ul>
                    <li>
                      <i className="icon fal fa-envelope"></i>
                      <span>
                        Email
                        <br />
                        <a href="mailto:admin@lanceflows.com">admin@lanceflows.com</a>
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i className="icon fal fa-map-marker-check"></i>
                      <span>
                        Office
                        <br />
                        Miami, FL
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i className="icon fal fa-clock"></i>
                      <span>
                        Hours
                        <br />
                        Mon–Fri, 9:00–18:00
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <Link href="/">
                <BrandText tagline={false} />
              </Link>
            </div>
            <div className="col-lg-6 col-md-6 text-right text-xl-right">
              © 2026 Lanceflows. All rights reserved.
              <Link className="lf-foot-link" href="/privacy">Privacy Policy</Link>
              <Link className="lf-foot-link" href="/terms">Terms of Services</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
