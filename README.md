# Sri Sai Balaji Naturals

Natural and traditional food products from Vijayawada, Andhra Pradesh — cold pressed
oils, spices and powders, flours and rawa, forest honey, buffalo ghee, dry fruits and
Andhra pickles.

Built with **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (prerenders all 42 pages)
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Set the live domain

Canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` all read one variable.
Set it in the deploy environment (Vercel → Project → Settings → Environment Variables)
and locally in `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Without it the site falls back to `https://srisaibalajinaturals.com`.

## Project structure

```
src/
  app/
    page.tsx                        Home (hero carousel, categories, all 25 products, FAQ)
    products/page.tsx               All products
    products/[slug]/page.tsx        25 product pages (generateStaticParams)
    categories/page.tsx             Category index
    categories/[slug]/page.tsx      6 category pages
    natural-foods-vijayawada/       Local SEO page
    about/  contact/                About + contact
    not-found.tsx                   404
    sitemap.ts  robots.ts           Generated from the catalogue
  components/                       Header, footer, carousel, product cards, UI
  data/
    products.ts                     Catalogue: 25 products, 6 categories, all SEO copy
    site.ts                         Business facts (phone, WhatsApp, city, URLs)
  lib/seo.ts                        Metadata builder + JSON-LD schema helpers
public/
  products/*.webp                   Pack shots (transparent, 1200px)
  og/*.jpg                          1200×630 social share cards
```

## Adding prices

No prices are hard-coded anywhere. Products show **"Price available on enquiry"** and
the `Product` structured data omits `offers` — publishing an invented price would be
false markup and can get the site penalised.

To publish a real price, add it to the product record in `src/data/products.ts`:

```ts
{
  slug: "ragi-flour",
  price: 180,   // INR — the UI and the Product schema both pick this up
  ...
}
```

## Adding the missing product photos

Three products have no supplied photograph — `chicken-pickle`, `prawns-pickle` and
`mutton-pickle`. They render a branded "photo coming soon" placeholder instead of a
substitute image.

When the photos arrive:

1. Save each as a transparent WebP at 1200px, named after the slug, in
   `public/products/` (e.g. `chicken-pickle.webp`).
2. Add a matching 1200×630 JPG in `public/og/`.
3. Set `image: "chicken-pickle"` on that product in `src/data/products.ts`.

## SEO notes

- Every indexable page has a unique title, unique meta description, one `<h1>`, a
  canonical URL and its own Open Graph / Twitter card.
- Structured data: `Organization`, `WebSite`, `LocalBusiness`, `Product`,
  `BreadcrumbList`, `ItemList` and `FAQPage` (only for FAQs visible on the page).
- `LocalBusiness` intentionally omits street address, postal code, geo coordinates and
  opening hours — add them in `src/lib/seo.ts` once the business confirms them.
- No reviews, ratings, certifications or health claims appear anywhere in the content.

## Fonts

Manrope and Playfair Display load from Google Fonts via `<link>` in
`src/app/layout.tsx`. To self-host them with `next/font/google` instead, replace that
block with a `next/font` import — the build machine then needs network access to
`fonts.googleapis.com`.
