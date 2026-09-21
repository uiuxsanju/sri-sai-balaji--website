import { ProductSearch } from "@/components/product-search";
import { PageShell } from "@/components/site-footer";
import { Breadcrumbs, JsonLd, WhatsAppButton } from "@/components/ui";
import { products } from "@/data/products";
import { absoluteUrl, site } from "@/data/site";
import { breadcrumbSchema, seo } from "@/lib/seo";
import { enquiryMessage } from "@/lib/whatsapp";

export const metadata = seo({
  title: "All Natural Food Products in Vijayawada | 25 Products",
  description:
    "Browse all 25 natural food products from Sri Sai Balaji Naturals — cold pressed oils, spice powders, flours and rawa, honey, ghee, dry fruits and Andhra pickles.",
  path: "/products",
  keywords: [
    "natural food products Vijayawada",
    "buy natural foods Vijayawada",
    "natural food products online",
    "traditional food products Vijayawada",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

export default function AllProductsPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Natural food products in Vijayawada",
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              alternateName: p.teluguName,
              url: absoluteUrl(`/products/${p.slug}`),
            })),
          },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-sage mb-4 text-[11px] font-bold tracking-[.24em] uppercase">
            The full range
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Natural Food Products in Vijayawada
          </h1>
          <p lang="te" className="text-ink-soft mt-3 font-serif text-2xl">
            విజయవాడలో సహజ ఆహార ఉత్పత్తులు
          </p>
          <p className="text-muted-foreground mt-5 text-base leading-8">
            Twenty-five products across six categories — cold pressed oils,
            spice powders, millet flours and rawa, forest honey and buffalo
            ghee, dry fruits and nuts, and traditional Andhra pickles. Every
            product page has the available pack sizes and a WhatsApp order
            button.
          </p>
          <p
            lang="te"
            className="text-muted-foreground mt-3 text-base leading-8"
          >
            గానుగ నూనెలు, మసాలా పొడులు, చిరుధాన్యాల పిండులు, అటవీ తేనె, గేదె
            నెయ్యి, ఎండు పండ్లు, ఆంధ్రా పచ్చళ్ళు — అన్నీ చిన్న బ్యాచ్‌లలో తయారు
            చేసినవి.
          </p>
          <WhatsAppButton
            className="mt-6"
            message={enquiryMessage(`${site.name} — full product list`)}
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>

        <div className="mt-12">
          <ProductSearch products={products} />
        </div>
      </section>
    </PageShell>
  );
}
