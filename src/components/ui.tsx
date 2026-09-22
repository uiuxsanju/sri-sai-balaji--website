import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { site, whatsappLink } from "@/data/site";
import { teluguFaqAnswer } from "@/data/telugu-copy";
import type { Crumb } from "@/lib/seo";

/** Renders a JSON-LD block. Objects only — never user input. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex min-w-0 items-center gap-2.5 sm:gap-3.5 ${light ? "text-primary-foreground" : "text-primary"}`}
      aria-label={`${site.name} home`}
    >
      <Image
        src="/products/logo.webp"
        width={160}
        height={146}
        alt=""
        aria-hidden="true"
        priority
        className="h-14 w-auto shrink-0 sm:h-16 lg:h-20"
      />
      <span className="min-w-0 leading-none">
        <strong className="block font-serif text-[15px] whitespace-nowrap min-[375px]:text-base sm:text-xl lg:text-2xl">
          Sri Sai Balaji
        </strong>
        <small className="mt-1 block text-[9px] font-semibold tracking-[.26em] uppercase sm:text-[10px]">
          Naturals
        </small>
        <span
          lang="te"
          className={`mt-1 block max-w-[9.5rem] text-[10px] leading-snug font-medium sm:mt-1.5 sm:max-w-none sm:text-xs sm:whitespace-nowrap ${light ? "text-primary-foreground/75" : "text-ink-soft"}`}        >
          {site.teluguTagline}
        </span>
      </span>
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`mx-auto mb-12 max-w-2xl text-center ${light ? "text-primary-foreground" : ""}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 text-[11px] font-bold tracking-[.24em] uppercase ${light ? "text-secondary" : "text-sage"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy && (
        <p
          className={`mx-auto mt-5 max-w-xl leading-7 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function WhatsAppButton({
  message,
  children,
  variant = "solid",
  className = "",
}: {
  message: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
}) {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-forest",
    light: "bg-primary-foreground text-primary hover:bg-secondary",
    outline: "border border-primary/35 text-primary hover:bg-secondary",
  }[variant];

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-6 text-sm font-bold transition ${styles} ${className}`}
    >
      <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </a>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className="text-foreground font-semibold"
                >
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-primary transition">
                    {c.name}
                  </Link>
                  <ChevronRight
                    className="size-3 opacity-50"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FaqList({
  faqs,
  title = "Frequently Asked Questions",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
      <dl className="border-border divide-border mt-8 divide-y border-y">
        {faqs.map((f) => {
          const te = teluguFaqAnswer(f.q);
          return (
            <div key={f.q} className="py-6">
              <dt className="font-serif text-xl leading-snug">{f.q}</dt>
              <dd className="text-muted-foreground mt-2 text-sm leading-7">
                {f.a}
              </dd>
              {te && (
                <dd
                  lang="te"
                  className="text-muted-foreground mt-1.5 text-sm leading-7"
                >
                  {te}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
