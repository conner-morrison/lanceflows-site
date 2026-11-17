import type { Metadata } from "next";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { CASE_DATA } from "@/lib/cases-data";
import { categoryIcon, domain } from "@/lib/case-helpers";

export const metadata: Metadata = {
  title: "Case Studies — Lanceflows | Selected Project Examples",
  description:
    "Selected, anonymized project examples showing how Lanceflows applies senior engineering judgment, AI, cloud architecture, and automation to real business problems.",
};

export default function CaseStudyPage() {
  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main>
        <Breadcrumb
          title="Real problems, stable solutions."
          current="Case Studies"
          image="/img/slider/b_details01_2x.jpg"
        />

        <section id="services-08" className="services-08 pt-145 pb-90 p-relative fix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title center-align mb-50 text-center">
                  <p className="lf-lead">
                    Verified, enterprise-style project examples across product engineering, AI, cloud, data, and automation. Each one covers the business problem, our technical role, the solution delivered, the verified results, and the workflow impact. Click any card to read the full story.
                  </p>
                </div>
              </div>
            </div>
            <div className="row  mt-0">
              {CASE_DATA.map((c, i) => {
                const num = String(i + 1).padStart(2, "0");
                const tag = c.category.split(" / ")[0];
                const href = `/case-study/${c.id}`;
                return (
                  <div className="col-lg-4 col-md-6 d-flex" key={c.id}>
                    <div className="services-08-item lf-case-card">
                      <div className="services-08-thumb glyph">
                        <i className={"flaticon " + categoryIcon(c.category)}></i>
                      </div>
                      <div className="services-08-content">
                        <div className="lf-case-meta">
                          <span className="lf-case-num">{num}</span>
                          <span className="lf-case-tag">{tag}</span>
                        </div>
                        <h3>
                          <a href={href}>{c.title}</a>
                        </h3>
                        <p>{c.description}</p>
                        <p className="lf-case-domain">{domain(c.liveUrl)}</p>
                        <a href={href} className="readmore">
                          View case study →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand
          title="Have a problem like these?"
          text="Tell us your goal and we'll turn it into a structured plan — from idea to stable, scalable reality."
        />
      </main>
      <Footer />
    </>
  );
}
