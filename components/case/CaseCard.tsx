import Link from "next/link";
import { caseImage, domain } from "@/lib/case-helpers";

export type CaseCardData = {
  id: string;
  num: string;
  title: string;
  category: string;
  result: string;
  liveUrl: string;
};

// Case study card: industry photo, number badge, industry tag, title and the
// headline result (buyers skim for the outcome first).
export default function CaseCard({ c }: { c: CaseCardData }) {
  const href = `/case-study/${c.id}`;
  return (
    <div className="single-post2 lf-industry-card lf-case-card2">
      <Link href={href} className="blog-thumb2" tabIndex={-1} aria-hidden="true">
        <img src={caseImage(c.category)} alt="" />
      </Link>
      <div className="blog-content2">
        <div className="date-home">{c.num}</div>
        <span className="lf-case-tag">{c.category.split(" / ")[0]}</span>
        <h4>
          <Link href={href}>{c.title}</Link>
        </h4>
        <div className="lf-case-result">
          <span className="lf-case-result-label">Key result</span>
          <p>{c.result}</p>
        </div>
        <div className="lf-case-foot">
          <span className="lf-case-domain">{domain(c.liveUrl)}</span>
          <Link href={href} className="lf-case-more">
            Read case study <i className="fal fa-long-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
