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
                  <a href="/">
                    <BrandText />
                  </a>
                </div>
              </div>
              <div className="col-xl-6 col-lg-9">
                <div className="main-menu text-right text-xl-right">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <a href="/">Overview</a>
                      </li>
                      {" "}
                      <li>
                        <a href="/services">Services</a>
                      </li>
                      {" "}
                      <li>
                        <a href="/case-study">Case Studies</a>
                      </li>
                      {" "}
                      <li>
                        <a href="/#contact">Contact us</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 text-left d-none d-xl-block">
                {" "}
                <div className="call-box">
                  <ul>
                    <li>
                      <div className="icon">
                        <img src="/img/icon/phone-call.png" alt="top-m-icon.png" />
                      </div>
                    </li>
                    {" "}
                    <li>
                      <div className="text">
                        <span>Contact us</span>
                        <strong>
                          <a href="mailto:admin@lanceflows.com">admin@lanceflows.com</a>
                        </strong>
                      </div>
                    </li>
                  </ul>
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
