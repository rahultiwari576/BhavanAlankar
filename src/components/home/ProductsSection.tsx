import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, TreePine, Droplets, Paintbrush, Sparkles, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  const products = [
    {
      icon: Home,
      title: "Interior Wall Paints",
      description: "Premium emulsions with washable finishes, zero odor, and vibrant colors for your living spaces.",
      features: ["Washable", "Low VOC", "Anti-Bacterial"],
      category: "Interior Wall Paints",
    },
    {
      icon: Building2,
      title: "Exterior Wall Paints",
      description: "Weather-resistant coatings that protect against harsh conditions while maintaining beauty.",
      features: ["UV Protection", "Waterproof", "Fade Resistant"],
      category: "Exterior Wall Paints",
    },
    {
      icon: TreePine,
      title: "Wood Coatings",
      description: "Premium finishes for wood surfaces with excellent durability and aesthetic appeal.",
      features: ["Scratch Resistant", "High Gloss", "Durable"],
      category: "Wood Coatings",
    },
    {
      icon: Shield,
      title: "Metal Enamel Paints",
      description: "High-quality enamels for metal surfaces providing rust protection and beautiful finish.",
      features: ["Rust Protection", "Hi-Gloss Finish", "Durable"],
      category: "Metal Enamel Paints",
    },
    {
      icon: Droplets,
      title: "Waterproofing Solutions",
      description: "Advanced waterproofing solutions to protect your walls from moisture and dampness.",
      features: ["Anti-Damp", "Moisture Resistant", "Long Lasting"],
      category: "Waterproofing Solutions",
    },
    {
      icon: Paintbrush,
      title: "Primers",
      description: "Essential base coatings for perfect adhesion and long-lasting paint finish.",
      features: ["Strong Adhesion", "Moisture Block", "Alkali Resistant"],
      category: "Primers",
    },
    {
      icon: Sparkles,
      title: "Designer Finishes",
      description: "Creative textures and finishes for unique wall designs and decorative applications.",
      features: ["Textured Finish", "Decorative", "Customizable"],
      category: "Designer Finishes",
    },
  ];

  const colorGradients = [
    "from-primary/20 to-blue-400/20",
    "from-blue-400/20 to-purple-400/20",
    "from-purple-400/20 to-pink-400/20",
    "from-pink-400/20 to-orange-400/20",
    "from-orange-400/20 to-yellow-400/20",
    "from-yellow-400/20 to-green-400/20",
    "from-green-400/20 to-teal-400/20",
    "from-teal-400/20 to-cyan-400/20",
  ];

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Colorful background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 via-purple-400 to-pink-400"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in-up">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our Products
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Complete <span className="colorful-accent">Paint Solutions</span>
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            From interior elegance to exterior durability, we offer comprehensive coating solutions for every need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            const gradient = colorGradients[index % colorGradients.length];
            return (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="block animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <Card className="border-border hover-lift group cursor-pointer h-full relative overflow-hidden card-transition hover:shadow-2xl hover:border-primary/40 hover:scale-[1.02]">
                  {/* Colorful gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`}></div>
                  <CardContent className="p-6 relative z-10 group-hover:bg-muted/10 transition-colors duration-300">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">{product.description}</p>
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm animate-fade-in" style={{ animationDelay: `${0.05 * idx}s` }}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} mr-2 group-hover:scale-150 transition-transform duration-300`}></span>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="p-0 h-auto group/btn text-primary hover:text-primary/80">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
