import type { Product } from "@/data/products";
import { productTitle } from "@/data/products";
import { whatsappLink } from "@/data/site";

/**
 * Prefilled WhatsApp order message: product name (English + Telugu), quantity and a
 * short request. Button labels stay English everywhere; the message body mixes Telugu
 * and English, which is how customers here actually write.
 *
 * The pack size is included when the product has selectable sizes (see pack-sizes.ts).
 */
export function orderMessage(
  product: Product,
  opts: { quantity?: number; size?: string } = {},
): string {
  const lines = [
    `Product: ${productTitle(product)}`,
    `తెలుగు పేరు: ${product.teluguName}`,
  ];
  if (opts.size) lines.push(`Pack size: ${opts.size}`);
  if (opts.quantity) lines.push(`Quantity: ${opts.quantity}`);
  lines.push(
    "Message: నాకు ఈ product కావాలి. Please confirm availability and price.",
  );
  return lines.join("\n");
}

export function orderLink(
  product: Product,
  opts: { quantity?: number; size?: string } = {},
): string {
  return whatsappLink(orderMessage(product, opts));
}

/** Generic enquiry used by headers, footers and category pages. */
export function enquiryMessage(subject: string): string {
  return [
    `Enquiry: ${subject}`,
    "Message: నాకు వివరాలు కావాలి. Please share availability and price.",
  ].join("\n");
}

export type BasketOrderLine = {
  name: string;
  teluguName: string;
  size: string;
  quantity: number;
};

/**
 * Prefilled WhatsApp message for a whole basket. Prices are deliberately absent — the
 * business confirms them in the reply.
 */
export function basketMessage(lines: BasketOrderLine[]): string {
  const items = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.name} (${l.teluguName})${l.size ? ` — ${l.size}` : ""} × ${l.quantity}`,
    )
    .join("\n");

  return [
    "Order request:",
    items,
    "",
    "Message: నాకు ఈ products కావాలి. Please confirm availability, price and delivery.",
  ].join("\n");
}

export function basketLink(lines: BasketOrderLine[]): string {
  return whatsappLink(basketMessage(lines));
}
