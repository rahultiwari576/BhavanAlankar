export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subCategory?: string; // Premium, Popular, Economy
  tagline: string;
  description: string;
  images: string[];
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  specifications: {
    coverage: string;
    dryingTime: string;
    recoatTime: string;
    finishType: string;
    dilution: string;
    warranty: string;
  };
  applicationSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  features: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  price: {
    basePrice: number;
    unit: string;
  };
  downloads: {
    tds: string;
    msds: string;
  };
}

// Product image URLs from nerolac.com
// Pattern: https://www.nerolac.com/sites/default/files/2025-09/Product-Name.png
// Based on actual img tags from nerolac.com
const getProductImages = (slug: string, category: string): string[] => {
  // Map of product slugs to their nerolac.com image URLs
  // Extracted from actual img tags on nerolac.com
  const productImageMap: Record<string, string[]> = {
    "impressions-kashmir-high-sheen": [
      "https://www.nerolac.com/sites/default/files/2025-02/Nerolac-Impressions-Kashmir-High-Sheen_Cheatshot_R1.png"
    ],
    "impressions-hd": [
      "https://www.nerolac.com/sites/default/files/2022-11/Impressions%20HD_0.png"
    ],
    "impressions-sheen": [
      "https://www.nerolac.com/sites/default/files/2024-12/205x258.png"
    ],
    "beauty-gold-washable": [
      "https://www.nerolac.com/sites/default/files/2025-05/205-x-258.png"
    ],
    "beauty-gold": [
      "https://www.nerolac.com/sites/default/files/2022-10/Beauty-Gold.png"
    ],
    "beauty-sheen": [
      "https://www.nerolac.com/sites/default/files/2022-10/Nerolac-Beauty-Sheen.png"
    ],
    "beauty-little-master-sheen": [
      "https://www.nerolac.com/sites/default/files/2023-12/2023-10-1502_Nerolac_BLMS-Website-Banners_Product-Packshot_%28H%29205x248%20%281%29.png"
    ],
    "little-master": [
      "https://www.nerolac.com/sites/default/files/2022-10/Little-Master.png"
    ],
    "beauty-little-master": [
      "https://www.nerolac.com/sites/default/files/2022-10/Little-Master.png"
    ],
    "texture-paint": [
      "https://www.nerolac.com/sites/default/files/2025-07/Texture%20-%2020kg%20Bucket.png"
    ],
    // "neu-latex-interior-paint": [
    //   "https://www.nerolac.com/sites/default/files/2025-09/Neu-Latex-Interior-Paint.png"
    // ],
    // "beauty-smooth-wow-white": [
    //   "https://www.nerolac.com/sites/default/files/2025-06/Nerolac-Beauty-Smooth_WOW-WHITE_Cheat-shot_Layered-Master_Opt-1_R1_Low-Res.png"
    // ],
    // "impressions-kashmir": [
    //   "https://www.nerolac.com/sites/default/files/2022-10/Impressions-Kashmir.png"
    // ],
    // "kashmir-matt": [
    //   "https://www.nerolac.com/sites/default/files/2025-02/Nerolac-Impressions-Kashmir-Matt_Cheatshot_R1%20%281%29.png"
    // ],
    "nerolac-wonderwood": [
      "https://www.nerolac.com/sites/default/files/2025-09/Nerolac-Wonderwood.png"
    ],
    "nerolac-italian": [
      "https://www.nerolac.com/sites/default/files/2025-09/Nerolac-Italian.png"
    ],
    "wood-ancillary": [
      "https://www.nerolac.com/sites/default/files/2025-09/Wood-Ancillary.png"
    ],
    "nerolac-pu-enamel-10-in-1": [
      "https://www.nerolac.com/sites/default/files/2022-10/pu-enamel-10-in-1.png"
    ],
    "nerolac-synthetic-hi-gloss-enamel": [
      "https://www.nerolac.com/sites/default/files/2022-10/Synthetic_Enamel_Hi-Gloss.png"
    ],
    "nerolac-satin-enamel": [
      "https://www.nerolac.com/sites/default/files/2022-10/Satin_Enamel.png"
    ],
    "nerolac-zinc-yellow-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "nerolac-premium-primer-st": [
      "https://www.nerolac.com/sites/default/files/2022-10/premium-primer-sb-tin-3d-pack.png"
    ],
    "nerolac-premium-primer-wb": [
      "https://www.nerolac.com/sites/default/files/2022-10/premium-primer-wb-tub-pack-shot-r-01-lo-res.png"
    ],
    "nerolac-popular-primer-st": [
      "https://www.nerolac.com/sites/default/files/2022-10/popular-primer-sb-tin-3d-pack_0.png"
    ],
    "nerolac-popular-primer-wb": [
      "https://www.nerolac.com/sites/default/files/2022-10/popular-primer-wb-tub-3d-pack-lo-res.png"
    ],
    "exterior-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/Exterior_Primer.png"
    ],
    "nerolac-red-oxide-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/Goody_Red_Oxide_metal_Primer.png"
    ],
    "nerolac-red-oxide-metal-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/Red_Oxide_metal_Primer.png"
    ],
    "nerolac-alkali-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "nerolac-wood-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "nerolac-cement-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "nerolac-economy-primer": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "wall-putty-acrylic": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-acrylic-wall-putty_0.png"
    ],
    "nerolac-cement-putty": [
      "https://www.nerolac.com/sites/default/files/2022-10/Cement_Putty.png"
    ],
    "putty-filler-grey-knifing": [
      "https://www.nerolac.com/sites/default/files/2022-10/Putty_filler_grey_knifing.png"
    ],
    "paint-roller": [
      "https://m.media-amazon.com/images/I/61ergedBOHL._AC_SL1500_.jpg"
    ],
    "paint-brush": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Paintbrush.jpg/800px-Paintbrush.jpg"
    ],
    "nerolac-paint-rollers": [
      "https://m.media-amazon.com/images/I/61ergedBOHL._AC_SL1500_.jpg"
    ],
    "nerolac-nerofix-masking-tape": [
      "https://m.media-amazon.com/images/I/71BUEb21tHL._SL1500_.jpg"
    ],
    "nerolac-sandpaper": [
      "https://m.media-amazon.com/images/I/71u8H46mJXS._SL1500_.jpg"
    ],
    "nerolac-roll-paper": [
      "https://m.media-amazon.com/images/I/71yR49M-oSL._SL1500_.jpg"
    ],
    "nerolac-dhalai-plastic": [
      "https://m.media-amazon.com/images/I/71yR49M-oSL._SL1500_.jpg"
    ],
    "nerolac-paint-strainers": [
      "https://images-na.ssl-images-amazon.com/images/I/712BbDQqM8L._AC_SL1500_.jpg"
    ],
    "gypsum-po": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "nerolac-perma-crystal-seal": [
      "https://www.nerolac.com/sites/default/files/2024-05/Nerolac-Waterproof-Crystal-Seal-Packshot-new%20%281%29.png"
    ],
    "nerolac-perma-no-heat": [
      "https://www.nerolac.com/sites/default/files/2025-05/Perma%20No%20Heat_Packtshot_R2_205X258.png"
    ],
    "impressions-glitter-finish": [
      "https://www.nerolac.com/sites/default/files/2025-09/Impressions-Glitter-Finish.png"
    ],
    "nerolac-impressions-ideaz": [
      "https://www.nerolac.com/sites/default/files/2025-09/Nerolac-Impressions-Ideaz.png"
    ],
    "nerolac-impressions-metallic-finish": [
      "https://www.nerolac.com/sites/default/files/2025-09/Nerolac-Impressions-Metallic-Finish.png"
    ],
    "kansai-select": [
      "https://www.nerolac.com/sites/default/files/2025-09/Kansai-Select.png"
    ],
    "excel-everlast-12": [
      "https://www.nerolac.com/sites/default/files/2025-11/Everlast_0.png"
    ],
    "excel-total": [
      "https://www.nerolac.com/sites/default/files/2022-10/Excel-Total.png"
    ],
    "excel-no-dust": [
      "https://www.nerolac.com/sites/default/files/2025-09/Excel-No-Dust.png"
    ],
    "suraksha-sheen": [
      "https://www.nerolac.com/sites/default/files/2022-10/Nerolac-Suraksha-sheen.png"
    ],
    "suraksha": [],
    "excel-mica-marble-stretch-sheen-nxt": [
      "https://www.nerolac.com/sites/default/files/2025-09/Neroalc-Excel-Mica-Marble-Strech-Sheen-%26-Mica-Marble_1.png"
    ],
    "mica-marble-stretch-sheen": [
      "https://www.nerolac.com/sites/default/files/2025-09/Neroalc-Excel-Mica-Marble-Strech-Sheen-%26-Mica-Marble_1.png"
    ],
    "adhesive": [
      "https://www.nerolac.com/sites/default/files/2025-09/Adhesive.png"
    ],
    "wonderwood-gloria-epoxy-primer": [
      "https://www.nerolac.com/sites/default/files/2024-12/205-x-258_0001_Gloria-Epoxy-Primer-Tin_3D-Pack_R2_Hi-Res.png"
    ],
    "wonderwood-nc-sanding-sealer": [
      "https://www.nerolac.com/sites/default/files/2025-01/Woodcoat-NC-Sealer_TIN_205x258.png"
    ],
    "wonderwood-melamine": [
      "https://www.nerolac.com/sites/default/files/2024-10/Woodcoat-Melamine_TIN_205x258_1.png"
    ],
    "wonderwood-gloria-2k-pu-interior": [
      "https://www.nerolac.com/sites/default/files/2024-10/Wonderwood-2K-PU-Interior.png"
    ],
    "wonderwood-gloria-2k-pu-exterior": [
      "https://www.nerolac.com/sites/default/files/2024-10/Wonderwood-2K-PU-Interior.png"
    ],
    "wonderwood-2k-pu-italian": [
      "https://www.nerolac.com/sites/default/files/2025-01/NerolacWoodcoatItalian-2KPU-Interior_TIN_3DPack_R2_205x258.png"
    ],
    "wonderwood-gloria": [
      "https://www.nerolac.com/sites/default/files/2024-12/NerolacWoodcoatWonderwoodGloria_TIN_3DPack_R1_Lo-Res_205x258_0.png"
    ],
    "nerolac-beauty-acrylic-distemper": [
      "https://www.nerolac.com/sites/default/files/styles/product_image/public/2025-01/Beauty-Acrylic-Distemper-205x258.png"
    ],
    "nerolac-acrylic-wall-putty": [
      "https://www.nerolac.com/sites/default/files/styles/product_image/public/2025-01/Nerolac-Wall-Putty-205x258.png"
    ],

  };

  // Return mapped images or default placeholder
  if (slug === "suraksha-sheen") {
    return productImageMap[slug] || [
      "https://www.nerolac.com/sites/default/files/2022-10/Nerolac-Suraksha-sheen.png"
    ];
  }

  return productImageMap[slug] || [
    "https://www.nerolac.com/sites/default/files/2025-07/Texture%20-%2020kg%20Bucket.png"
  ];
};

// Helper function to create product with default structure
const createProduct = (
  id: string,
  slug: string,
  name: string,
  category: string,
  subCategory: string,
  tagline: string,
  description: string,
  basePrice: number
): Product => ({
  id,
  slug,
  name,
  category,
  subCategory,
  tagline,
  description,
  images: getProductImages(slug, category),
  benefits: [
    {
      icon: "shield",
      title: "Premium Quality",
      description: "Manufactured with highest quality standards and advanced technology.",
    },
    {
      icon: "award",
      title: "Certified Excellence",
      description: "Meets all industry quality standards.",
    },
  ],
  specifications: {
    coverage: "120-140 sq ft per liter per coat",
    dryingTime: "2-4 hours (surface dry)",
    recoatTime: "4-6 hours minimum",
    finishType: "Smooth Matte",
    dilution: "30-40% with clean water",
    warranty: "5-10 years",
  },
  applicationSteps: [
    {
      step: 1,
      title: "Surface Preparation",
      description: "Clean and prepare the surface by removing dust, dirt, and loose particles.",
    },
    {
      step: 2,
      title: "Primer Application",
      description: "Apply suitable primer coat and allow it to dry completely.",
    },
    {
      step: 3,
      title: "Topcoat Application",
      description: "Apply 2-3 coats of paint with proper drying time between coats.",
    },
  ],
  features: [
    "Premium Quality",
    "Long Lasting",
    "Easy Application",
    "Wide Color Range",
  ],
  colors: [
    { name: "Pure White", hex: "#FFFFFF" },
    { name: "Ivory White", hex: "#FFFFF0" },
    { name: "Cream", hex: "#FFFDD0" },
    { name: "Light Gray", hex: "#D3D3D3" },
  ],
  price: {
    basePrice,
    unit: "per liter",
  },
  downloads: {
    tds: `/downloads/${slug}-tds.pdf`,
    msds: `/downloads/${slug}-msds.pdf`,
  },
});

export const products: Product[] = [
  // ============================================
  // INTERIOR WALL PAINTS
  // ============================================
  // {
  //   ...createProduct(
  //     "1",
  //     "neu-latex-interior-paint",
  //     "Neu Latex Interior Paint",
  //     "Interior Wall Paints",
  //     "Premium",
  //     "Economical Water Thinnable Interior Paint",
  //     "Nerolac Neu Latex Interior Paint is an economical water thinnable paint specially designed for application on interior walls with good washability.",
  //     850
  //   ),
  //   features: ["Superior Smoothness", "Good Flow & Levelling", "Good Washability", "Good Ease Of Application", "Higher Coverage", "Better Durability", "Water Thinnable", "Economical"],
  //   specifications: {
  //     coverage: "120-140 sq ft per liter per coat",
  //     dryingTime: "2-4 hours (surface dry)",
  //     recoatTime: "4-6 hours minimum",
  //     finishType: "Smooth Finish",
  //     dilution: "30-40% with clean water",
  //     warranty: "5-10 years",
  //   },
  // },
  // {
  //   ...createProduct(
  //     "2",
  //     "beauty-smooth-wow-white",
  //     "Beauty Smooth WOW White",
  //     "Interior Wall Paints",
  //     "Popular",
  //     "Enhanced Whiteness with Smooth Finish",
  //     "Nerolac Beauty Smooth WOW White is a specially developed Whitest White, economical interior emulsion for a distinctly rich and smooth finish. Its optimum performance with respect to decoration and protection, is through an ideal combination of pigments and extenders, dispersed in a copolymer emulsion.",
  //     550
  //   ),
  //   features: ["Enhanced Whiteness", "Smooth Finish", "Bright Appearance", "Easy Application", "Excellent Coverage"],
  // },
  {
    ...createProduct(
      "3",
      "impressions-kashmir-high-sheen",
      "Impressions Kashmir High sheen",
      "Interior Wall Paints",
      "Premium",
      "Luxurious High Sheen Finish",
      "Nerolac Impressions Kashmir High Sheen offers a top-notch sheen and a smooth and luxurious finish to the walls. It is based on Silver Ion Technology that kills 99% of bacteria on the painted surface and makes the environment at home safe and healthy.",
      1100
    ),
    features: ["No Smell", "Top-Notch Sheen", "Smooth & Luxurious Finish", "Silver Ion Technology", "Kills 99% Bacteria", "Anti-Viral Performance", "Anti-Fungal Performance", "Anti-Bacterial Performance", "Outstanding Washability", "Excellent Stain Resistance", "Superior Flow & Levelling", "Easy Application", "Long Lasting"],
    specifications: {
      coverage: "120-140 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "High Sheen",
      dilution: "30-40% with clean water",
      warranty: "8 years",
    },
  },
  {
    ...createProduct(
      "4",
      "impressions-hd",
      "Impressions HD",
      "Interior Wall Paints",
      "Premium",
      "High Definition Color Technology",
      "A water based luxury emulsion paint that gives your walls an exquisite look with clear HD colours and a rich smooth finish.",
      1050
    ),
    features: ["HD Technology", "Stain Resistant", "Fade Resistant", "Smooth Finish", "Vibrant Colors", "Long Lasting", "Excellent Color Retention"],
  },
  // {
  //   ...createProduct(
  //     "5",
  //     "impressions-kashmir",
  //     "Impressions Kashmir",
  //     "Interior Wall Paints",
  //     "Premium",
  //     "Superior Quality Acrylic Emulsion",
  //     "Nerolac Impressions Kashmir Luxury Emulsion is a superior quality 100% acrylic emulsion based interior wall paint with germ killing formula.",
  //     1000
  //   ),
  //   features: ["100% Acrylic", "Luxurious Finish", "Superior Quality", "Excellent Durability", "Superior Washability", "Stain Resistant", "Excellent Color Retention"],
  // },
  // {
  //   ...createProduct(
  //     "6",
  //     "kashmir-matt",
  //     "Kashmir Matt",
  //     "Interior Wall Paints",
  //     "Premium",
  //     "Premium Matt Finish",
  //     "Nerolac Impressions Kashmir Matt offers a top-class smooth matt finish that hides wall imperfections and gives a luxurious appeal to the walls. It is based on Silver Ion Technology that kills 99% of bacteria on the painted surface and ensures a safe and healthy environment at home.",
  //     950
  //   ),
  //   features: ["Top-Class Smooth Matt Finish", "Hides Wall Imperfections", "Silver Ion Technology", "Kills 99% Bacteria", "Anti-Viral Performance", "Anti-Fungal Performance", "Anti-Bacterial Performance", "Outstanding Washability", "Excellent Stain Resistance", "Superior Flow & Levelling", "Easy Application", "Long Lasting"],
  // },
  {
    ...createProduct(
      "7",
      "impressions-sheen",
      "Impressions Sheen",
      "Interior Wall Paints",
      "Premium",
      "Elegant Sheen Finish",
      "Nerolac Impressions Sheen Emulsion adds a radiant touch to your walls with a smooth, fast-drying finish. Its superior stain resistance, washability, and anti-fungal properties keep your walls looking fresh for years.",
      980
    ),
    features: ["Sheen Finish", "Elegant Look", "Superior Quality", "Beautiful Appearance"],
  },
  {
    ...createProduct(
      "8",
      "beauty-gold-washable",
      "Beauty Gold Washable",
      "Interior Wall Paints",
      "Popular",
      "Soft Sheen with Excellent Washability",
      "Nerolac Beauty Gold Washable paint has a soft sheen ﬁnish, with excellent stain-cleanability at an aﬀordable price.",
      650
    ),
    features: ["Washable", "Soft Sheen", "Stain Resistant", "Easy Maintenance", "Good Coverage", "High Traffic Areas"],
  },
  {
    ...createProduct(
      "45",
      "beauty-gold",
      "Beauty Gold",
      "Interior Wall Paints",
      "Popular",
      "Premium Acrylic Emulsion",
      "Nerolac Beauty GOLD is a specially formulated emulsion paint based on a durable copolymer resin, high opacity, micronised pigments, and additives to give better, beautifying and stain resistance properties.",
      600
    ),
    features: ["Smooth Matt Finish", "Excellent Flow", "Fungal Resistance", "Anti-Bacterial", "Durable", "Economical"],
  },
  {
    ...createProduct(
      "49",
      "beauty-sheen",
      "Beauty Sheen",
      "Interior Wall Paints",
      "Popular",
      "Premium Sheen Finish",
      "Nerolac Beauty Sheen is a value for money emulsion with excellent sheen ﬁnish, good coverage and durability.",
      620
    ),
    features: ["Sheen Finish", "Value for Money", "Good Coverage", "Durable", "Bright Finish"],
  },
  {
    ...createProduct(
      "50",
      "beauty-little-master-sheen",
      "Beauty Little Master Sheen",
      "Interior Wall Paints",
      "Popular",
      "Economy Sheen Emulsion",
      "Nerolac Beauty Little Master Sheen is an Economy Interior Wall Emulsion with very good sheen, smoothness, coverage & durability.",
      480
    ),
    features: ["Economy Sheen", "Smoothness", "Coverage", "Durable", "Excellent Whiteness"],
  },
  {
    ...createProduct(
      "46",
      "little-master",
      "Little Master",
      "Interior Wall Paints",
      "Popular",
      "Economical Interior Emulsion",
      "Nerolac Little Master is an economical interior acrylic emulsion paint designed to provide a smooth, pleasing matt finish. It offers better whiteness, opacity, and coverage compared to normal distemper.",
      450
    ),
    features: ["Economical", "Smooth Matt Finish", "Good Coverage", "Better Whiteness", "Low VOC", "Washable"],
  },
  {
    ...createProduct(
      "47",
      "beauty-little-master",
      "Beauty Little Master",
      "Interior Wall Paints",
      "Popular",
      "Smooth Finish Emulsion",
      "Nerolac Beauty Little Master is an interior wall paint available in sheen and matt finishes, offering superior whitening, opacity, and coverage.",
      500
    ),
    features: ["Smooth Finish", "Superior Whiteness", "High Opacity", "Washable", "Low VOC", "Durable"],
  },
  {
    ...createProduct(
      "48",
      "texture-paint",
      "Texture Paint",
      "Interior Textures",
      "Premium",
      "Decorative Texture Designs",
      "Nerolac Texture Paint offers a diverse range of texture designs to add depth, character, and style to interior walls. Transform plain surfaces into visually engaging focal points.",
      1000
    ),
    features: ["Decorative Textures", "Unique Designs", "Depth & Character", "Customizable", "Premium Finish"],
  },

  // ============================================
  // EXTERIOR WALL PAINTS
  // ============================================
  {
    ...createProduct(
      "51",
      "excel-everlast-12",
      "Excel Everlast 12",
      "Exterior Wall Paints",
      "Premium",
      "12-Year Performance Warranty",
      "Nerolac Excel Everlast 12 is a high-performance exterior emulsion paint that offers a 12-year performance warranty. It provides excellent protection against algae and fungi and keeps the walls looking new for years.",
      850
    ),
    features: ["12 Year Warranty", "Anti-Algal", "Anti-Fungal", "Dirt Pick-up Resistance", "Excellent Sheen", "Heat Guard Technology"],
  },
  {
    ...createProduct(
      "52",
      "excel-total",
      "Excel Total",
      "Exterior Wall Paints",
      "Premium",
      "All-in-One Exterior Protection",
      "Nerolac Excel Total is a long-lasting, water-based premium exterior paint. It offers excellent dirt pick-up resistance, water repellency, and resistance to algae growth, ensuring comprehensive protection for your home's exterior.",
      750
    ),
    features: ["Excellent Dirt Pick-up Resistance", "Water Repellent", "Anti-Algal", "Long Lasting", "Excellent Sheen", "UV Resistant"],
  },
  {
    ...createProduct(
      "53",
      "excel-no-dust",
      "Excel No Dust",
      "Exterior Wall Paints",
      "Premium",
      "Dust Resistant Exterior Paint",
      "Nerolac Excel No Dust is an acrylic emulsion paint formulated for exterior use. It features superior dust resistance, keeping your walls clean and fresh for a longer period.",
      700
    ),
    features: ["Dust Resistant", "Soft Sheen", "6 Year Warranty", "Anti-Algal", "Low VOC", "Washable"],
  },
  {
    ...createProduct(
      "54",
      "suraksha-sheen",
      "Suraksha Sheen",
      "Exterior Wall Paints",
      "Popular",
      "Superior Sheen & Durability",
      "Nerolac Suraksha Sheen is a water-based exterior emulsion designed to impart a best-in-class sheen and luxurious appearance to exterior walls along with long-lasting performance.",
      550
    ),
    features: ["2X Sheen", "High Durability", "Algae & Fungal Resistance", "Good Coverage", "Economical", "Bright Finish"],
  },
  {
    ...createProduct(
      "55",
      "suraksha",
      "Suraksha",
      "Exterior Wall Paints",
      "Popular",
      "Economical Exterior Protection",
      "Nerolac Suraksha is a quality acrylic exterior emulsion paint that provides good protection to the walls against algae and fungus.",
      450
    ),
    features: ["Economical", "Good Coverage", "Anti-Algal", "Anti-Fungal", "Durable", "Ease of Application"],
  },
  {
    ...createProduct(
      "56",
      "excel-mica-marble-stretch-sheen-nxt",
      "Excel Mica Marble Stretch Sheen Nxt",
      "Exterior Wall Paints",
      "Premium",
      "Stretchable Film Technology",
      "Nerolac Excel Mica Marble Stretch Sheen Nxt is an extremely durable, high-performance exterior paint with unique stretchable film technology that covers hairline cracks.",
      950
    ),
    features: ["Stretchable Film", "Crack Bridging", "Mica Marble Finish", "High Sheen", "6 Year Waterproofing Warranty", "Dirt Pick-up Resistance"],
  },
  {
    ...createProduct(
      "57",
      "mica-marble-stretch-sheen",
      "Mica Marble Stretch Sheen",
      "Exterior Wall Paints",
      "Premium",
      "Premium Marble Finish",
      "Nerolac Mica Marble Stretch Sheen offers a smooth, glossy finish with a luxurious sheen. It contains mica and marble flakes for a unique, rich appearance.",
      900
    ),
    features: ["Unique Marble Finish", "High Gloss", "Durable", "Aesthetic Appeal", "Excellent Adhesion", "Weather Resistant"],
  },

  // ============================================
  // WOOD COATINGS
  // ============================================
  {
    ...createProduct(
      "13",
      "wonderwood-gloria-epoxy-primer",
      "Wonderwood Gloria Epoxy Primer",
      "Wood Coatings",
      "Premium",
      "High-Performance Epoxy-Based Wood Primer",
      "Nerolac Wonderwood Gloria Epoxy Primer is a high-performance, two-component, epoxy-based primer formulated for wood surfaces. It provides excellent adhesion, durability, and protection, serving as a solid foundation for subsequent topcoats.",
      950
    ),
    features: ["Two-Component Epoxy", "Excellent Adhesion", "Corrosion Resistant", "Durable Finish", "Smooth Surface Preparation", "Fast Drying", "Water Resistant", "Interior & Exterior Use"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "14",
      "wonderwood-nc-sanding-sealer",
      "Wonderwood NC Sanding Sealer",
      "Wood Coatings",
      "Premium",
      "Quick-Drying Wood Sanding Sealer",
      "Nerolac Wonderwood NC Sanding Sealer is a quick-drying wood sanding sealer that delivers a smooth finish with excellent filling properties, recommended for filling wood grains before applying topcoats.",
      850
    ),
    features: ["Quick Drying", "Excellent Filling Properties", "Smooth Finish", "Grain Filling", "Easy Sanding", "Good Build", "Recommended for Topcoat Preparation"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-3 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Sealer",
      dilution: "As per manufacturer's instructions",
      warranty: "3-5 years",
    },
  },
  {
    ...createProduct(
      "15",
      "wonderwood-melamine",
      "Wonderwood Melamine",
      "Wood Coatings",
      "Premium",
      "Two-Component Acid Catalyzed Wood Finish",
      "Nerolac Wonderwood Melamine is a two-component acid catalyzed wood finish that creates a tough and durable coating on various wood types, veneer, and medium-density fiberboard, offering excellent stain resistance.",
      1100
    ),
    features: ["Two-Component System", "Acid Catalyzed", "Tough & Durable", "Excellent Stain Resistance", "Suitable for Wood, Veneer & MDF", "High Performance", "Professional Grade"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "Satin / Matt",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "16",
      "wonderwood-gloria-2k-pu-interior",
      "Wonderwood Gloria 2K PU Interior",
      "Wood Coatings",
      "Premium",
      "Luxury Two-Component Polyurethane Wood Coating",
      "Nerolac Wonderwood Gloria 2K PU Interior is a luxury two-component polyurethane wood coating specifically formulated for interior wooden furniture and veneers, providing a tough film with excellent scratch and stain resistance and fast drying properties.",
      1400
    ),
    features: ["Two-Component PU", "Luxury Finish", "Excellent Scratch Resistance", "Superior Stain Resistance", "Fast Drying", "Tough Film", "Interior Furniture Specialist", "High Gloss"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "High Gloss",
      dilution: "As per manufacturer's instructions",
      warranty: "7 years",
    },
  },
  {
    ...createProduct(
      "17",
      "wonderwood-gloria-2k-pu-exterior",
      "Wonderwood Gloria 2K PU Exterior",
      "Wood Coatings",
      "Premium",
      "Weather-Resistant Exterior Wood Coating",
      "Nerolac Wonderwood Gloria 2K PU Exterior is specially formulated for exterior wooden surfaces with weather resistance and non-yellowing properties, providing long-lasting protection against harsh outdoor conditions.",
      1500
    ),
    features: ["Weather Resistant", "Non-Yellowing", "UV Protection", "Two-Component PU", "Exterior Specialist", "Durable Protection", "Long Lasting", "High Gloss"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "High Gloss",
      dilution: "As per manufacturer's instructions",
      warranty: "7 years",
    },
  },
  {
    ...createProduct(
      "18",
      "wonderwood-2k-pu-italian",
      "Wonderwood 2K PU Italian",
      "Wood Coatings",
      "Premium",
      "Italian Style Premium Wood Finish",
      "Nerolac Wonderwood 2K PU Italian provides an elegant Italian-style finish for wood surfaces with superior gloss, scratch resistance, and luxurious appearance, perfect for high-end furniture and interiors.",
      1600
    ),
    features: ["Italian Style Finish", "Premium Quality", "Superior Gloss", "Excellent Scratch Resistance", "Luxurious Appearance", "Two-Component PU", "High-End Furniture", "Professional Grade"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "High Gloss",
      dilution: "As per manufacturer's instructions",
      warranty: "7 years",
    },
  },
  {
    ...createProduct(
      "19",
      "wonderwood-filodent",
      "Wonderwood Filodent",
      "Wood Coatings",
      "Popular",
      "Wood Filler and Grain Sealer",
      "Nerolac Wonderwood Filodent is a specialized wood filler and grain sealer designed to fill wood pores and grains, creating a smooth surface for finishing coats. Ideal for preparing wood surfaces before applying topcoats.",
      700
    ),
    features: ["Wood Filler", "Grain Sealer", "Smooth Surface", "Easy Application", "Good Filling Properties", "Surface Preparation", "Economical"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Filler/Sealer",
      dilution: "As per manufacturer's instructions",
      warranty: "3 years",
    },
  },
  {
    ...createProduct(
      "20",
      "wonderwood-gloria",
      "Wonderwood Gloria",
      "Wood Coatings",
      "Premium",
      "Premium Wood Coating System",
      "Nerolac Wonderwood Gloria is a premium wood coating system offering exceptional durability and aesthetic appeal. Part of the Gloria range, it provides excellent protection and beautiful finish for wood surfaces.",
      1200
    ),
    features: ["Premium Quality", "Durable Finish", "Aesthetic Appeal", "Wood Protection", "Gloria Range", "Professional Grade", "Long Lasting"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "High Gloss / Satin",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },

  // ============================================
  // METAL ENAMEL PAINTS
  // ============================================
  {
    ...createProduct(
      "16",
      "nerolac-pu-enamel-10-in-1",
      "Nerolac PU Enamel 10 in 1",
      "Metal Enamel Paints",
      "Premium",
      "Polyurethane Modified Enamel - 10 in 1 Benefits",
      "Nerolac PU Enamel 10 in 1 is a PU modified Alkyd based general purpose enamel for the protection of Metal, Wood & Masonry substrate.",
      800
    ),
    features: ["10-in-1 Benefits", "Rust Protection", "Weather Resistant", "Scratch Resistant", "Chemical Resistant", "Multi-Surface", "Hi-Gloss Finish", "Durable"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "Hi-Gloss",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "17",
      "nerolac-synthetic-hi-gloss-enamel",
      "Nerolac Synthetic Hi-Gloss Enamel",
      "Metal Enamel Paints",
      "Popular",
      "High-Quality Solvent-Based Enamel",
      "A time tasted and proven, high quality solvent based hi-gloss enamel paint recommended for suitably primed interior and exterior wood, metal and walls.",
      650
    ),
    features: ["Hi-Gloss Finish", "Solvent-Based", "Durable", "Metal Protection"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "Hi-Gloss",
      dilution: "As per manufacturer's instructions",
      warranty: "3-5 years",
    },
  },
  {
    ...createProduct(
      "18",
      "nerolac-satin-enamel",
      "Nerolac Satin Enamel",
      "Metal Enamel Paints",
      "Popular",
      "Smooth Satin-Like Finish",
      "A specially formulated metal enamel paint to give an excellent finish, resembling the smoothness of satin to masonry, wood and metal surfaces.",
      600
    ),
    features: ["Satin Finish", "Multi-Surface", "Smooth", "Elegant"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "Satin",
      dilution: "As per manufacturer's instructions",
      warranty: "3-5 years",
    },
  },

  // ============================================
  // PAINT ANCILLARY
  // ============================================
  {
    ...createProduct(
      "19",
      "nerolac-zinc-yellow-primer",
      "Nerolac Zinc Yellow Primer",
      "Paint Ancillary",
      "Premium",
      "Excellent Rust Protection",
      "Nerolac Zinc Yellow Primer provides excellent rust protection to metal surfaces keeping them corrosion free and beautiful for longer time.",
      750
    ),
    features: ["Zinc Chromate", "Rust Resistant", "Metal Protection", "Deep Penetration", "Corrosion Protection", "Long Lasting"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "20",
      "nerolac-premium-primer-st",
      "Nerolac Premium Primer ST",
      "Paint Ancillary",
      "Premium",
      "Premium Solvent-Based Primer",
      "Nerolac Premium Primer White (Solvent Thinnable) is a Cement Primer and is formulated by using synthetic resin medium and ideal combination of pigments and extenders so as to ensure deep penetration and sealing of porous surfaces.",
      700
    ),
    features: ["Premium Quality", "Strong Adhesion", "Deep Penetration", "Sealing of Porous Surfaces", "Synthetic Resin Medium"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "Solvent Thinnable",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "21",
      "nerolac-premium-primer-wb",
      "Nerolac Premium Primer WB",
      "Paint Ancillary",
      "Premium",
      "Premium Water-Based Primer",
      "Nerolac Premium Primer (Water Thinnable) is formulated by using copolymer emulsion and ideal combination of pigments and extenders, so as to ensure deep penetration and sealing of porous surfaces.",
      680
    ),
    features: ["Water-Based", "Eco-Friendly", "Strong Adhesion", "Deep Penetration", "Sealing of Porous Surfaces", "Easy Application"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "30-40% with clean water",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "32",
      "nerolac-popular-primer-wb",
      "Nerolac Popular Primer WB",
      "Paint Ancillary",
      "Popular",
      "Popular Water-Based Primer",
      "Nerolac Popular Primer White (Water Thinnable) is an economical water thinnable primer, Specially formulated by dispersion of White pigments and extenders in a copolymer Emulsion Medium.",
      550
    ),
    features: ["Water-Based", "Economical", "Strong Adhesion", "Good Penetration", "Sealing Properties", "Easy Application"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "30-40% with clean water",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "33",
      "nerolac-popular-primer-st",
      "Nerolac Popular Primer ST",
      "Paint Ancillary",
      "Popular",
      "Popular Solvent-Based Primer",
      "Nerolac Popular Primer White (Solvent Thinnable) is a Cement Primer and is formulated by using synthetic resin medium and ideal combination of pigments and extenders so as to ensure deep penetration and sealing of porous.",
      560
    ),
    features: ["Solvent-Based", "Strong Adhesion", "Deep Penetration", "Sealing of Porous Surfaces", "Surface Preparation", "Multi-Surface", "Economical"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "Solvent Thinnable",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "34",
      "exterior-primer",
      "Exterior Primer",
      "Paint Ancillary",
      "Exterior",
      "Exterior Wall Primer",
      "A water based wall coating exterior primer suitable for application on exteriors as a primer to exterior emulsions.",
      600
    ),
    features: ["Exterior Use", "No Chalking", "Good Opacity", "Weather Resistant"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "35",
      "nerolac-red-oxide-primer",
      "Nerolac Red Oxide Primer",
      "Paint Ancillary",
      "Red Oxide",
      "Red Oxide Metal Primer",
      "An economical General Purpose Red Oxide Metal Primer based on Synthetic Resin medium and Red Oxide of Iron as anti corrosive pigment.",
      500
    ),
    features: ["Anti-Corrosive", "Metal Protection", "Economical", "Good Adhesion"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "36",
      "nerolac-alkali-primer",
      "Nerolac Alkali Primer",
      "Paint Ancillary",
      "Alkali",
      "Alkali Resistant Primer",
      "A premium quality alkali resistant high performance primer cum sealer with silicon additive recommended specially for external cement plasters & concrete surfaces prone to efflorescence/lime blooming.",
      650
    ),
    features: ["Alkali Resistant", "Fresh Plaster Suitable", "Strong Protection", "Durable"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "37",
      "nerolac-wood-primer",
      "Nerolac Wood Primer",
      "Paint Ancillary",
      "Wood",
      "Wood Surface Primer",
      "Nerolac Wood Primer is specially formulated for wood surfaces, providing excellent adhesion and preparing wood for topcoat application.",
      600
    ),
    features: ["Wood Specific", "Strong Adhesion", "Surface Preparation", "Easy Application"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "38",
      "nerolac-cement-primer",
      "Nerolac Cement Primer",
      "Paint Ancillary",
      "Cement",
      "Cement Surface Primer",
      "Nerolac Cement Primer is designed for cement surfaces, providing excellent adhesion and sealing properties for cement-based substrates.",
      580
    ),
    features: ["Cement Specific", "Strong Adhesion", "Sealing Properties", "Durable"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "39",
      "nerolac-economy-primer",
      "Nerolac Economy Primer",
      "Paint Ancillary",
      "Economy",
      "Economical Primer Solution",
      "Nerolac Economy Primer offers an economical solution for surface preparation, providing good adhesion at an affordable price.",
      450
    ),
    features: ["Economical", "Good Adhesion", "Affordable", "Multi-Purpose"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Primer",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "40",
      "wall-putty-acrylic",
      "Wall Putty Acrylic",
      "Paint Ancillary",
      "Putty",
      "Acrylic Wall Putty",
      "Nerolac Acrylic Wall Putty is a specially made wall putty formulated by combining white pigments, extenders, acrylic emulsion medium, and additives. The acrylic-based formulation provides excellent filling properties, faster drying time, and superior smoothness. It is ideal for covering unevenness, pinholes, and minor cracks in plastered surfaces, creating a perfect base for paint application.",
      400
    ),
    features: ["Acrylic Based", "Easy Application", "Faster Drying", "Excellent Filling", "Superior Smoothness", "Crack Filling"],
    specifications: {
      coverage: "80-100 sq ft per kg",
      dryingTime: "4-6 hours",
      recoatTime: "6-8 hours minimum",
      finishType: "Putty",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "41",
      "nerolac-cement-putty",
      "Nerolac Cement Putty",
      "Paint Ancillary",
      "Putty",
      "Premium Cement Putty",
      "A premium wall care putty specially developed as a base coat to cover unevenness and pinholes in plastered surfaces and to make the walls/ceilings ready for painting.",
      450
    ),
    features: ["Premium Quality", "Superior Smoothness", "Water Repellent", "No Water Curing", "Excellent Filling", "Flawless Finish"],
    specifications: {
      coverage: "80-100 sq ft per kg",
      dryingTime: "4-6 hours",
      recoatTime: "6-8 hours minimum",
      finishType: "Putty",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "42",
      "putty-filler-grey-knifing",
      "Putty Filler Grey Knifing",
      "Paint Ancillary",
      "Putty",
      "Grey Knifing Putty",
      "Putty Filler Grey Knifing is designed for filling cracks and imperfections, providing a smooth surface for painting.",
      380
    ),
    features: ["Crack Filling", "Smooth Finish", "Easy Application", "Durable"],
    specifications: {
      coverage: "80-100 sq ft per kg",
      dryingTime: "4-6 hours",
      recoatTime: "6-8 hours minimum",
      finishType: "Putty",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "43",
      "paint-roller",
      "Paint Roller",
      "Paint Ancillary",
      "Rollers",
      "Professional Paint Roller",
      "High-quality paint rollers for smooth and even paint application. Available in various sizes for different painting needs.",
      150
    ),
    features: ["Professional Quality", "Smooth Application", "Various Sizes", "Durable"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "44",
      "paint-thinner",
      "Paint Thinner",
      "Paint Ancillary",
      "Thinners",
      "Professional Paint Thinner",
      "High-quality paint thinner for diluting oil-based paints and cleaning painting tools. Ensures smooth paint application.",
      200
    ),
    features: ["High Quality", "Effective Dilution", "Tool Cleaning", "Versatile"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Solvent",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "45",
      "gypsum-po",
      "Gypsum/Po",
      "Paint Ancillary",
      "Gypsum/Po",
      "Gypsum and POP Products",
      "High-quality gypsum and POP (Plaster of Paris) products for surface preparation and repair work.",
      300
    ),
    features: ["High Quality", "Surface Preparation", "Easy Application", "Durable"],
    specifications: {
      coverage: "As per application",
      dryingTime: "2-4 hours",
      recoatTime: "N/A",
      finishType: "Material",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },

  // ============================================
  // WATERPROOFING SOLUTIONS
  // ============================================
  {
    ...createProduct(
      "22",
      "nerolac-perma-crystal-seal",
      "Nerolac Perma Crystal Seal",
      "Waterproofing Solutions",
      "Popular",
      "Acrylic Copolymer Anti-Damp",
      "Nerolac Perma Crystal Seal is premium white cement-based seal coat with crystal forming formula to resist dampness and efflorescence. It can be used for interiors and exteriors concrete/mortar surfaces to impart smooth aesthetic finish.",
      700
    ),
    features: ["Acrylic Copolymer", "Anti-Damp", "Waterproof", "Moisture Resistant", "Breathable", "Interior Use", "Affordable", "Long Lasting"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Sealant",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "23",
      "nerolac-perma-no-heat",
      "Nerolac Perma No Heat",
      "Waterproofing Solutions",
      "Popular",
      "Heat Reduction Coating",
      "Nerolac Perma No Heat is a heat-reflecting liquid-applied waterproof coating based on acrylic copolymer emulsion. It reflects visible radiation and infrared rays, thereby reducing the surface temperature up to 15ºC.",
      800
    ),
    features: ["Heat Reduction", "Cool Interiors", "Heat Reflective", "Roof Suitable", "Waterproof", "Energy Efficient", "Exterior Use", "Long Lasting"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Heat Reflective Coating",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },

  // ============================================
  // INTERIOR TEXTURES
  // ============================================
  {
    ...createProduct(
      "24",
      "impressions-glitter-finish",
      "Impressions Glitter Finish",
      "Interior Textures",
      "Premium",
      "Sparkling Glitter Finish",
      "Impressions Glitter Finish adds a sparkling effect to walls, enhancing aesthetic appeal. Perfect for feature walls and decorative applications.",
      1300
    ),
    features: ["Glitter Finish", "Decorative", "Feature Walls", "Premium"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Glitter Texture",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "25",
      "nerolac-impressions-ideaz",
      "Nerolac Impressions Ideaz",
      "Interior Textures",
      "Premium",
      "Creative Texture Designs",
      "Nerolac Impressions Ideaz offers creative texture designs for unique wall finishes. Allows customization for personalized interior designs.",
      1200
    ),
    features: ["Creative Textures", "Customizable", "Unique Designs", "Premium"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Textured",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "26",
      "nerolac-impressions-metallic-finish",
      "Nerolac Impressions Metallic Finish",
      "Interior Textures",
      "Premium",
      "Elegant Metallic Sheen",
      "Nerolac Impressions Metallic Finish provides a metallic sheen, adding elegance to interiors. Perfect for modern and contemporary designs.",
      1250
    ),
    features: ["Metallic Sheen", "Elegant", "Modern Design", "Premium"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Metallic Texture",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "27",
      "kansai-select",
      "Kansai Select",
      "Interior Textures",
      "Premium",
      "Premium Texture Selection",
      "Kansai Select offers a premium selection of texture finishes for interior walls. Provides unique and elegant texture options for sophisticated interiors.",
      1400
    ),
    features: ["Premium Selection", "Unique Textures", "Elegant", "Sophisticated"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Textured",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },

  // ============================================
  // EXTERIOR TEXTURES
  // ============================================
  {
    ...createProduct(
      "28",
      "excel-texture-finish-dholpur",
      "Excel Mica marble stretch sheen Nxt & Mica Marble Strech Sheen",
      "Exterior Textures",
      "Premium",
      "Stretchable Film Technology with High Performance",
      "Nerolac Excel Mica marble stretch sheen Nxt & Mica Marble Strech Sheen is an extremely durable water based high performance exterior paint developed with a unique stretchable film technology, which allows it to cover hairline cracks, with a 6 year performance warranty.",
      1100
    ),
    features: ["2x Stretchability", "Excellent Dirt Pick Up Resistance", "Crack-Bridging Ability", "7 Year Warranty", "Superior Sheen Finish"],
    specifications: {
      coverage: "130-150 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Superior Sheen",
      dilution: "As per manufacturer's instructions",
      warranty: "6-7 years",
    },
  },
  {
    ...createProduct(
      "29",
      "excel-texture-finish-rigor",
      "Suraksha Sheen",
      "Exterior Textures",
      "Premium",
      "Superior Sheen Finish for Exterior Walls",
      "Suraksha Sheen provides a superior sheen finish for exterior walls with excellent weather resistance and protection. Perfect for exterior surfaces requiring a beautiful sheen appearance.",
      1100
    ),
    features: ["Superior Sheen", "Weather Resistant", "Exterior Use", "Durable"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Sheen",
      dilution: "As per manufacturer's instructions",
      warranty: "5-10 years",
    },
  },


  // ============================================
  // ADHESIVE
  // ============================================
  {
    ...createProduct(
      "31",
      "adhesive",
      "Adhesive",
      "Adhesive",
      "Popular",
      "Versatile Multi-Purpose Adhesive",
      "Nerolac Adhesive is a versatile adhesive suitable for various applications including tiles, wood, and general bonding needs. Provides strong and reliable bonding.",
      400
    ),
    features: ["Multi-Purpose", "Strong Bond", "Versatile", "Reliable"],
    specifications: {
      coverage: "As per application",
      dryingTime: "2-4 hours",
      recoatTime: "N/A",
      finishType: "Adhesive",
      dilution: "As per manufacturer's instructions",
      warranty: "N/A",
    },
  },

  // ============================================
  // TOOLS AND ACCESSORIES
  // ============================================
  {
    ...createProduct(
      "32",
      "nerolac-paint-brushes",
      "Nerolac Paint Brushes",
      "Tools and Accessories",
      "Popular",
      "Professional Quality Paint Brushes",
      "Nerolac Paint Brushes are professional-quality brushes designed for various painting applications. Available in multiple sizes including flat brushes for walls and doors, angled sash brushes for cutting in, and smaller brushes for detailed work. Features soft bristles for smooth application and durable construction.",
      250
    ),
    features: ["Professional Quality", "Multiple Sizes", "Soft Bristles", "Durable Construction", "Smooth Application", "Easy to Clean", "Versatile Use"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "33",
      "nerolac-paint-rollers",
      "Nerolac Paint Rollers",
      "Tools and Accessories",
      "Popular",
      "Fast and Even Coverage Rollers",
      "Nerolac Paint Rollers provide fast and even coverage for walls and ceilings. Available in different pile lengths: short pile for smooth surfaces, medium pile for light textures, and long pile for coarse exterior surfaces. Includes specialty texture rollers for decorative finishes.",
      300
    ),
    features: ["Fast Coverage", "Even Application", "Multiple Pile Lengths", "Texture Options", "Durable", "Easy to Use", "Professional Results"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "34",
      "nerolac-nerofix-masking-tape",
      "Nerolac Nerofix Masking Tape",
      "Tools and Accessories",
      "Popular",
      "Professional Masking Tape for Clean Lines",
      "Nerolac Nerofix Masking Tape is designed for protecting surfaces during painting. Features strong initial bond, water-resistant properties, and clean removal without residue. Available in various widths (20mm, 1 inch) and lengths (20 meters). Perfect for creating sharp, clean paint lines.",
      150
    ),
    features: ["Strong Initial Bond", "Water Resistant", "Clean Removal", "No Residue", "Multiple Widths", "Professional Grade", "Easy Application"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "35",
      "nerolac-sandpaper",
      "Nerolac Sandpaper",
      "Tools and Accessories",
      "Popular",
      "Surface Preparation Sandpaper",
      "Nerolac Sandpaper (Emery Paper) is essential for surface preparation and finishing. Available in various grits for different applications from coarse sanding to fine finishing. Ideal for wood surfaces, wall preparation, and achieving smooth finishes before painting.",
      100
    ),
    features: ["Multiple Grits", "Surface Preparation", "Durable", "Versatile Use", "Professional Quality", "Long Lasting", "Smooth Finishing"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "36",
      "nerolac-roll-paper",
      "Nerolac Roll Paper",
      "Tools and Accessories",
      "Popular",
      "Surface Protection Roll Paper",
      "Nerolac Roll Paper provides excellent surface protection during painting projects. Large rolls for covering floors, furniture, and other surfaces. Durable, tear-resistant, and easy to handle. Essential for professional painting jobs.",
      200
    ),
    features: ["Large Coverage", "Tear Resistant", "Surface Protection", "Easy to Handle", "Durable", "Cost Effective", "Professional Use"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "37",
      "nerolac-dhalai-plastic",
      "Nerolac Dhalai Plastic",
      "Tools and Accessories",
      "Popular",
      "Heavy-Duty Protective Plastic Sheeting",
      "Nerolac Dhalai Plastic is heavy-duty plastic sheeting designed for comprehensive surface protection during painting and construction work. Waterproof, durable, and reusable. Perfect for covering large areas, floors, and furniture.",
      180
    ),
    features: ["Heavy Duty", "Waterproof", "Reusable", "Large Coverage", "Durable", "Easy to Spread", "Cost Effective"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "38",
      "nerolac-paint-strainers",
      "Nerolac Paint Strainers",
      "Tools and Accessories",
      "Popular",
      "Fine Mesh Paint Strainers",
      "Nerolac Paint Strainers are fine mesh strainers designed to filter paint and remove lumps, debris, and impurities. Ensures smooth, professional paint application. Essential for achieving flawless finishes. Disposable and easy to use.",
      80
    ),
    features: ["Fine Mesh", "Removes Impurities", "Smooth Application", "Professional Results", "Easy to Use", "Disposable", "Cost Effective"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },

  // ============================================
  // OTHER PRODUCTS
  // ============================================
  {
    ...createProduct(
      "39",
      "nerolac-beauty-acrylic-distemper",
      "Nerolac Beauty Acrylic Distemper",
      "Other Products",
      "Popular",
      "Premium Water-Based Acrylic Distemper",
      "Nerolac Beauty Acrylic Distemper is a premium-quality, water-based acrylic paint designed for interior walls and ceilings. Provides an eye-soothing matte finish with brighter, cleaner shades. Offers good washability and antifungal properties, making it an economical choice for interior wall coatings.",
      450
    ),
    features: ["Matte Finish", "Bright Shades", "Good Washability", "Antifungal Properties", "Economical", "Water-Based", "Interior Use"],
    specifications: {
      coverage: "140-160 sq ft per liter per coat",
      dryingTime: "2-3 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Matte",
      dilution: "40-50% with clean water",
      warranty: "3-5 years",
    },
  },
  {
    ...createProduct(
      "40",
      "nerolac-acrylic-wall-putty",
      "Nerolac Acrylic Wall Putty",
      "Other Products",
      "Premium",
      "Smooth Surface Wall Putty",
      "Nerolac Acrylic Wall Putty is a fine, white cement-based putty that creates a smooth and even surface by filling minor pores, cracks, dents, and undulations. Enhances paint lifespan and durability, improves adhesion, provides water resistance, and contributes to a superior aesthetic finish.",
      550
    ),
    features: ["Smooth Finish", "Fills Cracks & Pores", "Water Resistant", "Enhances Paint Life", "Superior Adhesion", "Interior & Exterior", "Easy Application"],
    specifications: {
      coverage: "12-15 sq ft per kg",
      dryingTime: "4-6 hours",
      recoatTime: "6-8 hours minimum",
      finishType: "Smooth Base",
      dilution: "Mix with water as needed",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "41",
      "gypsum-plaster-of-paris",
      "Gypsum (Plaster of Paris)",
      "Other Products",
      "Popular",
      "Versatile Construction Material",
      "Gypsum (Plaster of Paris) is a naturally occurring mineral widely used in construction. Ideal for plasterboard, decorative plaster, gypsum fiberboard, and building plaster. Offers heat resistance, moisture resistance, sound absorbency, fire resistance, and durability. Quick-setting and easy to mold.",
      350
    ),
    features: ["Quick Setting", "Fire Resistant", "Sound Absorbent", "Moisture Resistant", "Easy to Mold", "Versatile", "Durable"],
    specifications: {
      coverage: "As per application",
      dryingTime: "20-30 minutes (initial set)",
      recoatTime: "N/A",
      finishType: "Plaster",
      dilution: "Mix with water",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "42",
      "snowcem-exterior-paint",
      "Snowcem Exterior Paint",
      "Other Products",
      "Premium",
      "Durable Cement-Based Exterior Paint",
      "Snowcem is a premium cement-based paint designed for exterior surfaces. Supplied as powder mixed with water on-site. Offers exceptional durability, vibrant fade-resistant colors, and strong resistance to harsh weather including heavy rain, strong winds, and intense sunlight. Water-resistant and environmentally friendly.",
      600
    ),
    features: ["Exceptional Durability", "Fade Resistant", "Weather Resistant", "Water Resistant", "Vibrant Colors", "Eco-Friendly", "Low VOC"],
    specifications: {
      coverage: "100-120 sq ft per kg",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "Matte",
      dilution: "Mix with water as per instructions",
      warranty: "7-10 years",
    },
  },
  {
    ...createProduct(
      "43",
      "white-cement",
      "White Cement",
      "Other Products",
      "Premium",
      "Premium White Portland Cement",
      "White Cement is a specialized Portland cement with pure white color, ideal for architectural finishes, grouts, tile adhesives, sculptures, and decorative elements. Offers high strength, smooth finish, high brightness, and excellent workability. Can be mixed with pigments for colored concrete.",
      700
    ),
    features: ["Pure White Color", "High Strength", "Smooth Finish", "High Brightness", "Excellent Workability", "Versatile", "Premium Quality"],
    specifications: {
      coverage: "As per application",
      dryingTime: "24 hours (initial set)",
      recoatTime: "N/A",
      finishType: "Smooth",
      dilution: "Mix with water and sand",
      warranty: "N/A",
    },
  },
  {
    ...createProduct(
      "44",
      "paint-strainers-other",
      "Paint Strainers",
      "Other Products",
      "Popular",
      "Essential Paint Filtering Tool",
      "Paint Strainers are essential tools for filtering paint to remove lumps, debris, and impurities before application. Ensures smooth, professional results and prevents clogging of spray guns and rollers. Disposable fine mesh design for single-use convenience.",
      80
    ),
    features: ["Fine Mesh Filter", "Removes Lumps", "Prevents Clogging", "Professional Results", "Disposable", "Easy to Use", "Cost Effective"],
    specifications: {
      coverage: "N/A",
      dryingTime: "N/A",
      recoatTime: "N/A",
      finishType: "Tool",
      dilution: "N/A",
      warranty: "N/A",
    },
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductsBySubCategory = (category: string, subCategory: string): Product[] => {
  return products.filter(
    (product) => product.category === category && product.subCategory === subCategory
  );
};

export const categories = [
  "Interior Wall Paints",
  "Exterior Wall Paints",
  "Wood Coatings",
  "Metal Enamel Paints",
  "Paint Ancillary",
  "Waterproofing Solutions",
  "Interior Textures",
  "Exterior Textures",
  "Tools and Accessories",
  "Other Products",
  "Adhesive",
];
