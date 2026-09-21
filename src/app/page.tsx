import Link from "next/link";
import { ArrowRight, Leaf, MapPin, Package, Sprout } from "lucide-react";

import { HeroCarousel } from "@/components/hero-carousel";
import { ProductGrid } from "@/components/product";
import { PageShell } from "@/components/site-footer";
import {
  FaqList,
  JsonLd,
  SectionHeading,
  WhatsAppButton,
} from "@/components/ui";
import { categories, productsInCategory } from "@/data/products";
import { site } from "@/data/site";
import { teluguCategoryIntro } from "@/data/telugu-copy";
import {
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  seo,
  websiteSchema,
} from "@/lib/seo";
import { PackShot } from "@/components/pack-shot";

export const metadata = seo({
  title:
    "Organic & Natural Foods in Vijayawada | Cold Pressed Oils & Andhra Foods",
  description:
    "Discover natural food products in Vijayawada including cold pressed oils, traditional spices, flours, dry fruits, honey, buffalo ghee and Andhra pickles. Enquire on WhatsApp.",
  path: "/",
  image: "/og/logo.jpg",
  imageAlt: `${site.name} — natural food products in Vijayawada`,
  keywords: [
    "organic foods Vijayawada",
    "natural foods Vijayawada",
    "natural food products Vijayawada",
    "cold pressed oils Vijayawada",
    "Andhra pickles Vijayawada",
    "traditional Andhra foods",
  ],
});

const homeFaqs = [
  {
    q: "What natural food products do you offer in Vijayawada?",
    a: "Cold pressed oils (groundnut, coconut, white sesame, black sesame), spice powders, millet flours and rawa, forest honey, buffalo ghee, dry fruits and nuts, and traditional Andhra pickles — 25 products in all.",
  },
  {
    q: "Do you offer cold pressed oils?",
    a: "Yes. Groundnut oil, coconut oil, white sesame oil and black sesame oil are all wood pressed and packed in 500 ml and 1 litre glass bottles.",
  },
  {
    q: "What sizes are available?",
    a: "Oils come in 500 ml and 1 litre. Flours and rawa come in 500 g and 1 kg. Spice powders, dry fruits and pickles come in 250 g, 500 g and 1 kg.",
  },
  {
    q: "How can I enquire about the 1 kg price?",
    a: `Send a WhatsApp message to ${site.phoneDisplay} with the product name and the size you want, and we will reply with the current price.`,
  },
  {
    q: "Do you sell Andhra pickles?",
    a: "Yes — veg pickle, chicken pickle, prawns pickle and mutton pickle, all made to traditional Andhra recipes in small batches.",
  },
  {
    q: "How can I place an enquiry?",
    a: `Call ${site.phoneDisplay} or message the same number on WhatsApp. Every product page also has an enquiry button that opens WhatsApp with the product name already filled in.`,
  },
];

const promises = [
  {
    icon: Sprout,
    title: "Traditionally Made",
    copy: "Oils wood pressed, spices ground and flours milled in small batches.",
    teluguCopy:
      "నూనెలు గానుగలో, మసాలాలు గింజల నుంచి, పిండులు చిన్న బ్యాచ్‌లలో.",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    copy: "Sorted seed, grain and spice — nothing added for colour or shelf life.",
    teluguCopy:
      "వేరు చేసిన గింజలు, ధాన్యాలు, మసాలాలు — రంగు, నిల్వ కోసం ఏమీ కలపం.",
  },
  {
    icon: Package,
    title: "Clear Pack Sizes",
    copy: "250 g, 500 g and 1 kg packs, and 500 ml and 1 litre bottles for oils.",
    teluguCopy:
      "250 గ్రా., 500 గ్రా., 1 కిలో ప్యాక్‌లు; నూనెలు 500 మి.లీ., 1 లీటర్.",
  },
  {
    icon: MapPin,
    title: "Based in Vijayawada",
    copy: "Serving homes across Vijayawada and Andhra Pradesh, with WhatsApp enquiries.",
    teluguCopy: "విజయవాడ, ఆంధ్రప్రదేశ్ అంతటా ఇళ్లకు — WhatsApp లో ఆర్డర్.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          localBusinessSchema(),
          faqSchema(homeFaqs),
        ]}
      />

      <HeroCarousel />

      {/* Introduction */}
      <section className="border-border border-b px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <p className="text-sage mb-4 text-[11px] font-bold tracking-[.24em] uppercase">
              {site.name}
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Organic &amp; Natural Food Products in Vijayawada
            </h2>
            <p lang="te" className="text-ink-soft mt-3 font-serif text-2xl">
              విజయవాడలో సహజ &amp; సాంప్రదాయ ఆహార ఉత్పత్తులు
            </p>
            <div className="text-muted-foreground mt-6 space-y-5 text-base leading-8">
              <p>
                We put together the pantry a Telugu kitchen actually runs on:
                cold pressed oils, spice powders ground from whole spice, millet
                flours and rawa, forest honey, buffalo ghee, dry fruits and
                pickles made to home recipes.
              </p>
              <p>
                Everything is made or packed in small batches, which keeps the
                aroma and texture you expect from traditional food. Tell us what
                you need on WhatsApp and we will confirm sizes and the current
                price.
              </p>
              <p lang="te">
                ప్రతి ఉత్పత్తి చిన్న బ్యాచ్‌లలో తయారు చేసి, ప్యాక్ చేస్తాం —
                అందుకే సాంప్రదాయ ఆహారానికి ఉండాల్సిన సువాసన, రుచి అలాగే ఉంటాయి.
                మీకు కావలసినవి WhatsApp లో చెప్పండి, సైజులు మరియు ధరలు వెంటనే
                తెలియజేస్తాం.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="bg-primary text-primary-foreground hover:bg-forest group inline-flex min-h-12 items-center gap-3 rounded-sm px-6 text-sm font-bold transition"
              >
                View Products
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <WhatsAppButton
                variant="outline"
                message={`Hello ${site.name}, please share your product list and prices.`}
              >
                Order on WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          <ul className="bg-border grid gap-px self-start sm:grid-cols-2">
            {promises.map(({ icon: Icon, title, copy, teluguCopy }) => (
              <li key={title} className="bg-background p-6">
                <Icon
                  className="text-sage size-6"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-serif text-lg">{title}</h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-6">
                  {copy}
                </p>
                <p
                  lang="te"
                  className="text-muted-foreground mt-1 text-sm leading-6"
                >
                  {teluguCopy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product categories */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="The Pantry"
            title="Our Product Categories"
            copy="Six ranges covering everyday cooking in Andhra homes — pick a category to see what is in it."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="border-border bg-card hover:border-primary/40 group flex flex-col rounded-sm border p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_color-mix(in_oklab,var(--foreground)_10%,transparent)]"
              >
                <div className="bg-secondary/30 rounded-sm p-5">
                  <PackShot
                    name={cat.image}
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 360px, 80vw"
                    priority={i < 3}
                    alt={cat.imageAlt}
                    className="mx-auto aspect-square w-full max-w-56 object-contain transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="text-sage mt-6 text-[10px] font-bold tracking-[.22em] uppercase">
                  {productsInCategory(cat.slug).length} products
                </span>
                <h3 className="mt-2 font-serif text-2xl">{cat.name}</h3>
                <p
                  lang="te"
                  className="text-ink-soft mt-1 text-sm font-semibold"
                >
                  {cat.teluguName}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {cat.blurb}
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-2 text-xs font-bold">
                  View Products
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* One section per category */}
      {categories.map((cat, i) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className={`px-5 py-16 lg:px-10 lg:py-20 ${i % 2 === 0 ? "bg-card" : ""}`}
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sage mb-3 text-[11px] font-bold tracking-[.24em] uppercase">
                  {String(i + 1).padStart(2, "0")} · {cat.shortName}
                </p>
                <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                  {cat.h1}
                </h2>
                <p
                  lang="te"
                  className="text-ink-soft mt-1.5 font-serif text-xl"
                >
                  {cat.teluguName}
                </p>
                <p className="text-muted-foreground mt-3 leading-7">
                  {cat.intro[0]}
                </p>
                <p lang="te" className="text-muted-foreground mt-2 leading-7">
                  {teluguCategoryIntro(cat.slug)}
                </p>
              </div>
              <Link
                href={`/categories/${cat.slug}`}
                className="border-primary/30 text-primary group inline-flex items-center gap-2 border-b pb-1 text-sm font-bold"
              >
                All {cat.name.toLowerCase()}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ProductGrid items={productsInCategory(cat.slug)} />
          </div>
        </section>
      ))}

      {/* Local service information */}
      <section className="bg-primary text-primary-foreground px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-secondary mb-4 text-[11px] font-bold tracking-[.24em] uppercase">
              Local to Vijayawada
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Buying Natural Foods in Vijayawada
            </h2>
            <div className="text-primary-foreground/75 mt-6 space-y-5 leading-8">
              <p>
                We are based in Vijayawada and supply households and small
                businesses across the city and the wider Andhra Pradesh region.
              </p>
              <p>
                The quickest way to order is WhatsApp. Send the product and the
                pack size, and we will confirm availability, the price for that
                size and how the order will reach you.
              </p>
              <p lang="te">
                ఆర్డర్ చేయడానికి సులభమైన మార్గం WhatsApp. కావలసిన ఉత్పత్తి,
                ప్యాక్ సైజు పంపితే అందుబాటు, ధర, మీకు ఎలా అందుతుందో వెంటనే
                చెబుతాం.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton
                variant="light"
                message={`Hello ${site.name}, I am in Vijayawada and would like to place an enquiry.`}
              >
                Order on WhatsApp
              </WhatsAppButton>
              <a
                href={`tel:${site.phoneE164}`}
                className="border-primary-foreground/40 hover:bg-primary-foreground/10 inline-flex min-h-12 items-center rounded-sm border px-6 text-sm font-bold transition"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>

          <dl className="bg-primary-foreground/20 grid content-start gap-px self-start">
            {[
              [
                "Products",
                "25 products across 6 categories",
                "6 విభాగాల్లో 25 ఉత్పత్తులు",
              ],
              [
                "Pack sizes",
                "250 g / 500 g / 1 kg · 500 ml / 1 L",
                "ప్యాక్ సైజులు",
              ],
              [
                "Enquiries",
                `WhatsApp or call ${site.phoneDisplay}`,
                "WhatsApp లేదా ఫోన్",
              ],
              [
                "Service area",
                `${site.city} and ${site.state}`,
                "విజయవాడ, ఆంధ్రప్రదేశ్",
              ],
            ].map(([k, v, te]) => (
              <div key={k} className="bg-primary p-6">
                <dt className="text-secondary text-[10px] font-bold tracking-[.22em] uppercase">
                  {k}
                </dt>
                <dd className="mt-2 font-serif text-xl">{v}</dd>
                <dd
                  lang="te"
                  className="text-primary-foreground/60 mt-1 text-sm"
                >
                  {te}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <FaqList faqs={homeFaqs} />
        <p className="text-muted-foreground mx-auto mt-10 max-w-3xl text-sm">
          Still have a question?{" "}
          <Link
            href="/contact"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Contact us
          </Link>{" "}
          or read more about{" "}
          <Link
            href="/natural-foods-vijayawada"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            natural food products in Vijayawada
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
