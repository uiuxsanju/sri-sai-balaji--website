import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { ProductGrid } from "@/components/product";
import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, FaqList, JsonLd, WhatsAppButton } from "@/components/ui";
import {
  categories,
  categoryBySlug,
  productsInCategory,
  type CategorySlug,
} from "@/data/products";
import { absoluteUrl, site } from "@/data/site";
import { teluguCategoryIntro } from "@/data/telugu-copy";
import { breadcrumbSchema, faqSchema, seo } from "@/lib/seo";
import { PackShot } from "@/components/pack-shot";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug[slug as CategorySlug];
  if (!category) return {};

  return seo({
    title: category.seoTitle,
    description: category.metaDescription,
    path: `/categories/${category.slug}`,
    image: `/og/${category.image}.jpg`,
    imageAlt: category.imageAlt,
    keywords: [
      `${category.name.toLowerCase()} Vijayawada`,
      `${category.name.toLowerCase()} Andhra Pradesh`,
      "natural food products Vijayawada",
    ],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = categoryBySlug[slug as CategorySlug];
  if (!category) notFound();

  const items = productsInCategory(category.slug);
  const others = categories.filter((c) => c.slug !== category.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: `/categories/${category.slug}` },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(category.faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: category.h1,
            numberOfItems: items.length,
            itemListElement: items.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: absoluteUrl(`/products/${p.slug}`),
            })),
          },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <p className="text-sage mb-4 text-[11px] font-bold tracking-[.24em] uppercase">
              {items.length} products
            </p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              {category.h1}
            </h1>
            <p lang="te" className="text-ink-soft mt-2 font-serif text-2xl">
              {category.teluguName}
            </p>
            <div className="text-muted-foreground mt-6 space-y-5 text-base leading-8">
              {category.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p lang="te" className="border-border border-t pt-5">
                {teluguCategoryIntro(category.slug)}
              </p>
            </div>
            <WhatsAppButton
              className="mt-7"
              message={`Hello ${site.name}, please share the sizes and prices for your ${category.name.toLowerCase()}.`}
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>

          <div className="border-border bg-card rounded-sm border p-8">
            <PackShot
              name={category.image}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 460px, 80vw"
              alt={category.imageAlt}
              priority
              className="mx-auto aspect-square w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-8 font-serif text-2xl sm:text-3xl">
            {category.name} available in {site.city}
          </h2>
          <ProductGrid items={items} priorityCount={2} />
        </div>
      </section>

      <section className="px-5 py-14 lg:px-10 lg:py-20">
        <FaqList faqs={category.faqs} title={`${category.name} — questions`} />
      </section>

      <section className="border-border border-t px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-2xl sm:text-3xl">Other categories</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="border-border bg-card hover:border-primary hover:text-primary group inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-semibold transition"
              >
                {c.h1}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
