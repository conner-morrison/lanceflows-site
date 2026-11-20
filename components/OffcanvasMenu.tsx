import Link from "next/link";
// Slide-in side menu and its overlay (opened/closed by main.js).
export default function OffcanvasMenu() {
  return (
    <>
      <div className="offcanvas-menu">
        <span className="menu-close">
          <i className="fas fa-times"></i>
        </span>
        <div id="cssmenu3" className="menu-one-page-menu-container">
          <ul id="menu-one-page-menu-2" className="menu">
            <li className="menu-item menu-item-type-custom menu-item-object-custom">
              <Link href="/">Overview</Link>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom">
              <Link href="/services">Services</Link>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom">
              <Link href="/case-study">Case Studies</Link>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div id="cssmenu2" className="menu-one-page-menu-container">
          <ul id="menu-one-page-menu-1" className="menu">
            <li className="menu-item menu-item-type-custom menu-item-object-custom">
              <a href="mailto:admin@lanceflows.com">
                <span>admin@lanceflows.com</span>
              </a>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom">
              <Link href="/contact">
                <span>Miami, FL</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="offcanvas-overly"></div>
    </>
  );
}
