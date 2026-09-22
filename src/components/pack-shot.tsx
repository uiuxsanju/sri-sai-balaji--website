"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Product pack shot served straight from /public with a hand-built srcset.
 *
 * Each image exists as a transparent WebP at 400, 800 and 1200px (`name-400.webp`,
 * `name-800.webp`, `name.webp`), so there is nothing for an on-the-fly optimiser to do.
 *
 * If the file is missing or fails to load, the `fallback` is rendered in its place, so a
 * visitor never sees a broken-image icon or raw alt text. That also makes it safe to drop
 * new photos into /public/products later: until they exist, the placeholder shows.
 */
export function PackShot({
  name,
  alt,
  sizes,
  priority = false,
  width = 800,
  height = 800,
  className = "",
  fallback = null,
}: {
  /** Basename in /public/products, without size suffix or extension */
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates, in which case onError never fires.
  // Check once on mount so the fallback still replaces it.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    <img
      ref={ref}
      src={`/products/${name}-800.webp`}
      srcSet={`/products/${name}-400.webp 400w, /products/${name}-800.webp 800w, /products/${name}.webp 1200w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
      className={className}
      style={{ color: "transparent" }}
    />
  );
}
