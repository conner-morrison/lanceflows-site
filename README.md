# Lanceflows on Sumolo

The Lanceflows website built on the Sumolo "Digital Agency" template, as a
**Next.js (App Router, TypeScript)** project. All wording comes from the
Lanceflows site; the design, images, icons, fonts and scripts are the
template's.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Pages

| Route               | Lanceflows content                         | Built on template page |
| ------------------- | ------------------------------------------ | ---------------------- |
| `/`                 | Overview (home) and contact                | `index.html`           |
| `/services`         | Services                                   | `services.html`, sections from `about.html`, `pricing.html`, `faq.html` |
| `/case-study`       | Case studies index                         | services grid          |
| `/case-study/[id]`  | 11 case studies (`lib/cases-data.ts`)      | `blog-details.html`    |
| `/privacy`, `/terms`| Legal pages                                | `blog-details.html`    |

## Structure

- `app/layout.tsx` — the template's `<head>` (stylesheets in the template's
  order, then `css/lanceflows.css`), the cursor dots, the human-verification
  gate and `TemplateScripts`
- `components/`
  - `Header`, `Footer`, `OffcanvasMenu`, `Breadcrumb` (title banner with the
    Lanceflows eyebrow and intro), `CtaBand` (the red band), `ContactForm`
    (FormSubmit), `HumanVerify` (Cloudflare Turnstile), `BrandText` (wordmark)
  - `TemplateScripts` — loads jQuery, the template's plugins and `main.js`
    in order after hydration, once per page load
- `lib/cases-data.ts` — the Lanceflows case-study data, unchanged
- `public/css/lanceflows.css` — the few styles the template lacks (wordmark,
  banner intro text, list titles, case pages, legal pages, verification gate)
- `public/` — otherwise the template's asset tree, unchanged

## Notes

- Internal links are plain `<a>` tags, so every navigation is a full page load,
  as in the HTML template. That keeps the jQuery plugins initialising once per
  page.
- Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` for production; without it the gate uses
  Cloudflare's always-pass test key.
- The pure template version (all 12 Sumolo pages) is saved in
  `../sumolo-template-clone-2026-11-10.tar.gz`.
