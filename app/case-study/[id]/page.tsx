import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import OffcanvasMenu from "@/components/OffcanvasMenu";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { CASE_DATA, type CaseStudy } from "@/lib/cases-data";
import { caseGroups, caseImage, domain } from "@/lib/case-helpers";
import CaseCard from "@/components/case/CaseCard";
import QuoteAvatar from "@/components/case/QuoteAvatar";

// Client portraits shown beside each testimonial (same photos as the original lanceflows site).
const PORTRAITS: Record<string, string> = {
  "medplum-fhir": "/img/client/client-medplum-fhir.jpg",
  "hyperswitch-payments": "/img/client/client-formance-ledger.jpg",
  "fleetbase-logistics": "/img/client/client-fleetbase-logistics.jpg",
  "rentcast-proptech": "/img/client/client-estated-proptech.jpg",
  "duffel-travel": "/img/client/client-duffel-travel.jpg",
  "covergenius-insurtech": "/img/client/client-boost-insurtech.jpg",
  "langchain-clinical": "/img/client/client-heidihealth-ai.jpg",
  "documenso-legal": "/img/client/client-harvey-legal.jpg",
  "lago-billing": "/img/client/client-lago-billing.jpg",
  "qdrant-vectordb": "/img/client/client-hatchways-proptech.jpg",
  "n8n-automation": "/img/client/client-sojern-hospitality.jpg",
};

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

const RESULT_ICONS = ["fal fa-rocket", "fal fa-chart-line", "fal fa-coins"];

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = CASE_DATA.findIndex((x) => x.id === id);
  const c = CASE_DATA[idx] as CaseStudy | undefined;
  if (!c) notFound();

  const pad = (i: number) => String(i + 1).padStart(2, "0");
  const num = pad(idx);
  const tag = c.category.split(" / ")[0];
  const t = c.testimonial;
  // Show only name + company (role intentionally omitted from display).
  const author = t.person + (t.company ? " at " + t.company : "");
  const initials = t.person.replace(/^Dr\.\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);

  // Related: same industry group first, then the following cases; three in all.
  const groups = caseGroups(c.category);
  const others = CASE_DATA.map((x, i) => ({ x, i })).filter(({ x }) => x.id !== c.id);
  const related = [
    ...others.filter(({ x }) => caseGroups(x.category).some((g) => groups.includes(g))),
    ...others.filter(({ i }) => i > idx),
    ...others,
  ]
    .filter((v, k, a) => a.findIndex((w) => w.x.id === v.x.id) === k)
    .slice(0, 3);
  const prev = CASE_DATA[(idx - 1 + CASE_DATA.length) % CASE_DATA.length];
  const next = CASE_DATA[(idx + 1) % CASE_DATA.length];

  return (
    <>
      <Header />
      <OffcanvasMenu />
      <main>
        <Breadcrumb
          eyebrow={`Case ${num} · ${tag}`}
          title={c.title}
          current={`Case ${num}`}
          trail={[{ href: "/case-study", label: "Case Studies" }]}
          image={caseImage(c.category)}
        />

        {/* results at a glance — the outcome first */}
        <section className="lf-results-band pt-80 pb-50">
          <div className="container">
            <div className="lf-results-head">
              <h5>Results at a glance</h5>
            </div>
            <div className="row lf-tile-row">
              {c.resultMetrics.slice(0, 3).map((m, k) => (
                <div className="col-lg-4 col-md-6 mb-30" key={k}>
                  <div className="lf-result-tile">
                    <i className={RESULT_ICONS[k]}></i>
                    <p>{m}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* inner-blog */}
        <section className="inner-blog b-details-p pt-120 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-details-wrap">
                  <div className="details__content lf-case pb-30">
                    <Link className="lf-back-link" href="/case-study">
                      ← All case studies
                    </Link>

                    <h3 className="mt-0">Overview</h3>
                    <p>{c.description}</p>

                    <h3>The challenge</h3>
                    <p>{c.problem}</p>
                    <ul className="lf-x-list">
                      {c.challenges.map((x, k) => (
                        <li key={k}>{x}</li>
                      ))}
                    </ul>

                    <h3>Our approach &amp; solution</h3>
                    <p>{c.solution}</p>
                    <ul className="lf-check-list">
                      {c.keyImplementations.map((x, k) => (
                        <li key={k}>{x}</li>
                      ))}
                    </ul>

                    {c.resultMetrics.length > 3 && (
                      <>
                        <h3>More results</h3>
                        <ul className="lf-check-list">
                          {c.resultMetrics.slice(3).map((m, k) => (
                            <li key={k}>{m}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* mid-page call to action, right after the results story */}
                    <div className="lf-mid-cta">
                      <div>
                        <h4>Facing a similar challenge?</h4>
                        <p>Tell us where you are today — we&apos;ll map out how we&apos;d approach it.</p>
                      </div>
                      <Link href="/contact" className="btn ss-btn">
                        <span>Contact us</span>
                      </Link>
                    </div>

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

                    {/* client testimonial */}
                    <figure className="lf-quote-card">
                      <i className="fas fa-quote-left lf-quote-mark"></i>
                      <blockquote>{t.text}</blockquote>
                      <figcaption>
                        <QuoteAvatar src={PORTRAITS[c.id]} person={t.person} initials={initials} />
                        <span>
                          <strong>{t.person}</strong>
                          {t.company && <em>{t.company}</em>}
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>

              {/* #right side */}
              <div className="col-sm-12 col-md-12 col-lg-4">
                <aside className="sidebar-widget lf-case-aside">
                  <section className="widget lf-snapshot">
                    <h2 className="widget-title">Project snapshot</h2>
                    <dl>
                      <dt>Industry</dt>
                      <dd>{c.category}</dd>
                      <dt>Our role</dt>
                      <dd>{c.ourRole}</dd>
                      {(c.serviceAreas ?? []).length > 0 && (
                        <>
                          <dt>Services</dt>
                          <dd>
                            {(c.serviceAreas ?? []).map((a, k) => (
                              <span key={a}>
                                {k > 0 && ", "}
                                <Link href="/services">{a}</Link>
                              </span>
                            ))}
                          </dd>
                        </>
                      )}
                      <dt>Product</dt>
                      <dd>
                        <a href={c.liveUrl} target="_blank" rel="noopener">
                          {domain(c.liveUrl)} <i className="fal fa-external-link"></i>
                        </a>
                      </dd>
                    </dl>
                  </section>
                  <section className="widget lf-stack">
                    <h2 className="widget-title">Technology stack</h2>
                    <ul>
                      {c.techStack.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="widget lf-aside-cta">
                    <h3>Have a project like this?</h3>
                    <p>Book a free intro call — no commitment.</p>
                    <Link href="/contact" className="btn ss-btn">
                      <span>Start a conversation</span>
                    </Link>
                  </section>
                </aside>
              </div>
              {/* #right side end */}
            </div>

            {/* previous / next case */}
            <nav className="lf-case-nav" aria-label="More case studies">
              <Link href={`/case-study/${prev.id}`}>
                <span>← Previous case</span>
                <strong>{prev.title}</strong>
              </Link>
              <Link href={`/case-study/${next.id}`} className="text-right">
                <span>Next case →</span>
                <strong>{next.title}</strong>
              </Link>
            </nav>
          </div>
        </section>
        {/* inner-blog-end */}

        {/* related cases */}
        <section className="services-area pt-120 pb-90" style={{ background: "#f5f5f5" }}>
          <div className="container">
            <div className="section-title center-align mb-50 text-center">
              <h5>Related work</h5>
              <h2>More case studies</h2>
            </div>
            <div className="row lf-tile-row">
              {related.map(({ x, i }) => (
                <div className="col-lg-4 col-md-6 mb-30" key={x.id}>
                  <CaseCard c={{ id: x.id, num: pad(i), title: x.title, category: x.category, result: x.resultMetrics[0], liveUrl: x.liveUrl }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Have a problem like this?"
          text="Tell us your goal and we'll turn it into a structured plan — from idea to stable, scalable reality."
        />
      </main>
      <Footer />
    </>
  );
}
