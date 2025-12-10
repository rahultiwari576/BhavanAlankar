/**
 * Script to fetch product images from nerolac.com
 * 
 * This script helps you get the actual product image URLs from nerolac.com
 * 
 * Usage:
 * 1. Visit https://www.nerolac.com/
 * 2. Navigate to each product page
 * 3. Right-click on product images and copy image URLs
 * 4. Update the productImageMap in src/data/products.ts with actual URLs
 * 
 * Or use this script with a headless browser to automate the process
 */

const fs = require('fs');
const path = require('path');

// Product slugs mapping - update these with actual URLs from nerolac.com
const productImageMapping = {
  // Interior Wall Paints
  "neu-latex-interior-paint": {
    name: "Neu Latex Interior Paint",
    category: "Interior Wall Paints",
    // Visit: https://www.nerolac.com/decorative-paint-products/interior-paints/neu-latex-interior-paint
    // Copy image URLs from the product page
    images: [
      "https://www.nerolac.com/sites/default/files/products/neu-latex-interior.jpg", // UPDATE THIS
      "https://www.nerolac.com/sites/default/files/products/neu-latex-interior-application.jpg" // UPDATE THIS
    ]
  },
  "beauty-smooth-wow-white": {
    name: "Beauty Smooth WOW White",
    category: "Interior Wall Paints",
    // Visit: https://www.nerolac.com/decorative-paint-products/interior-paints/beauty-smooth-wow-white
    images: [
      "https://www.nerolac.com/sites/default/files/products/beauty-smooth-wow-white.jpg", // UPDATE THIS
      "https://www.nerolac.com/sites/default/files/products/beauty-smooth-application.jpg" // UPDATE THIS
    ]
  },
  "impressions-kashmir-high-sheen": {
    name: "Impressions Kashmir High sheen",
    category: "Interior Wall Paints",
    // Visit: https://www.nerolac.com/decorative-paint-products/interior-paints/impressions-kashmir-high-sheen
    images: [
      "https://www.nerolac.com/sites/default/files/products/impressions-kashmir-high-sheen.jpg", // UPDATE THIS
      "https://www.nerolac.com/sites/default/files/products/impressions-kashmir-application.jpg" // UPDATE THIS
    ]
  },
  // Add more products as needed...
};

/**
 * Instructions to get actual image URLs:
 * 
 * 1. Open https://www.nerolac.com/ in your browser
 * 2. Navigate to Products section
 * 3. Click on each product
 * 4. Open browser DevTools (F12)
 * 5. Go to Network tab and filter by "Img"
 * 6. Reload the page
 * 7. Find the product image URLs
 * 8. Copy the full URL (e.g., https://www.nerolac.com/sites/default/files/...)
 * 9. Update the productImageMapping object above
 * 10. Run this script to update products.ts
 */

function updateProductImages() {
  console.log('Product Image URL Mapping Helper');
  console.log('================================');
  console.log('\nTo get actual image URLs from nerolac.com:');
  console.log('1. Visit each product page on nerolac.com');
  console.log('2. Right-click on product images → "Copy image address"');
  console.log('3. Update the productImageMapping in this file');
  console.log('4. The images will be automatically used in products.ts\n');
  
  console.log('Product URLs to visit:');
  Object.entries(productImageMapping).forEach(([slug, data]) => {
    console.log(`- ${data.name}: https://www.nerolac.com/products/${slug}`);
  });
}

// Export for use in other scripts
if (require.main === module) {
  updateProductImages();
}

module.exports = { productImageMapping, updateProductImages };

