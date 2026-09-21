import type { Product } from "@/data/products";
import { productTitle } from "@/data/products";
import { whatsappLink } from "@/data/site";

/**
 * Prefilled WhatsApp order message: product name (English + Telugu), quantity and a
 * short request. Button labels stay English everywhere; the message body mixes Telugu
 * and English, which is how customers here actually write.
 *
 * No pack size is included — sizes are not shown on the site, and the business confirms
 * the pack and price in its reply.
 */
export function orderMessage(product: Product, opts: { quantity?: number } = {}): string {
  const lines = [
    `Product: ${productTitle(product)}`,
    `తెలుగు పేరు: ${product.teluguName}`,
  ];
  if (opts.quantity) lines.push(`Quantity: ${opts.quantity}`);
  lines.push("Message: నాకు ఈ product కావాలి. Please confirm availability and price.");
  return lines.join("\n");
}

export function orderLink(product: Product, opts: { quantity?: number } = {}): string {
  return whatsappLink(orderMessage(product, opts));
}

/** Generic enquiry used by headers, footers and category pages. */
export function enquiryMessage(subject: string): string {
  return [
    `Enquiry: ${subject}`,
    "Message: నాకు వివరాలు కావాలి. Please share availability and price.",
  ].join("\n");
}
