import Link from "next/link";
import BrandText from "./BrandText";

// Site header (Sumolo header-three) with the Lanceflows navigation.
export default function Header() {
  return (
    <header className="header-area header-three">
      <div id="header-sticky" className="menu-area">
        <div className="container">
          <div className="second-menu">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo">
                  <Link href="/" className="lf-logo-link">
                    <img src="/img/logo-red.png" alt="" className="lf-logo-mark" />
                    <BrandText />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-9">
                <div className="main-menu text-right text-xl-right">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <Link href="/">Overview</Link>
                      </li>
                      {" "}
                      <li>
                        <Link href="/services">Services</Link>
                      </li>
                      {" "}
                      <li>
                        <Link href="/case-study">Case Studies</Link>
                      </li>
                      {" "}
                      <li>
                        <Link href="/contact">Contact us</Link>
                      </li>
                      {" "}
                      {/* narrower screens (incl. the mobile menu copy); wide screens use the button on the right */}
                      <li className="lf-talk-item d-xl-none">
                        {/* starts a live video call with the Lanceflows AI agent (components/tavus/TavusAgent.tsx) */}
                        <a href="#talk" data-tavus-start className="lf-talk-btn">
                          <i className="fas fa-video"></i> Talk live
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 text-right d-none d-xl-block">
                {" "}
                <div className="lf-talk-box">
                  <a href="#talk" data-tavus-start className="lf-talk-btn">
                    <i className="fas fa-video"></i> Talk live
                  </a>
                </div>
                {" "}
              </div>
              <div className="col-12">
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
