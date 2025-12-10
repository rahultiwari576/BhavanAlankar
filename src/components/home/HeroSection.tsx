import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// To use Nerolac.com hero image, replace the heroImage import above with:
// const nerolacHeroImage = "https://www.nerolac.com/path-to-hero-image.jpg";
// Then use nerolacHeroImage instead of heroImage in the img src below

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const images = [
    "/accessories/0ce5c84d-656b-461a-9159-3520791adfa9.jpeg",
    "/accessories/blue.jpg",
    "/accessories/grey.jpg",
    "/accessories/new_home_bnr_desk.webp",
    "/accessories/orange.jpg",
    "/accessories/purple.jpg",
    "/accessories/rainnow.jpg",
    "/accessories/red.jpg",
    "/accessories/sky.jpg",
    "/accessories/skyu.jpg",
    "/accessories/yellow.jpg",
    "/accessories/yellow1.jpg",
  ];

  // Preload images for faster loading
  useEffect(() => {
    images.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      
      // Preload next image for smoother transitions
      const nextIndex = (newIndex + 1) % images.length;
      const nextImage = new Image();
      nextImage.src = images[nextIndex];
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative overflow-hidden">
      {/* Animated Paint Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-white"></div>
        {/* Paint splashes with animation */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-paint-flow" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-paint-flow" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-paint-flow" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
          <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-paint-flow" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-paint-flow" style={{ animationDelay: '3s', animationDuration: '11s' }}></div>
        </div>
        {/* Paint brush strokes effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-primary/30 via-transparent to-transparent transform -skew-y-12 animate-paint-sweep" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-tl from-blue-500/30 via-transparent to-transparent transform skew-y-12 animate-paint-sweep" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      <div className="gradient-hero relative bg-white z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/wallPaint.jpeg"
            alt="Wall paint background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12 md:py-16">
            {/* Content */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-[34px] md:text-[46px] lg:text-[58px] font-bold text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Breath Life Into
                <span className="block colorful-accent animate-gradient-shift">Your Walls</span>
              </h1>
              
              <div className="inline-block animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#4169E1] text-white rounded-full text-xs sm:text-sm font-medium border border-[#4169E1] backdrop-blur-sm inline-block text-center">
                  Nerolac Paints-Best showroom in Jamshedpur
                </span>
              </div>
              
              <p className="text-lg text-foreground font-medium max-w-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                Experience the expertise of premium paints, transforming your walls with a century of trust and innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button variant="hero" size="lg" className="group bg-[#4169E1] hover:bg-[#4169E1]/90 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <Link to="/color-tools#calculator">
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                {/* <Button variant="outline" size="lg" className="group border-2 hover:bg-primary/10 transition-all duration-300">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Watch How It Works
                </Button> */}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="group cursor-default">
                  <div className="text-3xl font-bold text-green-700 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-sm text-foreground font-medium">Years of Trust</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-bold text-green-700 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-sm text-foreground font-medium">Projects Done</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-bold text-green-700 group-hover:scale-110 transition-transform duration-300">1500+</div>
                  <div className="text-sm text-foreground font-medium">Color Options</div>
                </div>
              </div>
            </div>

            {/* Image Slider */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative w-full aspect-[16/9]">
                          <img
                            src={image}
                            alt={`Paint color ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
