import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Color {
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  colors: Color[];
}

const ColorSelector = ({ colors }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Available Colors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className="group relative"
              title={color.name}
            >
              <div
                className={`aspect-square rounded-lg border-2 transition-all ${
                  selectedColor.hex === color.hex
                    ? "border-primary scale-110 shadow-lg"
                    : "border-border hover:border-primary/50 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {selectedColor.hex === color.hex && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground group-hover:text-foreground transition-colors">
                {color.name}
              </p>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-lg border border-border bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Selected Color</span>
            <span className="text-xs font-mono text-muted-foreground">{selectedColor.hex}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-lg border-2 border-border"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div>
              <p className="font-semibold text-foreground">{selectedColor.name}</p>
              <p className="text-sm text-muted-foreground">Premium Finish</p>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          View Full Color Catalogue
        </Button>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;
