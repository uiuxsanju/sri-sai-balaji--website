import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { ProductGrid } from "@/components/product";
import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, FaqList, JsonLd, WhatsAppButton } from "@/components/ui";
import { categories, products } from "@/data/products";
import { site } from "@/data/site";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  seo,
} from "@/lib/seo";

export const metadata = seo({
  title:
    "Natural & Organic Food Products in Vijayawada | Sri Sai Balaji Naturals",
  description:
    "Natural food products in Vijayawada — cold pressed oils, spices, millet flours, forest honey, buffalo ghee, dry fruits and Andhra pickles. WhatsApp +91 63005 50588.",
  path: "/natural-foods-vijayawada",
  keywords: [
    "organic foods Vijayawada",
    "organic food store Vijayawada",
    "natural food store Vijayawada",
    "healthy food products Vijayawada",
    "buy natural products Vijayawada",
  ],
});

const faqs = [
  {
    q: "Where can I buy natural food products in Vijayawada?",
    a: `Sri Sai Balaji Naturals supplies natural food products in ${site.city}. Send your requirement on WhatsApp to ${site.phoneDisplay} and we will confirm availability and how the order reaches you.`,
  },
  {
    q: "Do you supply outside Vijayawada?",
    a: `We are based in ${site.city} and also take enquiries from elsewhere in ${site.state}. Message us with your location and quantity and we will tell you what is possible.`,
  },
  {
    q: "Can I order cold pressed oil in Vijayawada?",
    a: "Yes. Groundnut, coconut, white sesame and black sesame oils are available in 500 ml and 1 litre bottles.",
  },
  {
    q: "Do you take bulk or regular supply orders?",
    a: "Yes — for households, shops and small kitchens. Share the products and monthly quantity on WhatsApp and we will work out the arrangement.",
  },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: `Natural foods in ${site.city}`, path: "/natural-foods-vijayawada" },
];

export default function LocalPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div>
            <p className="text-sage mb-4 text-[11px] font-bold tracking-[.24em] uppercase">
              {site.city} · {site.state}
            </p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Natural &amp; Organic Food Products in Vijayawada
            </h1>
            <p lang="te" className="text-ink-soft mt-2 font-serif text-2xl">
              విజయవాడలో సహజ &amp; సేంద్రియ ఆహార ఉత్పత్తులు
            </p>
            <div className="text-muted-foreground mt-6 space-y-5 text-base leading-8">
              <p>
                Sri Sai Balaji Naturals is based in Vijayawada and supplies the
                traditional pantry staples Telugu kitchens use every day — wood
                pressed oils, freshly ground spice powders, millet flours and
                rawa, forest honey, buffalo ghee, dry fruits and Andhra pickles.
              </p>
              <p>
                We keep the range deliberately small at twenty-five products so
                each one is made or packed in small batches rather than stored
                in bulk. Sizes go from 250 g packs up to 1 kg, and oils come in
                500 ml and 1 litre bottles.
              </p>
              <p>
                Enquiries and orders are handled on WhatsApp and by phone. Send
                us the product and size you want and we will reply with the
                current price and how it can reach you in Vijayawada.
              </p>
              <p lang="te" className="border-border border-t pt-5">
                శ్రీ సాయి బాలాజీ నేచురల్స్ విజయవాడలో ఉంది. తెలుగు వంటిళ్లలో రోజూ
                వాడే గానుగ నూనెలు, తాజాగా ఆడించిన మసాలా పొడులు, చిరుధాన్యాల
                పిండులు, రవ్వలు, అటవీ తేనె, గేదె నెయ్యి, ఎండు పండ్లు, ఆంధ్రా
                పచ్చళ్ళు — మొత్తం 32 ఉత్పత్తులు అందిస్తున్నాం. ప్యాక్ సైజులు 250
                గ్రా. నుంచి 1 కిలో వరకు, నూనెలు 500 మి.లీ. మరియు 1 లీటర్
                సీసాల్లో. మీకు కావలసిన ఉత్పత్తి, సైజు WhatsApp లో పంపితే ధర,
                అందుబాటు వెంటనే చెబుతాం.
              </p>
            </div>
          </div>

          <div className="border-border bg-card self-start rounded-sm border p-7">
            <h2 className="font-serif text-2xl">Contact us in Vijayawada</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-sage text-[10px] font-bold tracking-[.2em] uppercase">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${site.phoneE164}`}
                    className="text-primary inline-flex items-center gap-2 font-semibold"
                  >
                    <Phone className="size-4" aria-hidden="true" />{" "}
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sage text-[10px] font-bold tracking-[.2em] uppercase">
                  WhatsApp
                </dt>
                <dd className="mt-1">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <MessageCircle className="size-4" aria-hidden="true" />{" "}
                    {site.phoneDisplay}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sage text-[10px] font-bold tracking-[.2em] uppercase">
                  Location
                </dt>
                <dd className="text-muted-foreground mt-1">
                  {site.city}, {site.state}, {site.country}
                </dd>
              </div>
              <div>
                <dt className="text-sage text-[10px] font-bold tracking-[.2em] uppercase">
                  Service area
                </dt>
                <dd className="text-muted-foreground mt-1">
                  {site.city} and across {site.state}
                </dd>
              </div>
            </dl>
            <WhatsAppButton
              className="mt-7 w-full"
              message={`Hello ${site.name}, I am in Vijayawada and would like to enquire about your natural food products.`}
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-2xl sm:text-3xl">
            What we supply in Vijayawada
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="border-border bg-background hover:border-primary hover:text-primary group inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-semibold transition"
              >
                {c.h1}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <ProductGrid items={products.slice(0, 8)} />
          </div>
          <Link
            href="/products"
            className="text-primary group mt-8 inline-flex items-center gap-2 text-sm font-bold"
          >
            View Products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="px-5 py-14 lg:px-10 lg:py-20">
        <FaqList faqs={faqs} title="Buying in Vijayawada — questions" />
      </section>
    </PageShell>
  );
}
