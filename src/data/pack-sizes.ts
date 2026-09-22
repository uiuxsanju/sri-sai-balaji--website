/**
 * Pack sizes shown as selectable pills on the product page, as supplied by the business.
 * Every product has sizes; a product missing here would show only the quantity picker.
 *
 * To change sizes, edit the arrays below — the first size is selected by default.
 */
const OILS = ["1 L", "2 L", "5 L"];
const PICKLES = ["500 g", "1 kg"];
const SPICES = ["250 g", "500 g", "1 kg"];
const FLOURS = ["500 g", "1 kg"];
const DRY_FRUITS = ["250 g", "500 g", "1 kg"];

export const PACK_SIZES: Record<string, string[]> = {
  // Cold pressed oils — from 1 L
  "cold-pressed-groundnut-oil": OILS,
  "cold-pressed-coconut-oil": OILS,
  "white-sesame-oil": OILS,
  "black-sesame-oil": OILS,

  // Andhra pickles — 500 g and 1 kg
  "veg-pickle": PICKLES,
  "chicken-pickle": PICKLES,
  "prawns-pickle": PICKLES,
  "mutton-pickle": PICKLES,

  // Honey — 500 g and 1 kg
  "forest-honey": ["500 g", "1 kg"],

  // Pasupu (turmeric) — from 500 g
  "chaya-pasupu": ["500 g", "1 kg"],

  // Karam (chilli powder) — from 100 g
  "masala-mirchi-powder": ["100 g", "250 g", "500 g", "1 kg"],

  // Other spice powders
  "daniya-powder": SPICES,
  "jeera-powder": SPICES,
  "vulva-powder": SPICES,

  // Flours & rawa
  "ragi-flour": FLOURS,
  "jonna-powder": FLOURS,
  "jonna-rawa": FLOURS,
  "sajalu-rawa": FLOURS,
  "sajalu-powder": FLOURS,
  "yerra-goduma-rawa": FLOURS,

  // Ghee
  "buffalo-ghee": ["500 g", "1 kg"],

  // Dry fruits & nuts
  cashew: DRY_FRUITS,
  almond: DRY_FRUITS,
  "dried-grapes": DRY_FRUITS,
  anjeer: DRY_FRUITS,
};

export function packSizesFor(slug: string): string[] {
  return PACK_SIZES[slug] ?? [];
}
