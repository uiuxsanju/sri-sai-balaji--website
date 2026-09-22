"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Product pack shot served straight from /public with a hand-built srcset
 * (`name-400.webp`, `name-800.webp`, `name.webp` at 1200px).
 *
 * Slow mobile networks can drop an image request. Instead of giving up on the first
 * error, the image retries a few times (with a short delay) before the `fallback` is
 * shown. Alt text is never painted on screen, so a visitor never sees raw alt text or a
 * broken-image icon while the photo is still arriving.
 */
const MAX_RETRIES = 3;

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
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const handleError = () => {
    if (attempt < MAX_RETRIES) {
      setTimeout(() => setAttempt((a) => a + 1), 1200 * (attempt + 1));
    } else {
      setFailed(true);
    }
  };

  // An image can fail before React hydrates, in which case onError never fires.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) return <>{fallback}</>;

  // Cache-busting query only on retries, so the first request stays cacheable.
  const q = attempt ? `?r=${attempt}` : "";

  return (
    <img
      key={attempt}
      ref={ref}
      src={`/products/${name}-800.webp${q}`}
      srcSet={`/products/${name}-400.webp${q} 400w, /products/${name}-800.webp${q} 800w, /products/${name}.webp${q} 1200w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={handleError}
      className={className}
      style={{ color: "transparent" }}
    />
  );
}
