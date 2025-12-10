import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WallCustomizer3D from "@/components/wall/WallCustomizer3D";
import ImageWallCustomizer from "@/components/wall/ImageWallCustomizer";
import PaintCalculator from "@/components/product/PaintCalculator";

const ColorTools = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#calculator") {
      setTimeout(() => {
        const element = document.getElementById("calculator");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Color Tools & Visualizer</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Visualize how different colors will look on your walls. Try our 3D room viewer or upload your own wall image.
            </p>
          </div>

          <Tabs defaultValue="3d" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="3d">3D Room Viewer</TabsTrigger>
              <TabsTrigger value="image">Upload Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="3d" className="space-y-6">
              <WallCustomizer3D />
            </TabsContent>
            
            <TabsContent value="image" className="space-y-6">
              <ImageWallCustomizer />
            </TabsContent>
          </Tabs>

          {/* Paint Calculator Section */}
          <div id="calculator" className="mt-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-center mb-8">Paint Cost Calculator</h2>
            <div className="max-w-md mx-auto">
              <PaintCalculator pricePerLiter={850} coveragePerLiter={150} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ColorTools;
