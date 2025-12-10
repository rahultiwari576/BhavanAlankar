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
    "neu-latex-interior-paint": [
      "https://www.nerolac.com/sites/default/files/2025-09/Neu-Latex-Interior-Paint.png"
    ],
    "beauty-smooth-wow-white": [
      "https://www.nerolac.com/sites/default/files/2025-06/Nerolac-Beauty-Smooth_WOW-WHITE_Cheat-shot_Layered-Master_Opt-1_R1_Low-Res.png"
    ],
    "impressions-kashmir-high-sheen": [
      "https://www.nerolac.com/sites/default/files/2025-02/Nerolac-Impressions-Kashmir-High-Sheen_Cheatshot_R1.png"
    ],
    "impressions-hd": [
      "https://www.nerolac.com/sites/default/files/2022-11/Impressions%20HD_0.png"
    ],
    "impressions-kashmir": [
      "https://www.nerolac.com/sites/default/files/2022-10/Impressions-Kashmir.png"
    ],
    "kashmir-matt": [
      "https://www.nerolac.com/sites/default/files/2025-02/Nerolac-Impressions-Kashmir-Matt_Cheatshot_R1%20%281%29.png"
    ],
    "impressions-sheen": [
      "https://www.nerolac.com/sites/default/files/2024-12/205x258.png"
    ],
    "beauty-gold-washable": [
      "https://www.nerolac.com/sites/default/files/2025-05/205-x-258.png"
    ],
    "beauty-sheen": [
      "https://www.nerolac.com/sites/default/files/2022-10/Nerolac-Beauty-Sheen.png"
    ],
    "beauty-little-master-sheen": [
      "https://www.nerolac.com/sites/default/files/2023-12/2023-10-1502_Nerolac_BLMS-Website-Banners_Product-Packshot_%28H%29205x248%20%281%29.png"
    ],
    "neu-latex-exterior": [
      "https://www.nerolac.com/sites/default/files/2025-09/Neu-Latex-Exterior.png"
    ],
    "suraksha-plus-wow-white": [
      "https://www.nerolac.com/sites/default/files/2025-09/Suraksha%20Plus%20WOW%20White.png"
    ],
    "excel-antipeel-wow-white": [
      "https://www.nerolac.com/sites/default/files/2024-12/205-x-258.png"
    ],
    "excel-everlast": [
      "https://www.nerolac.com/sites/default/files/2025-11/Everlast_0.png"
    ],
    "excel-total": [
      "https://www.nerolac.com/sites/default/files/2022-10/Excel-Total.png"
    ],
    "excel-sheen": [
      "https://www.nerolac.com/sites/default/files/2025-09/Nerolac-Excel-Sheen_0.png"
    ],
    "excel-no-dust": [
      "https://www.nerolac.com/sites/default/files/2025-09/Excel-No-Dust.png"
    ],
    "suraksha-sheen": [
      "https://www.nerolac.com/themes/nerolac/img/healthy-home-paint.webp"
    ],
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
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
    ],
    "paint-thinner": [
      "https://www.nerolac.com/sites/default/files/2022-10/nerolac-alkali-primer.png"
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
    "excel-texture-finish-dholpur": [
      "https://www.nerolac.com/sites/default/files/2025-09/Neroalc-Excel-Mica-Marble-Strech-Sheen-%26-Mica-Marble_1.png"
    ],
    "excel-texture-finish-rigor": [
      "https://www.nerolac.com/sites/default/files/2022-10/Nerolac-Suraksha-sheen.png"
    ],
    "excel-texture-finish-roller": [
      "https://www.nerolac.com/sites/default/files/2025-07/Texture%20-%2020kg%20Bucket.png"
    ],
    "adhesive": [
      "https://www.nerolac.com/sites/default/files/2025-09/Adhesive.png"
    ],
  };

  // Return mapped images or default placeholder
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
  {
    ...createProduct(
      "1",
      "neu-latex-interior-paint",
      "Neu Latex Interior Paint",
      "Interior Wall Paints",
      "Premium",
      "Economical Water Thinnable Interior Paint",
      "Nerolac Neu Latex Interior Paint is an economical water thinnable paint specially designed for application on interior walls with good washability.",
      850
    ),
    features: ["Superior Smoothness", "Good Flow & Levelling", "Good Washability", "Good Ease Of Application", "Higher Coverage", "Better Durability", "Water Thinnable", "Economical"],
    specifications: {
      coverage: "120-140 sq ft per liter per coat",
      dryingTime: "2-4 hours (surface dry)",
      recoatTime: "4-6 hours minimum",
      finishType: "Smooth Finish",
      dilution: "30-40% with clean water",
      warranty: "5-10 years",
    },
  },
  {
    ...createProduct(
      "2",
      "beauty-smooth-wow-white",
      "Beauty Smooth WOW White",
      "Interior Wall Paints",
      "Popular",
      "Enhanced Whiteness with Smooth Finish",
      "Nerolac Beauty Smooth WOW White is a specially developed Whitest White, economical interior emulsion for a distinctly rich and smooth finish. Its optimum performance with respect to decoration and protection, is through an ideal combination of pigments and extenders, dispersed in a copolymer emulsion.",
      550
    ),
    features: ["Enhanced Whiteness", "Smooth Finish", "Bright Appearance", "Easy Application", "Excellent Coverage"],
  },
  {
    ...createProduct(
      "3",
      "impressions-kashmir-high-sheen",
      "Impressions Kashmir High sheen",
      "Interior Wall Paints",
      "Premium",
      "Luxurious High Sheen Finish",
      "Nerolac Impressions Kashmir High Sheen offers a top-notch sheen and a smooth and luxurious finish to the walls. It is based on Silver Ion Technology that kills 99% of bacteria on the painted surface and makes the environment at home safe and healthy. The whiteness, opacity, washability, stain resistance, flow & levelling, ease of application, anti-viral performance, anti-fungal performance and anti-bacterial performance are outstanding, creating a high-class sheen finish that keeps the wall awe-inspiring for years.",
      1100
    ),
    features: ["Top-Notch Sheen", "Smooth & Luxurious Finish", "Silver Ion Technology", "Kills 99% Bacteria", "Anti-Viral Performance", "Anti-Fungal Performance", "Anti-Bacterial Performance", "Outstanding Washability", "Excellent Stain Resistance", "Superior Flow & Levelling", "Easy Application", "Long Lasting"],
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
  {
    ...createProduct(
      "5",
      "impressions-kashmir",
      "Impressions Kashmir",
      "Interior Wall Paints",
      "Premium",
      "Superior Quality Acrylic Emulsion",
      "Nerolac Impressions Kashmir Luxury Emulsion is a superior quality 100% acrylic emulsion based interior wall paint with germ killing formula.",
      1000
    ),
    features: ["100% Acrylic", "Luxurious Finish", "Superior Quality", "Excellent Durability", "Superior Washability", "Stain Resistant", "Excellent Color Retention"],
  },
  {
    ...createProduct(
      "6",
      "kashmir-matt",
      "Kashmir Matt",
      "Interior Wall Paints",
      "Premium",
      "Premium Matt Finish",
      "Nerolac Impressions Kashmir Matt offers a top-class smooth matt finish that hides wall imperfections and gives a luxurious appeal to the walls. It is based on Silver Ion Technology that kills 99% of bacteria on the painted surface and ensures a safe and healthy environment at home. The whiteness, opacity, washability, stain resistance, flow and levelling, ease of application, anti-viral performance, anti-fungal performance and anti-bacterial performance are outstanding, creating an excellent smooth matt finish that keeps the wall awe-inspiring for years.",
      950
    ),
    features: ["Top-Class Smooth Matt Finish", "Hides Wall Imperfections", "Silver Ion Technology", "Kills 99% Bacteria", "Anti-Viral Performance", "Anti-Fungal Performance", "Anti-Bacterial Performance", "Outstanding Washability", "Excellent Stain Resistance", "Superior Flow & Levelling", "Easy Application", "Long Lasting"],
  },
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

  // ============================================
  // EXTERIOR WALL PAINTS
  // ============================================
  {
    ...createProduct(
      "9",
      "neu-latex-exterior",
      "Neu Latex Exterior",
      "Exterior Wall Paints",
      "Premium",
      "Premium Exterior Emulsion Paint",
      "Nerolac Neu Latex Exterior Paint is an economical water thinnable paint specially designed for exterior walls with ease of application for coverage.",
      900
    ),
    features: ["Weather Resistant", "UV Protection", "Premium Quality", "Algae Resistant", "Dirt Resistant", "Long Lasting", "Superior Durability"],
  },
  {
    ...createProduct(
      "10",
      "suraksha-plus-wow-white",
      "Suraksha Plus WOW White",
      "Exterior Wall Paints",
      "Popular",
      "Enhanced Whiteness with Protection",
      "Suraksha Plus WOW White is an exterior emulsion paint specially formulated to provide enhanced whiteness with excellent protection against weather, dirt, and algae. The paint uses advanced whitening technology and protective additives to maintain bright, clean exterior walls while offering superior weather resistance and durability.",
      600
    ),
    features: ["Enhanced Whiteness", "Weather Resistant", "Dirt Resistant", "Algae Resistant", "UV Protection", "Long Lasting"],
  },
  {
    ...createProduct(
      "11",
      "excel-antipeel-wow-white",
      "Excel Antipeel Wow White",
      "Exterior Wall Paints",
      "Premium",
      "Anti-Peel Technology with Enhanced Whiteness",
      "Excel Antipeel Wow White is an exterior emulsion paint formulated with advanced anti-peel technology to prevent peeling and ensure long-lasting exterior walls with enhanced whiteness. The paint provides excellent adhesion to various substrates and superior durability against weather conditions, dirt, and algae growth.",
      800
    ),
    features: ["Anti-Peel Technology", "Enhanced Whiteness", "Excellent Adhesion", "Weather Resistant", "Algae Resistant", "Durable", "Long Lasting"],
  },
  {
    ...createProduct(
      "12",
      "excel-everlast",
      "Excel Everlast",
      "Exterior Wall Paints",
      "Premium",
      "Long-Lasting Exterior Protection",
      "Excel Everlast is a premium exterior emulsion paint designed to withstand harsh weather conditions, resist algae growth, and maintain vibrant colors for years. Formulated with advanced technology, it provides excellent protection against UV rays, dirt, and moisture, ensuring long-lasting beauty and performance for your exterior walls.",
      850
    ),
    features: ["Weather Resistant", "Algae Resistant", "Fade Resistant", "UV Protection", "Dirt Resistant", "Long Lasting", "Vibrant Colors"],
  },

  // ============================================
  // WOOD COATINGS
  // ============================================
  {
    ...createProduct(
      "13",
      "nerolac-wonderwood",
      "Nerolac Wonderwood",
      "Wood Coatings",
      "Premium",
      "Premium Wood Coating Finish",
      "Nerolac Wonderwood is a premium wood coating offering exceptional durability and aesthetic appeal. Provides excellent protection for wood surfaces.",
      1200
    ),
    features: ["Premium Quality", "Durable", "Aesthetic Appeal", "Wood Protection"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "High Gloss / Satin",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "14",
      "nerolac-italian",
      "Nerolac Italian",
      "Wood Coatings",
      "Premium",
      "Italian Style Wood Finish",
      "Nerolac Italian provides an elegant Italian-style finish for wood surfaces. Offers excellent gloss and scratch resistance with luxurious appearance.",
      1300
    ),
    features: ["Italian Style", "High Gloss", "Scratch Resistant", "Luxurious"],
    specifications: {
      coverage: "100-120 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "8-12 hours minimum",
      finishType: "High Gloss",
      dilution: "As per manufacturer's instructions",
      warranty: "5 years",
    },
  },
  {
    ...createProduct(
      "15",
      "wood-ancillary",
      "Wood Ancillary",
      "Wood Coatings",
      "Popular",
      "Essential Wood Coating Accessories",
      "Wood Ancillary includes essential accessories and complementary products for wood coating applications, ensuring complete wood protection.",
      400
    ),
    features: ["Essential Accessories", "Complete Protection", "Easy Application", "Reliable"],
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
  {
    ...createProduct(
      "30",
      "excel-texture-finish-roller",
      "Excel Texture Finish - Roller",
      "Exterior Textures",
      "Premium",
      "Roller Applied Texture Finish",
      "Nerolac Excel Roller Finish is a high-build acrylic textured intermediate coating system for exterior surfaces. It provides an excellent finish pattern for exterior walls. It also offers excellent crack resistance, seepage resistance, and effectively hides surface unevenness. This textured finish is suitable for all types of climatic conditions.",
      1050
    ),
    features: ["Easy Application", "Roller Applied", "Weather Resistant", "Beautiful Finish"],
    specifications: {
      coverage: "80-100 sq ft per liter per coat",
      dryingTime: "4-6 hours (surface dry)",
      recoatTime: "6-8 hours minimum",
      finishType: "Textured",
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
  "Adhesive",
];
