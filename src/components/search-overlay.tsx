"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { PackShot } from "@/components/pack-shot";
import { productTitle, products } from "@/data/products";
import { searchProducts } from "@/lib/search";

const POPULAR = ["Groundnut Oil", "Pickle", "Honey", "Ghee", "Ragi", "కారం"];

/**
 * Full-screen search, opened from the header. Results appear as the visitor types, in
 * English or Telugu. Enter opens the products page filtered by the same query.
 */
export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => searchProducts(products, query), [query]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    onClose();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      className="bg-foreground/40 fixed inset-0 z-[75] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background mx-auto flex max-h-[100dvh] w-full max-w-2xl flex-col shadow-2xl sm:mt-16 sm:max-h-[80vh] sm:rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={submit}
          className="border-border flex items-center gap-2 border-b p-3 sm:p-4"
        >
          <Search
            className="text-muted-foreground ml-1 size-5 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search oils, pickles, honey… / నూనె, పచ్చడి"
            aria-label="Search products"
            className="text-foreground placeholder:text-muted-foreground min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="hover:bg-secondary grid size-11 shrink-0 place-items-center rounded-full transition"
          >
            <X className="size-5" />
          </button>
        </form>

        <div className="overflow-y-auto p-3 sm:p-4">
          {!query.trim() ? (
            <div>
              <p className="text-muted-foreground text-[11px] font-bold tracking-[.2em] uppercase">
                Popular searches
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setQuery(p)}
                    className="border-border hover:border-primary hover:text-primary min-h-10 rounded-full border px-4 text-sm font-semibold transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center">
              <SearchX
                className="text-muted-foreground mx-auto size-8"
                aria-hidden="true"
              />
              <p className="mt-3 font-serif text-xl">No products found</p>
              <p lang="te" className="text-muted-foreground mt-1 text-sm">
                ఉత్పత్తులు ఏవీ దొరకలేదు
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-2 text-xs">
                {results.length} {results.length === 1 ? "product" : "products"}
              </p>
              <ul className="divide-border divide-y">
                {results.slice(0, 8).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="hover:bg-secondary/40 flex items-center gap-3 rounded-sm px-1 py-2.5 transition"
                    >
                      <span className="bg-secondary/30 grid size-14 shrink-0 place-items-center rounded-sm p-1">
                        {p.image ? (
                          <PackShot
                            name={p.image}
                            alt=""
                            sizes="56px"
                            width={56}
                            height={56}
                            className="size-full object-contain"
                          />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-serif text-base">
                          {productTitle(p)}
                        </span>
                        <span
                          lang="te"
                          className="text-muted-foreground block truncate text-sm"
                        >
                          {p.teluguName}
                        </span>
                      </span>
                      <ArrowRight
                        className="text-muted-foreground size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > 8 && (
                <button
                  type="submit"
                  onClick={submit}
                  className="text-primary mt-3 min-h-11 text-sm font-bold"
                >
                  View all {results.length} results
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
