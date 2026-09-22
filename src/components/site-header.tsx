"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandMark, WhatsAppButton } from "@/components/ui";
import { categories } from "@/data/products";
import { site } from "@/data/site";

const NAV: { label: string; href: string; secondary?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  {
    label: "Cold Pressed Oils",
    href: "/categories/cold-pressed-oils",
    secondary: true,
  },
  {
    label: "Andhra Pickles",
    href: "/categories/andhra-pickles",
    secondary: true,
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 shadow-[0_8px_30px_color-mix(in_oklab,var(--foreground)_8%,transparent)] backdrop-blur"
            : "bg-background"
        }`}
      >
        <div className="mx-auto grid min-h-20 py-2 lg:h-24 lg:py-0 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:grid-cols-[auto_1fr_auto] lg:px-10">
          <BrandMark />

          <nav
            className="hidden justify-center gap-5 lg:flex xl:gap-6"
            aria-label="Primary"
          >
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-xs font-semibold tracking-[.12em] whitespace-nowrap uppercase transition ${
                    item.secondary ? "hidden xl:inline" : ""
                  } ${
                    active
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phoneE164}`}
              className="text-primary hidden items-center gap-2 text-sm font-semibold sm:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden md:inline">{site.phoneDisplay}</span>
              <span className="sr-only md:hidden">
                Call {site.phoneDisplay}
              </span>
            </a>
            <WhatsAppButton
              message={`Hello ${site.name}, I would like to know more about your natural food products in Vijayawada.`}
              className="!min-h-11 !gap-2 !px-3 text-xs sm:!px-4"
            >
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">Enquire</span>
            </WhatsAppButton>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid size-11 place-items-center rounded-full lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/*
       * The mobile menu is rendered as a sibling of <header>, not inside it. The header
       * gets `backdrop-blur` once the page scrolls, and a backdrop-filter makes an element
       * the containing block for its `position: fixed` children — which trapped the menu
       * inside the 80px header instead of covering the screen.
       */}
      {menuOpen && (
        <div
          className="bg-primary text-primary-foreground fixed inset-0 z-[70] overflow-y-auto p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between">
            <BrandMark light />
            <button
              onClick={() => setMenuOpen(false)}
              className="border-primary-foreground/25 grid size-11 place-items-center rounded-full border"
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          <nav className="mt-12 flex flex-col" aria-label="Mobile">
            <Link
              href="/"
              className="border-primary-foreground/15 border-b py-4 font-serif text-2xl"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="border-primary-foreground/15 border-b py-4 font-serif text-2xl"
            >
              All Products
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="border-primary-foreground/15 flex items-center justify-between border-b py-4 font-serif text-2xl"
              >
                {c.name}
                <ChevronRight className="size-5 opacity-60" />
              </Link>
            ))}
            <Link
              href="/natural-foods-vijayawada"
              className="border-primary-foreground/15 border-b py-4 font-serif text-2xl"
            >
              Vijayawada
            </Link>
            <Link
              href="/about"
              className="border-primary-foreground/15 border-b py-4 font-serif text-2xl"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="border-primary-foreground/15 border-b py-4 font-serif text-2xl"
            >
              Contact
            </Link>
          </nav>

          <WhatsAppButton
            variant="light"
            message={`Hello ${site.name}, I would like to enquire about your natural food products.`}
            className="mt-8 w-full"
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      )}
    </>
  );
}
