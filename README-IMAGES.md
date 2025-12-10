# Nerolac Product Images Setup Guide

This guide will help you get the actual product images from nerolac.com and update them in the database.

## Method 1: Manual Image URL Extraction

### Step 1: Visit Nerolac Product Pages
Visit each product page on nerolac.com and get the image URLs:

1. **Interior Wall Paints:**
   - Neu Latex Interior Paint: https://www.nerolac.com/decorative-paint-products/interior-paints/neu-latex-interior-paint
   - Beauty Smooth WOW White: https://www.nerolac.com/decorative-paint-products/interior-paints/beauty-smooth-wow-white
   - Impressions Kashmir High sheen: https://www.nerolac.com/decorative-paint-products/interior-paints/impressions-kashmir-high-sheen
   - Impressions HD: https://www.nerolac.com/decorative-paint-products/interior-paints/impressions-hd
   - Impressions Kashmir: https://www.nerolac.com/decorative-paint-products/interior-paints/impressions-kashmir
   - Kashmir Matt: https://www.nerolac.com/decorative-paint-products/interior-paints/kashmir-matt
   - Impressions Sheen: https://www.nerolac.com/decorative-paint-products/interior-paints/impressions-sheen
   - Beauty Gold Washable: https://www.nerolac.com/decorative-paint-products/interior-paints/beauty-gold-washable

2. **Exterior Wall Paints:**
   - Neu Latex Exterior: https://www.nerolac.com/decorative-paint-products/exterior-paints/neu-latex-exterior
   - Suraksha Plus WOW White: https://www.nerolac.com/decorative-paint-products/exterior-paints/suraksha-plus-wow-white
   - Excel Antipeel Wow White: https://www.nerolac.com/decorative-paint-products/exterior-paints/excel-antipeel-wow-white
   - Excel Everlast: https://www.nerolac.com/decorative-paint-products/exterior-paints/excel-everlast

3. **Wood Coatings:**
   - Nerolac Wonderwood: https://www.nerolac.com/decorative-paint-products/wood-paints/nerolac-wonderwood
   - Nerolac Italian: https://www.nerolac.com/decorative-paint-products/wood-paints/nerolac-italian
   - Wood Ancillary: https://www.nerolac.com/decorative-paint-products/wood-paints/wood-ancillary

4. **Metal Enamel Paints:**
   - Nerolac PU Enamel 10 in 1: https://www.nerolac.com/decorative-paint-products/metal-enamel-paints/nerolac-pu-enamel-10-in-1
   - Nerolac Synthetic Hi-Gloss Enamel: https://www.nerolac.com/decorative-paint-products/metal-enamel-paints/nerolac-synthetic-hi-gloss-enamel
   - Nerolac Satin Enamel: https://www.nerolac.com/decorative-paint-products/metal-enamel-paints/nerolac-satin-enamel

5. **Paint Ancillary:**
   - Nerolac Zinc Yellow Primer: https://www.nerolac.com/decorative-paint-products/paint-ancillary/nerolac-zinc-yellow-primer
   - Nerolac Premium Primer ST: https://www.nerolac.com/decorative-paint-products/paint-ancillary/nerolac-premium-primer-st
   - Nerolac Premium Primer WB: https://www.nerolac.com/decorative-paint-products/paint-ancillary/nerolac-premium-primer-wb

6. **Waterproofing Solutions:**
   - Nerolac Perma Crystal Seal: https://www.nerolac.com/decorative-paint-products/waterproofing/nerolac-perma-crystal-seal
   - Nerolac Perma No Heat: https://www.nerolac.com/decorative-paint-products/waterproofing/nerolac-perma-no-heat

7. **Interior Textures:**
   - Impressions Glitter Finish: https://www.nerolac.com/decorative-paint-products/interior-textures/impressions-glitter-finish
   - Nerolac Impressions Ideaz: https://www.nerolac.com/decorative-paint-products/interior-textures/nerolac-impressions-ideaz
   - Nerolac Impressions Metallic Finish: https://www.nerolac.com/decorative-paint-products/interior-textures/nerolac-impressions-metallic-finish
   - Kansai Select: https://www.nerolac.com/decorative-paint-products/interior-textures/kansai-select

8. **Exterior Textures:**
   - Excel Texture Finish - Dholpur: https://www.nerolac.com/decorative-paint-products/exterior-textures/excel-texture-finish-dholpur
   - Excel Texture Finish - Rigor: https://www.nerolac.com/decorative-paint-products/exterior-textures/excel-texture-finish-rigor
   - Excel Texture Finish - Roller: https://www.nerolac.com/decorative-paint-products/exterior-textures/excel-texture-finish-roller

9. **Adhesive:**
   - Adhesive: https://www.nerolac.com/decorative-paint-products/adhesive

### Step 2: Extract Image URLs

For each product page:

1. **Using Browser DevTools:**
   - Open the product page
   - Press `F12` to open DevTools
   - Go to the **Network** tab
   - Filter by **Img**
   - Reload the page
   - Find the product image files (usually `.jpg`, `.png`, or `.webp`)
   - Right-click on the image → **Copy** → **Copy link address**
   - The URL will look like: `https://www.nerolac.com/sites/default/files/products/[product-name].jpg`

2. **Using Right-Click:**
   - Right-click on the product image on the page
   - Select **"Copy image address"** or **"Copy image URL"**
   - Paste the URL

### Step 3: Update the Database

Once you have the image URLs, update the `getProductImages` function in `src/data/products.ts`:

```typescript
const productImageMap: Record<string, string[]> = {
  "neu-latex-interior-paint": [
    "https://www.nerolac.com/sites/default/files/products/neu-latex-interior.jpg", // Your actual URL
    "https://www.nerolac.com/sites/default/files/products/neu-latex-interior-application.jpg" // Your actual URL
  ],
  // ... update all other products
};
```

## Method 2: Download Images Locally

If you prefer to host images locally:

1. Download each product image from nerolac.com
2. Save them in `public/products/` directory
3. Name them according to the product slug (e.g., `neu-latex-interior-paint.jpg`)
4. Update the image paths in `products.ts` to use local paths:
   ```typescript
   images: ["/products/neu-latex-interior-paint.jpg"]
   ```

## Method 3: Automated Script (Advanced)

You can use a headless browser like Puppeteer or Playwright to automate image URL extraction:

```javascript
// Example using Puppeteer
const puppeteer = require('puppeteer');

async function getProductImages(productUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(productUrl);
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src.includes('product'));
  });
  
  await browser.close();
  return images;
}
```

## Important Notes

⚠️ **Copyright Notice:** 
- Ensure you have permission to use Nerolac's product images
- Consider using your own product photography or stock images if needed
- Direct linking to nerolac.com images may break if URLs change

✅ **Best Practice:**
- Download and host images locally for better control
- Optimize images for web (compress, resize)
- Use proper alt text for accessibility

## Current Status

The product database is set up with placeholder image URLs pointing to nerolac.com. You need to:

1. Visit each product page on nerolac.com
2. Extract the actual image URLs
3. Update the `productImageMap` in `src/data/products.ts`

All 31 products are registered and ready - you just need to update the image URLs with the actual ones from nerolac.com!

