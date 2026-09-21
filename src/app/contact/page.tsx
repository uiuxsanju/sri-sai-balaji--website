import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, JsonLd, WhatsAppButton } from "@/components/ui";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbSchema, localBusinessSchema, seo } from "@/lib/seo";

export const metadata = seo({
  title: "Contact Natural Food Products in Vijayawada | WhatsApp Enquiry",
  description:
    "Contact Sri Sai Balaji Naturals in Vijayawada. Call or WhatsApp +91 63005 50588 for product availability, pack sizes and prices.",
  path: "/contact",
  keywords: ["contact natural foods Vijayawada", "WhatsApp enquiry Vijayawada"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={[localBusinessSchema(), breadcrumbSchema(crumbs)]} />

      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="text-muted-foreground mt-5 text-base leading-8">
              The fastest way to reach us is WhatsApp. Send the product name and
              the pack size you need and we will reply with the current price
              and availability. You are equally welcome to call.
            </p>
            <p
              lang="te"
              className="text-muted-foreground mt-3 text-base leading-8"
            >
              మమ్మల్ని సంప్రదించడానికి WhatsApp సులభమైన మార్గం. ఉత్పత్తి పేరు,
              ప్యాక్ సైజు పంపితే ప్రస్తుత ధర, అందుబాటు తెలియజేస్తాం. ఫోన్ చేసి
              కూడా అడగవచ్చు.
            </p>

            <div className="bg-border mt-8 grid gap-px sm:grid-cols-2">
              <div className="bg-background p-6">
                <Phone className="text-sage size-5" aria-hidden="true" />
                <h2 className="text-sage mt-4 text-[10px] font-bold tracking-[.2em] uppercase">
                  Phone
                </h2>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="text-primary mt-1 block font-serif text-xl"
                >
                  {site.phoneDisplay}
                </a>
              </div>
              <div className="bg-background p-6">
                <MessageCircle
                  className="text-sage size-5"
                  aria-hidden="true"
                />
                <h2 className="text-sage mt-4 text-[10px] font-bold tracking-[.2em] uppercase">
                  WhatsApp
                </h2>
                <p className="mt-1 font-serif text-xl">{site.phoneDisplay}</p>
              </div>
              <div className="bg-background p-6 sm:col-span-2">
                <MapPin className="text-sage size-5" aria-hidden="true" />
                <h2 className="text-sage mt-4 text-[10px] font-bold tracking-[.2em] uppercase">
                  Location
                </h2>
                <p className="mt-1 font-serif text-xl">
                  {site.city}, {site.state}, {site.country}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Serving {site.city} and the wider {site.state} region.
                </p>
              </div>
            </div>

            <WhatsAppButton
              className="mt-8"
              message={`Hello ${site.name}, I would like to enquire about your natural food products in Vijayawada.`}
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>

          <div className="bg-secondary/35 self-start rounded-sm p-8">
            <h2 className="font-serif text-2xl">Enquire about a category</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Pick the range you are interested in and the message will be
              filled in for you.
            </p>
            <ul className="mt-6 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <WhatsAppButton
                    variant="outline"
                    className="bg-background w-full !justify-between"
                    message={`Hello ${site.name}, please share the sizes and prices for your ${c.name.toLowerCase()}.`}
                  >
                    {c.name}
                  </WhatsAppButton>
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              className="text-primary group mt-7 inline-flex items-center gap-2 text-sm font-bold"
            >
              View Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
