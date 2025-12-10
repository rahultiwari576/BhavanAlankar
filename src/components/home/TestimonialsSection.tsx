import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Jamshedpur",
      rating: 5,
      text: "Exceptional quality! The paint has lasted for years without fading. The waterproofing feature really works during monsoons.",
    },
    {
      name: "Priya Sharma",
      location: "Jamshedpur",
      rating: 5,
      text: "Beautiful finish and the zero odor formula was perfect for our home. Kids were comfortable throughout the painting process.",
    },
    {
      name: "Amit Patel",
      location: "Jamshedpur",
      rating: 5,
      text: "As a contractor, I always recommend these paints to my clients. Easy to apply and clients love the final results.",
    },
  ];

  return (
    <section className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
          alt="Testimonials background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/70"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Testimonials
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4">
            What Our Customers Say
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their painting needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-border hover-lift group card-transition hover:shadow-xl hover:border-primary/40 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-6 group-hover:bg-muted/20 transition-colors duration-300">
                <Quote className="w-10 h-10 text-primary/20 mb-4 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-300" />
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform duration-300" 
                      style={{ transitionDelay: `${0.05 * i}s` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 group-hover:text-foreground/80 transition-colors duration-300">{testimonial.text}</p>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
