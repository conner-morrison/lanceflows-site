import { Fragment } from "react";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import ContactForm from "@/components/ContactForm";
import SliderZoomOnce from "@/components/SliderZoomOnce";

// Hero slide: a single slide, so the text animates only when the section is entered.
const SLIDES = [
  {
    // each entry is one line of the big heading
    h: ["Your vision,", "our engineering,", "real results."],
    p: "From idea to architecture, engineering, AI automation, launch, maintain and growth.",
  },
];

const STATS = [
  { n: "20", s: "+", l: ["Projects", "delivered"] },
  { n: "98", s: "%", l: ["Client", "satisfaction"] },
  { n: "10", s: "+", l: ["Senior", "employees"] },
  { n: "5", s: "+", l: ["Industries", "served"] },
];

const FEATURES = [
  {
    icon: "flaticon-target",
    h: "Right-fit expertise",
    p: "We put senior specialists on your project whose strengths fit the work — architecture, AI, cloud, and data.",
  },
  {
    icon: "flaticon-network",
    h: "Seamless collaboration",
    p: "Clear scopes, transparent communication, and a workflow that keeps everyone aligned end to end.",
  },
  {
    icon: "flaticon-coding",
    h: "Built to grow",
    p: "From a single feature to a full platform, we scale with your ambitions and your timeline.",
  },
];

const WHY = [
  { h: "Reliability", p: "Commitments are tracked through clear milestones and deliverables." },
  { h: "Professional execution", p: "Senior engineers manage architecture, implementation, testing, and deployment with care." },
  { h: "Controlled process", p: "Track progress, monitor every decision, and refine requirements anytime — clearly and effortlessly, through our seamless system." },
  { h: "Predictable results", p: "Clients know what is being built, why it matters, and when it is expected." },
  { h: "Disciplined workforce", p: "The team operates with ownership, responsiveness, and technical accountability." },
  { h: "Zero chaos", p: "A calm, organized delivery experience from discovery to launch." },
];

export default function Home() {
  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main id="top">
        <h1 className="sr-only">Lanceflows — Software Engineering &amp; AI Services for clients, from idea to launch.</h1>

        {/* slider-area */}
        <section id="home" className="slider-area slider-four fix p-relative">
          <div className="slider-active">
            {SLIDES.map((s) => (
              <div className="single-slider slider-bg d-flex align-items-center p-relative" key={s.p}>
                <div className="slider-line" data-animation="fadeInRight" data-delay=".8s">
                  {" "}
                  <img src="/img/bg/slider-line.png" alt="slider-line" />
                  {" "}
                </div>
                <div className="slider-line2" data-animation="fadeInRight" data-delay=".4s">
                  <img src="/img/bg/slider-line2.png" alt="slider-line" />
                </div>
                <div className="image-layer" style={{ background: "url(/img/slider/slider_img_bg.png)" }}></div>
                <div className="container">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-8 col-md-8">
                      <div className="slider-content s-slider-content mt-100">
                        <h2 data-animation="fadeInUp" data-delay=".4s">
                          {s.h.map((line, i) => (
                            <Fragment key={line}>
                              {i > 0 && <br />}
                              {line}
                            </Fragment>
                          ))}
                        </h2>
                        <p data-animation="fadeInUp" data-delay=".6s">{s.p}</p>
                        <div className="slider-btn mt-30" data-animation="fadeInUp" data-delay=".4s">
                          {" "}
                          <a href="#contact" className="btn ss-btn mr-15">
                            <span>Contact us</span>
                          </a>
                          {" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <SliderZoomOnce target="#home" />
        {/* slider-area-end */}

        {/* about-area */}
        <section id="about" className="about-area about-p pt-120 pb-120 p-relative fix" style={{ backgroundImage: "url(/img/bg/about-bg.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center bottom", backgroundSize: "cover" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 p-relative">
                <div className="section-title center-align mb-50 text-center">
                  <h5>About us · Who we are</h5>
                  <h2>One coordinated delivery system</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="s-about-text p-relative  wow fadeInLeft  animated" data-animation="fadeInLeft" data-delay=".4s">
                  <h2>
                    12
                    {" "}
                    <sub>+</sub>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="about-content s-about-content  wow fadeInRight  animated" data-animation="fadeInRight" data-delay=".4s">
                  <p>
                    We are a full-service software engineering and AI delivery team made up of{" "}
                    <strong>senior engineers with 12+ years of experience</strong> across product engineering, cloud architecture, automation, data systems, and applied artificial intelligence. Our strength comes from combining each specialist&apos;s expertise into one coordinated delivery system.
                  </p>
                  <div className="about-content3 pt-15">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <img src="/img/features/about_img2.png" alt="img" />
                      </div>
                      <div className="col-md-8">
                        <p>
                          We don&apos;t simply implement a client&apos;s initial idea. We help discover the full architecture, identify potential risks, design for stable scalability, prepare a future-ready technical roadmap, and execute through clear milestones — for controlled, predictable delivery without chaos.
                        </p>
                      </div>
                    </div>
                    <ul className="green">
                      <li>Senior-led, architecture-first delivery from idea to stable, scalable reality.</li>
                      <li>Transparent milestones, documented decisions, and predictable results.</li>
                      <li>Future-ready engineering built for scale, security, and growth.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about-area-end */}

        {/* counter-area */}
        <div className="counter-area lf-counter-standalone p-relative pb-90" style={{ backgroundImage: "url(/img/bg/counter-bg.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
          <div className="container">
            <div className="row p-relative">
              {STATS.map((s) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={s.l.join(" ")}>
                  <div className="single-counter wow fadeInUp animated" data-animation="fadeInDown animated" data-delay=".2s">
                    <div className="counter p-relative" style={{ backgroundImage: "url(/img/bg/c-object.png)", backgroundRepeat: "no-repeat" }}>
                      {" "}
                      <span className="count">{s.n}</span>
                      <small className="lf-count-suffix">{s.s}</small>
                      <p>
                        {s.l[0]}
                        <br />
                        {s.l[1]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* counter-area-end */}

        {/* services-three-area — what we do */}
        <section id="about-short" className="services-08 pt-120 pb-90 p-relative fix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title center-align mb-50 text-center">
                  <h5>What we do</h5>
                  <h2>A simpler, more confident way to build</h2>
                  <p className="lf-lead">
                    Lanceflows is a senior software engineering and AI team that turns your idea into a reliable, working product. We remove the friction of planning, building, and shipping — so your project moves with confidence and flow.
                  </p>
                </div>
              </div>
            </div>
            <div className="row  mt-0 align-items-center">
              {FEATURES.map((f) => (
                <div className="col-lg-4 col-md-6" key={f.h}>
                  <div className="services-08-item">
                    <div className="services-08-thumb glyph">
                      <i className={"flaticon " + f.icon}></i>
                    </div>
                    <div className="services-08-content">
                      <h3>{f.h}</h3>
                      <p>{f.p}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* services-three-area-end */}

        {/* choose-area — why Lanceflows */}
        <section id="why" className="choose-area pt-113 pb-120 p-relative">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <img src="/img/features/choose-img.png" alt="img" />
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="choose-wrap">
                  <div className="section-title w-title left-align mb-35">
                    <h5>Why Lanceflows</h5>
                    <h2>Why teams choose Lanceflows</h2>
                    <p className="lf-lead">
                      Clients feel safe because our process removes uncertainty. We communicate clearly, expose risks early, document decisions, and keep delivery aligned with business priorities — work that&apos;s visible, structured, and measurable.
                    </p>
                  </div>
                  <div className="choose-content">
                    <div className="choose-list">
                      <ul>
                        {WHY.map((w, i) => (
                          <li key={w.h}>
                            <div className="num">{i + 1}</div>
                            <strong className="lf-li-title">{w.h}</strong>
                            {w.p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* choose-area-end */}

        <CtaBand
          title="Ready to flow with us?"
          text="Tell us what you want to build. From idea to launch, Lanceflows makes the next step seamless."
          href="#contact"
        />

        {/* contact-area */}
        <section id="contact" className="contact-area contact-bg pt-120 pb-100 p-relative fix">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="contact-bg02">
                  <ContactForm />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="faq-wrap">
                  <div className="section-title mb-30">
                    <h5>Contact us</h5>
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
                      <i className="far fa-envelope-open"></i>
                    </div>
                    <h5>Email</h5>
                    <p>
                      <a href="mailto:admin@lanceflows.com">admin@lanceflows.com</a>
                    </p>
                  </div>
                  {" "}
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
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact-info-area-end */}
      </main>
      <Footer />
    </>
  );
}
