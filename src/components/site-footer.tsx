import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/ui";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-primary-foreground/15 bg-primary text-primary-foreground border-t px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-primary-foreground/15 grid gap-12 border-b pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandMark light />
            <p className="text-primary-foreground/60 mt-6 max-w-xs text-sm leading-7">
              Natural and traditional food products from Vijayawada — cold
              pressed oils, spices, flours and rawa, forest honey, buffalo ghee,
              dry fruits and Andhra pickles.
            </p>
            <p
              lang="te"
              className="text-primary-foreground/70 mt-4 text-sm leading-7"
            >
              విజయవాడ నుంచి సహజ, సాంప్రదాయ ఆహార ఉత్పత్తులు — గానుగ నూనెలు,
              మసాలాలు, పిండులు, రవ్వలు, అటవీ తేనె, గేదె నెయ్యి, ఎండు పండ్లు,
              ఆంధ్రా పచ్చళ్ళు.
            </p>
            <p lang="te" className="text-primary-foreground/70 mt-3 text-xs">
              {site.teluguTagline}
            </p>
          </div>

          <div>
            <h2 className="text-secondary text-xs font-bold tracking-[.2em] uppercase">
              Product Categories
            </h2>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-primary-foreground/65 hover:text-primary-foreground text-sm transition"
                  >
                    {c.name} in Vijayawada
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-secondary text-xs font-bold tracking-[.2em] uppercase">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                { label: "All Products", href: "/products" },
                { label: "Vijayawada", href: "/natural-foods-vijayawada" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-primary-foreground/65 hover:text-primary-foreground text-sm transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-secondary text-xs font-bold tracking-[.2em] uppercase">
              Contact
            </h2>
            <ul className="text-primary-foreground/65 mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="hover:text-primary-foreground"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(
                    `Hello ${site.name}, I would like to enquire about your products.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground"
                >
                  WhatsApp enquiry
                </a>
              </li>
              <li>
                {site.city}, {site.state}
              </li>
            </ul>
          </div>
        </div>

        <div className="text-primary-foreground/70 flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>
            {site.city} · {site.state}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
