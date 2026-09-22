import { categoryBySlug, type Product } from "@/data/products";

/**
 * Bilingual product matching used by the header search and the products page.
 * English is matched case-insensitively; Telugu is matched as typed. Category names
 * (both languages) and product keywords count too, so "oil", "నూనె" or "pickle" work.
 */
/** Telugu words typed in English letters, as customers here often search. */
const ALIASES: Record<string, string> = {
  "cold-pressed-groundnut-oil": "verusenaga nune palli nune ganuga",
  "cold-pressed-coconut-oil": "kobbari nune ganuga",
  "white-sesame-oil": "nuvvula nune til oil gingelly ganuga",
  "black-sesame-oil": "nalla nuvvula nune til oil gingelly ganuga",
  "masala-mirchi-powder": "karam kaaram mirapakaram mirchi chilli",
  "chaya-pasupu": "pasupu haldi turmeric",
  "daniya-powder": "dhaniya dhaniyalu coriander",
  "jeera-powder": "jeelakarra jeera cumin",
  "vulva-powder": "ulava ulavalu horse gram",
  "ragi-flour": "ragi pindi ragulu",
  "jonna-powder": "jonna pindi jowar",
  "jonna-rawa": "jonna ravva jowar",
  "sajalu-rawa": "sajja ravva bajra",
  "sajalu-powder": "sajja pindi bajra",
  "yerra-goduma-rawa": "godhuma ravva wheat",
  "forest-honey": "tene teene",
  "buffalo-ghee": "neyyi ghee",
  cashew: "jeedipappu kaju",
  almond: "badam",
  "dried-grapes": "kismis draksha raisin",
  anjeer: "athi fig",
  "veg-pickle": "pachadi avakaya kuragayala",
  "chicken-pickle": "pachadi kodi",
  "prawns-pickle": "pachadi royyala royyalu",
  "mutton-pickle": "pachadi mamsam",
};

export function matchesProduct(product: Product, raw: string): boolean {
  const q = raw.trim();
  if (!q) return true;
  const lower = q.toLowerCase();
  const cat = categoryBySlug[product.category];

  const english = [
    product.name,
    product.displayName ?? "",
    product.slug.replace(/-/g, " "),
    cat?.name ?? "",
    ...product.keywords,
    ALIASES[product.slug] ?? "",
  ]
    .join(" | ")
    .toLowerCase();

  const telugu = [product.teluguName, cat?.teluguName ?? ""].join(" | ");

  return english.includes(lower) || telugu.includes(q);
}

/** Rank: name starts-with first, then name contains, then everything else. */
export function searchProducts(products: Product[], raw: string): Product[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  const score = (p: Product) => {
    const n = (p.displayName ?? p.name).toLowerCase();
    if (n.startsWith(q) || p.teluguName.startsWith(raw.trim())) return 0;
    if (n.includes(q) || p.teluguName.includes(raw.trim())) return 1;
    return 2;
  };
  return products
    .filter((p) => matchesProduct(p, raw))
    .sort((a, b) => score(a) - score(b));
}
