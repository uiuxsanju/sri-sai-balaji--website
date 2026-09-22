/**
 * Single source of truth for business facts used across metadata and structured data.
 * Only verified information supplied by the business belongs here — never invent an
 * address, certification, rating or price.
 */

/**
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment (Vercel → Project → Settings →
 * Environment Variables) so canonical URLs, Open Graph tags and the sitemap point at
 * the live domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://srisaibalajinaturals.com"
).replace(/\/$/, "");

export const site = {
  name: "Sri Sai Balaji Naturals",
  shortName: "Sri Sai Balaji Naturals",
  tagline: "Natural & traditional food products",
  teluguTagline: "స్వచ్ఛతకు చిరునామా... రుచికి అసలైన నిర్వచనం",
  url: SITE_URL,
  logo: "/products/logo.webp",
  defaultOgImage: "/og/logo.jpg",
  phoneDisplay: "+91 63005 50588",
  phoneE164: "+916300550588",
  whatsappNumber: "916300550588",
  whatsappBase: "https://wa.me/916300550588",
  city: "Vijayawada",
  address: {
    unit: "Sri Sai Balaji Oil Mill",
    street: "Near Ramalayam Temple, Kothapalli Road",
    locality: "Meerjapuram",
    postalCode: "521111",
  },
  addressLine:
    "Sri Sai Balaji Oil Mill, Near Ramalayam Temple, Kothapalli Road, Meerjapuram, Andhra Pradesh 521111",
  state: "Andhra Pradesh",
  country: "India",
  countryCode: "IN",
  locale: "en_IN",
} as const;

/** Build a WhatsApp deep link with a contextual, prefilled enquiry message. */
export function whatsappLink(message: string): string {
  return `${site.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  return path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}