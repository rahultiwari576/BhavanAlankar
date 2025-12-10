import { Award, Shield, Leaf, Users } from "lucide-react";

const TrustSection = () => {
  const badges = [
    {
      icon: Shield,
      title: "BIS Certified",
      description: "Bureau of Indian Standards",
    },
    {
      icon: Leaf,
      title: "Green Guard",
      description: "Environmental Safety",
    },
    {
      icon: Users,
      title: "50+ Years",
      description: "Industry Experience",
    },
  ];

  return (
    <section className="section-spacing bg-[#4169E1] text-white relative overflow-hidden">
      {/* Paint Animation Effects with Different Colors */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Paint Drips - Different Colors - Top to Bottom */}
        {[...Array(15)].map((_, i) => {
          const colorSets = [
            { top: 'rgba(96, 165, 250, 0.6)', mid: 'rgba(147, 197, 253, 0.5)', bottom: 'rgba(191, 219, 254, 0.4)', drop: 'rgba(96, 165, 250, 0.5)' }, // blue
            { top: 'rgba(74, 222, 128, 0.6)', mid: 'rgba(134, 239, 172, 0.5)', bottom: 'rgba(187, 247, 208, 0.4)', drop: 'rgba(74, 222, 128, 0.5)' }, // green
            { top: 'rgba(250, 204, 21, 0.6)', mid: 'rgba(253, 224, 71, 0.5)', bottom: 'rgba(254, 240, 138, 0.4)', drop: 'rgba(250, 204, 21, 0.5)' }, // yellow
            { top: 'rgba(244, 114, 182, 0.6)', mid: 'rgba(249, 168, 212, 0.5)', bottom: 'rgba(251, 207, 232, 0.4)', drop: 'rgba(244, 114, 182, 0.5)' }, // pink
            { top: 'rgba(168, 85, 247, 0.6)', mid: 'rgba(192, 132, 252, 0.5)', bottom: 'rgba(221, 214, 254, 0.4)', drop: 'rgba(168, 85, 247, 0.5)' }, // purple
            { top: 'rgba(34, 211, 238, 0.6)', mid: 'rgba(103, 232, 249, 0.5)', bottom: 'rgba(165, 243, 252, 0.4)', drop: 'rgba(34, 211, 238, 0.5)' }, // cyan
            { top: 'rgba(251, 146, 60, 0.6)', mid: 'rgba(253, 186, 116, 0.5)', bottom: 'rgba(254, 215, 170, 0.4)', drop: 'rgba(251, 146, 60, 0.5)' }, // orange
            { top: 'rgba(239, 68, 68, 0.6)', mid: 'rgba(248, 113, 113, 0.5)', bottom: 'rgba(254, 202, 202, 0.4)', drop: 'rgba(239, 68, 68, 0.5)' }, // red
          ];
          const colorIndex = i % colorSets.length;
          const colors = colorSets[colorIndex];
          return (
            <div
              key={`drip-${i}`}
              className="absolute w-2 h-8 rounded-full"
              style={{
                left: `${(i * 6.5) % 100}%`,
                top: '-50px',
                background: `linear-gradient(to bottom, ${colors.top} 0%, ${colors.mid} 50%, ${colors.bottom} 100%)`,
                boxShadow: `0 0 10px ${colors.drop}`,
                animation: `paint-drip-vertical ${3.5 + (i % 2)}s linear infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <div 
                className="absolute bottom-0 w-3 h-3 rounded-full blur-sm" 
                style={{ 
                  backgroundColor: colors.drop,
                  animation: `drip-drop 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s` 
                }}
              ></div>
            </div>
          );
        })}

        {/* Paint Splashes - Different Colors - Top to Bottom */}
        {[...Array(12)].map((_, i) => {
          const splashColors = [
            'rgba(96, 165, 250, 0.3)', // blue
            'rgba(74, 222, 128, 0.3)', // green
            'rgba(250, 204, 21, 0.3)', // yellow
            'rgba(244, 114, 182, 0.3)', // pink
            'rgba(168, 85, 247, 0.3)', // purple
            'rgba(34, 211, 238, 0.3)', // cyan
            'rgba(251, 146, 60, 0.3)', // orange
            'rgba(239, 68, 68, 0.3)', // red
          ];
          const colorIndex = i % splashColors.length;
          const sizes = [40, 48, 56, 64, 72];
          const size = sizes[i % sizes.length];
          return (
            <div
              key={`splash-${i}`}
              className="absolute rounded-full blur-2xl"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: splashColors[colorIndex],
                top: '-50px',
                left: `${5 + (i * 8) % 90}%`,
                animation: `paint-drip-vertical ${4 + (i % 3)}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          );
        })}
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Trust & Certification
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
            Certified Excellence
          </h4>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our commitment to quality is backed by industry-leading certifications and decades of trust.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index} 
                className="text-center group cursor-default animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white group-hover:scale-105 transition-transform duration-300">{badge.title}</h3>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
