import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found | Sri Sai Balaji Naturals",
  description:
    "That page doesn't exist. Browse our natural food products in Vijayawada instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Image
        src="/products/logo.webp"
        width={120}
        height={109}
        alt=""
        aria-hidden="true"
        className="w-24"
      />
      <p className="text-primary mt-8 font-serif text-6xl">404</p>
      <h1 className="text-foreground mt-3 font-serif text-2xl">
        Page not found
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-7">
        That page doesn&apos;t exist or has moved. You can browse the full range
        of natural food products instead, or message us on WhatsApp at{" "}
        {site.phoneDisplay}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-forest inline-flex min-h-12 items-center rounded-sm px-6 text-sm font-bold transition"
        >
          Go home
        </Link>
        <Link
          href="/products"
          className="border-primary/35 text-primary hover:bg-secondary inline-flex min-h-12 items-center rounded-sm border px-6 text-sm font-bold transition"
        >
          All products
        </Link>
      </div>
    </div>
  );
}
