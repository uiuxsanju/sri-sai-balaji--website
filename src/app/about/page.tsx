import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, JsonLd, WhatsAppButton } from "@/components/ui";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbSchema, organizationSchema, seo } from "@/lib/seo";

export const metadata = seo({
  title: "About Sri Sai Balaji Naturals | Traditional Foods in Vijayawada",
  description:
    "Sri Sai Balaji Naturals supplies cold pressed oils, spices, flours, honey, ghee, dry fruits and Andhra pickles from Vijayawada, made and packed in small batches.",
  path: "/about",
  keywords: ["Sri Sai Balaji Naturals", "traditional food products Vijayawada"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={[organizationSchema(), breadcrumbSchema(crumbs)]} />

      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div>
            <p className="text-sage mb-4 text-[11px] font-bold tracking-[.24em] uppercase">
              About us
            </p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Traditional Food Products, Made the Slow Way
            </h1>
            <div className="text-muted-foreground mt-6 space-y-5 text-base leading-8">
              <p>
                Sri Sai Balaji Naturals is a natural food products business
                based in {site.city}, {site.state}. We work with the staples a
                Telugu kitchen uses every day and try to keep them close to how
                they were always made — oils wood pressed rather than refined,
                spices ground from whole seed, millets milled in small lots.
              </p>
              <p>
                The range covers six categories: cold pressed oils, spices and
                powders, flours and rawa, natural foods like forest honey and
                buffalo ghee, dry fruits and nuts, and traditional Andhra
                pickles. Twenty-five products in total — a deliberately small
                list so each one gets proper attention.
              </p>
              <p>
                We sell in clear, simple pack sizes and answer enquiries
                directly on WhatsApp. There is no call centre in between: you
                message, we reply with what is available, what it costs and when
                you can have it.
              </p>
              <p lang="te" className="border-border border-t pt-5">
                శ్రీ సాయి బాలాజీ నేచురల్స్ — విజయవాడ, ఆంధ్రప్రదేశ్‌లోని సహజ ఆహార
                ఉత్పత్తుల వ్యాపారం. తెలుగు వంటింట్లో రోజూ వాడే వస్తువులను,
                పూర్వం ఎలా తయారు చేసేవారో అలాగే అందించాలన్నదే మా ప్రయత్నం —
                నూనెలు గానుగలో, మసాలాలు గింజల నుంచి, చిరుధాన్యాలు చిన్న
                బ్యాచ్‌లలో. మొత్తం ఆరు విభాగాల్లో 25 ఉత్పత్తులు మాత్రమే
                ఉంచుతున్నాం, తద్వారా ప్రతి దానిపై సరైన శ్రద్ధ పెట్టగలుగుతాం.
                ధరలు, అందుబాటు గురించి WhatsApp లో నేరుగా సమాధానం ఇస్తాం.
              </p>
            </div>
            <p lang="te" className="text-primary mt-8 text-lg">
              {site.teluguTagline}
            </p>
          </div>

          <div className="border-border bg-card self-start rounded-sm border p-8">
            <Image
              src="/products/logo.webp"
              width={800}
              height={727}
              sizes="(min-width: 1024px) 380px, 70vw"
              alt={`${site.name} logo`}
              priority
              className="mx-auto w-full max-w-xs object-contain"
            />
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-2xl sm:text-3xl">What we make</h2>
          <div className="bg-border mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="bg-card hover:bg-secondary/25 group p-7 transition"
              >
                <h3 className="font-serif text-xl">{c.name}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {c.blurb}
                </p>
                <span className="text-primary mt-3 inline-flex items-center gap-2 text-xs font-bold">
                  Explore
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 lg:px-10 lg:py-20">
        <div className="bg-primary text-primary-foreground mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-6 rounded-sm p-8 sm:flex-row sm:items-center lg:p-12">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">
              Have a question about a product?
            </h2>
            <p className="text-primary-foreground/75 mt-2">
              Message us on WhatsApp — we usually reply the same day.
            </p>
          </div>
          <WhatsAppButton
            variant="light"
            message={`Hello ${site.name}, I would like to know more about your products.`}
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </PageShell>
  );
}
