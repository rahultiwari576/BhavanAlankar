import { useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");
  const filterParam = searchParams.get("filter");

  // Map category names from URL to section IDs
  const mapCategoryToSection = (categoryName: string | null): string | null => {
    if (!categoryName) return null;
    
    const categoryLower = categoryName.toLowerCase();
    
    // Map category names to section IDs
    if (categoryLower.includes("interior") && categoryLower.includes("wall")) {
      return "interior";
    } else if (categoryLower.includes("exterior") && categoryLower.includes("wall")) {
      return "exterior";
    } else if (categoryLower.includes("primer")) {
      return "ancillary-primers";
    } else if (categoryLower.includes("metal") && categoryLower.includes("enamel")) {
      return "enamel";
    } else if (categoryLower.includes("enamel")) {
      return "enamel";
    } else if (categoryLower.includes("waterproofing")) {
      return "waterproofing";
    } else if (categoryLower.includes("wood") && categoryLower.includes("coating")) {
      return "enamel"; // Wood coatings might be enamel or specialty
    } else if (categoryLower.includes("designer") || categoryLower.includes("texture")) {
      return "specialty";
    } else if (categoryLower.includes("adhesive")) {
      return "ancillary";
    }
    
    // Fallback: try direct match
    return categoryLower;
  };

  // Scroll to the section when category is selected
  useEffect(() => {
    if (categoryParam) {
      const mappedCategory = mapCategoryToSection(categoryParam);
      if (mappedCategory) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(mappedCategory);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, [categoryParam]);

  // Group products by category for hash navigation
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: typeof products } = {
      interior: [],
      exterior: [],
      primers: [],
      specialty: [],
      enamel: [],
      waterproofing: [],
      ancillary: [],
      "ancillary-primers": [],
      "ancillary-brushes": [],
    };

    products.forEach((product) => {
      const category = product.category.toLowerCase();
      const productName = product.name.toLowerCase();
      
      if (category.includes("interior") && !category.includes("texture")) {
        groups.interior.push(product);
      } else if (category.includes("exterior")) {
        groups.exterior.push(product);
      } else if (category.includes("primer") && !category.includes("ancillary")) {
        groups.primers.push(product);
      } else if (category.includes("ancillary")) {
        groups.ancillary.push(product);
        // Check if it's a primer type
        if (
          productName.includes("economy") ||
          productName.includes("popular") ||
          productName.includes("premium") ||
          productName.includes("exterior") ||
          productName.includes("alkali") ||
          productName.includes("red oxide") ||
          productName.includes("wood") ||
          productName.includes("cement") ||
          productName.includes("zinc yellow")
        ) {
          groups["ancillary-primers"].push(product);
        }
        // Check if it's a brush/accessory type
        if (
          productName.includes("roller") ||
          productName.includes("thinner") ||
          productName.includes("putty") ||
          productName.includes("gypsum")
        ) {
          groups["ancillary-brushes"].push(product);
        }
      } else if (category.includes("enamel")) {
        groups.enamel.push(product);
      } else if (category.includes("waterproofing")) {
        groups.waterproofing.push(product);
      } else if (
        category.includes("texture") ||
        category.includes("designer") ||
        category.includes("specialty")
      ) {
        groups.specialty.push(product);
      } else {
        // Default to specialty for other categories
        groups.specialty.push(product);
      }
    });

    return groups;
  }, []);

  const renderProductCard = (product: typeof products[0], index: number) => (
    <Card 
      key={product.id} 
      className="border-border hover-lift overflow-hidden group card-transition hover:shadow-2xl hover:border-primary/40 animate-fade-in-up"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <div className="aspect-square overflow-hidden bg-white relative flex items-center justify-center">
        <img
          src={product.images[0] || "https://www.nerolac.com/sites/default/files/2025-07/Texture%20-%2020kg%20Bucket.png"}
          alt={product.name}
          className="max-w-full max-h-full w-auto h-auto object-contain image-zoom group-hover:brightness-110 transition-all duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://www.nerolac.com/sites/default/files/2025-07/Texture%20-%2020kg%20Bucket.png";
          }}
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      <CardContent className="p-4 group-hover:bg-muted/20 transition-colors duration-300">
        <span className="text-xs text-primary font-semibold group-hover:text-primary/80 transition-colors duration-300">{product.category}</span>
        <h3 className="text-lg font-bold text-foreground mt-1.5 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
          {product.tagline}
        </p>
        <Button variant="default" size="sm" className="w-full group/btn hover:scale-105 transition-transform duration-300 text-xs" asChild>
          <Link to={`/products/${product.slug}`}>
            View Details
            <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  const renderSection = (id: string, title: string, productsList: typeof products) => {
    if (productsList.length === 0) return null;
    
    return (
      <section id={id} className="scroll-mt-24 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {id === "enamel" && (
            <p className="text-base font-bold italic text-foreground">
              Multiple size from 50ml to 20 Lt
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {productsList.map((product, index) => renderProductCard(product, index))}
        </div>
      </section>
    );
  };

  // Filter products based on URL parameters
  const shouldShowSection = (category: string) => {
    if (!categoryParam) return true; // Show all if no category param
    
    const mappedCategory = mapCategoryToSection(categoryParam);
    
    // Handle ancillary subcategories
    if (mappedCategory === "ancillary" || categoryParam.toLowerCase() === "ancillary") {
      if (subcategoryParam === "primers" && category === "ancillary-primers") return true;
      if (subcategoryParam === "brushes" && category === "ancillary-brushes") return true;
      if (!subcategoryParam && category === "ancillary") return true;
      return false;
    }
    
    return mappedCategory === category || categoryParam.toLowerCase() === category;
  };

  // Filter products by name for ancillary subcategories
  const filterAncillaryProducts = (productsList: typeof products, subcategory: string) => {
    if (!subcategory) return productsList;
    
    const filterKeywords: { [key: string]: string[] } = {
      primers: [
        "economy",
        "popular",
        "premium",
        "exterior",
        "alkali",
        "red oxide",
        "wood",
        "cement",
        "zinc yellow",
        "primer",
      ],
      brushes: [
        "roller",
        "thinner",
        "putty",
        "gypsum",
        "brush",
      ],
    };
    
    const keywords = filterKeywords[subcategory] || [];
    return productsList.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();
      return keywords.some((keyword) => 
        productName.includes(keyword) || productCategory.includes(keyword)
      );
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of premium paint products designed for every surface and purpose.
            </p>
          </div>

          {/* Show sections based on category filter */}
          {shouldShowSection("interior") && renderSection("interior", "Interior Wall Paints", groupedProducts.interior)}
          {shouldShowSection("exterior") && renderSection("exterior", "Exterior Wall Paints", groupedProducts.exterior)}
          {shouldShowSection("enamel") && renderSection("enamel", "Enamel NSE & PU Enamel", groupedProducts.enamel)}
          {shouldShowSection("ancillary") && renderSection("ancillary", "Paint Ancillary", groupedProducts.ancillary)}
          {shouldShowSection("ancillary-primers") && renderSection("ancillary-primers", "Primers", filterAncillaryProducts(groupedProducts.ancillary, "primers"))}
          {shouldShowSection("ancillary-brushes") && renderSection("ancillary-brushes", "Brushes", filterAncillaryProducts(groupedProducts.ancillary, "brushes"))}
          {shouldShowSection("waterproofing") && renderSection("waterproofing", "Waterproofing Solutions", groupedProducts.waterproofing)}
          
          {/* Commented out sections - hidden when category filter is active */}
          {/* {renderSection("primers", "Primers", groupedProducts.primers)} */}
          {/* {renderSection("specialty", "Specialty Coatings", groupedProducts.specialty)} */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
