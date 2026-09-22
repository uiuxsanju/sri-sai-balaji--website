import { BasketClient } from "@/app/basket/basket-client";
import { PageShell } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/ui";
import { seo } from "@/lib/seo";

/**
 * The basket is a WhatsApp order list, not a checkout — no payment is taken on the site,
 * so the page is kept out of the index.
 */
export const metadata = {
  ...seo({
    title: "Your Basket | Sri Sai Balaji Naturals",
    description:
      "Review the products in your basket and send the order on WhatsApp.",
    path: "/basket",
  }),
  robots: { index: false, follow: true },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Basket", path: "/basket" },
];

export default function BasketPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Your Basket
        </h1>
        <p lang="te" className="text-ink-soft mt-2 font-serif text-2xl">
          మీ బాస్కెట్
        </p>

        <div className="mt-10">
          <BasketClient />
        </div>
      </section>
    </PageShell>
  );
}
