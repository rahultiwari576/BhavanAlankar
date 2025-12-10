/**
 * Browser Console Script to Extract All Product Images from nerolac.com
 * 
 * INSTRUCTIONS:
 * 1. Visit https://www.nerolac.com/ in your browser
 * 2. Navigate to Products section (or any product listing page)
 * 3. Open Browser Console (F12 → Console tab)
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 6. The script will extract all product image URLs
 * 7. Copy the output and update src/data/products.ts
 */

(function() {
  console.log('🔍 Extracting Product Images from nerolac.com...\n');
  
  const productImages = [];
  const productMap = {};
  
  // Find all images with nerolac product paths
  const imageSelectors = [
    'img[src*="/sites/default/files/"]',
    'img[data-src*="/sites/default/files/"]',
    'img[data-lazy-src*="/sites/default/files/"]'
  ];
  
  imageSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(img => {
      const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
      const alt = img.alt || '';
      
      if (src && src.includes('/sites/default/files/') && alt) {
        // Convert alt text to slug
        const slug = alt.toLowerCase()
          .replace(/nerolac\s*/gi, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        // Get full URL if relative
        const fullUrl = src.startsWith('http') ? src : `https://www.nerolac.com${src}`;
        
        if (!productMap[slug] && alt.trim()) {
          productMap[slug] = {
            name: alt.trim(),
            url: fullUrl,
            relativePath: src,
            filename: src.split('/').pop()
          };
          
          productImages.push({
            name: alt.trim(),
            url: fullUrl,
            slug: slug,
            filename: src.split('/').pop()
          });
        }
      }
    });
  });
  
  // Generate TypeScript code for products.ts
  console.log('\n📋 Copy this code to update src/data/products.ts:\n');
  console.log('const productImageMap: Record<string, string[]> = {');
  
  // Sort by product name for easier reading
  const sortedProducts = Object.entries(productMap).sort((a, b) => 
    a[1].name.localeCompare(b[1].name)
  );
  
  sortedProducts.forEach(([slug, data]) => {
    console.log(`  "${slug}": [\n    "${data.url}"\n  ],`);
  });
  
  console.log('};\n');
  
  // Also output a mapping table
  console.log('\n📊 Product Image Mapping Table:\n');
  console.log('| Product Name | Slug | Image URL |');
  console.log('|-------------|------|-----------|');
  sortedProducts.forEach(([slug, data]) => {
    const shortUrl = data.url.length > 60 ? data.url.substring(0, 57) + '...' : data.url;
    console.log(`| ${data.name} | ${slug} | ${shortUrl} |`);
  });
  
  // Output JSON for reference
  console.log('\n📄 JSON Format (for reference):\n');
  const jsonMap = {};
  sortedProducts.forEach(([slug, data]) => {
    jsonMap[slug] = [data.url];
  });
  console.log(JSON.stringify(jsonMap, null, 2));
  
  console.log(`\n✅ Found ${productImages.length} product images`);
  console.log(`📦 Mapped to ${Object.keys(productMap).length} products\n`);
  
  // List products that might be missing
  const expectedProducts = [
    'neu-latex-interior-paint',
    'beauty-smooth-wow-white',
    'impressions-kashmir-high-sheen',
    'impressions-hd',
    'impressions-kashmir',
    'kashmir-matt',
    'impressions-sheen',
    'beauty-gold-washable',
    'neu-latex-exterior',
    'suraksha-plus-wow-white',
    'excel-antipeel-wow-white',
    'excel-everlast',
    'nerolac-wonderwood',
    'nerolac-italian',
    'wood-ancillary',
    'nerolac-pu-enamel-10-in-1',
    'nerolac-synthetic-hi-gloss-enamel',
    'nerolac-satin-enamel',
    'nerolac-zinc-yellow-primer',
    'nerolac-premium-primer-st',
    'nerolac-premium-primer-wb',
    'nerolac-perma-crystal-seal',
    'nerolac-perma-no-heat',
    'impressions-glitter-finish',
    'nerolac-impressions-ideaz',
    'nerolac-impressions-metallic-finish',
    'kansai-select',
    'excel-texture-finish-dholpur',
    'excel-texture-finish-rigor',
    'excel-texture-finish-roller',
    'adhesive'
  ];
  
  const foundSlugs = Object.keys(productMap);
  const missingProducts = expectedProducts.filter(slug => !foundSlugs.includes(slug));
  
  if (missingProducts.length > 0) {
    console.log('⚠️  Products not found on this page:');
    missingProducts.forEach(slug => {
      console.log(`   - ${slug}`);
    });
    console.log('\n💡 Tip: Navigate to the specific product pages to find their images.\n');
  }
  
  return {
    images: productImages,
    productMap: productMap,
    missing: missingProducts
  };
})();

