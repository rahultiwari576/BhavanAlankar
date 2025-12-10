import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Download, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Color {
  name: string;
  hex: string;
}

interface ImageWallCustomizerProps {
  colors?: Color[];
}

const defaultColors: Color[] = [
  { name: "Pure White", hex: "#FFFFFF" },
  { name: "Ivory White", hex: "#FFFFF0" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Light Gray", hex: "#D3D3D3" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Mint Green", hex: "#98FB98" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Peach", hex: "#FFDAB9" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Light Yellow", hex: "#FFFFE0" },
];

const ImageWallCustomizer = ({ colors = defaultColors }: ImageWallCustomizerProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
  const [selectedArea, setSelectedArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setUploadedImage(imageUrl);
        setSelectedArea(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!uploadedImage || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsSelecting(true);
    setSelectionStart({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !selectionStart || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = Math.abs(x - selectionStart.x);
    const height = Math.abs(y - selectionStart.y);
    const startX = Math.min(x, selectionStart.x);
    const startY = Math.min(y, selectionStart.y);
    
    setSelectedArea({ x: startX, y: startY, width, height });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const applyColorToArea = () => {
    if (!selectedArea || !canvasRef.current || !imageRef.current || !uploadedImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Apply color overlay to selected area
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = selectedColor.hex;
      ctx.fillRect(
        (selectedArea.x / containerRef.current!.clientWidth) * canvas.width,
        (selectedArea.y / containerRef.current!.clientHeight) * canvas.height,
        (selectedArea.width / containerRef.current!.clientWidth) * canvas.width,
        (selectedArea.height / containerRef.current!.clientHeight) * canvas.height
      );
      
      // Update the displayed image
      const dataUrl = canvas.toDataURL();
      setUploadedImage(dataUrl);
      setSelectedArea(null);
    };
    img.src = uploadedImage;
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wall-customization.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedArea(null);
    setSelectedColor(colors[0]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Image Wall Customizer</span>
          <div className="flex gap-2">
            {uploadedImage && (
              <>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Upload */}
        {!uploadedImage ? (
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <Label htmlFor="wall-image-upload" className="cursor-pointer">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  Upload Your Wall Image
                </p>
                <p className="text-sm text-muted-foreground">
                  Upload a photo of your wall to see how different colors look
                </p>
                <Button variant="outline" className="mt-4">
                  Choose Image
                </Button>
              </div>
            </Label>
            <Input
              id="wall-image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <>
            {/* Image Display with Selection */}
            <div
              ref={containerRef}
              className="relative border-2 border-border rounded-lg overflow-hidden bg-muted"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: "crosshair" }}
            >
              <img
                ref={imageRef}
                src={uploadedImage}
                alt="Wall preview"
                className="w-full h-auto max-h-96 object-contain"
              />
              {selectedArea && (
                <div
                  className="absolute border-2 border-primary bg-primary/20 pointer-events-none"
                  style={{
                    left: `${selectedArea.x}px`,
                    top: `${selectedArea.y}px`,
                    width: `${selectedArea.width}px`,
                    height: `${selectedArea.height}px`,
                  }}
                >
                  <div className="absolute -top-8 left-0 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                    Selected Area
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Click and drag on the image to select the wall area you want to colorize
            </p>
          </>
        )}

        {/* Color Selection */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Select Color
          </label>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`aspect-square rounded-lg border-2 transition-all ${
                  selectedColor.hex === color.hex
                    ? "border-primary scale-110 shadow-lg ring-2 ring-primary/50"
                    : "border-border hover:border-primary/50 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Selected Color</span>
              <span className="text-xs font-mono text-muted-foreground">{selectedColor.hex}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="w-16 h-16 rounded-lg border-2 border-border shadow-lg"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div>
                <p className="font-semibold text-foreground">{selectedColor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedArea ? "Ready to apply" : "Select an area on the image"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        {selectedArea && uploadedImage && (
          <Button onClick={applyColorToArea} className="w-full" size="lg">
            Apply {selectedColor.name} to Selected Area
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageWallCustomizer;

