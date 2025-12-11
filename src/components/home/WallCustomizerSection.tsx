import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Upload, Box, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WallCustomizer3D from "@/components/wall/WallCustomizer3D";
import ImageWallCustomizer from "@/components/wall/ImageWallCustomizer";

const WallCustomizerSection = () => {
  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Color Tools
          </h3>
          <h4 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4">
            Visualize Your Dream Walls
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how different colors look on your walls with our interactive 3D room viewer.
            Select walls, choose colors, and visualize your space before painting.
          </p>
        </div>

        {/* 3D Room Viewer - Direct Display (No Tabs) */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <WallCustomizer3D />
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Box className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">3D Room Viewer</h3>
                    <p className="text-sm text-muted-foreground">
                      Rotate and explore a 3D room model. Click on any wall to select it and apply your chosen color.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">1500+ Color Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from our extensive color palette. All colors are available in our premium paint range.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="hero" size="lg" className="w-full group" asChild>
              <Link to="/color-tools">
                Try Wall Customizer
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallCustomizerSection;
