import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

const CTASection = () => {
  const phoneNumber = "+917667825974";
  
  const handleCallUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, let the tel: link handle the call directly
      // No need to prevent default
      return;
    } else {
      // On desktop, scroll to phone number in header
      e.preventDefault();
      const phoneElement = document.getElementById('header-phone') || document.getElementById('header-phone-mobile');
      if (phoneElement) {
        phoneElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight the phone number briefly
        phoneElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'rounded-md', 'px-2', 'py-1');
        setTimeout(() => {
          phoneElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'rounded-md', 'px-2', 'py-1');
        }, 2000);
      } else {
        // Fallback: scroll to top if element not found
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden border border-primary/20 shadow-2xl bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/blue.jpg)' }}>
          {/* Darker overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Ready to <span className="text-primary">Transform</span> Your Space?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get expert advice and a free quote for your painting project. Our team is ready to help bring your vision to life.
            </p>
            
            <div className="flex justify-center items-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <a 
                href={`tel:${phoneNumber}`}
                onClick={handleCallUsClick}
                className="group inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-md active:scale-95"
              >
                <Phone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Call Us Now
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/30 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-white/80 mb-4">Trusted by over 10,000+ customers nationwide</p>
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center group cursor-default">
                  <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-xs text-white/80">Support Available</div>
                </div>
                <div className="h-10 w-px bg-white/30"></div>
                <div className="text-center group cursor-default">
                  <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">Free</div>
                  <div className="text-xs text-white/80">Site Consultation</div>
                </div>
                <div className="h-10 w-px bg-white/30"></div>
                <div className="text-center group cursor-default">
                  <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">5 Year</div>
                  <div className="text-xs text-white/80">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
