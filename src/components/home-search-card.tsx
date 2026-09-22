"use client";

import { Search } from "lucide-react";

import { products } from "@/data/products";

/** Home-page search card for phones. Opens the same search screen as the header. */
export function HomeSearchCard() {
  return (
    <div className="border-border bg-card rounded-xl border p-4 shadow-[0_6px_24px_color-mix(in_oklab,var(--foreground)_8%,transparent)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 className="font-serif text-xl leading-tight">
          Find Your Favorite Product
        </h2>
        <p className="text-muted-foreground text-xs">
          Search {products.length} Natural Products
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("open-product-search"))}
        className="border-primary/25 bg-background text-muted-foreground hover:border-primary/50 mt-3 flex h-12 w-full items-center gap-3 rounded-lg border px-4 text-left text-sm transition"
      >
        <Search
          className="text-primary size-[18px] shrink-0"
          aria-hidden="true"
        />
        <span className="min-w-0 truncate">
          Search products… / <span lang="te">ఉత్పత్తులు వెతకండి</span>
        </span>
      </button>
    </div>
  );
}
