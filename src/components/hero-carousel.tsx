"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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
  cta: { label: string; href: string };
};

/** Slides use only supplied product photography — no stock or generated imagery. */
const slides: Slide[] = [
  {
    image: "forest-honey",
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

      <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:py-16 lg:px-10 lg:py-20">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={`grid items-center gap-8 transition-opacity duration-300 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 ${
              i === index
                ? "opacity-100"
                : "pointer-events-none absolute inset-0 -z-10 opacity-0"
            }`}
          >
            <div className={i === index ? "reveal" : ""}>
              <div className="mb-5 flex items-center gap-3">
                <span className="bg-gold h-px w-10" />
                <span className="text-secondary text-[11px] font-bold tracking-[.24em] uppercase">
                  {slide.eyebrow}
                </span>
              </div>

              {i === 0 ? (
                <h1 className="max-w-xl font-serif text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-6xl">
                  {slide.heading}{" "}
                  <em className="text-secondary font-medium">
                    {slide.emphasis}
                  </em>
                </h1>
              ) : (
                <p
                  role="heading"
                  aria-level={2}
                  className="max-w-xl font-serif text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-6xl"
                >
                  {slide.heading}{" "}
                  <em className="text-secondary font-medium">
                    {slide.emphasis}
                  </em>
                </p>
              )}

              <p className="text-primary-foreground/80 mt-6 max-w-lg text-base leading-8">
                {slide.copy}
              </p>
              <p
                lang="te"
                className="text-primary-foreground/70 mt-2 max-w-lg text-base leading-8"
              >
                {slide.teluguCopy}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="order-first lg:order-none">
              <div className="bg-primary-foreground/10 mx-auto max-w-sm rounded-sm p-6 lg:max-w-md lg:p-10">
                <PackShot
                  name={slide.image}
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 420px, 300px"
                  alt={slide.alt}
                  priority
                  fallback={<div className="aspect-square w-full" aria-hidden="true" />}
                  className="aspect-square w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,.28)]"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-10 flex items-center justify-between gap-4">
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
