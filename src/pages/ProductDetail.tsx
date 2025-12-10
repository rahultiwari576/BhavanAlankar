import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductBenefits from "@/components/product/ProductBenefits";
import ProductSpecs from "@/components/product/ProductSpecs";
import ApplicationProcess from "@/components/product/ApplicationProcess";
import PaintCalculator from "@/components/product/PaintCalculator";
import ColorSelector from "@/components/product/ColorSelector";
import WallCustomizer3D from "@/components/wall/WallCustomizer3D";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/data/products";
import { ArrowLeft, Share2, Heart } from "lucide-react";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground">The product you are looking for does not exist.</p>
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Use actual product images from nerolac.com
  const displayImages = product.images && product.images.length > 0 ? product.images : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container-custom py-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Header */}
        <section className="py-12">
          <div className="container-custom">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Gallery */}
              <div>
                {displayImages.length > 0 ? (
                  <ProductGallery images={displayImages} productName={product.name} />
                ) : (
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">No image available</p>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                  <h1 className="text-4xl font-bold text-foreground mb-3">{product.name}</h1>
                  <p className="text-xl text-primary font-semibold mb-4">{product.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>


                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-3">Key Features:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-16">
              <ProductBenefits benefits={product.benefits} />
            </div>

            {/* Calculator and Colors */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <PaintCalculator 
                pricePerLiter={product.price.basePrice} 
                coveragePerLiter={150}
              />
              <ColorSelector colors={product.colors} />
            </div>

            {/* Wall Customizer */}
            <div className="mb-16">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Visualize This Color in Your Room
                </h2>
                <p className="text-muted-foreground">
                  See how {product.name} colors look in a 3D room. Select walls and apply colors to visualize your space.
                </p>
              </div>
              <WallCustomizer3D colors={product.colors} />
            </div>

            {/* Specifications */}
            <div className="mb-16">
              <ProductSpecs 
                specifications={product.specifications} 
                downloads={product.downloads}
              />
            </div>

            {/* Application Process */}
            <div className="mb-16">
              <ApplicationProcess steps={product.applicationSteps} />
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get expert guidance and professional painting services for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Book Free Consultation
                </Button>
                <Button variant="outline" size="lg" className="bg-background">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
