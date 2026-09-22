"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { flyToBasket } from "@/lib/fly-to-basket";

import { useBasket } from "@/components/basket-context";

import { packSizesFor } from "@/data/pack-sizes";
import { productTitle, type Product } from "@/data/products";
import { site } from "@/data/site";
import { orderLink } from "@/lib/whatsapp";

/**
 * Quantity picker that hands the order straight to WhatsApp with a prefilled message
 * (product, quantity, request). All labels are English; the message body is Telugu +
 * English.
 *
 * No price is shown unless the business has supplied a real one on the product record —
 * the headline falls back to "Price on enquiry" rather than inventing a figure.
 */
export function OrderPanel({ product }: { product: Product }) {
  const sizes = packSizesFor(product.slug);
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState(0);
  const { add } = useBasket();

  // Like Flipkart / Meesho: once added, the button becomes "Go to Basket" until the
  // customer picks a different size or quantity.
  useEffect(() => setAdded(false), [size, quantity]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(0), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const addToBasket = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    add({
      slug: product.slug,
      name: productTitle(product),
      teluguName: product.teluguName,
      size: size ?? "",
      quantity,
      image: product.image,
    });
    setAdded(true);
    setToast((t) => t + 1);
    flyToBasket(btn);
  };

  return (
    <div className="mt-6 sm:mt-8">
      <p className="font-serif text-3xl leading-none sm:text-5xl">
        {product.price
          ? `₹${product.price.toLocaleString("en-IN")}`
          : "Price on enquiry"}
      </p>

      {/* Pack size — only for products with supplied sizes */}
      {sizes.length > 0 && (
        <div className="mt-5">
          <span className="text-muted-foreground text-[11px] font-bold tracking-[.2em] uppercase">
            Pack Size
          </span>
          <div
            className="mt-2.5 flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Pack size"
          >
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={s === size}
                onClick={() => setSize(s)}
                className={`min-h-11 min-w-16 rounded-full border px-4 text-sm font-bold transition ${
                  s === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-5 flex items-center gap-4">
        <span className="text-muted-foreground text-[11px] font-bold tracking-[.2em] uppercase">
          Quantity
        </span>
        <div className="border-border flex items-center rounded-full border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="hover:bg-secondary grid size-12 place-items-center rounded-full transition disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <span
            className="w-9 text-center text-base font-bold"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            className="hover:bg-secondary grid size-12 place-items-center rounded-full transition"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      {/* Actions: full width on phones, inline from sm up */}
      <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
        {added ? (
          <Link
            href="/basket"
            className="bg-primary text-primary-foreground hover:bg-forest inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-7 text-sm font-bold whitespace-nowrap transition sm:w-auto"
          >
            <ShoppingBag className="size-4 shrink-0" aria-hidden="true" />
            Go to Basket
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={addToBasket}
            className="bg-primary text-primary-foreground hover:bg-forest inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-7 text-sm font-bold whitespace-nowrap transition sm:w-auto"
          >
            <ShoppingBag className="size-4 shrink-0" aria-hidden="true" />
            Add to Basket
          </button>
        )}
        <a
          href={orderLink(product, { quantity, size })}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-primary inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-7 text-sm font-bold whitespace-nowrap transition hover:brightness-95 sm:w-auto"
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
          Order on WhatsApp
        </a>
        <a
          href={`tel:${site.phoneE164}`}
          className="border-border text-foreground hover:border-primary hover:text-primary inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border px-7 text-sm font-bold whitespace-nowrap transition sm:w-auto"
        >
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          Call to Order
        </a>
      </div>

      {/* Snackbar, Flipkart-style */}
      <div
        aria-live="polite"
        className={`fixed inset-x-3 bottom-4 z-[60] mx-auto max-w-md transition-all duration-300 sm:bottom-6 ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {toast > 0 && (
          <div className="bg-foreground text-background flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm shadow-2xl">
            <span className="flex min-w-0 items-center gap-2">
              <Check className="text-gold size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {quantity} × {size ? `${size} ` : ""}
                {productTitle(product)} added to basket
              </span>
            </span>
            <Link
              href="/basket"
              className="text-gold shrink-0 text-xs font-bold tracking-wider uppercase"
            >
              View
            </Link>
          </div>
        )}
      </div>

      <p className="text-muted-foreground mt-4 text-sm leading-6">
        Message us on WhatsApp and we will reply with the current price and
        availability.
      </p>
      <p lang="te" className="text-muted-foreground mt-1 text-sm leading-6">
        WhatsApp లో మెసేజ్ చేయండి — ప్రస్తుత ధర, అందుబాటు వెంటనే తెలియజేస్తాం.
      </p>
    </div>
  );
}
