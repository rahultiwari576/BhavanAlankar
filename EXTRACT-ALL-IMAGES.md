# Extract All Product Images from nerolac.com

## ✅ Already Updated (Based on Your Examples)

1. **Beauty Smooth WOW White**: 
   - `https://www.nerolac.com/sites/default/files/2025-06/Nerolac-Beauty-Smooth_WOW-WHITE_Cheat-shot_Layered-Master_Opt-1_R1_Low-Res.png`

2. **Impressions Kashmir High sheen**: 
   - `https://www.nerolac.com/sites/default/files/2025-02/Nerolac-Impressions-Kashmir-High-Sheen_Cheatshot_R1.png`

## 🔧 Extract Remaining Product Images

### Method 1: Browser Console Script (Recommended)

1. **Visit nerolac.com Products Page**
   - Go to: https://www.nerolac.com/
   - Navigate to Products section

2. **Open Browser Console**
   - Press `F12`
   - Go to **Console** tab

3. **Run the Extraction Script**
   - Open file: `scripts/extract-nerolac-product-images.js`
   - Copy the entire script
   - Paste into browser console
   - Press **Enter**

4. **Copy the Output**
   - The script will output TypeScript code ready to paste
   - Copy the `productImageMap` object

5. **Update products.ts**
   - Open `src/data/products.ts`
   - Find the `productImageMap` object (around line 49)
   - Replace it with the output from the console
   - Save the file

### Method 2: Manual Extraction (For Each Product)

For each product, follow these steps:

1. **Visit the product page** on nerolac.com
2. **Right-click on the product image** → **Inspect**
3. **Find the `<img>` tag** in the HTML
4. **Copy the `src` attribute** value
5. **Convert relative path to full URL**:
   - If `src="/sites/default/files/..."` 
   - Then full URL: `https://www.nerolac.com/sites/default/files/...`
6. **Update in `src/data/products.ts`**

#### Example:
```html
<img src="/sites/default/files/2025-06/Nerolac-Beauty-Smooth_WOW-WHITE_Cheat-shot_Layered-Master_Opt-1_R1_Low-Res.png" alt="Beauty Smooth WOW White">
```

Convert to:
```typescript
"beauty-smooth-wow-white": [
  "https://www.nerolac.com/sites/default/files/2025-06/Nerolac-Beauty-Smooth_WOW-WHITE_Cheat-shot_Layered-Master_Opt-1_R1_Low-Res.png"
],
```

## 📋 Products That Need Image URLs

Update these products in `src/data/products.ts`:

### Interior Wall Paints
- [x] Beauty Smooth WOW White ✅
- [x] Impressions Kashmir High sheen ✅
- [ ] Neu Latex Interior Paint
- [ ] Impressions HD
- [ ] Impressions Kashmir
- [ ] Kashmir Matt
- [ ] Impressions Sheen
- [ ] Beauty Gold Washable

### Exterior Wall Paints
- [ ] Neu Latex Exterior
- [ ] Suraksha Plus WOW White
- [ ] Excel Antipeel Wow White
- [ ] Excel Everlast

### Wood Coatings
- [ ] Nerolac Wonderwood
- [ ] Nerolac Italian
- [ ] Wood Ancillary

### Metal Enamel Paints
- [ ] Nerolac PU Enamel 10 in 1
- [ ] Nerolac Synthetic Hi-Gloss Enamel
- [ ] Nerolac Satin Enamel

### Paint Ancillary
- [ ] Nerolac Zinc Yellow Primer
- [ ] Nerolac Premium Primer ST
- [ ] Nerolac Premium Primer WB

### Waterproofing Solutions
- [ ] Nerolac Perma Crystal Seal
- [ ] Nerolac Perma No Heat

### Interior Textures
- [ ] Impressions Glitter Finish
- [ ] Nerolac Impressions Ideaz
- [ ] Nerolac Impressions Metallic Finish
- [ ] Kansai Select

### Exterior Textures
- [ ] Excel Texture Finish - Dholpur
- [ ] Excel Texture Finish - Rigor
- [ ] Excel Texture Finish - Roller

### Adhesive
- [ ] Adhesive

## 🎯 Quick Reference: Product URLs on nerolac.com

Visit these pages to find product images:

- **Interior Paints**: https://www.nerolac.com/decorative-paint-products/interior-paints
- **Exterior Paints**: https://www.nerolac.com/decorative-paint-products/exterior-paints
- **Wood Coatings**: https://www.nerolac.com/decorative-paint-products/wood-paints
- **Metal Enamel**: https://www.nerolac.com/decorative-paint-products/metal-enamel-paints
- **Paint Ancillary**: https://www.nerolac.com/decorative-paint-products/paint-ancillary
- **Waterproofing**: https://www.nerolac.com/decorative-paint-products/waterproofing
- **Interior Textures**: https://www.nerolac.com/decorative-paint-products/interior-textures
- **Exterior Textures**: https://www.nerolac.com/decorative-paint-products/exterior-textures
- **Adhesive**: https://www.nerolac.com/decorative-paint-products/adhesive

## 📝 Image URL Pattern

Based on your examples, the pattern is:
```
https://www.nerolac.com/sites/default/files/YYYY-MM/Nerolac-Product-Name_Descriptive-Suffix.png
```

Where:
- `YYYY-MM` = Date folder (e.g., 2025-06, 2025-02)
- `Nerolac-Product-Name` = Product name with "Nerolac-" prefix
- `_Descriptive-Suffix` = Additional descriptive text (e.g., `_Cheatshot_R1`, `_Cheat-shot_Layered-Master_Opt-1_R1_Low-Res`)

## ✅ After Extraction

1. **Test the images**:
   ```bash
   npm run dev
   ```
2. **Navigate to Products page**
3. **Verify all images load correctly**
4. **Check browser console** for any 404 errors
5. **Update any broken image URLs**

## 🔍 Troubleshooting

- **Images not loading?** Check if the URL is correct and accessible
- **404 errors?** The image path might have changed - re-extract from nerolac.com
- **CORS errors?** You may need to download and host images locally

---

**Current Status**: 2/31 products have correct image URLs. Use the extraction script to get the remaining 29 products.

