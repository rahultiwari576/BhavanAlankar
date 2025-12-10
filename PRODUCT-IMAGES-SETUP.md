# Product Images Setup - Nerolac.com

## ✅ What's Been Done

1. **Product Database Created**: All 31 products from nerolac.com have been registered in the database
2. **Image URL Structure**: Created a `getProductImages()` function that maps product slugs to image URLs
3. **Placeholder URLs**: Added placeholder image URLs pointing to nerolac.com (these need to be updated with actual URLs)

## 🔧 What You Need to Do

### Step 1: Get Actual Image URLs from nerolac.com

For each product, you need to:

1. **Visit the product page on nerolac.com**
   - Go to https://www.nerolac.com/
   - Navigate to Products section
   - Click on each product

2. **Extract the Image URL**
   
   **Method A: Using Browser DevTools (Recommended)**
   - Open the product page
   - Press `F12` to open Developer Tools
   - Go to **Network** tab
   - Filter by **Img** (images)
   - Reload the page (F5)
   - Look for product image files (usually `.jpg`, `.png`, or `.webp`)
   - Right-click on the image file → **Copy** → **Copy link address**
   - The URL will typically look like:
     ```
     https://www.nerolac.com/sites/default/files/products/[product-name].jpg
     ```
   
   **Method B: Right-Click on Image**
   - Right-click directly on the product image on the page
   - Select **"Copy image address"** or **"Copy image URL"**
   - Paste the URL

3. **Update the Image URLs in Code**
   
   Open `src/data/products.ts` and find the `productImageMap` object (around line 46).
   
   Update each product's image URLs with the actual URLs you copied:
   
   ```typescript
   const productImageMap: Record<string, string[]> = {
     "neu-latex-interior-paint": [
       "https://www.nerolac.com/sites/default/files/products/neu-latex-interior.jpg", // ← Replace with actual URL
       "https://www.nerolac.com/sites/default/files/products/neu-latex-interior-application.jpg" // ← Replace with actual URL
     ],
     // ... update all other products
   };
   ```

## 📋 Product List for Reference

Here are all 31 products that need image URLs:

### Interior Wall Paints (8 products)
1. Neu Latex Interior Paint
2. Beauty Smooth WOW White
3. Impressions Kashmir High sheen
4. Impressions HD
5. Impressions Kashmir
6. Kashmir Matt
7. Impressions Sheen
8. Beauty Gold Washable

### Exterior Wall Paints (4 products)
9. Neu Latex Exterior
10. Suraksha Plus WOW White
11. Excel Antipeel Wow White
12. Excel Everlast

### Wood Coatings (3 products)
13. Nerolac Wonderwood
14. Nerolac Italian
15. Wood Ancillary

### Metal Enamel Paints (3 products)
16. Nerolac PU Enamel 10 in 1
17. Nerolac Synthetic Hi-Gloss Enamel
18. Nerolac Satin Enamel

### Paint Ancillary (3 products)
19. Nerolac Zinc Yellow Primer
20. Nerolac Premium Primer ST
21. Nerolac Premium Primer WB

### Waterproofing Solutions (2 products)
22. Nerolac Perma Crystal Seal
23. Nerolac Perma No Heat

### Interior Textures (4 products)
24. Impressions Glitter Finish
25. Nerolac Impressions Ideaz
26. Nerolac Impressions Metallic Finish
27. Kansai Select

### Exterior Textures (3 products)
28. Excel Texture Finish - Dholpur
29. Excel Texture Finish - Rigor
30. Excel Texture Finish - Roller

### Adhesive (1 product)
31. Adhesive

## 🚀 Quick Start Guide

1. Open `src/data/products.ts`
2. Find the `getProductImages` function (line ~43)
3. Visit nerolac.com and get image URLs for each product
4. Update the `productImageMap` object with actual URLs
5. Save the file
6. The images will automatically be used in your application!

## ⚠️ Important Notes

- **Copyright**: Ensure you have permission to use Nerolac's product images
- **URL Changes**: Direct linking to nerolac.com images may break if URLs change
- **Alternative**: Consider downloading images and hosting them locally for better control

## 📝 Example: Updating One Product

Let's say you want to update "Neu Latex Interior Paint":

1. Visit: https://www.nerolac.com/decorative-paint-products/interior-paints/neu-latex-interior-paint
2. Get the image URL using DevTools (as described above)
3. Let's say you found: `https://www.nerolac.com/sites/default/files/products/neu-latex-interior-main.jpg`
4. Update in `products.ts`:
   ```typescript
   "neu-latex-interior-paint": [
     "https://www.nerolac.com/sites/default/files/products/neu-latex-interior-main.jpg", // ← Updated
     "https://www.nerolac.com/sites/default/files/products/neu-latex-interior-application.jpg" // ← Update this too
   ],
   ```

## ✅ Verification

After updating the URLs:
1. Run your development server: `npm run dev`
2. Navigate to the Products page
3. Check if product images are displaying correctly
4. If images don't load, verify the URLs are correct and accessible

---

**Current Status**: Database structure is ready. Image URLs need to be updated with actual URLs from nerolac.com.

