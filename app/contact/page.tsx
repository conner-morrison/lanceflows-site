import type { Metadata } from "next";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact us — Lanceflows | Software Engineering & AI Services",
  description: "Tell us about your project or your strengths — we'll get back to you shortly.",
};

// Built on the template's contact.html: title banner, form + side column,
// the dark info strip and the map.
export default function ContactPage() {
  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main>
        <Breadcrumb title="Contact us" image="/img/slider/contact-hero.jpg" />

        {/* contact-area */}
        <section id="contact" className="contact-area contact-bg pt-145 pb-120 p-relative fix">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="contact-bg02">
                  <div className="section-title center-align">
                    <h3>Contact us</h3>
                  </div>
                  <ContactForm />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="faq-wrap">
                  <div className="section-title mb-30">
                    <h2>{"Let's start the conversation"}</h2>
                    <p className="lf-lead">Tell us about your project or your strengths — we&apos;ll get back to you shortly.</p>
                  </div>
                  <div className="lf-book-call">
                    <h3>Prefer to talk live?</h3>
                    <p>Pick a time that works for you and book a free intro call.</p>
                    <div className="slider-btn">
                      <a className="btn ss-btn" href="https://cal.com/lanceflows" target="_blank" rel="noopener">
                        <span>Book an appointment</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact-area-end */}

        {/* contact-info-area */}
        <section className="contact-area after-none contact-bg p-relative fix pt-90 pb-30" style={{ background: "#2d2d2d" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-info">
                  <div className="single-cta pb-30 mb-30 wow fadeInUp animated" data-animation="fadeInDown animated" data-delay=".2s">
                    <div className="f-cta-icon">
                      <i className="far fa-map"></i>
                    </div>
                    <h5>Office</h5>
                    <p>Miami, FL</p>
                  </div>
                  {" "}
                  <div className="single-cta pb-30 mb-30 wow fadeInUp animated" data-animation="fadeInDown animated" data-delay=".2s">
                    <div className="f-cta-icon">
                      <i className="far fa-clock"></i>
                    </div>
                    <h5>Hours</h5>
                    <p>Mon–Fri, 9:00–18:00</p>
                  </div>
                  {" "}
                  <div className="single-cta pb-30 mb-30 wow fadeInUp animated" data-animation="fadeInDown animated" data-delay=".2s">
                    <div className="f-cta-icon">
                      <i className="far fa-envelope-open"></i>
                    </div>
                    <h5>Email</h5>
                    <p>
                      <a href="mailto:admin@lanceflows.com">admin@lanceflows.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact-info-area-end */}

        {/* map-area */}
        <div className="map fix" style={{ background: "#f5f5f5" }}>
          <div className="container-flud">
            <div className="row">
              <div className="col-lg-12">
                <iframe
                  title="Lanceflows office — Miami, FL"
                  src="https://www.google.com/maps?q=Miami,+FL&z=11&output=embed"
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* map-area-end */}
      </main>
      <Footer />
    </>
  );
}
