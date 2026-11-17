import type { Metadata } from "next";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services — Lanceflows | Software Engineering & AI",
  description:
    "Lanceflows software engineering and applied AI services — product engineering, AI & automation, cloud, data integration, architecture consulting, and ongoing growth.",
};

const SERVICES = [
  { icon: "flaticon-coding", h: "Product Engineering", p: "Custom SaaS platforms, enterprise applications, portals, dashboards, and business systems." },
  { icon: "flaticon-chip", h: "AI & Automation", p: "AI voice agents, RAG assistants, document intelligence, workflow agents, and computer vision." },
  { icon: "fal fa-cloud-upload", h: "Cloud & DevOps", p: "Cloud architecture, CI/CD, monitoring, scalability, reliability, and cost-aware operations." },
  { icon: "flaticon-data-flow", h: "Data & Integration", p: "API integrations, data extraction, web scraping, analytics pipelines, and CRM/ERP integration." },
  { icon: "flaticon-diagram", h: "Architecture & Consulting", p: "Discovery, system design, risk analysis, roadmap planning, and engineering leadership." },
  { icon: "flaticon-maintenance", h: "Maintenance & Growth", p: "Ongoing support, optimization, feature expansion, security improvements, and product evolution." },
];

const INDUSTRIES = [
  { img: "fintech", b: "Fintech & Payments", s: "Digital banking, transaction workflows, reconciliation, fraud monitoring, KYC/AML, portfolio dashboards." },
  { img: "healthcare", b: "Healthcare & Medical", s: "HIPAA-conscious apps, telemedicine, patient portals, EHR/EMR integrations, clinical AI assistants." },
  { img: "realestate", b: "Real Estate / PropTech", s: "Property management platforms, MLS/listing integrations, valuation tools, underwriting automation." },
  { img: "travel", b: "Travel & Hospitality", s: "Booking systems, guest portals, ordering platforms, ticketing, revenue and occupancy analytics." },
  { img: "logistics", b: "Logistics & Supply Chain", s: "Shipment tracking, route optimization, warehouse systems, freight automation, inventory analytics." },
  { img: "insurance", b: "Insurance / InsurTech", s: "Claims workflows, underwriting automation, policy administration, risk modeling, self-service portals." },
  { img: "energy", b: "Energy & CleanTech", s: "Smart grid platforms, renewable asset monitoring, IoT telemetry, energy analytics, and carbon/ESG reporting." },
  { img: "ai", b: "Vertical AI Applications", s: "Voice agents, RAG assistants, workflow agents, document intelligence, computer vision." },
];

const TECH = [
  { h: "AI & Data", pills: ["OpenAI", "LangChain", "RAG", "Agentic AI", "NLP", "Computer Vision", "Data Mining", "Web Scraping"] },
  { h: "Automation & Integration", pills: ["n8n", "Zapier", "Make.com", "API Integration", "Selenium", "Beautiful Soup"] },
  { h: "Frontend", pills: ["React", "Next.js", "MUI", "Tailwind CSS", "Styled Components"] },
  { h: "Backend", pills: ["Node.js", "Express", "Python", "Django", "Flask", "FastAPI"] },
  { h: "Databases & Tooling", pills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "NPM", "GitHub Actions", "Docker"] },
  { h: "Cloud & Infrastructure", pills: ["AWS", "Azure", "Cloudflare", "CI/CD", "Monitoring", "Scalable Deployment"] },
];

const DIFFERENT = [
  { b: "Senior-led delivery", s: "Projects guided by experienced engineers who understand architecture, risk, scale, and production realities." },
  { b: "Architecture before execution", s: "We clarify the goal, blueprint, risk points, data flow, integrations, and milestones before building." },
  { b: "Seamless workflow", s: "Clients experience one coordinated system rather than disconnected developers working in isolation." },
  { b: "Business-focused engineering", s: "Every technical decision is tied to reliability, maintainability, cost, speed, and long-term growth." },
  { b: "Controlled process, zero chaos", s: "Clear communication, documented progress, predictable delivery, and disciplined quality control." },
  { b: "Future-ready thinking", s: "We build for scaling, security, extensibility, and future product direction — not just today's features." },
];

const PAINS = [
  { h: "Unclear project direction", p: "We convert vague ideas into a structured blueprint, roadmap, milestones, and execution plan." },
  { h: "Poor technical decisions early on", p: "We identify architecture risks before they become expensive rebuilds." },
  { h: "Unreliable freelancers or scattered teams", p: "We provide a coordinated senior team with ownership, communication, and accountability." },
  { h: "Slow manual operations", p: "We automate repetitive workflows and connect tools, APIs, CRMs, databases, and internal systems." },
  { h: "Difficulty adopting AI", p: "We design practical AI systems that fit real business workflows rather than experimental demos." },
  { h: "Scaling and maintenance problems", p: "We build clean, maintainable systems designed for future features, traffic, and team growth." },
];

const RECEIVE = [
  { img: "pr-icon3.png", b: "A production-ready product", s: "Software, AI system, automation workflow, or platform aligned with the business goal." },
  { img: "pr-icon2.png", b: "Clear architecture & docs", s: "Technical documentation explaining how the system works and how it can grow." },
  { img: "pr-icon6.png", b: "Clean, maintainable codebase", s: "Organized repositories, version control, and a structured deployment setup." },
  { img: "pr-icon4.png", b: "Integrated systems", s: "APIs, databases, cloud infrastructure, and user-facing interfaces per the project scope." },
  { img: "pr-icon5.png", b: "Testing & handover", s: "Deployment support, performance checks, and clear handover guidance." },
  { img: "pr-roadmap.svg", b: "A future roadmap", s: "A realistic plan for improvements, scalability, maintenance, and next-phase development." },
];

const MODELS = [
  { icon: "flaticon-follower", h: "Dedicated team", p: "A dedicated development team for long-term product delivery." },
  { icon: "flaticon-target-1", h: "Fixed-scope project", p: "Fixed-scope delivery for clearly defined outcomes." },
  { icon: "flaticon-user", h: "Staff augmentation", p: "Extra engineering capacity and specialist support for your team." },
  { icon: "flaticon-hierarchical-structure", h: "Technical consulting", p: "Architecture review and engineering leadership." },
  { icon: "flaticon-tools", h: "Ongoing support", p: "Maintenance, optimization, and continuous product support." },
];


function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title center-align mb-50 text-center">
          <h5>{eyebrow}</h5>
          <h2>{title}</h2>
          <p className="lf-lead">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Accordion({ id, items, open }: { id: string; items: typeof PAINS; open?: number }) {
  return (
    <div className="faq-wrap">
      <div className="accordion" id={id}>
        {items.map((it, i) => {
          const key = `${id}-${i}`;
          const isOpen = i === open;
          return (
            <div className="card" key={key}>
              <div className="card-header" id={`h-${key}`}>
                <h2 className="mb-0">
                  <button className={"faq-btn" + (isOpen ? "" : " collapsed")} type="button" data-toggle="collapse" data-target={`#c-${key}`} aria-expanded={isOpen} aria-controls={`c-${key}`}>
                    {it.h}
                  </button>
                </h2>
              </div>
              <div id={`c-${key}`} className={"collapse" + (isOpen ? " show" : "")} aria-labelledby={`h-${key}`} data-parent={`#${id}`}>
                <div className="card-body">{it.p}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main>
        <Breadcrumb
          title={
            <>
              From idea to
              <br />
              stable, scalable reality.
            </>
          }
          current="Services"
        />

        {/* services — what we provide */}
        <section id="services-08" className="services-08 pt-145 pb-90 p-relative fix">
          <div className="container">
            <SectionTitle
              eyebrow="What we provide"
              title="Full-service delivery, one coordinated system"
              text="Six core capability areas that cover the full lifecycle — from discovery and design to delivery, maintenance, and growth."
            />
            <div className="row mt-0 lf-tile-row">
              {SERVICES.map((s) => (
                <div className="col-lg-4 col-md-6" key={s.h}>
                  <div className="services-08-item">
                    <div className="services-08-thumb glyph">
                      <i className={"flaticon " + s.icon}></i>
                    </div>
                    <div className="services-08-content">
                      <h3>{s.h}</h3>
                      <p>{s.p}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* industries & use cases */}
        <section className="services-area services-bg pt-120 pb-90">
          <div className="container">
            <SectionTitle
              eyebrow="Industries & use cases"
              title="Where we deliver"
              text="We support both industry-specific platforms and cross-industry automation systems."
            />
            <div className="row">
              {INDUSTRIES.map((it, i) => (
                <div className="col-lg-3 col-md-6 mb-30 d-flex" key={it.b}>
                  <div className="single-post2 lf-industry-card">
                    <div className="blog-thumb2">
                      <img src={`/img/industry/${it.img}.jpg`} alt={it.b} />
                    </div>
                    <div className="blog-content2">
                      <div className="date-home">{String(i + 1).padStart(2, "0")}</div>
                      <h4>{it.b}</h4>
                      <p>{it.s}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* technology stack */}
        <section id="pricing" className="pricing-area pt-120 pb-60">
          <div className="container">
            <SectionTitle
              eyebrow="Technology stack"
              title="Modern, production-grade tools"
              text="A proven toolset spanning AI, automation, frontend, backend, data, and cloud."
            />
            <div className="row lf-tech-row">
              {TECH.map((row, i) => (
                <div className="col-lg-4 col-md-6" key={row.h}>
                  <div className={"pricing-box pricing-box2 text-center mb-60" + (i === 1 ? " active" : "")}>
                    <div className="pricing-head">
                      <h2>{row.h}</h2>
                      <hr />
                    </div>
                    {" "}
                    <div className="pricing-body mt-20 mb-30 text-left">
                      <ul>
                        {row.pills.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* what makes us different */}
        <section className="about-area2 about-p pt-120 pb-120 p-relative">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="s-about-img2 p-relative  wow fadeInLeft  animated" data-animation="fadeInLeft" data-delay=".4s">
                  <img src="/img/features/about_img.png" alt="img" />
                  {" "}
                  <div className="about-text second-about" style={{ background: "url(/img/features/year-bg.png) no-repeat", backgroundPosition: "center center" }}>
                    <div className="all-text">
                      <h3>
                        12
                        <sub>+</sub>
                      </h3>
                      <span>
                        years of
                        <br />
                        experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="about-content s-about-content  wow fadeInRight  animated" data-animation="fadeInRight" data-delay=".4s">
                  <div className="section-title about-title second-atitle pb-25">
                    <h5>What makes us different</h5>
                    <h2>Senior-led, architecture-first, zero chaos</h2>
                  </div>
                  <p>Every project is guided by experienced engineers and a calm, seamless workflow.</p>
                  <div className="about-content3">
                    <ul className="green">
                      {DIFFERENT.map((d) => (
                        <li key={d.b}>
                          <strong className="lf-li-title">{d.b}</strong>
                          {d.s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* pain points we solve */}
        <section id="faq" className="faq-area pt-120 pb-100 lf-alt-bg">
          <div className="container">
            <SectionTitle
              eyebrow="Pain points we solve"
              title="From uncertainty to controlled delivery"
              text="The common problems clients bring us — and how our process resolves them."
            />
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <Accordion id="pains-a" items={PAINS.slice(0, 3)} open={0} />
              </div>
              <div className="col-lg-6 col-md-6">
                <Accordion id="pains-b" items={PAINS.slice(3)} open={0} />
              </div>
            </div>
          </div>
        </section>

        {/* what you receive — laid out like the template's "Our Few Simple Steps" (about.html), without the step numbers */}
        <section className="services-area services-bg pt-120 pb-90">
          <div className="container">
            <SectionTitle
              eyebrow="What you receive"
              title="Delivered at the end of every engagement"
              text="Concrete, production-ready outcomes — not just code."
            />
            <div className="row">
              {RECEIVE.map((r, i) => (
                <div className="col-lg-4 col-md-12 mb-30" key={r.b}>
                  <div className={"s-single-services text-center" + (i === 0 ? " active" : "")}>
                    <div className="services-icon">
                      <img src={`/img/icon/${r.img}`} alt="" />
                    </div>
                    <div className="second-services-content mt-30">
                      <h4>{r.b}</h4>
                      <p>{r.s}</p>
                    </div>
                    <div className="arrow">
                      <img src="/img/icon/arrow-feature.png" alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* engagement models */}
        <section className="services-08 pt-120 pb-90 p-relative fix lf-alt-bg">
          <div className="container">
            <SectionTitle
              eyebrow="Engagement models"
              title="Ways to work with us"
              text="Flexible models to match your scope, capacity, and stage of growth."
            />
            <div className="row  mt-0 align-items-center">
              {MODELS.map((m) => (
                <div className="col-lg-4 col-md-6" key={m.h}>
                  <div className="services-08-item">
                    <div className="services-08-thumb glyph">
                      <i className={"flaticon " + m.icon}></i>
                    </div>
                    <div className="services-08-content">
                      <h3>{m.h}</h3>
                      <p>{m.p}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-lg-4 col-md-6">
                <div className="services-08-item">
                  <div className="services-08-thumb glyph">
                    <i className="flaticon flaticon-help"></i>
                  </div>
                  <div className="services-08-content">
                    <h3>Not sure yet?</h3>
                    <p>{"Tell us your goal and we'll recommend the right model."}</p>
                    <a href="/contact" className="readmore">
                      Talk to us →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          title="Move from idea to reality — without the chaos."
          text="Senior engineering judgment, practical AI expertise, disciplined execution, and a seamless delivery system that protects your project from confusion and risk."
        />
      </main>
      <Footer />
    </>
  );
}
