import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import projectImage from "@/assets/project-exterior.jpg";

const ProjectsSection = () => {
  const projects = [
    {
      image: projectImage,
      title: "Modern Villa Transformation",
      location: "Jamshedpur, Jharkhand",
      category: "Residential",
      description: "Complete exterior and interior painting with premium weather-resistant coatings.",
    },
    {
      image: projectImage,
      title: "Corporate Office Revamp",
      location: "Jamshedpur, Jharkhand",
      category: "Commercial",
      description: "Professional workspace painted with low-odor, quick-dry formulations.",
    },
    {
      image: projectImage,
      title: "Heritage Home Restoration",
      location: "Jamshedpur, Jharkhand",
      category: "Residential",
      description: "Careful restoration with specialty coatings preserving historical charm.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Our Work
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4">
            Featured Projects
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successfully completed projects showcasing quality and craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-border hover-lift group cursor-pointer card-transition hover:shadow-2xl hover:border-primary/40 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover image-zoom group-hover:brightness-110 transition-all duration-500"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 group-hover:bg-muted/30 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-300">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.location}
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
