import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { categories, productsInCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbSchema, seo } from "@/lib/seo";
import { PackShot } from "@/components/pack-shot";

export const metadata = seo({
  title: "Product Categories | Natural Foods in Vijayawada",
  description:
    "Six categories of natural food products in Vijayawada: cold pressed oils, spices and powders, flours and rawa, natural foods, dry fruits and nuts, and Andhra pickles.",
  path: "/categories",
  keywords: [
    "natural food categories Vijayawada",
    "organic products Vijayawada",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
];

export default function CategoriesPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Product Categories
          </h1>
          <p className="text-muted-foreground mt-5 text-base leading-8">
            Our range is organised into six categories covering everyday cooking
            in {site.city} and across {site.state}.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="border-border bg-card hover:border-primary/40 group flex flex-col rounded-sm border p-6 transition hover:-translate-y-0.5"
            >
              <div className="bg-secondary/30 rounded-sm p-5">
                <PackShot
                  name={cat.image}
                  width={400}
                  height={400}
                  sizes="(min-width: 1024px) 360px, 80vw"
                  priority={i < 3}
                  alt={cat.imageAlt}
                  className="mx-auto aspect-square w-full max-w-56 object-contain"
                />
              </div>
              <span className="text-sage mt-6 text-[10px] font-bold tracking-[.22em] uppercase">
                {productsInCategory(cat.slug).length} products
              </span>
              <h2 className="mt-2 font-serif text-2xl">{cat.h1}</h2>
              <p lang="te" className="text-ink-soft mt-1 text-sm font-semibold">
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
      </section>
    </PageShell>
  );
}
