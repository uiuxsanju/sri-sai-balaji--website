import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PackShot } from "@/components/pack-shot";
import { categoryBySlug, productTitle, type Product } from "@/data/products";

/**
 * Clean square placeholder used when a product has no photo yet, or when its photo
 * fails to load. Shows the brand mark and product name — never a broken-image icon or
 * raw alt text.
 */
export function ImagePlaceholder({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={productTitle(product)}
      className={`bg-secondary/35 flex aspect-square w-full flex-col items-center justify-center gap-2 p-6 text-center ${className}`}
    >
      <Image
        src="/products/logo.webp"
        width={96}
        height={88}
        alt=""
        aria-hidden="true"
        className="w-16 opacity-50 sm:w-20"
      />
      <p className="text-primary/70 font-serif text-base leading-tight sm:text-lg">
        {productTitle(product)}
      </p>
    </div>
  );
}

/**
 * Product image in a fixed 1:1 box with `object-contain`, so packs are never stretched
 * or cropped and the box never shifts while loading.
 */
export function ProductImage({
  product,
  priority = false,
  sizes = "(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 90vw",
  className = "",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const placeholder = <ImagePlaceholder product={product} className={className} />;
  if (!product.image) return placeholder;

  return (
    <PackShot
      name={product.image}
      width={800}
      height={800}
      sizes={sizes}
      alt={product.imageAlt}
      priority={priority}
      fallback={placeholder}
      className={`aspect-square w-full object-contain ${className}`}
    />
  );
}

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const category = categoryBySlug[product.category];

  return (
    <article className="group h-full min-w-0">
      <Link
        href={`/products/${product.slug}`}
        className="border-border bg-card hover:border-primary/40 flex h-full flex-col rounded-sm border p-3 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_color-mix(in_oklab,var(--foreground)_10%,transparent)] sm:p-5"
      >
        <div className="bg-secondary/25 overflow-hidden rounded-sm p-3 sm:p-4">
          <ProductImage
            product={product}
            priority={priority}
            className="transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col px-1 pt-4 sm:px-0 sm:pt-5">
          <p className="text-sage text-[10px] font-bold tracking-[.2em] uppercase">
            {category.name}
          </p>
          <h3 className="mt-1.5 font-serif text-xl leading-snug break-words sm:text-2xl">
            {productTitle(product)}
          </h3>
          <p lang="te" className="text-ink-soft mt-0.5 text-sm font-semibold break-words">
            {product.teluguName}
          </p>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
            {product.short}
          </p>
          <span className="text-primary mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-xs font-bold">
            View Details
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({
  items,
  priorityCount = 0,
}: {
  items: Product[];
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
