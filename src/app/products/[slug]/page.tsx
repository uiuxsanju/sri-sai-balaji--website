import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";

import { OrderPanel } from "@/components/order-panel";
import { ProductCard, ProductImage } from "@/components/product";
import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, FaqList, JsonLd, WhatsAppButton } from "@/components/ui";
import {
  categoryBySlug,
  productBySlug,
  productTitle,
  products,
  relatedProducts,
} from "@/data/products";
import { absoluteUrl, site } from "@/data/site";
import { breadcrumbSchema, faqSchema, seo } from "@/lib/seo";
import {
  teluguDescription,
  teluguFeatures,
  teluguShort,
} from "@/data/telugu-copy";
import { orderMessage } from "@/lib/whatsapp";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug[slug];
  if (!product) return {};

  return seo({
    title: product.seoTitle,
    description: product.metaDescription,
    path: `/products/${product.slug}`,
    ...(product.image ? { image: `/og/${product.image}.jpg` } : {}),
    imageAlt: product.imageAlt,
    keywords: product.keywords,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = productBySlug[slug];
  if (!product) notFound();

  const category = categoryBySlug[product.category];
  const related = relatedProducts(product);
  const title = productTitle(product);

  const enquiry = orderMessage(product);

  // Pack sizes / weights are not shown anywhere in the product UI.
  const WEIGHT = /\b\d+(\.\d+)?\s?(g|kg|ml|l|litre|liter)s?\b|pack size|sizes?\b/i;
  const teFeatures = teluguFeatures(product);
  const features = product.features
    .map((en, i) => ({ en, te: teFeatures?.[i] }))
    .filter((f) => !WEIGHT.test(f.en));
  const faqs = (product.faqs ?? []).filter(
    (f) => !WEIGHT.test(f.q) && !WEIGHT.test(f.a),
  );

  const crumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: `/categories/${category.slug}` },
    { name: title, path: `/products/${product.slug}` },
  ];

  /**
   * Product schema without `offers`: no verified price exists yet, and publishing an
   * invented price or availability would be false structured data. Add `price` to the
   * product record and this block will carry a real Offer.
   */
  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: product.short,
    sku: product.slug,
    category: category.name,
    brand: { "@type": "Brand", name: site.name },
    url: absoluteUrl(`/products/${product.slug}`),
    ...(product.image
      ? { image: [absoluteUrl(`/products/${product.image}.webp`)] }
      : {}),
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/products/${product.slug}`),
            seller: { "@type": "Organization", name: site.name },
          },
        }
      : {}),
  };

  const schemas: object[] = [productSchema, breadcrumbSchema(crumbs)];
  if (faqs.length) schemas.push(faqSchema(faqs));

  return (
    <PageShell>
      <JsonLd data={schemas} />

      <div className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-5 sm:pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <article className="mx-auto max-w-[1400px] px-4 py-5 sm:px-5 sm:py-8 lg:px-10 lg:py-12">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="border-border bg-card rounded-sm border p-4 sm:p-10">
            <ProductImage
              product={product}
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="mx-auto max-w-md"
            />
          </div>

          <div>
            <Link
              href={`/categories/${category.slug}`}
              className="text-sage hover:text-primary text-[10px] font-bold tracking-[.22em] uppercase transition"
            >
              {category.name}
            </Link>
            <h1 className="mt-2 font-serif text-[28px] leading-tight break-words sm:text-4xl lg:text-5xl">
              {product.h1}
            </h1>
            <p lang="te" className="text-ink-soft mt-1 font-serif text-xl break-words sm:text-2xl">
              {product.teluguName}
            </p>
            <p className="text-muted-foreground mt-3 text-[15px] leading-7 sm:text-base sm:leading-8">
              {product.short}
            </p>
            {teluguShort(product) && (
              <p
                lang="te"
                className="text-muted-foreground mt-2 text-[15px] leading-7 sm:text-base sm:leading-8"
              >
                {teluguShort(product)}
              </p>
            )}

            <OrderPanel product={product} />

            <div className="mt-8">
              <h2 className="text-foreground/70 text-[11px] font-bold tracking-[.2em] uppercase">
                Key features
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f.en} className="flex gap-2.5 text-sm leading-6">
                    <Check
                      className="text-sage mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {f.en}
                      {f.te && (
                        <span lang="te" className="text-muted-foreground block">
                          {f.te}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-border mt-10 grid gap-8 border-t pt-8 sm:mt-14 sm:gap-10 sm:pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">About {title}</h2>
            <div className="text-muted-foreground mt-5 space-y-5 text-base leading-8">
              {product.description.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              {teluguDescription(product) && (
                <p lang="te" className="border-border border-t pt-5">
                  {teluguDescription(product)}
                </p>
              )}
            </div>
          </div>
          <aside className="bg-secondary/35 self-start rounded-sm p-6">
            <h2 className="font-serif text-xl">Ordering in Vijayawada</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {title} is part of our {category.name.toLowerCase()} range,
              supplied from {site.city}, {site.state}. For quantities, combined
              orders or regular supply, send us a message and we will work out
              what suits you.
            </p>
            <p
              lang="te"
              className="text-muted-foreground mt-2 text-sm leading-7"
            >
              ఇది మా {category.teluguName} విభాగంలోనిది, {site.city} నుంచి
              అందిస్తాం. ఎక్కువ పరిమాణం, కలిపి ఆర్డర్, లేదా క్రమం తప్పకుండా
              సరఫరా కావాలంటే మెసేజ్ చేయండి.
            </p>
            <WhatsAppButton message={enquiry} className="mt-5 w-full">
              Order on WhatsApp
            </WhatsAppButton>
          </aside>
        </div>

        {faqs.length ? (
          <div className="border-border mt-10 border-t pt-8 sm:mt-14 sm:pt-12">
            <FaqList faqs={faqs} title={`${title} — questions`} />
          </div>
        ) : null}

        <div className="border-border mt-10 border-t pt-8 sm:mt-14 sm:pt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl">
              You may also like
            </h2>
            <Link
              href={`/categories/${category.slug}`}
              className="text-primary group inline-flex items-center gap-2 text-sm font-bold"
            >
              All {category.name.toLowerCase()}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
