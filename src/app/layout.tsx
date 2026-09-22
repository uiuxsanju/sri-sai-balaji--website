import type { Metadata, Viewport } from "next";
import { BasketProvider } from "@/components/basket-context";

import { site, SITE_URL } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Individual pages override these through their own `metadata` / `generateMetadata`.
  title: {
    default: "Organic & Natural Foods in Vijayawada | Sri Sai Balaji Naturals",
    template: "%s",
  },
  description:
    "Natural food products in Vijayawada — cold pressed oils, spices, flours, dry fruits, honey, buffalo ghee and Andhra pickles.",
  applicationName: site.name,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f0e1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        {/*
         * Fonts are loaded from Google Fonts with preconnect + display=swap.
         * If you prefer `next/font` (self-hosted, no render-blocking request), swap this
         * for a next/font/google import — it downloads the files at build time, so the
         * build machine needs network access to fonts.googleapis.com.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* This is the App Router root layout, so the stylesheet applies to every page —
            the rule below only matters for the pages/ directory. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <BasketProvider>{children}</BasketProvider>
      </body>
    </html>
  );
}
