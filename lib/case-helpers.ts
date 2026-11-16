// Small helpers shared by the case-study pages (ported from the Lanceflows site).

export function domain(url: string) {
  return String(url)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

// A template (flaticon) icon per case category, for the card icon slot.
export function categoryIcon(category: string) {
  const tag = category.split(" / ")[0];
  const map: Record<string, string> = {
    "Healthcare & Medical Software": "flaticon-heart",
    "Fintech & Payments": "flaticon-income",
    "Logistics & Supply Chain": "flaticon-cube",
    "Real Estate": "flaticon-home",
    "Travel & Hospitality": "flaticon-global",
    "Insurance": "flaticon-insurance",
    "Vertical AI Applications": "flaticon-network",
    "AI & Automation": "flaticon-chip",
  };
  return map[tag] || "flaticon-diagram";
}
