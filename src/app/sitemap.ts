import type { MetadataRoute } from "next";

import { categories, products } from "@/data/products";
import { absoluteUrl } from "@/data/site";

/**
 * Generated from the catalogue, so the sitemap can never drift from the routes that
 * actually exist. Admin, API and query-string URLs are excluded by construction.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/natural-foods-vijayawada"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/categories"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...categories.map((c) => ({
      url: absoluteUrl(`/categories/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
