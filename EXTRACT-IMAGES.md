# Extract Product Images from nerolac.com

## Quick Method to Get All Image URLs

### Step 1: Open Browser Console on nerolac.com

1. Visit **https://www.nerolac.com/**
2. Navigate to **Products** section
3. Press **F12** to open Developer Tools
4. Go to **Console** tab

### Step 2: Run This Script in Console

Copy and paste this JavaScript code into the browser console:

```javascript
// Extract all product images from nerolac.com
(function() {
  const images = [];
  const productMap = {};
  
  // Find all product images
  document.querySelectorAll('img[src*="/sites/default/files/2025-09/"]').forEach(img => {
    const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
    const alt = img.alt || '';
    
    if (src && src.includes('/sites/default/files/2025-09/')) {
      const filename = src.split('/').pop();
      const productName = alt.toLowerCase()
        .replace(/nerolac\s*/gi, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      if (!productMap[productName]) {
        productMap[productName] = {
          name: alt,
          url: src,
          filename: filename
        };
        images.push({
          name: alt,
          url: src,
          filename: filename,
          slug: productName
        });
      }
    }
  });
  
  // Output for TypeScript
  console.log('\n📋 Copy this code to update src/data/products.ts:\n');
  console.log('const productImageMap: Record<string, string[]> = {');
  
  Object.entries(productMap).forEach(([slug, data]) => {
    console.log(`  "${slug}": [\n    "${data.url}"\n  ],`);
  });
  
  console.log('};\n');
  
  // Also output JSON
  console.log('\n📄 JSON Format:\n');
  console.log(JSON.stringify(productMap, null, 2));
  
  console.log(`\n✅ Found ${images.length} product images\n`);
  
  return { images, productMap };
})();
```

### Step 3: Copy the Output

The script will output:
1. TypeScript code ready to paste into `src/data/products.ts`
2. JSON format for reference

### Step 4: Update products.ts

1. Open `src/data/products.ts`
2. Find the `productImageMap` object (around line 48)
3. Replace it with the output from the console
4. Save the file

## Manual Method (If Script Doesn't Work)

For each product on nerolac.com:

1. **Right-click on the product image**
2. **Select "Inspect" or "Inspect Element"**
3. **Find the `<img>` tag in the HTML**
4. **Copy the `src` attribute value**
5. **Update in `src/data/products.ts`**

Example:
```html
<img src="/sites/default/files/2025-09/Neu-Latex-Interior-Paint.png" alt="Neu Latex Interior Paint">
```

Convert to full URL:
```
https://www.nerolac.com/sites/default/files/2025-09/Neu-Latex-Interior-Paint.png
```

## Product List for Reference

All 31 products need their image URLs:

1. Neu Latex Interior Paint
2. Beauty Smooth WOW White
3. Impressions Kashmir High sheen
4. Impressions HD
5. Impressions Kashmir
6. Kashmir Matt
7. Impressions Sheen
8. Beauty Gold Washable
9. Neu Latex Exterior
10. Suraksha Plus WOW White
11. Excel Antipeel Wow White
12. Excel Everlast
13. Nerolac Wonderwood
14. Nerolac Italian
15. Wood Ancillary
16. Nerolac PU Enamel 10 in 1
17. Nerolac Synthetic Hi-Gloss Enamel
18. Nerolac Satin Enamel
19. Nerolac Zinc Yellow Primer
20. Nerolac Premium Primer ST
21. Nerolac Premium Primer WB
22. Nerolac Perma Crystal Seal
23. Nerolac Perma No Heat
24. Impressions Glitter Finish
25. Nerolac Impressions Ideaz
26. Nerolac Impressions Metallic Finish
27. Kansai Select
28. Excel Texture Finish - Dholpur
29. Excel Texture Finish - Rigor
30. Excel Texture Finish - Roller
31. Adhesive

## Current Status

✅ Image URL structure updated to match nerolac.com pattern
✅ "Neu-Latex-Interior-Paint.png" confirmed
⏳ Other products need exact filenames verified from nerolac.com

