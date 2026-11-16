import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { CASE_DATA, type CaseStudy } from "@/lib/cases-data";
import { domain } from "@/lib/case-helpers";

type WorkflowStep = {
  name: string;
  owner: string;
  duration: string;
  notes: string;
  isBottleneck?: boolean;
};

export function generateStaticParams() {
  return CASE_DATA.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = CASE_DATA.find((x) => x.id === id);
  return {
    title: c ? `${c.title} — Lanceflows` : "Case study not found — Lanceflows",
    description:
      "Detailed Lanceflows case study — the business problem, our technical role, the solution delivered, verified results, and the value created.",
  };
}

function Flow({ title, steps, kind }: { title: string; steps: WorkflowStep[]; kind: "before" | "after" }) {
  return (
    <div className={"lf-flow lf-flow-" + kind}>
      <h4>{title}</h4>
      <ol>
        {steps.map((s, k) => (
          <li key={k}>
            <strong>
              {s.name}
              {s.isBottleneck && <span className="lf-bottleneck">Bottleneck</span>}
            </strong>
            <span className="lf-flow-meta">
              {s.owner} · {s.duration}
            </span>
            <p>{s.notes}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = CASE_DATA.findIndex((x) => x.id === id);
  const c = CASE_DATA[idx] as CaseStudy | undefined;
  if (!c) notFound();

  const num = String(idx + 1).padStart(2, "0");
  const t = c.testimonial;
  // Show only name + company (role intentionally omitted from display).
  const author = t.person + (t.company ? " at " + t.company : "");

  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main>
        <Breadcrumb
          eyebrow={`Case ${num} · ${c.category}`}
          title={c.title}
          current={`Case ${num}`}
          trail={[{ href: "/case-study", label: "Case Studies" }]}
        />

        {/* inner-blog */}
        <section className="inner-blog b-details-p pt-145 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-details-wrap">
                  <div className="details__content lf-case pb-30">
                    <a className="lf-back-link" href="/case-study">
                      ← All case studies
                    </a>
                    <div className="meta-info">
                      <ul>
                        <li>
                          <i className="fal fa-tools"></i> {c.ourRole}
                        </li>
                        {" "}
                        <li>
                          <i className="fal fa-external-link"></i>{" "}
                          <a href={c.liveUrl} target="_blank" rel="noopener">
                            {domain(c.liveUrl)}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <h3>Overview</h3>
                    <p>{c.description}</p>

                    <h3>{"Challenge & solution"}</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <h4>The challenge</h4>
                        <p>{c.problem}</p>
                        <ul className="lf-x-list">
                          {c.challenges.map((x, k) => (
                            <li key={k}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h4>Our solution</h4>
                        <p>{c.solution}</p>
                        <ul className="lf-check-list">
                          {c.keyImplementations.map((x, k) => (
                            <li key={k}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="post__tag">
                      <h5>Technology stack</h5>
                      <ul>
                        {c.techStack.map((x) => (
                          <li key={x}>
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <h3>{"Verified results & achievements"}</h3>
                    <ul className="lf-check-list">
                      {c.resultMetrics.map((m, k) => (
                        <li key={k}>{m}</li>
                      ))}
                    </ul>

                    <h3>Operational business value</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Direct value added</h4>
                        <p>{c.businessValue}</p>
                      </div>
                      <div className="col-md-6">
                        <h4>Why it matters</h4>
                        <p>{c.whyThisMatters}</p>
                      </div>
                    </div>

                    <h3>Workflow impact mapping</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <Flow title="Before — manual bottleneck flow" steps={c.beforeWorkflow as WorkflowStep[]} kind="before" />
                      </div>
                      <div className="col-md-6">
                        <Flow title="After — automated optimized flow" steps={c.afterWorkflow as WorkflowStep[]} kind="after" />
                      </div>
                    </div>

                    <blockquote>
                      <footer>— {author}</footer>
                      <h3>“{t.text}”</h3>
                    </blockquote>
                  </div>
                </div>
              </div>
              {/* #right side */}
              <div className="col-sm-12 col-md-12 col-lg-4">
                <aside className="sidebar-widget">
                  <section className="widget widget_categories">
                    <h2 className="widget-title">Service areas</h2>
                    <ul>
                      {(c.serviceAreas || []).map((a) => (
                        <li className="cat-item" key={a}>
                          <a href="/services">{a}</a>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section className="widget widget_recent_entries">
                    <h2 className="widget-title">Case Studies</h2>
                    <ul>
                      {CASE_DATA.filter((x) => x.id !== c.id).map((x) => (
                        <li key={x.id}>
                          <a href={`/case-study/${x.id}`}>{x.title}</a>
                          <span className="post-date">{x.category.split(" / ")[0]}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </aside>
              </div>
              {/* #right side end */}
            </div>
          </div>
        </section>
        {/* inner-blog-end */}

        <CtaBand
          title="Have a problem like this?"
          text="Tell us your goal and we'll turn it into a structured plan — from idea to stable, scalable reality."
        />
      </main>
      <Footer />
    </>
  );
}
