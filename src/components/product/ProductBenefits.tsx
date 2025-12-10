import { Droplets, Sparkles, Shield, Award, Sun, Wind } from "lucide-react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsProps {
  benefits: Benefit[];
}

const iconMap: Record<string, any> = {
  droplets: Droplets,
  sparkles: Sparkles,
  shield: Shield,
  award: Award,
  sun: Sun,
  wind: Wind,
};

const ProductBenefits = ({ benefits }: ProductBenefitsProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Key Benefits</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = iconMap[benefit.icon] || Shield;
          return (
            <div key={index} className="flex space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductBenefits;
