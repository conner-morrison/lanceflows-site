"use client";

import { useState } from "react";
import CaseCard, { type CaseCardData } from "./CaseCard";
import { caseGroups } from "@/lib/case-helpers";

// Case cards with industry filter chips.
export default function CaseGrid({ cases, groups }: { cases: CaseCardData[]; groups: string[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? cases : cases.filter((c) => caseGroups(c.category).includes(active));
  const count = (g: string) => (g === "All" ? cases.length : cases.filter((c) => caseGroups(c.category).includes(g)).length);

  return (
    <>
      <div className="lf-case-filter" role="toolbar" aria-label="Filter case studies by industry">
        {["All", ...groups].map((g) => (
          <button
            key={g}
            type="button"
            className={g === active ? "active" : ""}
            aria-pressed={g === active}
            onClick={() => setActive(g)}
          >
            {g} <span>{count(g)}</span>
          </button>
        ))}
      </div>
      <div className="row lf-tile-row">
        {shown.map((c) => (
          <div className="col-lg-4 col-md-6 mb-30" key={c.id}>
            <CaseCard c={c} />
          </div>
        ))}
      </div>
    </>
  );
}
