"use client";

import Link from "next/link";
import {
  Check,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const { add } = useBasket();

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 4000);
    return () => clearTimeout(t);
  }, [added]);

  const addToBasket = () => {
    add({
      slug: product.slug,
      name: productTitle(product),
      teluguName: product.teluguName,
      size: size ?? "",
      quantity,
      image: product.image,
    });
    setAdded(true);
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
        <button
          type="button"
          onClick={addToBasket}
          className="bg-primary text-primary-foreground hover:bg-forest inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-7 text-sm font-bold whitespace-nowrap transition sm:w-auto"
        >
          {added ? (
            <Check className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <ShoppingBag className="size-4 shrink-0" aria-hidden="true" />
          )}
          {added ? "Added to Basket" : "Add to Basket"}
        </button>
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

      <p aria-live="polite" className="min-h-0 text-sm">
        {added && (
          <span className="bg-sage/10 text-foreground mt-3 flex flex-wrap items-center justify-between gap-2 rounded-sm px-4 py-3">
            <span>
              {quantity} × {size ? `${size} ` : ""}
              {productTitle(product)} added.
            </span>
            <Link
              href="/basket"
              className="text-primary font-bold underline underline-offset-4"
            >
              View Basket
            </Link>
          </span>
        )}
      </p>

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
