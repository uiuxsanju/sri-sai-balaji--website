"use client";

import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/product";
import { categories, type Product } from "@/data/products";

const ALL = "All Products";

/**
 * Instant client-side search across English and Telugu product names, combined with a
 * category filter. Matching is case-insensitive and partial in both scripts; the grid
 * updates as the user types, with no page reload.
 */
export function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === ALL || product.category === category;
      if (!matchesCategory) return false;
      if (!search) return true;

      return (
        product.name.toLowerCase().includes(search) ||
        (product.displayName ?? "").toLowerCase().includes(search) ||
        product.teluguName.includes(query.trim()) ||
        product.slug.includes(search)
      );
    });
  }, [products, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        {/* Search bar */}
        <div className="relative w-full max-w-xl">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="border-border bg-card focus:border-primary focus:ring-primary/20 text-foreground placeholder:text-muted-foreground w-full rounded-md border py-3.5 pr-4 pl-11 text-sm shadow-[0_1px_2px_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition outline-none focus:ring-2"
          />
        </div>

        {/* Category filter */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          <button
            onClick={() => setCategory(ALL)}
            aria-pressed={category === ALL}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
              category === ALL
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary hover:text-primary"
            }`}
          >
            {ALL}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              aria-pressed={category === c.slug}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                category === c.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:text-primary"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <h2 className="sr-only">Product results</h2>
      <p
        className="text-muted-foreground mt-6 text-xs font-semibold"
        aria-live="polite"
      >
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-4">
        {filtered.length > 0 ? (
          <ProductGrid items={filtered} priorityCount={4} />
        ) : (
          <div className="border-border bg-card flex flex-col items-center justify-center rounded-sm border px-6 py-20 text-center">
            <SearchX
              className="text-muted-foreground size-8"
              aria-hidden="true"
            />
            <p className="mt-4 font-serif text-2xl">No products found</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Try searching with another product name.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory(ALL);
              }}
              className="border-primary/35 text-primary hover:bg-secondary mt-6 inline-flex min-h-11 items-center rounded-sm border px-5 text-sm font-bold transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
