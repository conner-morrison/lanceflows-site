import type { Metadata } from "next";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import CaseGrid from "@/components/case/CaseGrid";
import type { CaseCardData } from "@/components/case/CaseCard";
import { CASE_DATA } from "@/lib/cases-data";
import { INDUSTRY_GROUPS, caseGroups } from "@/lib/case-helpers";

export const metadata: Metadata = {
  title: "Case Studies — Lanceflows | Selected Project Examples",
  description:
    "Project examples showing how Lanceflows applies senior engineering judgment, AI, cloud architecture, and automation to real business problems — with the results.",
};

const CARDS: CaseCardData[] = CASE_DATA.map((c, i) => ({
  id: c.id,
  num: String(i + 1).padStart(2, "0"),
  title: c.title,
  category: c.category,
  result: c.resultMetrics[0],
  liveUrl: c.liveUrl,
}));

// Only groups that have at least one case get a filter chip.
const GROUPS = INDUSTRY_GROUPS.filter((g) => CASE_DATA.some((c) => caseGroups(c.category).includes(g)));

export default function CaseStudyPage() {
  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main>
        <Breadcrumb
          title={<span className="lf-stagger"><span>Real problems,</span><span>stable solutions.</span></span>}
          current="Case Studies"
          image="/img/slider/case-study-hero.webp"
        />

        <section id="cases" className="services-area pt-120 pb-90 p-relative fix" style={{ background: "#f5f5f5" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title center-align mb-40 text-center">
                  <h5>Selected work</h5>
                  <h2>Problems we&apos;ve solved, results we&apos;ve shipped</h2>
                  <p className="lf-lead">
                    Each case covers the business problem, our technical role, the solution delivered, the results, and the workflow impact.
                  </p>
                </div>
              </div>
            </div>
            <CaseGrid cases={CARDS} groups={GROUPS} />
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
