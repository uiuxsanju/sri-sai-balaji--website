/**
 * Product + category catalogue.
 *
 * Content rules baked into this file:
 *  - No prices are hard-coded. `price` stays undefined until the business supplies real
 *    figures; every surface falls back to "Price available on enquiry" and the Product
 *    structured data omits `offers` rather than publishing an invented price.
 *  - No ratings, reviews, certifications or health claims. Descriptions stay factual:
 *    what the product is, how it is used in a kitchen, how it is packed.
 *  - Pack sizes listed here are the ones confirmed for the range. Do not add speculative
 *    sizes; add them once the business confirms.
 */

export type CategorySlug =
  | "cold-pressed-oils"
  | "spices-and-powders"
  | "flours-and-rawa"
  | "natural-foods"
  | "dry-fruits-and-nuts"
  | "andhra-pickles";

export type Product = {
  slug: string;
  name: string;
  /** Telugu product name, shown under the English name and included in search. */
  teluguName: string;
  /** Name used in headings and WhatsApp messages when it differs from the pack name. */
  displayName?: string;
  category: CategorySlug;
  /** Basename inside /public/products (without extension). Null = no photo supplied. */
  image: string | null;
  imageAlt: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  short: string;
  description: string[];
  features: string[];
  sizes: string[];
  keywords: string[];
  /** Real selling price in INR, only when supplied by the business. */
  price?: number;
  faqs?: { q: string; a: string }[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Telugu category name, shown alongside the English name. */
  teluguName: string;
  shortName: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  blurb: string;
  image: string;
  imageAlt: string;
  faqs: { q: string; a: string }[];
};

export const categories: Category[] = [
  {
    slug: "cold-pressed-oils",
    name: "Cold Pressed Oils",
    teluguName: "గానుగ నూనెలు",
    shortName: "Oils",
    seoTitle: "Cold Pressed Oils in Vijayawada | Wood Pressed Cooking Oils",
    metaDescription:
      "Wood pressed groundnut, coconut, white sesame and black sesame oils for everyday cooking in Vijayawada. Enquire on WhatsApp for sizes and 1 litre price.",
    h1: "Cold Pressed Oils in Vijayawada",
    intro: [
      "Our cooking oils are wood pressed in small batches, the slow way oils have long been made across Andhra. The seed is crushed at low speed so the oil keeps the aroma and colour you expect from a traditional ghani.",
      "Four oils make up the range — groundnut for everyday cooking, coconut for coastal dishes and tempering, and white and black sesame for pickles, podis and festive recipes.",
    ],
    blurb: "Wood pressed oils for everyday South Indian cooking.",
    image: "cold-pressed-groundnut-oil",
    imageAlt:
      "Cold pressed groundnut oil bottle from Sri Sai Balaji Naturals, Vijayawada",
    faqs: [
      {
        q: "Which cold pressed oils are available in Vijayawada?",
        a: "Groundnut oil, coconut oil, white sesame oil and black sesame oil are available. All four are wood pressed and packed in glass bottles.",
      },
      {
        q: "What sizes do the oils come in?",
        a: "Oils are packed in 500 ml and 1 litre bottles. Message us on WhatsApp for the current price of each size.",
      },
      {
        q: "How is cold pressed oil different from refined oil?",
        a: "Cold pressed oil is extracted by crushing the seed at low temperature without chemical solvents or bleaching, so it keeps its natural colour and aroma. Refined oil is extracted at high heat and then processed further, which gives it a neutral smell and taste.",
      },
    ],
  },
  {
    slug: "spices-and-powders",
    name: "Spices & Powders",
    teluguName: "మసాలాలు & పొడులు",
    shortName: "Spices",
    seoTitle:
      "Natural Spices & Powders in Vijayawada | Chilli, Turmeric, Coriander",
    metaDescription:
      "Stone-ground chilli, turmeric, coriander, cumin and vulva powders for Andhra cooking. Available in Vijayawada — WhatsApp us for pack sizes and 1 kg price.",
    h1: "Natural Spices & Powders in Vijayawada",
    intro: [
      "Spice powders carry a kitchen. Ours are ground from whole spice in small lots and packed straight away so the aroma is still in the packet when it reaches you.",
      "The range covers the five powders an Andhra kitchen reaches for daily — mirchi, pasupu, daniya, jeera and vulva.",
    ],
    blurb: "Freshly ground spice powders for daily Andhra cooking.",
    image: "masala-mirchi-powder",
    imageAlt:
      "Natural mirchi chilli powder packet from Sri Sai Balaji Naturals, Vijayawada",
    faqs: [
      {
        q: "Which spice powders do you stock?",
        a: "Masala mirchi (chilli) powder, chaya pasupu (turmeric) powder, daniya (coriander) powder, jeera (cumin) powder and vulva powder.",
      },
      {
        q: "What pack sizes are available for spices?",
        a: "Spice powders are packed in 250 g, 500 g and 1 kg packets. Send us a WhatsApp message for the 1 kg price.",
      },
      {
        q: "How should spice powders be stored?",
        a: "Keep the packet closed in a dry, airtight container away from direct sunlight and steam, and use a dry spoon each time.",
      },
    ],
  },
  {
    slug: "flours-and-rawa",
    name: "Flours & Rawa",
    teluguName: "పిండులు & రవ్వలు",
    shortName: "Flours",
    seoTitle: "Traditional Flours & Rawa in Vijayawada | Ragi, Jonna, Sajalu",
    metaDescription:
      "Ragi flour, jonna powder and rawa, sajalu powder and rawa, and yerra goduma rawa milled for traditional Andhra cooking. Vijayawada — enquire on WhatsApp.",
    h1: "Traditional Flours & Rawa in Vijayawada",
    intro: [
      "Millet flours and rawa are the base of roti, java, upma and porridge in homes across Andhra Pradesh. We mill the grain in small batches so nothing sits around losing its character.",
      "Six milled staples make up the range, from finger millet and sorghum through pearl millet to red wheat rawa.",
    ],
    blurb: "Millet and wheat staples, milled in small batches.",
    image: "ragi-flour",
    imageAlt:
      "Natural ragi flour packet from Sri Sai Balaji Naturals, Vijayawada",
    faqs: [
      {
        q: "What is the difference between powder and rawa?",
        a: "Powder is milled fine, the way flour is used for roti, java or porridge. Rawa is milled coarse, which suits upma, uppudu pindi and similar dishes.",
      },
      {
        q: "Which flours and rawa are available?",
        a: "Ragi flour, jonna powder, jonna rawa, sajalu powder, sajalu rawa and yerra goduma rawa.",
      },
      {
        q: "What sizes do flours come in?",
        a: "Flours and rawa are packed in 500 g and 1 kg packets. WhatsApp us for the current 1 kg price.",
      },
    ],
  },
  {
    slug: "natural-foods",
    name: "Natural Foods",
    teluguName: "సహజ ఆహారాలు",
    shortName: "Natural Foods",
    seoTitle: "Natural Foods in Vijayawada | Forest Honey & Buffalo Ghee",
    metaDescription:
      "Forest honey and traditionally prepared buffalo ghee from Sri Sai Balaji Naturals, Vijayawada. Enquire on WhatsApp for jar sizes and price.",
    h1: "Natural Foods in Vijayawada",
    intro: [
      "Two pantry staples that a kitchen goes through slowly and notices immediately — forest honey and buffalo ghee.",
      "Both are packed in glass jars so you can see exactly what you are buying.",
    ],
    blurb: "Forest honey and traditionally prepared buffalo ghee.",
    image: "forest-honey",
    imageAlt: "Forest honey jar from Sri Sai Balaji Naturals, Vijayawada",
    faqs: [
      {
        q: "What natural foods do you sell in Vijayawada?",
        a: "Forest honey and buffalo ghee, both packed in glass jars.",
      },
      {
        q: "How is the buffalo ghee prepared?",
        a: "It is prepared the traditional way, by simmering butter until the milk solids settle and the ghee turns clear and golden.",
      },
      {
        q: "Does honey crystallise?",
        a: "Natural honey can thicken or crystallise in cooler weather. Standing the closed jar in warm water brings it back to a pouring consistency.",
      },
    ],
  },
  {
    slug: "dry-fruits-and-nuts",
    name: "Dry Fruits & Nuts",
    teluguName: "ఎండు పండ్లు & పప్పులు",
    shortName: "Dry Fruits",
    seoTitle:
      "Dry Fruits & Nuts in Vijayawada | Cashew, Almond, Anjeer, Raisins",
    metaDescription:
      "Cashew, almond, dried grapes and anjeer packed for Vijayawada homes and gifting. Message on WhatsApp for pack sizes and 1 kg price.",
    h1: "Dry Fruits & Nuts in Vijayawada",
    intro: [
      "Graded whole cashew and almond, soft dried grapes and plump anjeer — sorted and packed for daily use, festival sweets and gifting.",
      "Every pack is sealed so the nuts stay crisp and the dried fruit stays soft.",
    ],
    blurb: "Graded nuts and dried fruit, sealed for freshness.",
    image: "cashew",
    imageAlt:
      "Premium cashew nuts pack from Sri Sai Balaji Naturals, Vijayawada",
    faqs: [
      {
        q: "Which dry fruits are available?",
        a: "Cashew nuts, almonds, dried grapes (raisins) and anjeer (dried figs).",
      },
      {
        q: "Do you supply dry fruits for gifting or bulk orders?",
        a: "Yes. Send the quantity you need on WhatsApp and we will confirm availability and price.",
      },
      {
        q: "What pack sizes are available?",
        a: "Dry fruits are packed in 250 g, 500 g and 1 kg packs.",
      },
    ],
  },
  {
    slug: "andhra-pickles",
    name: "Andhra Pickles",
    teluguName: "ఆంధ్రా పచ్చళ్ళు",
    shortName: "Pickles",
    seoTitle:
      "Traditional Andhra Pickles in Vijayawada | Veg & Non-Veg Pickles",
    metaDescription:
      "Andhra veg, chicken, prawns and mutton pickles made to traditional recipes in Vijayawada. WhatsApp us for jar sizes and price.",
    h1: "Traditional Andhra Pickles in Vijayawada",
    intro: [
      "Pickle is what an Andhra plate is built around. Ours follow home recipes — the spice ground for the batch, the oil poured over the top, the jar left to settle before it goes out.",
      "Four varieties: a mixed vegetable pickle and three non-vegetarian pickles.",
    ],
    blurb: "Home-style veg and non-veg pickles from Andhra recipes.",
    image: "veg-pickle",
    imageAlt:
      "Traditional Andhra veg pickle jar from Sri Sai Balaji Naturals, Vijayawada",
    faqs: [
      {
        q: "Which Andhra pickles do you sell?",
        a: "Veg pickle, chicken pickle, prawns pickle and mutton pickle.",
      },
      {
        q: "How should pickle be stored?",
        a: "Keep the jar closed at room temperature, always use a dry spoon, and make sure the pickle stays covered by its oil layer.",
      },
      {
        q: "Can I order non-veg pickle in Vijayawada?",
        a: "Yes. Chicken, prawns and mutton pickles are made in batches — message us on WhatsApp to check the current batch and price.",
      },
    ],
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;

export const products: Product[] = [
  // ─── Cold Pressed Oils ────────────────────────────────────────────────────
  {
    slug: "cold-pressed-groundnut-oil",
    name: "Groundnut Oil",
    teluguName: "వేరుశెనగ నూనె",
    category: "cold-pressed-oils",
    image: "cold-pressed-groundnut-oil",
    imageAlt: "Cold pressed groundnut oil bottle in Vijayawada",
    seoTitle: "Cold Pressed Groundnut Oil in Vijayawada | Natural Cooking Oil",
    metaDescription:
      "Wood pressed groundnut oil for everyday South Indian cooking, available in Vijayawada in 500 ml and 1 litre bottles. WhatsApp us for the current price.",
    h1: "Cold Pressed Groundnut Oil",
    short:
      "Wood pressed groundnut oil with the nutty aroma of a traditional ghani.",
    description: [
      "Groundnut oil is the everyday cooking oil of Andhra kitchens, and this one is wood pressed from clean, sorted groundnut. Crushing at low speed keeps the oil's natural golden colour and its familiar roasted-nut aroma.",
      "It holds heat well, which makes it suitable for tempering, deep frying, curries and the pickles that need a generous pour of oil on top.",
    ],
    features: [
      "Wood pressed from sorted groundnut",
      "Natural golden colour and nutty aroma",
      "Suits tempering, frying and curries",
      "Packed in glass bottles",
    ],
    sizes: ["500 ml", "1 L"],
    keywords: [
      "cold pressed groundnut oil Vijayawada",
      "wood pressed groundnut oil",
      "natural groundnut oil",
      "groundnut oil Andhra Pradesh",
      "cold pressed cooking oil Vijayawada",
    ],
    faqs: [
      {
        q: "Is this groundnut oil suitable for deep frying?",
        a: "Yes. Cold pressed groundnut oil is commonly used for deep frying as well as for tempering and everyday curries.",
      },
      {
        q: "What sizes does the groundnut oil come in?",
        a: "500 ml and 1 litre bottles. Message us on WhatsApp for the current price of each size.",
      },
    ],
  },
  {
    slug: "cold-pressed-coconut-oil",
    name: "Coconut Oil",
    teluguName: "కొబ్బరి నూనె",
    category: "cold-pressed-oils",
    image: "cold-pressed-coconut-oil",
    imageAlt: "Cold pressed coconut oil bottle in Vijayawada",
    seoTitle: "Cold Pressed Coconut Oil in Vijayawada | Natural Coconut Oil",
    metaDescription:
      "Wood pressed coconut oil for cooking, tempering and hair care, available in Vijayawada in 500 ml and 1 litre bottles. Enquire on WhatsApp.",
    h1: "Cold Pressed Coconut Oil",
    short: "Wood pressed coconut oil with a clean, unmistakably coconut aroma.",
    description: [
      "Pressed from dried coconut without heat or solvents, this oil keeps the sweet coconut smell that gets lost in refining. It sets solid in cool weather and turns clear again when it warms — a normal property of unrefined coconut oil.",
      "Used along the coast for tempering, coconut chutney, sweets and podis, and kept in many homes for hair and skin as well.",
    ],
    features: [
      "Wood pressed from dried coconut",
      "Natural coconut aroma retained",
      "Used for cooking and hair care",
      "Packed in glass bottles",
    ],
    sizes: ["500 ml", "1 L"],
    keywords: [
      "cold pressed coconut oil Vijayawada",
      "natural coconut oil",
      "coconut oil Andhra Pradesh",
      "wood pressed coconut oil Vijayawada",
    ],
    faqs: [
      {
        q: "Why has my coconut oil turned solid?",
        a: "Unrefined coconut oil solidifies below roughly 24°C. Standing the bottle in warm water returns it to liquid without affecting the oil.",
      },
    ],
  },
  {
    slug: "white-sesame-oil",
    name: "White Sesame Oil",
    teluguName: "తెల్ల నువ్వుల నూనె",
    category: "cold-pressed-oils",
    image: "white-sesame-oil",
    imageAlt: "Cold pressed white sesame oil bottle in Vijayawada",
    seoTitle:
      "Cold Pressed White Sesame Oil in Vijayawada | Natural Sesame Oil",
    metaDescription:
      "Wood pressed white sesame (nuvvula) oil for pickles, podis and traditional cooking. Available in Vijayawada in 500 ml and 1 litre bottles.",
    h1: "Cold Pressed White Sesame Oil",
    short: "Light golden nuvvula oil, wood pressed from white sesame seed.",
    description: [
      "White sesame oil — nuvvula nune — is the oil Andhra pickles are traditionally finished with. Pressed cold from white sesame seed, it stays light gold with a gentle, clean sesame note rather than the strong roasted smell of toasted sesame oil.",
      "Beyond pickles it is used for podis, festival cooking and daily tempering.",
    ],
    features: [
      "Wood pressed from white sesame seed",
      "Light golden colour, mild sesame aroma",
      "Traditional choice for pickles and podis",
      "Packed in glass bottles",
    ],
    sizes: ["500 ml", "1 L"],
    keywords: [
      "white sesame oil Vijayawada",
      "cold pressed sesame oil",
      "natural sesame oil",
      "nuvvula nune Vijayawada",
    ],
  },
  {
    slug: "black-sesame-oil",
    name: "Black Sesame Oil",
    teluguName: "నల్ల నువ్వుల నూనె",
    category: "cold-pressed-oils",
    image: "black-sesame-oil",
    imageAlt: "Cold pressed black sesame oil bottle in Vijayawada",
    seoTitle:
      "Black Sesame Oil in Vijayawada | Natural Cold Pressed Sesame Oil",
    metaDescription:
      "Wood pressed black sesame oil with a deeper colour and fuller aroma, available in Vijayawada in 500 ml and 1 litre bottles. WhatsApp for price.",
    h1: "Cold Pressed Black Sesame Oil",
    short:
      "Deeper, fuller-flavoured sesame oil pressed from black sesame seed.",
    description: [
      "Pressed from black sesame seed rather than white, this oil carries a darker amber colour and a rounder, more pronounced sesame character.",
      "It is used in traditional preparations and pickles where a stronger sesame note is wanted, and for external use in the way many families have long used it.",
    ],
    features: [
      "Wood pressed from black sesame seed",
      "Deeper amber colour, fuller aroma",
      "Used in traditional recipes and pickles",
      "Packed in glass bottles",
    ],
    sizes: ["500 ml", "1 L"],
    keywords: [
      "black sesame oil Vijayawada",
      "natural black sesame oil",
      "sesame oil Andhra Pradesh",
      "cold pressed black sesame oil",
    ],
  },

  // ─── Spices & Powders ─────────────────────────────────────────────────────
  {
    slug: "masala-mirchi-powder",
    name: "Masala Mirchi Powder",
    teluguName: "మసాలా మిరప కారం",
    category: "spices-and-powders",
    image: "masala-mirchi-powder",
    imageAlt: "Natural masala mirchi chilli powder packet in Vijayawada",
    seoTitle: "Masala Mirchi Powder in Vijayawada | Andhra Chilli Powder",
    metaDescription:
      "Andhra-style masala mirchi powder ground from dried red chillies, packed in 250 g, 500 g and 1 kg. Available in Vijayawada — enquire on WhatsApp.",
    h1: "Masala Mirchi Powder",
    short: "Bright red chilli powder ground from dried Andhra chillies.",
    description: [
      "Mirchi karam is the colour and heat behind most Andhra cooking. Ours is ground from dried red chillies in small lots, which is why the packet still smells of chilli when you open it.",
      "Use it in curries, pappu, pulusu and podis, and as the base for pickle masala.",
    ],
    features: [
      "Ground from dried red chillies",
      "Bright natural colour",
      "For curries, podis and pickle masala",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "chilli powder Vijayawada",
      "Andhra chilli powder",
      "natural chilli powder",
      "mirchi powder Vijayawada",
    ],
  },
  {
    slug: "chaya-pasupu",
    name: "Chaya Pasupu",
    teluguName: "ఛాయ పసుపు",
    displayName: "Chaya Pasupu (Turmeric Powder)",
    category: "spices-and-powders",
    image: "chaya-pasupu",
    imageAlt: "Chaya pasupu natural turmeric powder packet in Vijayawada",
    seoTitle: "Chaya Pasupu in Vijayawada | Natural Turmeric Powder",
    metaDescription:
      "Chaya pasupu — turmeric powder ground from dried turmeric fingers — in 250 g, 500 g and 1 kg packs. Available in Vijayawada, enquire on WhatsApp.",
    h1: "Chaya Pasupu (Turmeric Powder)",
    short: "Deep yellow turmeric powder ground from dried turmeric fingers.",
    description: [
      "Pasupu goes into almost every pot in an Andhra kitchen. This one is ground from dried turmeric fingers, giving a strong, even yellow and the earthy smell of fresh-ground turmeric.",
      "Used in daily cooking, in pickle masala and in the traditional ways turmeric is kept in South Indian homes.",
    ],
    features: [
      "Ground from dried turmeric fingers",
      "Deep, even yellow colour",
      "Everyday cooking and pickle masala",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "Chaya Pasupu Vijayawada",
      "turmeric powder Vijayawada",
      "natural turmeric powder",
      "pasupu powder Andhra Pradesh",
    ],
  },
  {
    slug: "daniya-powder",
    name: "Daniya Powder",
    teluguName: "ధనియాల పొడి",
    displayName: "Daniya Powder (Coriander Powder)",
    category: "spices-and-powders",
    image: "daniya-powder",
    imageAlt: "Daniya coriander powder packet in Vijayawada",
    seoTitle: "Daniya Powder in Vijayawada | Natural Coriander Powder",
    metaDescription:
      "Coriander (daniya) powder ground from whole seed for curries and masalas. Packed in 250 g, 500 g and 1 kg. Vijayawada — WhatsApp for price.",
    h1: "Daniya Powder (Coriander Powder)",
    short: "Coriander powder ground from whole daniya seed.",
    description: [
      "Daniya powder gives a curry its body. Ground from whole coriander seed, it keeps the mild citrus smell that vanishes from powder that has sat too long on a shelf.",
      "It is used across daily cooking — curries, koora podi, masala blends and gravies.",
    ],
    features: [
      "Ground from whole coriander seed",
      "Fresh, mild citrus aroma",
      "Base for curries and masala blends",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "coriander powder Vijayawada",
      "Daniya powder Vijayawada",
      "natural coriander powder",
      "daniya podi Andhra Pradesh",
    ],
  },
  {
    slug: "jeera-powder",
    name: "Jeera Powder",
    teluguName: "జీలకర్ర పొడి",
    displayName: "Jeera Powder (Cumin Powder)",
    category: "spices-and-powders",
    image: "jeera-powder",
    imageAlt: "Jeera cumin powder packet in Vijayawada",
    seoTitle: "Jeera Powder in Vijayawada | Natural Cumin Powder",
    metaDescription:
      "Cumin (jeera) powder ground from whole seed, packed in 250 g, 500 g and 1 kg. Available in Vijayawada — message us on WhatsApp for the price.",
    h1: "Jeera Powder (Cumin Powder)",
    short: "Warm, earthy cumin powder ground from whole jeera.",
    description: [
      "Jeera powder carries a warm, slightly smoky note that lifts curries, rasam, buttermilk and raita.",
      "Ground from whole cumin seed in small lots and packed immediately, so the aroma is still there when the packet is opened.",
    ],
    features: [
      "Ground from whole cumin seed",
      "Warm, earthy aroma",
      "For curries, rasam and buttermilk",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "cumin powder Vijayawada",
      "Jeera powder Vijayawada",
      "natural cumin powder",
      "jeera podi Andhra Pradesh",
    ],
  },
  {
    slug: "vulva-powder",
    name: "Vulva Powder",
    teluguName: "ఉలవ పొడి",
    category: "spices-and-powders",
    image: "vulva-powder",
    imageAlt: "Vulva powder packet from Sri Sai Balaji Naturals in Vijayawada",
    seoTitle: "Vulva Powder in Vijayawada | Traditional Spice Powder",
    metaDescription:
      "Vulva powder, a traditional spice powder from the Sri Sai Balaji Naturals range, packed in 250 g, 500 g and 1 kg. Vijayawada — enquire on WhatsApp.",
    h1: "Vulva Powder",
    short: "A traditional spice powder from the Sri Sai Balaji Naturals range.",
    description: [
      "Vulva powder is stocked under the name the kitchens that ask for it use. It is ground and packed in the same small batches as the rest of the spice range.",
      "For details on how this powder is used or the quantity you need, send us a message on WhatsApp and we will help.",
    ],
    features: [
      "Ground in small batches",
      "Traditional pantry spice powder",
      "250 g, 500 g and 1 kg packs",
      "Sealed packets",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "vulva powder Vijayawada",
      "traditional spice powder Vijayawada",
    ],
  },

  // ─── Flours & Rawa ────────────────────────────────────────────────────────
  {
    slug: "ragi-flour",
    name: "Ragi Flour",
    teluguName: "రాగి పిండి",
    category: "flours-and-rawa",
    image: "ragi-flour",
    imageAlt: "Natural ragi finger millet flour packet in Vijayawada",
    seoTitle: "Ragi Flour in Vijayawada | Natural Finger Millet Flour",
    metaDescription:
      "Finger millet (ragi) flour milled for java, roti and porridge, packed in 500 g and 1 kg. Available in Vijayawada — WhatsApp us for the 1 kg price.",
    h1: "Ragi Flour (Finger Millet Flour)",
    short: "Finely milled finger millet flour for java, roti and porridge.",
    description: [
      "Ragi has been a staple across Andhra and Rayalaseema for generations. We mill whole finger millet fine enough for ragi java and sankati as well as roti and dosa batter.",
      "Because it is milled in small batches, the flour keeps the mild, earthy smell that tells you it is fresh.",
    ],
    features: [
      "Milled from whole finger millet",
      "Fine texture for java and roti",
      "Milled in small batches",
      "500 g and 1 kg packs",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "ragi flour Vijayawada",
      "natural ragi flour",
      "ragi flour Andhra Pradesh",
      "finger millet flour Vijayawada",
    ],
    faqs: [
      {
        q: "Can this ragi flour be used for ragi java?",
        a: "Yes. It is milled fine, which suits ragi java, sankati, roti and dosa batter.",
      },
    ],
  },
  {
    slug: "jonna-powder",
    name: "Jonna Powder",
    teluguName: "జొన్న పిండి",
    displayName: "Jonna Powder (Jowar Flour)",
    category: "flours-and-rawa",
    image: "jonna-powder",
    imageAlt: "Jonna powder jowar flour packet in Vijayawada",
    seoTitle: "Jonna Powder in Vijayawada | Natural Jowar Flour",
    metaDescription:
      "Jonna powder (jowar flour) milled from whole sorghum for jonna rotte and daily cooking. 500 g and 1 kg packs in Vijayawada — enquire on WhatsApp.",
    h1: "Jonna Powder (Jowar Flour)",
    short: "Sorghum milled fine for jonna rotte and everyday cooking.",
    description: [
      "Jonna rotte is a Telugu kitchen classic, and it starts with well-milled jowar. We mill whole sorghum fine and even, so the dough comes together and pats out without cracking.",
      "It is also used in mixed millet flours and in porridge.",
    ],
    features: [
      "Milled from whole sorghum",
      "Fine, even texture for rotte",
      "Milled in small batches",
      "500 g and 1 kg packs",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "jonna powder Vijayawada",
      "jowar flour Vijayawada",
      "natural jowar flour",
      "jonna pindi Andhra Pradesh",
    ],
  },
  {
    slug: "jonna-rawa",
    name: "Jonna Rawa",
    teluguName: "జొన్న రవ్వ",
    displayName: "Jonna Rawa (Jowar Rava)",
    category: "flours-and-rawa",
    image: "jonna-rawa",
    imageAlt: "Jonna rawa jowar rava packet in Vijayawada",
    seoTitle: "Jonna Rawa in Vijayawada | Traditional Jowar Rava",
    metaDescription:
      "Coarsely milled jonna rawa (jowar rava) for upma and uppudu pindi, packed in 500 g and 1 kg. Available in Vijayawada — WhatsApp for the price.",
    h1: "Jonna Rawa (Jowar Rava)",
    short: "Coarsely milled sorghum for upma and traditional rawa dishes.",
    description: [
      "The same sorghum as our jonna powder, milled coarse instead of fine. That coarser grain is what keeps upma separate rather than pasty.",
      "It is used for jonna upma, uppudu pindi and similar traditional preparations.",
    ],
    features: [
      "Coarse milled from whole sorghum",
      "Holds its grain when cooked",
      "For upma and uppudu pindi",
      "500 g and 1 kg packs",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "jonna rawa Vijayawada",
      "jowar rava Vijayawada",
      "traditional jonna rawa Andhra Pradesh",
    ],
  },
  {
    slug: "sajalu-rawa",
    name: "Sajalu Rawa",
    teluguName: "సజ్జల రవ్వ",
    displayName: "Sajalu Rawa (Pearl Millet Rava)",
    category: "flours-and-rawa",
    image: "sajalu-rawa",
    imageAlt: "Sajalu rawa pearl millet rava packet in Vijayawada",
    seoTitle: "Sajalu Rawa in Vijayawada | Traditional Pearl Millet Rava",
    metaDescription:
      "Pearl millet (sajjalu) rawa milled coarse for upma and traditional dishes. 500 g and 1 kg packs available in Vijayawada — enquire on WhatsApp.",
    h1: "Sajalu Rawa (Pearl Millet Rava)",
    short: "Coarsely milled pearl millet for upma and traditional dishes.",
    description: [
      "Pearl millet — sajjalu — is a dryland grain long grown across the Telugu districts. Milled coarse as rawa, it cooks into a hearty upma with a distinct grain bite.",
      "Packed in small batches so it reaches your kitchen fresh.",
    ],
    features: [
      "Coarse milled from pearl millet",
      "Distinct grain texture",
      "For upma and traditional dishes",
      "500 g and 1 kg packs",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "sajalu rawa Vijayawada",
      "sajalu rava Andhra Pradesh",
      "pearl millet rava Vijayawada",
    ],
  },
  {
    slug: "sajalu-powder",
    name: "Sajalu Powder",
    teluguName: "సజ్జల పిండి",
    displayName: "Sajalu Powder (Pearl Millet Flour)",
    category: "flours-and-rawa",
    image: "sajalu-powder",
    imageAlt: "Sajalu powder pearl millet flour packet in Vijayawada",
    seoTitle: "Sajalu Powder in Vijayawada | Natural Pearl Millet Flour",
    metaDescription:
      "Pearl millet flour (sajalu powder) milled fine for roti, java and mixed millet flours. 500 g and 1 kg packs in Vijayawada — WhatsApp for price.",
    h1: "Sajalu Powder (Pearl Millet Flour)",
    short: "Pearl millet milled fine for roti, java and millet mixes.",
    description: [
      "Sajalu powder is pearl millet milled fine, the form used for roti, java and mixed millet flours.",
      "Like the rest of our millet range it is milled in small quantities rather than stored in bulk.",
    ],
    features: [
      "Fine milled from pearl millet",
      "For roti, java and millet mixes",
      "Milled in small batches",
      "500 g and 1 kg packs",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "sajalu powder Vijayawada",
      "natural sajalu powder",
      "pearl millet flour Vijayawada",
    ],
  },
  {
    slug: "yerra-goduma-rawa",
    name: "Yerra Goduma Rawa",
    teluguName: "ఎర్ర గోధుమ రవ్వ",
    displayName: "Yerra Goduma Rawa (Red Wheat Rava)",
    category: "flours-and-rawa",
    image: "yerra-goduma-rawa",
    imageAlt: "Yerra goduma rawa red wheat rava packet in Vijayawada",
    seoTitle: "Yerra Goduma Rawa in Vijayawada | Traditional Red Wheat Rava",
    metaDescription:
      "Red wheat rawa (yerra goduma) milled coarse for upma and traditional wheat dishes. 500 g and 1 kg packs in Vijayawada — enquire on WhatsApp.",
    h1: "Yerra Goduma Rawa (Red Wheat Rava)",
    short: "Red wheat milled coarse, with a hearty traditional texture.",
    description: [
      "Yerra goduma — red wheat — is milled here as a coarse rawa with its reddish-brown colour intact rather than being refined pale.",
      "It suits upma, godhuma rawa dishes and traditional wheat preparations that want more body than fine sooji.",
    ],
    features: [
      "Coarse milled from red wheat",
      "Natural reddish-brown colour",
      "For upma and wheat rawa dishes",
      "500 g and 1 kg packs",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "red wheat rawa Vijayawada",
      "wheat rawa Vijayawada",
      "traditional wheat rawa",
      "yerra goduma rawa Andhra Pradesh",
    ],
  },

  // ─── Natural Foods ────────────────────────────────────────────────────────
  {
    slug: "forest-honey",
    name: "Forest Honey",
    teluguName: "అటవీ తేనె",
    category: "natural-foods",
    image: "forest-honey",
    imageAlt: "Forest honey glass jar in Vijayawada",
    seoTitle: "Forest Honey in Vijayawada | Natural Raw Honey",
    metaDescription:
      "Forest honey collected from wild hives and packed unprocessed in glass jars. Available in Vijayawada — message on WhatsApp for sizes and price.",
    h1: "Forest Honey",
    short: "Amber forest honey, packed raw and unprocessed in glass.",
    description: [
      "This honey is gathered from wild hives rather than boxed apiaries, which is why its colour and flavour shift a little from batch to batch depending on what was flowering.",
      "It is packed raw and unprocessed, so it may thicken or crystallise in cooler weather — standing the closed jar in warm water brings it back.",
    ],
    features: [
      "Collected from wild forest hives",
      "Packed raw and unprocessed",
      "Colour varies naturally by batch",
      "Packed in glass jars",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "forest honey Vijayawada",
      "natural forest honey",
      "honey Vijayawada",
      "raw honey Andhra Pradesh",
    ],
    faqs: [
      {
        q: "Why does the colour of the honey change between jars?",
        a: "Forest honey takes its colour and flavour from whatever was in flower when it was collected, so batches differ. It is a normal property of unprocessed honey.",
      },
    ],
  },
  {
    slug: "buffalo-ghee",
    name: "Buffalo Ghee",
    teluguName: "గేదె నెయ్యి",
    category: "natural-foods",
    image: "buffalo-ghee",
    imageAlt: "Traditional buffalo ghee jar in Vijayawada",
    seoTitle: "Buffalo Ghee in Vijayawada | Traditional Natural Ghee",
    metaDescription:
      "Buffalo ghee prepared the traditional way and packed in glass jars, available in Vijayawada. WhatsApp us for jar sizes and the current price.",
    h1: "Buffalo Ghee",
    short: "Golden buffalo ghee, simmered the traditional way.",
    description: [
      "Buffalo ghee is thicker and paler than cow ghee, with the rich, grainy set many Telugu households prefer for pappu, sweets and festival cooking.",
      "Ours is simmered slowly until the milk solids settle and the ghee runs clear, then packed in glass while still fresh.",
    ],
    features: [
      "Prepared by traditional simmering",
      "Thick, grainy set when cool",
      "For pappu, sweets and festival cooking",
      "Packed in glass jars",
    ],
    sizes: ["500 g", "1 kg"],
    keywords: [
      "buffalo ghee Vijayawada",
      "traditional buffalo ghee",
      "natural buffalo ghee",
      "ghee Vijayawada",
    ],
  },

  // ─── Dry Fruits & Nuts ────────────────────────────────────────────────────
  {
    slug: "cashew",
    name: "Cashew",
    teluguName: "జీడిపప్పు",
    displayName: "Cashew Nuts",
    category: "dry-fruits-and-nuts",
    image: "cashew",
    imageAlt: "Premium whole cashew nuts pack in Vijayawada",
    seoTitle: "Cashew Nuts in Vijayawada | Premium Whole Cashews",
    metaDescription:
      "Whole graded cashew nuts for cooking, sweets and gifting, packed in 250 g, 500 g and 1 kg. Available in Vijayawada — WhatsApp for the 1 kg price.",
    h1: "Cashew Nuts",
    short: "Whole graded cashews for cooking, sweets and gifting.",
    description: [
      "Whole cashew, sorted for size and colour, with broken pieces taken out before packing.",
      "Used for everyday snacking, for sweets like kaju katli and for the fried garnish on biryani and payasam. Sealed packs keep them crisp.",
    ],
    features: [
      "Whole graded kernels",
      "Sorted before packing",
      "For cooking, sweets and gifting",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "cashew Vijayawada",
      "premium cashews Vijayawada",
      "cashew nuts Andhra Pradesh",
      "buy cashew Vijayawada",
    ],
  },
  {
    slug: "almond",
    name: "Almond",
    teluguName: "బాదం పప్పు",
    displayName: "Almond Nuts",
    category: "dry-fruits-and-nuts",
    image: "almond",
    imageAlt: "Premium almond nuts pack in Vijayawada",
    seoTitle: "Almonds in Vijayawada | Premium Almond Nuts",
    metaDescription:
      "Whole almonds packed in 250 g, 500 g and 1 kg for daily use, sweets and gifting. Available in Vijayawada — enquire on WhatsApp for the price.",
    h1: "Almond Nuts",
    short: "Whole almonds, sorted and sealed for daily use and gifting.",
    description: [
      "Whole almonds with an even size and colour, packed sealed so they stay crisp.",
      "Used for soaking overnight, for sweets and halwa, and for gift boxes during festivals.",
    ],
    features: [
      "Whole graded kernels",
      "Even size and colour",
      "For daily use, sweets and gifting",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "almonds Vijayawada",
      "premium almonds Vijayawada",
      "almonds Andhra Pradesh",
      "badam Vijayawada",
    ],
  },
  {
    slug: "dried-grapes",
    name: "Dried Grapes",
    teluguName: "ఎండు ద్రాక్ష",
    displayName: "Dried Grapes (Raisins)",
    category: "dry-fruits-and-nuts",
    image: "dried-grapes",
    imageAlt: "Natural dried grapes raisins pack in Vijayawada",
    seoTitle: "Dried Grapes in Vijayawada | Natural Raisins (Kishmish)",
    metaDescription:
      "Soft golden dried grapes (raisins) for sweets, payasam and snacking, in 250 g, 500 g and 1 kg packs. Available in Vijayawada — WhatsApp us.",
    h1: "Dried Grapes (Raisins)",
    short: "Soft golden raisins for payasam, sweets and snacking.",
    description: [
      "Golden dried grapes with a soft bite and natural sweetness, cleaned and sorted before packing.",
      "They go into payasam, sweet pongal, halwa and biryani, and are eaten as they are.",
    ],
    features: [
      "Soft, naturally sweet raisins",
      "Cleaned and sorted",
      "For payasam, sweets and snacking",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "dried grapes Vijayawada",
      "raisins Vijayawada",
      "natural dried grapes",
      "kishmish Vijayawada",
    ],
  },
  {
    slug: "anjeer",
    name: "Anjeer",
    teluguName: "అంజీర్ (అత్తి పండ్లు)",
    displayName: "Anjeer (Dried Figs)",
    category: "dry-fruits-and-nuts",
    image: "anjeer",
    imageAlt: "Premium anjeer dried figs pack in Vijayawada",
    seoTitle: "Anjeer in Vijayawada | Premium Dried Figs",
    metaDescription:
      "Soft whole anjeer (dried figs) packed in 250 g, 500 g and 1 kg for snacking, sweets and gifting. Available in Vijayawada — enquire on WhatsApp.",
    h1: "Anjeer (Dried Figs)",
    short: "Soft whole dried figs for snacking, sweets and gift boxes.",
    description: [
      "Whole dried figs with a soft, chewy texture and the seed crunch anjeer is known for.",
      "Eaten as they are, soaked overnight, or chopped into halwa, milkshakes and dry-fruit sweets.",
    ],
    features: [
      "Whole soft dried figs",
      "Sorted for size",
      "For snacking, sweets and gifting",
      "250 g, 500 g and 1 kg packs",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "anjeer Vijayawada",
      "dried figs Vijayawada",
      "dried anjeer",
      "anjeer Andhra Pradesh",
    ],
  },

  // ─── Andhra Pickles ───────────────────────────────────────────────────────
  {
    slug: "veg-pickle",
    name: "Veg Pickle",
    teluguName: "కూరగాయల పచ్చడి",
    displayName: "Andhra Veg Pickle",
    category: "andhra-pickles",
    image: "veg-pickle",
    imageAlt: "Traditional Andhra veg pickle jar in Vijayawada",
    seoTitle:
      "Andhra Veg Pickle in Vijayawada | Traditional Mixed Vegetable Pickle",
    metaDescription:
      "Traditional Andhra mixed vegetable pickle made to a home recipe, packed in glass jars. Available in Vijayawada — WhatsApp for sizes and price.",
    h1: "Andhra Veg Pickle",
    short: "Mixed vegetable pickle made to a traditional Andhra home recipe.",
    description: [
      "A mixed vegetable pickle cut, salted and spiced the way it is done at home — freshly ground masala, and enough oil on top to keep the pickle covered.",
      "Eaten with rice and ghee, curd rice, idli, dosa or roti.",
    ],
    features: [
      "Traditional Andhra home recipe",
      "Freshly ground pickle masala",
      "Packed in glass jars",
      "250 g, 500 g and 1 kg jars",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "Andhra veg pickle Vijayawada",
      "veg pickle Vijayawada",
      "traditional Andhra pickle",
      "mixed vegetable pickle Vijayawada",
    ],
    faqs: [
      {
        q: "How long does the pickle keep?",
        a: "Kept closed at room temperature, used with a dry spoon and with the oil layer covering the pickle, it keeps well. Ask us on WhatsApp for the batch date of the jar you are buying.",
      },
    ],
  },
  {
    slug: "chicken-pickle",
    name: "Chicken Pickle",
    teluguName: "చికెన్ పచ్చడి",
    displayName: "Andhra Chicken Pickle",
    category: "andhra-pickles",
    image: null,
    imageAlt: "Andhra chicken pickle from Sri Sai Balaji Naturals, Vijayawada",
    seoTitle:
      "Andhra Chicken Pickle in Vijayawada | Traditional Non-Veg Pickle",
    metaDescription:
      "Andhra-style chicken pickle cooked in batches to a traditional recipe, packed in glass jars. Available in Vijayawada — enquire on WhatsApp.",
    h1: "Andhra Chicken Pickle",
    short: "Boneless chicken pickle cooked down in traditional Andhra masala.",
    description: [
      "Chicken cooked down slowly in pickle masala until the spice coats every piece, then packed under oil in the traditional way.",
      "Made in batches rather than kept in stock, so message us to check what is currently available.",
    ],
    features: [
      "Traditional Andhra non-veg pickle recipe",
      "Cooked in small batches",
      "Packed in glass jars",
      "250 g, 500 g and 1 kg jars",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "Andhra chicken pickle Vijayawada",
      "chicken pickle Vijayawada",
      "traditional chicken pickle",
      "non veg pickle Vijayawada",
    ],
  },
  {
    slug: "prawns-pickle",
    name: "Prawns Pickle",
    teluguName: "రొయ్యల పచ్చడి",
    displayName: "Andhra Prawns Pickle",
    category: "andhra-pickles",
    image: null,
    imageAlt: "Andhra prawns pickle from Sri Sai Balaji Naturals, Vijayawada",
    seoTitle: "Andhra Prawns Pickle in Vijayawada | Traditional Royyala Pickle",
    metaDescription:
      "Coastal Andhra prawns (royyalu) pickle made to a traditional recipe in small batches. Available in Vijayawada — WhatsApp for sizes and price.",
    h1: "Andhra Prawns Pickle",
    short: "Coastal-style royyala pickle, cooked in small batches.",
    description: [
      "Cleaned prawns cooked into a thick pickle masala, the way it is made along the Andhra coast.",
      "Prepared in small batches to order availability, so check with us on WhatsApp before planning a larger quantity.",
    ],
    features: [
      "Coastal Andhra prawns pickle recipe",
      "Cooked in small batches",
      "Packed in glass jars",
      "250 g, 500 g and 1 kg jars",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "Andhra prawns pickle Vijayawada",
      "prawns pickle Vijayawada",
      "traditional prawns pickle",
      "royyala pickle Vijayawada",
    ],
  },
  {
    slug: "mutton-pickle",
    name: "Mutton Pickle",
    teluguName: "మటన్ పచ్చడి",
    displayName: "Andhra Mutton Pickle",
    category: "andhra-pickles",
    image: null,
    imageAlt: "Andhra mutton pickle from Sri Sai Balaji Naturals, Vijayawada",
    seoTitle: "Andhra Mutton Pickle in Vijayawada | Traditional Non-Veg Pickle",
    metaDescription:
      "Andhra mutton pickle cooked slowly in traditional masala and packed in glass jars. Made in small batches in Vijayawada — enquire on WhatsApp.",
    h1: "Andhra Mutton Pickle",
    short: "Slow-cooked mutton pickle in deep traditional Andhra masala.",
    description: [
      "Mutton cooked down slowly with pickle masala until it is tender and deeply spiced, then packed under oil.",
      "Made in small batches — send us a WhatsApp message to check current availability and quantity.",
    ],
    features: [
      "Traditional Andhra mutton pickle recipe",
      "Slow cooked in small batches",
      "Packed in glass jars",
      "250 g, 500 g and 1 kg jars",
    ],
    sizes: ["250 g", "500 g", "1 kg"],
    keywords: [
      "Andhra mutton pickle Vijayawada",
      "mutton pickle Vijayawada",
      "traditional mutton pickle",
      "non veg pickle Andhra Pradesh",
    ],
  },
];

export const productBySlug = Object.fromEntries(
  products.map((p) => [p.slug, p]),
) as Record<string, Product>;

export function productsInCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

/** Related products: siblings in the same category, wrapping around the list. */
export function relatedProducts(product: Product, count = 3): Product[] {
  const siblings = productsInCategory(product.category);
  const start = siblings.findIndex((p) => p.slug === product.slug);
  const ring = [...siblings.slice(start + 1), ...siblings.slice(0, start)];
  if (ring.length >= count) return ring.slice(0, count);
  const others = products.filter(
    (p) => p.category !== product.category && !ring.includes(p),
  );
  return [...ring, ...others.slice(0, count - ring.length)];
}

export function productTitle(p: Product): string {
  return p.displayName ?? p.name;
}
