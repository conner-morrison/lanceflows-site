// Small helpers shared by the case-study pages (ported from the Lanceflows site).

export function domain(url: string) {
  return String(url)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

// Industry filter groups. A case can belong to more than one (its category
// may list two tags, e.g. "Vertical AI Applications / Healthcare & Medical Software").
const TAG_GROUP: Record<string, string> = {
  "Healthcare & Medical Software": "Healthcare",
  "Fintech & Payments": "Fintech",
  "Logistics & Supply Chain": "Logistics",
  "Real Estate": "Real Estate",
  "Travel & Hospitality": "Travel",
  "Insurance": "Insurance",
  "Vertical AI Applications": "AI & Automation",
  "AI & Automation": "AI & Automation",
};

export const INDUSTRY_GROUPS = ["Healthcare", "Fintech", "AI & Automation", "Real Estate", "Logistics", "Travel", "Insurance"];

export function caseGroups(category: string) {
  return Array.from(new Set(category.split(" / ").map((t) => TAG_GROUP[t]).filter(Boolean)));
}

// Industry photo (the Services page's industry images) for a case.
const GROUP_IMG: Record<string, string> = {
  Healthcare: "healthcare",
  Fintech: "fintech",
  "AI & Automation": "ai",
  "Real Estate": "realestate",
  Logistics: "logistics",
  Travel: "travel",
  Insurance: "insurance",
};

export function caseImage(category: string) {
  return `/img/industry/${GROUP_IMG[caseGroups(category)[0]] ?? "ai"}.jpg`;
}
