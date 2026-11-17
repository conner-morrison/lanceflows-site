import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import HumanVerify from "@/components/HumanVerify";

export const metadata: Metadata = {
  title: "Lanceflows — Software Engineering & AI Services",
  description:
    "Lanceflows is a senior software engineering and AI team that turns your idea into a reliable, scalable product — with clear architecture, disciplined delivery, and zero chaos.",
  // The favicon is app/icon.png (Next.js adds the <link rel="icon"> for it).
};

// The template's stylesheets, in the template's order.
const STYLESHEETS = [
  "/css/bootstrap.min.css",
  "/css/animate.min.css",
  "/css/magnific-popup.css",
  "/fontawesome/css/all.min.css",
  "/font-flaticon/flaticon.css",
  "/css/dripicons.css",
  "/css/slick.css",
  "/css/meanmenu.css",
  "/css/default.css",
  "/css/style.css",
  "/css/responsive.css",
  // Lanceflows additions (wordmark, banner intro text, lists, case pages).
  "/css/lanceflows.css",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Modernizr swaps "no-js" for its feature classes once it runs.
    <html className="no-js" lang="zxx" suppressHydrationWarning>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <HumanVerify />
        <div className="circle"></div>
        <div className="cursor"></div>
        {children}
        <TemplateScripts />
      </body>
    </html>
  );
}
