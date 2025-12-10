import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "End-to-End Painting Services",
      description: "A complete painting solution for both interior and exterior projects:",
      features: [
        "On-site assessment",
        "Shade & product consultation",
        "Surface preparation",
        "Painting execution with modern tools",
        "Final cleaning & handover"
      ],
      conclusion: "Everything is managed for you from start to finish."
    },
    {
      title: "Specialized & Designer Painting",
      description: "Enhance your walls with premium finishes such as:",
      features: [
        "Texture Painting",
        "Designer Wall Art / Stencil Art",
        "Premium finishes from Nerolac Impressions & Excel range"
      ],
      conclusion: "Skilled painters use advanced techniques to deliver beautiful, long-lasting results."
    },
    {
      title: "Certified & Trained Painters",
      description: "NxtGen provides access to a network of:",
      features: [
        "Professionally trained painters",
        "Background-checked teams",
        "Experts in modern tools, textures & waterproofing",
        "Skilled applicators for premium and luxury finishes"
      ],
      conclusion: "This ensures superior workmanship and worry-free execution."
    },
    {
      title: "Waterproofing Solutions (Perma Range)",
      description: "Specialized waterproofing services using Nerolac Perma Technology, including:",
      features: [
        "Terrace & roof waterproofing",
        "Bathroom & overhead tank waterproofing",
        "Dampness treatment for walls",
        "High-performance crack-filling and seepage solutions"
      ],
      conclusion: "These advanced products help create strong, durable barriers against water."
    },
    {
      title: "Hassle-Free & Managed Process",
      description: "The entire project is handled by the Nerolac team, ensuring:",
      features: [
        "Smooth coordination",
        "Proper surface preparation",
        "Timely progress",
        "Professional supervision",
        "No disturbance to customers"
      ],
      conclusion: "You simply choose the colours—everything else is taken care of."
    },
    {
      title: "Quality Assurance",
      description: "NxtGen services guarantee:",
      features: [
        "Professional finishing",
        "Use of genuine, high-quality materials",
        "Skilled application for long-lasting durability",
        "Strong attention to detail",
        "Clean and tidy handover after completion"
      ],
      conclusion: "Your painting project is completed with precision and consistency."
    },
    {
      title: "Transparent Pricing & Project Tracking",
      description: "Complete transparency throughout your project:",
      features: [
        "Customers receive clear, itemised quotations",
        "A site visit is done to confirm the accurate project scope",
        "Project status can be tracked online",
        "No hidden charges; everything is transparent and documented"
      ],
      conclusion: "This builds complete trust and clarity."
    }
  ];

  const colorGradients = [
    "from-primary/20 to-blue-400/20",
    "from-blue-400/20 to-purple-400/20",
    "from-purple-400/20 to-pink-400/20",
    "from-pink-400/20 to-orange-400/20",
    "from-orange-400/20 to-yellow-400/20",
    "from-yellow-400/20 to-green-400/20",
    "from-green-400/20 to-teal-400/20",
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navbar />
      <main className="section-spacing">
        {/* Colorful background accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 via-purple-400 to-pink-400"></div>
        
        <div className="container-custom relative z-10">
          {/* Header Section with better spacing */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animated-gradient-text text-pulse-animated transition-all duration-500 hover:scale-110 inline-block" 
              style={{ animationDelay: '0.2s', fontFamily: "'Roboto', sans-serif" }}
              data-text="Nerolac NxtGen Painting & Waterproofing Services"
            >
              Nerolac NxtGen Painting & Waterproofing Services
            </h1>
            <div className="space-y-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                Nerolac NxtGen is a professional, end-to-end home painting and waterproofing solution designed to make your painting experience seamless, reliable, and completely hassle-free. The service connects homeowners with <strong className="text-foreground not-italic">certified, background-checked, and well-trained professional painters</strong>, ensuring high-quality execution using premium Nerolac products.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                It is a <strong className="text-foreground not-italic">holistic service</strong> that covers everything—from consultation and planning to paint selection, execution, supervision, and final handover.
              </p>
            </div>
          </div>

          {/* Services Grid with matching card design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => {
              const gradient = colorGradients[index % colorGradients.length];
              return (
                <Card 
                  key={index} 
                  className="border-border hover-lift group cursor-pointer h-full relative overflow-hidden card-transition hover:shadow-2xl hover:border-primary/40 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {/* Colorful gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`}></div>
                  
                  <CardContent className="p-6 relative z-10 group-hover:bg-muted/10 transition-colors duration-300">
                    {/* Number badge with gradient */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <span className="text-xl font-bold text-primary group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2.5 mb-5">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm animate-fade-in" style={{ animationDelay: `${0.05 * idx}s` }}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} mr-2.5 mt-1.5 group-hover:scale-150 transition-transform duration-300 flex-shrink-0`}></span>
                          <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                      <p className="text-sm text-foreground font-medium italic group-hover:text-primary/90 transition-colors duration-300">
                        {service.conclusion}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA Section with better spacing */}
          <div className="mt-20 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-blue-400/5 to-purple-400/5 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-10 md:p-12 text-center">
                <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                  Nerolac NxtGen is designed to give homeowners a premium, stress-free painting experience, combining expert guidance, skilled professionals, advanced waterproofing technologies, and top-quality Nerolac products—ensuring beautiful, long-lasting results every time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+917667825974"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Call Us: 76678 25974
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    Visit Our Showroom
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
