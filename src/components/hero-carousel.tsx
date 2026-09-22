"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  ScrollText,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/** Only claims printed on the brand's own packaging. */
const BADGES = [
  { icon: Leaf, label: "No Preservatives" },
  { icon: ScrollText, label: "Traditional Recipe" },
  { icon: Heart, label: "100% Natural" },
];

import { WhatsAppButton } from "@/components/ui";
import { site } from "@/data/site";
import { PackShot } from "@/components/pack-shot";

/** Autoplay interval in milliseconds. Change this one number to speed up or slow down. */
const SLIDE_INTERVAL_MS = 3000;

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  heading: string;
  emphasis: string;
  copy: string;
  teluguCopy: string;
  /** Short line shown under the heading on phones. */
  tagline: string;
  cta: { label: string; href: string };
};

/** Slides use only supplied product photography — no stock or generated imagery. */
const slides: Slide[] = [
  {
    image: "forest-honey",
    tagline: "Pure Foods from Andhra Kitchens",
    alt: "Forest honey jar from Sri Sai Balaji Naturals in Vijayawada",
    eyebrow: "Vijayawada · Andhra Pradesh",
    heading: "Natural & Traditional Foods in",
    emphasis: "Vijayawada",
    copy: "Quality food products including cold pressed oils, spices, flours, dry fruits, honey, ghee and Andhra pickles.",
    teluguCopy:
      "గానుగ నూనెలు, మసాలా పొడులు, చిరుధాన్యాల పిండులు, ఎండు పండ్లు, అటవీ తేనె, గేదె నెయ్యి, ఆంధ్రా పచ్చళ్ళు.",
    cta: { label: "Explore Products", href: "/products" },
  },
  {
    image: "cold-pressed-groundnut-oil",
    tagline: "Slow Pressed in Small Batches",
    alt: "Cold pressed groundnut oil bottle from Sri Sai Balaji Naturals",
    eyebrow: "Wood Pressed",
    heading: "Cold Pressed Oils for",
    emphasis: "Everyday Cooking",
    copy: "Groundnut, coconut, white sesame and black sesame oils, pressed slowly and packed in glass.",
    teluguCopy:
      "వేరుశెనగ, కొబ్బరి, తెల్ల నువ్వులు, నల్ల నువ్వుల నూనెలు — నెమ్మదిగా ఆడించి గాజు సీసాల్లో ప్యాక్ చేసినవి.",
    cta: { label: "View Oils", href: "/categories/cold-pressed-oils" },
  },
  {
    image: "veg-pickle",
    tagline: "Homemade Taste in Every Bite",
    alt: "Traditional Andhra veg pickle jar from Sri Sai Balaji Naturals",
    eyebrow: "Home Recipes",
    heading: "Authentic",
    emphasis: "Andhra Pickles",
    copy: "Veg, chicken, prawns and mutton pickles made in small batches with freshly ground masala.",
    teluguCopy:
      "కూరగాయల, చికెన్, రొయ్యల, మటన్ పచ్చళ్ళు — తాజాగా రుబ్బిన మసాలాతో చిన్న బ్యాచ్‌లలో తయారీ.",
    cta: { label: "Explore Pickles", href: "/categories/andhra-pickles" },
  },
  {
    image: "ragi-flour",
    tagline: "Milled Fresh in Small Batches",
    alt: "Natural ragi flour packet from Sri Sai Balaji Naturals",
    eyebrow: "Millets & Staples",
    heading: "Natural Foods &",
    emphasis: "Traditional Ingredients",
    copy: "Ragi, jonna and sajalu flours and rawa, forest honey, buffalo ghee, dry fruits and spice powders.",
    teluguCopy:
      "రాగి, జొన్న, సజ్జల పిండులు, రవ్వలు, అటవీ తేనె, గేదె నెయ్యి, ఎండు పండ్లు, మసాలా పొడులు.",
    cta: { label: "Shop Products", href: "/products" },
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="bg-primary text-primary-foreground relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="organic-grain absolute inset-0 opacity-[.35]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-6 sm:py-14 lg:px-10 lg:py-20">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={`grid grid-cols-[1.15fr_1fr] items-center gap-3 transition-opacity duration-300 sm:gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 ${
              i === index
                ? "opacity-100"
                : "pointer-events-none absolute inset-0 -z-10 opacity-0"
            }`}
          >
            <div className={i === index ? "reveal" : ""}>
              <div className="mb-3 flex items-center gap-3 lg:mb-5">
                <span className="bg-gold hidden h-px w-10 lg:block" />
                <span className="text-secondary text-[9px] leading-relaxed font-bold tracking-[.2em] uppercase sm:text-[11px] sm:tracking-[.24em]">
                  {slide.eyebrow}
                </span>
              </div>

              {i === 0 ? (
                <h1 className="max-w-xl font-serif text-[1.55rem] leading-[1.08] min-[390px]:text-[1.8rem] sm:text-5xl lg:text-6xl">
                  {slide.heading}{" "}
                  <em className="text-secondary font-medium">
                    {slide.emphasis}
                  </em>
                </h1>
              ) : (
                <p
                  role="heading"
                  aria-level={2}
                  className="max-w-xl font-serif text-[1.55rem] leading-[1.08] min-[390px]:text-[1.8rem] sm:text-5xl lg:text-6xl"
                >
                  {slide.heading}{" "}
                  <em className="text-secondary font-medium">
                    {slide.emphasis}
                  </em>
                </p>
              )}

              <p className="text-primary-foreground/90 mt-3 font-serif text-[15px] leading-snug lg:hidden">
                {slide.tagline}
              </p>

              <p className="text-primary-foreground/80 mt-4 hidden max-w-lg text-[15px] leading-7 sm:mt-6 sm:text-base sm:leading-8 lg:block">
                {slide.copy}
              </p>
              <p
                lang="te"
                className="text-primary-foreground/70 mt-2 hidden max-w-lg text-base leading-8 lg:block"
              >
                {slide.teluguCopy}
              </p>

              <div className="mt-6 hidden flex-wrap gap-3 sm:mt-8 lg:flex">
                <Link
                  href={slide.cta.href}
                  className="bg-primary-foreground text-primary hover:bg-secondary group inline-flex min-h-12 items-center gap-3 rounded-sm px-6 text-sm font-bold transition"
                >
                  {slide.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <WhatsAppButton
                  variant="outline"
                  className="!border-primary-foreground/45 !text-primary-foreground hover:!bg-primary-foreground/10"
                  message={`Hello ${site.name}, I would like to enquire about your natural food products in Vijayawada.`}
                >
                  Order on WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            <div>
              <div className="lg:bg-primary-foreground/10 mx-auto flex w-full max-w-sm items-center justify-center rounded-sm lg:max-w-md lg:p-10">
                <PackShot
                  name={slide.image}
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 420px, 300px"
                  alt={slide.alt}
                  priority
                  fallback={
                    <div className="aspect-square w-full" aria-hidden="true" />
                  }
                  className="aspect-square mx-auto h-auto w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,.28)]"
                />
              </div>
            </div>

            {/* Phones: trust badges + gold CTA under the heading and image */}
            <div className="col-span-2 lg:hidden">
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="bg-gold/50 h-px flex-1" />
                <Leaf className="text-gold size-4" />
                <span className="bg-gold/50 h-px flex-1" />
              </div>
              <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
                {BADGES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="border-gold/70 text-secondary grid size-10 place-items-center rounded-full border">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-primary-foreground/85 text-[11px] leading-tight">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={slide.cta.href}
                className="text-primary mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-[linear-gradient(180deg,#f7dfa0,#e2b75c)] px-7 text-sm font-bold shadow-[0_8px_20px_rgba(0,0,0,.25)]"
              >
                {slide.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}

        <div className="mt-6 flex items-center justify-between gap-4 sm:mt-10">
          <div className="flex gap-2" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.image}
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "bg-secondary w-9"
                    : "bg-primary-foreground/30 w-4"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(index - 1)}
              className="border-primary-foreground/30 hover:bg-primary-foreground/10 grid size-11 place-items-center rounded-full border transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              className="border-primary-foreground/30 hover:bg-primary-foreground/10 grid size-11 place-items-center rounded-full border transition"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
