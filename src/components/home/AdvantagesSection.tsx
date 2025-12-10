import { Droplets, Wind, Shield, Zap, Leaf, Palette } from "lucide-react";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Droplets,
      title: "100% Waterproof",
      description: "Advanced moisture barrier technology protects your walls from water damage.",
    },
    {
      icon: Wind,
      title: "Zero Odor Formula",
      description: "Eco-friendly formulations with zero smell for comfortable application.",
    },
    {
      icon: Shield,
      title: "Anti-Fungal Coating",
      description: "Prevents mold and mildew growth, ensuring healthy indoor air quality.",
    },
    {
      icon: Zap,
      title: "Easy Washable",
      description: "Stain-resistant surface that can be cleaned effortlessly without damage.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Green Guard certified with low VOC content for environmental safety.",
    },
    {
      icon: Palette,
      title: "1500+ Colors",
      description: "Extensive color palette with custom tinting options for perfect match.",
    },
  ];

  const iconColors = [
    "from-blue-400 to-cyan-400",
    "from-green-400 to-emerald-400",
    "from-purple-400 to-pink-400",
    "from-orange-400 to-yellow-400",
    "from-teal-400 to-blue-400",
    "from-pink-400 to-rose-400",
  ];

  return (
    <section className="section-spacing bg-muted/50 relative overflow-hidden">
      {/* Colorful accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 via-purple-400 to-pink-400"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in-up">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Why Choose Us
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Premium Paint <span className="colorful-accent">Advantages</span>
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Experience superior quality with features designed for durability, beauty, and environmental responsibility.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            const gradient = iconColors[index % iconColors.length];
            return (
              <div 
                key={index} 
                className="flex space-x-4 group animate-fade-in-up hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
