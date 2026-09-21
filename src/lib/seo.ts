import type { Metadata } from "next";

import { absoluteUrl, site, SITE_URL } from "@/data/site";

export type SeoInput = {
  title: string;
  description: string;
  /** Site-root-relative path, e.g. "/products/ragi-flour" */
  path: string;
  /** Site-root-relative image path used for Open Graph / Twitter cards. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
};

/**
 * Builds the Metadata for a route: one unique title, one unique description, a
 * canonical URL and matching Open Graph / Twitter tags.
 */
export function seo({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  keywords,
}: SeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? site.defaultOgImage);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
    authors: [{ name: site.name }],
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: imageAlt ?? title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "geo.region": "IN-AP",
      "geo.placename": site.city,
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl(site.logo),
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: site.countryCode,
    },
  };
}

/**
 * LocalBusiness for the Vijayawada operation. Deliberately omits `streetAddress`,
 * `postalCode`, `geo`, `openingHours` and `aggregateRating` — none of those have been
 * supplied by the business, and publishing invented values would be false markup.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: absoluteUrl(site.defaultOgImage),
    logo: absoluteUrl(site.logo),
    description:
      "Natural and traditional food products in Vijayawada: cold pressed oils, spices and powders, flours and rawa, forest honey, buffalo ghee, dry fruits and Andhra pickles.",
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: site.countryCode,
    },
    areaServed: [
      { "@type": "City", name: site.city },
      { "@type": "AdministrativeArea", name: site.state },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
  };
}
