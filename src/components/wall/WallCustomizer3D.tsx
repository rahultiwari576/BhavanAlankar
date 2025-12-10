import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download, Upload, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Color {
  name: string;
  hex: string;
}

interface WallCustomizer3DProps {
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

const WallCustomizer3D = ({ colors = defaultColors }: WallCustomizer3DProps) => {
  const [mode, setMode] = useState<"3d" | "upload">("3d");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedWall, setSelectedWall] = useState<"front" | "left" | "right" | "back">("front");
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [wallColors, setWallColors] = useState({
    front: colors[0].hex,
    left: "#F5F5DC",
    right: "#F5F5DC",
    back: "#F5F5DC",
  });
  const [wallImageAreas, setWallImageAreas] = useState<{
    front: { x: number; y: number; width: number; height: number } | null;
    left: { x: number; y: number; width: number; height: number } | null;
    right: { x: number; y: number; width: number; height: number } | null;
    back: { x: number; y: number; width: number; height: number } | null;
  }>({
    front: null,
    left: null,
    right: null,
    back: null,
  });
  const [isSelectingArea, setIsSelectingArea] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null);
  const [currentSelection, setCurrentSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWallClick = (wall: "front" | "left" | "right" | "back") => {
    setSelectedWall(wall);
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    // Apply color immediately in 3D mode
    if (mode === "3d") {
      setWallColors((prev) => ({
        ...prev,
        [selectedWall]: color.hex,
      }));
    }
    // In upload mode, color will be applied when user clicks "Apply" button
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const delta = e.clientX - dragStart;
      setRotation((prev) => prev + delta * 0.5);
      setDragStart(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setUploadedImage(imageUrl);
        setMode("upload");
        setWallImageAreas({
          front: null,
          left: null,
          right: null,
          back: null,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!uploadedImage || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsSelectingArea(true);
    setSelectionStart({ x, y });
    setCurrentSelection({ x, y, width: 0, height: 0 });
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelectingArea || !selectionStart || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = Math.abs(x - selectionStart.x);
    const height = Math.abs(y - selectionStart.y);
    const startX = Math.min(x, selectionStart.x);
    const startY = Math.min(y, selectionStart.y);
    setCurrentSelection({ x: startX, y: startY, width, height });
  };

  const handleImageMouseUp = () => {
    if (isSelectingArea && currentSelection && currentSelection.width > 10 && currentSelection.height > 10) {
      setWallImageAreas((prev) => ({
        ...prev,
        [selectedWall]: currentSelection,
      }));
    }
    setIsSelectingArea(false);
    setCurrentSelection(null);
    setSelectionStart(null);
  };

  const applyColorToWall = () => {
    if (!uploadedImage || !canvasRef.current || !wallImageAreas[selectedWall]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const area = wallImageAreas[selectedWall]!;
      const scaleX = img.width / (imageContainerRef.current?.clientWidth || 1);
      const scaleY = img.height / (imageContainerRef.current?.clientHeight || 1);

      // Apply color overlay to selected wall area
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = selectedColor.hex;
      ctx.fillRect(
        area.x * scaleX,
        area.y * scaleY,
        area.width * scaleX,
        area.height * scaleY
      );

      // Update the displayed image
      const dataUrl = canvas.toDataURL();
      setUploadedImage(dataUrl);
    };
    img.src = uploadedImage;
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setMode("3d");
    setWallImageAreas({
      front: null,
      left: null,
      right: null,
      back: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReset = () => {
    setRotation(0);
    setSelectedWall("front");
    setSelectedColor(colors[0]);
    setWallColors({
      front: colors[0].hex,
      left: "#F5F5DC",
      right: "#F5F5DC",
      back: "#F5F5DC",
    });
    if (uploadedImage) {
      handleRemoveImage();
    }
  };

  const handleDownload = () => {
    // Create a canvas to export the 3D view
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Draw a simple representation
      ctx.fillStyle = wallColors.front;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      ctx.font = "24px Arial";
      ctx.fillText("Wall Customization Preview", 20, 40);
    }
    canvas.toBlob((blob) => {
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

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>3D Wall Customizer</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Toggle */}
        <Tabs value={mode} onValueChange={(value) => setMode(value as "3d" | "upload")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="3d">3D Room View</TabsTrigger>
            <TabsTrigger value="upload">Upload Photo</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            {/* Image Upload */}
            {!uploadedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <Label htmlFor="wall-image-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">
                      Upload Your Room Photo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Upload a photo of your room to customize wall colors
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
                {/* Image Display with Wall Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Select wall area on image:</p>
                    <Button variant="ghost" size="sm" onClick={handleRemoveImage}>
                      <X className="w-4 h-4 mr-2" />
                      Remove Image
                    </Button>
                  </div>
                  
                  <div
                    ref={imageContainerRef}
                    className="relative border-2 border-border rounded-lg overflow-hidden bg-muted"
                    onMouseDown={handleImageMouseDown}
                    onMouseMove={handleImageMouseMove}
                    onMouseUp={handleImageMouseUp}
                    onMouseLeave={handleImageMouseUp}
                    style={{ cursor: "crosshair" }}
                  >
                    <img
                      src={uploadedImage}
                      alt="Room preview"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                    
                    {/* Show selected areas for each wall */}
                    {wallImageAreas.front && (
                      <div
                        className="absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none"
                        style={{
                          left: `${wallImageAreas.front.x}px`,
                          top: `${wallImageAreas.front.y}px`,
                          width: `${wallImageAreas.front.width}px`,
                          height: `${wallImageAreas.front.height}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                          Front Wall
                        </div>
                      </div>
                    )}
                    {wallImageAreas.left && (
                      <div
                        className="absolute border-2 border-green-500 bg-green-500/20 pointer-events-none"
                        style={{
                          left: `${wallImageAreas.left.x}px`,
                          top: `${wallImageAreas.left.y}px`,
                          width: `${wallImageAreas.left.width}px`,
                          height: `${wallImageAreas.left.height}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-green-500 text-white px-2 py-1 rounded text-xs">
                          Left Wall
                        </div>
                      </div>
                    )}
                    {wallImageAreas.right && (
                      <div
                        className="absolute border-2 border-yellow-500 bg-yellow-500/20 pointer-events-none"
                        style={{
                          left: `${wallImageAreas.right.x}px`,
                          top: `${wallImageAreas.right.y}px`,
                          width: `${wallImageAreas.right.width}px`,
                          height: `${wallImageAreas.right.height}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                          Right Wall
                        </div>
                      </div>
                    )}
                    {wallImageAreas.back && (
                      <div
                        className="absolute border-2 border-purple-500 bg-purple-500/20 pointer-events-none"
                        style={{
                          left: `${wallImageAreas.back.x}px`,
                          top: `${wallImageAreas.back.y}px`,
                          width: `${wallImageAreas.back.width}px`,
                          height: `${wallImageAreas.back.height}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-purple-500 text-white px-2 py-1 rounded text-xs">
                          Back Wall
                        </div>
                      </div>
                    )}
                    
                    {/* Current selection */}
                    {currentSelection && (
                      <div
                        className="absolute border-2 border-primary bg-primary/20 pointer-events-none"
                        style={{
                          left: `${currentSelection.x}px`,
                          top: `${currentSelection.y}px`,
                          width: `${currentSelection.width}px`,
                          height: `${currentSelection.height}px`,
                        }}
                      >
                        <div className="absolute -top-8 left-0 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          Selecting {selectedWall} wall
                        </div>
                      </div>
                    )}
                    
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Click and drag on the image to select the area for the {selectedWall} wall
                  </p>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="3d" className="space-y-6">
        {/* 3D Room View */}
        <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-xl p-8 overflow-hidden">
          <div
            ref={containerRef}
            className="relative w-full h-96 mx-auto perspective-1000"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              className="relative w-full h-full preserve-3d"
              style={{
                transform: `rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
                transition: isDragging ? "none" : "transform 0.3s ease",
              }}
            >
              {/* Floor */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: "400px",
                  height: "400px",
                  background: "linear-gradient(135deg, #8B7355 0%, #6B5D4F 100%)",
                  transform: "translateZ(-200px) rotateX(90deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 50px rgba(0,0,0,0.3)",
                }}
              />

              {/* Back Wall */}
              <div
                className={`absolute cursor-pointer transition-all ${
                  selectedWall === "back" ? "ring-4 ring-primary" : ""
                }`}
                onClick={() => handleWallClick("back")}
                style={{
                  width: "400px",
                  height: "300px",
                  backgroundColor: wallColors.back,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translateZ(-200px)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              />

              {/* Left Wall */}
              <div
                className={`absolute cursor-pointer transition-all ${
                  selectedWall === "left" ? "ring-4 ring-primary" : ""
                }`}
                onClick={() => handleWallClick("left")}
                style={{
                  width: "200px",
                  height: "300px",
                  backgroundColor: wallColors.left,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translateX(-200px) translateZ(-200px) rotateY(90deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              />

              {/* Right Wall */}
              <div
                className={`absolute cursor-pointer transition-all ${
                  selectedWall === "right" ? "ring-4 ring-primary" : ""
                }`}
                onClick={() => handleWallClick("right")}
                style={{
                  width: "200px",
                  height: "300px",
                  backgroundColor: wallColors.right,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translateX(200px) translateZ(-200px) rotateY(-90deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              />

              {/* Front Wall */}
              <div
                className={`absolute cursor-pointer transition-all ${
                  selectedWall === "front" ? "ring-4 ring-primary" : ""
                }`}
                onClick={() => handleWallClick("front")}
                style={{
                  width: "400px",
                  height: "300px",
                  backgroundColor: wallColors.front,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translateZ(0px)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  border: "2px solid rgba(0,0,0,0.1)",
                }}
              />

              {/* Ceiling */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: "400px",
                  height: "400px",
                  background: "linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%)",
                  transform: "translateZ(-200px) translateY(-200px) rotateX(90deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 50px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>

          {/* Rotation Control */}
          <div className="mt-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Rotate View: {Math.round(rotation)}°
            </label>
            <Slider
              value={[rotation]}
              onValueChange={(value) => setRotation(value[0])}
              min={-180}
              max={180}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Drag the room or use slider to rotate • Click on walls to select
            </p>
          </div>
        </div>
          </TabsContent>
        </Tabs>

        {/* Wall Selection - Available in both modes */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Select Wall
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(["front", "left", "right", "back"] as const).map((wall) => (
              <button
                key={wall}
                onClick={() => setSelectedWall(wall)}
                className={`p-3 rounded-lg border-2 transition-all capitalize ${
                  selectedWall === wall
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {wall}
                {mode === "upload" && wallImageAreas[wall] && (
                  <span className="ml-2 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Select Color for {selectedWall.charAt(0).toUpperCase() + selectedWall.slice(1)} Wall
          </label>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(color)}
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
                  {mode === "3d" 
                    ? `Applied to ${selectedWall} wall`
                    : wallImageAreas[selectedWall]
                      ? `Ready to apply to ${selectedWall} wall`
                      : `Select ${selectedWall} wall area first`}
                </p>
              </div>
            </div>
          </div>
          
          {/* Apply Color Button for Upload Mode */}
          {mode === "upload" && uploadedImage && wallImageAreas[selectedWall] && (
            <Button onClick={applyColorToWall} className="w-full" size="lg">
              Apply {selectedColor.name} to {selectedWall.charAt(0).toUpperCase() + selectedWall.slice(1)} Wall
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WallCustomizer3D;

