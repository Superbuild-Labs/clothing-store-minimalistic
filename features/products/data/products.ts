import { Product } from "@/features/products/types";

const media = {
  structuredWoolCoat:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBBK1YiCwaRzePAGg2H-qCHIIvIQHfsKD2mTlKbzS_RrnZNrZc25vNsfkHxLax21ORejT9BCCQKugJVul4X6UhClawvoDPMZmhvF4eWjZvIJTm61imJIgBKOc1OENHgaNJU1WkfeEx9-ayrXCpst4F79dSPtvWtID5Anu5HHeWPf_K-pAXWkevkgYetAJatlwSf06LfYZq8JkCNe3_ppMJ6o5662SPtoiy8bSc3w0cykUiNs_vXbkcDenm1pCbOZq2hjJifqB31T0Q",
  cashmereRibbedKnit:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA8JViatezXx-3jYZNoAKjX1cpq8CzKjAy5vFnCX80_ApPBcGX_E_rSQn_Z7RpEjO8r_sB4A1kT9-C4yct5HDIpxc3hmVxH5kMC8MFM5S13JEAafBmlkjpi3y0radTZGhWWuW94ipSy4Z9a_6yOKPz0Hgq0fYjlkkTy8yfnVzIGJC4Cxwi_6JHjUDChclIxNE3-silKCECE1aXHFbgBu30IyrJv1qdtz9kIPMDy4Dd59CWS_mBtPsUgoK8VJRGJQOGLvFuUVwNyQZc",
  silkBiasSlipDress:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA_gQnQNnlefaNHAGFFTfqfs-0ntJ_9nPxZ7Y2OL9-mnRPReLQUP8eqAVZBXnVEwWeDg1kdlaw1VAaIBy272AQpvBOuZDpAo5Rt30cekLB2jHNvzDGBFXIXDNkKrdiOvGwaOj10OZvA3B9BJiVMe6rtso65i_Y8-9rpvPO_SbTrAbyW5xNihzrjUZus0T1SJbqXBlUsSQKu-mdEcyunlfsuMAXLNJvZ8DIHeSV_amrRSv9fspGRslIdnzUYBMnFlyaPgX8OixPnpZ8",
  tailoredWideLegTrouser:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTgyPHgfH93COClzIE4BWPs6cqvIVfH92pyYbTEEMUAZqf1-TwfgsW2yXlhWfAYgZm3ScgxFRjcv8twDYZT_qRn1AHKOQtweIgq93u0CvhFgEC5YIm21LroOVZrgTBo2D8veBPZKMUkhxZWTJI0GFoT-KvQj7H5uybJ5Nqe8T6nhl0wJvP9-vT9sWQ6DHeADGyfRYUu02PafMJ0exqegSrpK2m-Xa_oBkULZSNIeKpgAmTicHtFDgRphOiLWIJUrfqFTD3FdznFY",
  everydayTote:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAKslAI0UgM-9mOuEX4bx99aBbUg3Qbf7l-oHse_oI5jhid9ENb7NLD69T0eJorBLNG5pP6AQxtHFWI2Xm6T0IkS7Dby12vAxFKeNwm4gg1mYB-cVtAXcQWK-c9-A6fIEpqjh0a-1BINr7okzNz_XO0nh5x9h8wh2wbBWGPYCZCugqHZRr_7vDHGZyeQrBBjAJ6sqptcQTuYwimIi3vnhmmRR4XejZWY40L_jYHzqIt11lW0Nw23ST-6frf_Gsmss9ZOEym6pUWnt8",
  poplinOversizedShirt:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqkxmZKPUjd1V2-AN9Ei7y9hmK91N9CbYnaZCFJeJnbhF9tEOv7afeVGetHNEwIfMKVko1vU_vpXEM7MDGslHu1v6vfaDetaCUZsfrOuUpVyvOafAj4KK7T9YRksnu_1c-2s5-u6QbLZBC5dqKqS-6gQrytKqUSp0SusWIm9xlMcGxTyxiewXROnO6NVPXFvtu0q0yjJlv-ug_G6EpZCrAuYunW6_oaqehiEZ7tCHdGOFAf-kEDstggFcFAWaasChvoJcmxe_AL_M",
  sculpturalCeramicVase:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA2DrMqe7lGdKhVJ0bIwAnKcNDmXe0gQXI5pMS_myLlo74O3zx5MRJhplZ2Z_LIm_d0w4WNvqaw8fozB2sYTt48wT8VhTHPEZF3hT5hweROb5HvcHUwuDIba6_ujWmNz-f82q70blA_T5_xdaTpyO8JqFSazUUvcmQdbZT5M3pUcqu8eOwo3bOYmj77nmHYfGDuwppXfZWH4BmyCwvt46oP62NzjftU9Uuu1doI8R1f8m3NmOk1imWfqsqScRda_n9whbEYp_E7Meg",
  merinoWoolKnit:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAUrFKFinPrAPnQzh26oC4KU7--oIQvSLg5HOzTe85EESKuyRXl1fFVQXJPfpPwCr4FQMkXzqkPF5U9oXrCIiOnWGjRUT6Bp0z267pmvLJZWVIOItS41R4IA5iINtVXdboC92dnJPoIJMO95RbxQqlx0yL4eLVy8GAoS5Q8VzFWTonutOsBchLRd491XXCbfxHOHA6EyxO4pOy_lI91nocoZxa8O_N4FSaMVuuVJ4GX6CkrMmGjhuYS2C1pyozaLwuvHkn7fK4G_Ps",
  taupeLeatherCrossbody:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3j8z9bJixXxPmZZqiC9GZwHVW9eAiW9iGqnahrJeNkmnc3oARLUcoO4I-YXp9e-MAuzu_4TTbSQUSTW6j3dSl0of9omIzeGj09VuPdksQfTUn6DZ1RhX6exC4hSCUxitefbpfGDhceIyGlYAzeRitRodgdQAJZ3btpI_p9tUNsFa4caOC_V72Qv4bZ_sDRflojDDPCFNIkfVPdrwmPQLxWJX4epLRQfoX-aSak0V-w9smeplpdtyVAW9I_6Xw87JmOcz_aDO0CAU",
  goldPendantNecklace:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBbrKvqhSwq-jAmI8FVwzg-0JbrIaM8mSm28p1vy9a-WKJlJiYgret2yTTY2AnxDWFCqsXWogCbKS68FiKxhRbg3iC4S1vbxlpbxlEJzOU4wfu3O6QfqN3XoK_vnsLK-OYzYZJslKtRYKROuNtNGeKW6x4d2Peemi8uQJm7mHOF9UZwnfeB_m6x2TgvY6Im0cn1m6zbaEvh5-YQASi8w5mDqJrkmnnz7gYUfoEpT9x9wSEHMFvDnKXa9dxQkimR-IMK6pyz35fHs9g",
  linenOvershirt:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCjuBSzyhNtxrLoThAR97JcvPKgErijeAR2RhrPKG1TxfVbLjd7_Ot21EzIWnVt1-OsQiokVV-tqN5-Zd1kqPLn0IpzsAKusYjucNCcDTCUkgBNihRVp1AKRVp7Iy68slbsLUO2VuIcnQGC3eVDpo_tIeIbk6RbXvF_BS4Ie1a7IeHXiQ2__VEuyPOlpBoUN6cH9_AD0XLRGsOGKIjHW6uSaVC0RcKXYPUKMeeeoJ5KMkW3C6cZCcdE8eoDoxZSZ9Rw2k4vQgaSs9M",
  pleatedWoolTrouser:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYca2MAgZxZ0fE9-zSzmyMBJAe8v_RumZscXAVJ-XGdlV_TH3faO3EL__7iPny3-ZrkrF46ITBFDfgpz5vRqRi7GXSicPJ3qs83lsvhS5jjclXMOcIbodjRibwkjgXF311vfurQiSOS8Ej4Hxxr4XDfWU9wnj4s9NARxzhIDkM-VftM2dF-mhUwBUXuyAUdMyd3sNV27DRhGjHAV-jJwObd80hGl4oXHBKfgHApVSOljhIliqByGKnrWQoHLiPKNuOgBxPmH5N09c",
  coreSatchel:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBOiA3js2TUddRklXuN92h2ftTDNHokKtcZ0je-sHuW7GnF04QBV0F6mlOASsYQqNt_boZnLReMuIDiurrM0AVj5Z5842meAiz86-FRVYhqXTTXGjo-oknitE0Ks3ULdDZa2blVL_7leQT_7tlaxepsCoJudQKLbWonMDLkfNGjbYBY4fhmoyZXh8atKMvtdCNUj2VOPFKioFrpyB-RqIy6cKA7JsiGRoGR4nE5SjPhJtsrLXW3ZxfkvfHLEJ70-7k2pJCejhFkSVM",
  cashmereWrap:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2nylrcY9XtekEr_upIlZaK5TY-kTbPugzCxd0ITFDLJjFGtDmKU7k-yDEeb9_i_PaG2cibrGMBg0prh30A4nULBk242OSIg15OzM3BYNfI4kfhlv1B2Zs-fx5aiLpWinC6aEzJc6GDwtXThsiKPvxXxTbQxhC4IPpSkxyPhc7M3NG-EHm_wCgUX51XSj8NIVqAb0x8QNQJzOye5_VrUPMthhKNJ_apINTD-S1DPmXsBcMamHZs2fUv4ZjhCAgUZjMx2wSwYzvQjk",
  alpacaFront:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfMUqhkrTp9s4OopD1iEEShFXwtw3N06NZUVh0qQkZgMKqM9FDHMonKaHNcdWAlXT2auCjpAhbJqucvfQoqNb_eoPc-Fbw2sxZFbmZDv8YOzCWuf1F-qCrtX76Y8jvvydtpp6hKc9eQvmJMesTSRoSmFOwl6HjuiYvFmwoPe-pSE4-XM3gRnVuXOL4P8XiqPT_dPQe0xR_vLwwYu4Zv21RrTRYYgEym3CVE3ZPes7QmSOz733Eh68Jsa2WsxjbHsCFuV1FlcKDtKs",
  alpacaTexture:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvh8yens50JeWtXxObi4oB1RsSWy4a6sBhZtRJrIERPM0y7_SfIjT68UnzqQQfvJunMKFwNR_2dk9MjKHsfaMZ0ZOAmQXe9GBKIAk8aIDuLpGQ2rc3Kgh4z4_aqMC9xY9MSsTKEl28_Gue3vops4-5hasOrfpnIrDhpKjOPikFS6GxqfCJFk6MuLwkakR5dYkgCMHF8p5zP3jYx_vYKm1zCWtDutalakIQMRLNa4XM1NR2uwa9TqYO7BNTHAPtRmnKlqGc3dx2yNE",
  alpacaBack:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHxxPMw5PpqsXUWEA9QfWRPx0WduwLqLexHasbMGVwGpPV20rKDlkKZCZ-a8zsupW_RydmeYzANfL7AeBebd7-c2e9qSV-xutCGt1lD-Wh8lvo4G9c9PtwpUhBkL1_wXYry83LWAi1yu5WpDZ95Z6NZHY7yf3ZtR0HuLkUV3QBbolZXRBUe5n2XBIr9FrzA9jqSKzMySSKy-KO-ZPAnGMNDDL3qnohuaMm8BP4Fy0GT7CW8EWLSIWhPkfm9ojwI1wOjyIjOJckc_I",
};

export const products: Product[] = [
  {
    id: "alpaca-coat",
    name: "The Alpaca Coat",
    price: 1250,
    description:
      "Spun from fine Peruvian alpaca, this relaxed silhouette layers easily over winter tailoring while maintaining a refined drape.",
    category: "Outerwear",
    material: "Baby Alpaca Blend",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Stone", "Camel"],
    images: [media.alpacaFront, media.alpacaTexture, media.alpacaBack],
    featured: true,
    badge: "Limited Studio Drop",
  },
  {
    id: "structured-wool-coat",
    name: "The Structured Wool Coat",
    price: 895,
    description:
      "Architectural shoulders and a sculpted line give this coat a tailored editorial shape for everyday city dressing.",
    category: "Outerwear",
    material: "Double-Faced Wool",
    sizes: ["S", "M", "L"],
    colors: ["Soft Beige"],
    images: [media.structuredWoolCoat],
    featured: true,
  },
  {
    id: "cashmere-ribbed-knit",
    name: "Cashmere Ribbed Knit",
    price: 450,
    description:
      "A plush ribbed knit with subtle volume designed to sit softly on the body.",
    category: "Knitwear",
    material: "100% Cashmere",
    sizes: ["XS", "S", "M"],
    colors: ["Oatmeal"],
    images: [media.cashmereRibbedKnit],
    featured: true,
  },
  {
    id: "silk-bias-slip-dress",
    name: "Silk Bias Slip Dress",
    price: 320,
    description:
      "Cut on the bias for movement, this satin-finish dress glides with a fluid silhouette.",
    category: "Dresses",
    material: "Silk Satin",
    sizes: ["XS", "S", "M"],
    colors: ["Charcoal"],
    images: [media.silkBiasSlipDress],
    featured: true,
  },
  {
    id: "tailored-wide-leg-trouser",
    name: "Tailored Wide-Leg Trouser",
    price: 380,
    description:
      "High-rise tailored volume with a relaxed break at the hem for a modern proportion.",
    category: "Trousers",
    material: "Virgin Wool Twill",
    sizes: ["30", "32", "34"],
    colors: ["Taupe"],
    images: [media.tailoredWideLegTrouser],
  },
  {
    id: "everyday-tote",
    name: "The Everyday Tote",
    price: 650,
    description:
      "A softly structured carryall in rich leather with a clean line and generous interior.",
    category: "Accessories",
    material: "Pebbled Leather",
    sizes: ["OS"],
    colors: ["Chestnut"],
    images: [media.everydayTote],
  },
  {
    id: "poplin-oversized-shirt",
    name: "Poplin Oversized Shirt",
    price: 245,
    description:
      "Crisp poplin proportions softened with a relaxed shoulder and elongated cuff.",
    category: "Shirts",
    material: "Cotton Poplin",
    sizes: ["S", "M", "L"],
    colors: ["White"],
    images: [media.poplinOversizedShirt],
  },
  {
    id: "linen-overshirt",
    name: "The Linen Overshirt",
    price: 185,
    description:
      "An airy overshirt with brushed texture and relaxed tailoring for transitional layers.",
    category: "Shirts",
    material: "European Linen",
    sizes: ["S", "M", "L"],
    colors: ["Ivory"],
    images: [media.linenOvershirt],
  },
  {
    id: "pleated-wool-trouser",
    name: "Pleated Wool Trouser",
    price: 240,
    description:
      "Single-pleat wool trousers with a soft drape and clean, slightly cropped length.",
    category: "Trousers",
    material: "Wool Blend",
    sizes: ["30", "32", "34"],
    colors: ["Charcoal"],
    images: [media.pleatedWoolTrouser],
  },
  {
    id: "sculptural-ceramic-vase",
    name: "Sculptural Ceramic Vase",
    price: 120,
    description:
      "A gallery-inspired ceramic form for branches, dried florals, or standalone styling.",
    category: "Home",
    material: "Hand-Glazed Ceramic",
    sizes: ["OS"],
    colors: ["Dune"],
    images: [media.sculpturalCeramicVase],
  },
  {
    id: "merino-wool-knit",
    name: "Merino Wool Knit",
    price: 285,
    description:
      "Fine-gauge merino with breathable warmth and a softly tactile finish.",
    category: "Knitwear",
    material: "Merino Wool",
    sizes: ["S", "M", "L"],
    colors: ["Peach"],
    images: [media.merinoWoolKnit],
  },
  {
    id: "taupe-leather-crossbody",
    name: "Taupe Leather Crossbody",
    price: 450,
    description:
      "A compact crossbody with curved flap construction and understated hardware.",
    category: "Accessories",
    material: "Textured Leather",
    sizes: ["OS"],
    colors: ["Taupe"],
    images: [media.taupeLeatherCrossbody],
  },
  {
    id: "gold-pendant-necklace",
    name: "Gold Pendant Necklace",
    price: 195,
    description:
      "A minimal pendant suspended from a delicate chain for everyday layering.",
    category: "Jewelry",
    material: "Gold Plated Brass",
    sizes: ["16 in", "18 in"],
    colors: ["Gold"],
    images: [media.goldPendantNecklace],
  },
  {
    id: "core-satchel",
    name: "The Core Satchel",
    price: 450,
    description:
      "A compact structured satchel with smooth form and polished top handle.",
    category: "Accessories",
    material: "Calfskin",
    sizes: ["OS"],
    colors: ["Bone White"],
    images: [media.coreSatchel],
  },
  {
    id: "cashmere-wrap",
    name: "Cashmere Wrap",
    price: 240,
    description:
      "A generous wrap with plush handfeel for travel, layering, and evening warmth.",
    category: "Accessories",
    material: "Cashmere Blend",
    sizes: ["OS"],
    colors: ["Oatmeal"],
    images: [media.cashmereWrap],
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export const productCategories = [
  "All",
  ...new Set(products.map((product) => product.category)),
] as const;

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(id: string, limit = 4) {
  const product = getProductById(id);
  if (!product) {
    return products.slice(0, limit);
  }

  const related = products.filter(
    (item) => item.id !== id && item.category === product.category,
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = products.filter(
    (item) => item.id !== id && item.category !== product.category,
  );

  return [...related, ...fallback].slice(0, limit);
}
