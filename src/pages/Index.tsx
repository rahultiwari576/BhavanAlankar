import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import WallCustomizerSection from "@/components/home/WallCustomizerSection";
import AdvantagesSection from "@/components/home/AdvantagesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustSection from "@/components/home/TrustSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Decorative colorful elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ProductsSection />
        <WallCustomizerSection />
        <AdvantagesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
