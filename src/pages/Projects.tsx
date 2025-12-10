import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-spacing">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-8">Our Projects</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Browse through our portfolio of successfully completed painting projects.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
