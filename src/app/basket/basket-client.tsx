"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useBasket } from "@/components/basket-context";
import { site } from "@/data/site";
import { basketLink } from "@/lib/whatsapp";
import { PackShot } from "@/components/pack-shot";

export function BasketClient() {
  const { lines, count, setQuantity, remove, clear, ready } = useBasket();

  if (!ready) {
    return (
      <div
        className="bg-card h-64 animate-pulse rounded-sm"
        aria-hidden="true"
      />
    );
  }

  if (lines.length === 0) {
    return (
      <div className="border-border bg-card flex flex-col items-center justify-center rounded-sm border px-6 py-20 text-center">
        <ShoppingBag
          className="text-muted-foreground size-8"
          aria-hidden="true"
        />
        <p className="mt-4 font-serif text-2xl">Your basket is empty</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Add the products you want and send the whole list on WhatsApp.
        </p>
        <p lang="te" className="text-muted-foreground mt-1.5 text-sm">
          కావలసిన ఉత్పత్తులు చేర్చి, మొత్తం లిస్ట్ WhatsApp లో పంపండి.
        </p>
        <Link
          href="/products"
          className="bg-primary text-primary-foreground hover:bg-forest mt-7 inline-flex min-h-12 items-center rounded-full px-7 text-sm font-bold transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
      {/* Lines */}
      <ul className="border-border divide-border divide-y border-y">
        {lines.map((l) => (
          <li
            key={`${l.slug}-${l.size}`}
            className="flex flex-wrap items-center gap-4 py-5"
          >
            <div className="bg-secondary/25 size-20 shrink-0 rounded-sm p-2">
              {l.image ? (
                <PackShot
                  name={l.image}
                  sizes="80px"
                  width={80}
                  height={80}
                  alt=""
                  className="size-full object-contain"
                />
              ) : (
                <Image
                  src="/products/logo.webp"
                  width={80}
                  height={80}
                  alt=""
                  className="size-full object-contain opacity-60"
                />
              )}
            </div>

            <div className="min-w-[8rem] flex-1">
              <Link
                href={`/products/${l.slug}`}
                className="hover:text-primary font-serif text-lg transition"
              >
                {l.name}
              </Link>
              <p lang="te" className="text-muted-foreground text-sm">
                {l.teluguName}
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-semibold">
                {l.size}
              </p>
            </div>

            <div className="border-border flex items-center rounded-full border">
              <button
                onClick={() => setQuantity(l.slug, l.size, l.quantity - 1)}
                aria-label={`Decrease quantity of ${l.name}`}
                className="hover:bg-secondary grid size-10 place-items-center rounded-full transition"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold">
                {l.quantity}
              </span>
              <button
                onClick={() => setQuantity(l.slug, l.size, l.quantity + 1)}
                aria-label={`Increase quantity of ${l.name}`}
                className="hover:bg-secondary grid size-10 place-items-center rounded-full transition"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              onClick={() => remove(l.slug, l.size)}
              className="text-muted-foreground hover:text-destructive inline-flex min-h-10 items-center gap-1.5 text-xs font-bold transition"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <aside className="bg-secondary/35 self-start rounded-sm p-7">
        <h2 className="font-serif text-2xl">Order summary</h2>
        <dl className="border-border mt-5 space-y-2 border-b pb-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Products</dt>
            <dd className="font-semibold">{lines.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Total items</dt>
            <dd className="font-semibold">{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Total</dt>
            <dd className="font-semibold">On enquiry</dd>
          </div>
        </dl>

        <p className="text-muted-foreground mt-5 text-sm leading-7">
          Send this list on WhatsApp and we will reply with the price for each
          pack and how the order reaches you. No payment is taken on the
          website.
        </p>
        <p lang="te" className="text-muted-foreground mt-2 text-sm leading-7">
          ఈ లిస్ట్ WhatsApp లో పంపండి — ప్రతి ప్యాక్ ధర, ఆర్డర్ ఎలా అందుతుందో
          చెబుతాం.
        </p>

        <a
          href={basketLink(lines)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-primary hover:brightness-95 mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-sm font-bold transition"
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
          Place Order on WhatsApp
        </a>

        <a
          href={`tel:${site.phoneE164}`}
          className="border-border text-foreground hover:border-primary hover:text-primary mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border px-6 text-sm font-bold transition"
        >
          Call {site.phoneDisplay}
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/products"
            className="text-primary group inline-flex items-center gap-2 text-sm font-bold"
          >
            Continue Shopping
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            onClick={clear}
            className="text-muted-foreground hover:text-destructive text-xs font-bold transition"
          >
            Clear Basket
          </button>
        </div>
      </aside>
    </div>
  );
}
