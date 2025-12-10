import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dealers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-spacing">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-8">Find a Dealer</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Locate authorized dealers near you or become a dealer partner.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dealers;
