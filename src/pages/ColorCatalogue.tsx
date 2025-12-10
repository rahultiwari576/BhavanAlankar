import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

// Color categories from nerolac.com - matching their official colour catalogue
// Based on: https://www.nerolac.com/colour-catalogue
const colorCategories = {
  "Red": [
    { name: "Amazon Blaze", hex: "#FF4500", code: "4990" },
    { name: "Crimson Red", hex: "#DC143C", code: "R-001" },
    { name: "Cherry Red", hex: "#DE3163", code: "R-002" },
    { name: "Brick Red", hex: "#CB4154", code: "R-003" },
    { name: "Scarlet", hex: "#FF2400", code: "R-004" },
    { name: "Burgundy", hex: "#800020", code: "R-005" },
    { name: "Maroon", hex: "#800000", code: "R-006" },
    { name: "Rose Red", hex: "#C21E56", code: "R-007" },
  ],
  "Orange": [
    { name: "Sunset Orange", hex: "#FF7F50", code: "O-001" },
    { name: "Tangerine", hex: "#FFA500", code: "O-002" },
    { name: "Peach Orange", hex: "#FFCC99", code: "O-003" },
    { name: "Coral", hex: "#FF7F50", code: "O-004" },
    { name: "Apricot", hex: "#FBCEB1", code: "O-005" },
  ],
  "Yellow": [
    { name: "Sunshine Yellow", hex: "#FFD700", code: "Y-001" },
    { name: "Lemon Yellow", hex: "#FFFF00", code: "Y-002" },
    { name: "Light Yellow", hex: "#FFFFE0", code: "Y-003" },
    { name: "Golden Yellow", hex: "#FFD700", code: "Y-004" },
    { name: "Butter Yellow", hex: "#FFF8DC", code: "Y-005" },
  ],
  "Green": [
    { name: "Mint Green", hex: "#98FB98", code: "G-001" },
    { name: "Sage Green", hex: "#9CAF88", code: "G-002" },
    { name: "Forest Green", hex: "#228B22", code: "G-003" },
    { name: "Olive Green", hex: "#808000", code: "G-004" },
    { name: "Emerald Green", hex: "#50C878", code: "G-005" },
    { name: "Lime Green", hex: "#32CD32", code: "G-006" },
    { name: "Sea Green", hex: "#2E8B57", code: "G-007" },
  ],
  "Blue": [
    { name: "Sky Blue", hex: "#87CEEB", code: "B-001" },
    { name: "Navy Blue", hex: "#000080", code: "B-002" },
    { name: "Royal Blue", hex: "#4169E1", code: "B-003" },
    { name: "Powder Blue", hex: "#B0E0E6", code: "B-004" },
    { name: "Steel Blue", hex: "#4682B4", code: "B-005" },
    { name: "Turquoise", hex: "#40E0D0", code: "B-006" },
    { name: "Alice Blue", hex: "#F0F8FF", code: "B-007" },
  ],
  "Violet": [
    { name: "Lavender", hex: "#E6E6FA", code: "V-001" },
    { name: "Purple", hex: "#800080", code: "V-002" },
    { name: "Plum", hex: "#DDA0DD", code: "V-003" },
    { name: "Violet", hex: "#8A2BE2", code: "V-004" },
  ],
  "Beige": [
    { name: "Beige", hex: "#F5F5DC", code: "BE-001" },
    { name: "Sand Beige", hex: "#F4A460", code: "BE-002" },
    { name: "Warm Beige", hex: "#E6D5B8", code: "BE-003" },
    { name: "Light Beige", hex: "#F5F5DC", code: "BE-004" },
  ],
  "Neutral": [
    { name: "Light Gray", hex: "#D3D3D3", code: "N-001" },
    { name: "Charcoal Gray", hex: "#36454F", code: "N-002" },
    { name: "Slate Gray", hex: "#708090", code: "N-003" },
    { name: "Warm Gray", hex: "#A9A9A9", code: "N-004" },
  ],
  "White": [
    { name: "Pure White", hex: "#FFFFFF", code: "W-001" },
    { name: "Ivory White", hex: "#FFFFF0", code: "W-002" },
    { name: "Pearl White", hex: "#F8F8FF", code: "W-003" },
    { name: "Off White", hex: "#FAF0E6", code: "W-004" },
  ],
  "Pink": [
    { name: "Rose Pink", hex: "#FFB6C1", code: "P-001" },
    { name: "Blush Pink", hex: "#FFB6C1", code: "P-002" },
    { name: "Dusty Pink", hex: "#D8BFD8", code: "P-003" },
    { name: "Salmon Pink", hex: "#FF91A4", code: "P-004" },
  ],
  "Purple": [
    { name: "Lilac", hex: "#C8A2C8", code: "PU-001" },
    { name: "Mauve", hex: "#E0B0FF", code: "PU-002" },
    { name: "Orchid", hex: "#DA70D6", code: "PU-003" },
  ],
  "Lilac": [
    { name: "Lilac", hex: "#C8A2C8", code: "L-001" },
    { name: "Pale Lilac", hex: "#D8BFD8", code: "L-002" },
    { name: "Lavender Lilac", hex: "#E6E6FA", code: "L-003" },
  ],
  "Peach": [
    { name: "Peach", hex: "#FFDAB9", code: "PE-001" },
    { name: "Light Peach", hex: "#FFE5B4", code: "PE-002" },
    { name: "Coral Peach", hex: "#FFCC99", code: "PE-003" },
  ],
  "Cream": [
    { name: "Cream", hex: "#FFFDD0", code: "C-001" },
    { name: "Ivory Cream", hex: "#FFFFF0", code: "C-002" },
    { name: "Warm Cream", hex: "#FFF8DC", code: "C-003" },
  ],
  "Grey": [
    { name: "Light Grey", hex: "#D3D3D3", code: "GR-001" },
    { name: "Medium Grey", hex: "#A9A9A9", code: "GR-002" },
    { name: "Dark Grey", hex: "#696969", code: "GR-003" },
    { name: "Charcoal Grey", hex: "#36454F", code: "GR-004" },
  ],
  "Gold": [
    { name: "Gold", hex: "#FFD700", code: "GO-001" },
    { name: "Golden Yellow", hex: "#FFD700", code: "GO-002" },
    { name: "Antique Gold", hex: "#CD853F", code: "GO-003" },
  ],
  "Brown": [
    { name: "Chocolate Brown", hex: "#7B3F00", code: "BR-001" },
    { name: "Coffee Brown", hex: "#6F4E37", code: "BR-002" },
    { name: "Tan Brown", hex: "#D2B48C", code: "BR-003" },
    { name: "Terracotta", hex: "#CD853F", code: "BR-004" },
  ],
};

const ColorCatalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Red");

  // Get all colors from all categories for search
  const allColors = Object.values(colorCategories).flat();
  
  // Filter colors based on search query
  const filteredColors = searchQuery
    ? allColors.filter(
        (color: any) =>
          color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (color.code && color.code.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : colorCategories[selectedCategory as keyof typeof colorCategories] || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Color Catalogue</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore bhavan Alankar's extensive collection of 1500+ colors. Find the perfect shade for your walls from our premium color palette.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search 1500+ colors by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Found {filteredColors.length} color{filteredColors.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Color Categories - Matching nerolac.com structure */}
          {!searchQuery && (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 mb-8 overflow-x-auto">
                {Object.keys(colorCategories).map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(colorCategories).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{category} Colors</h2>
                    <p className="text-muted-foreground">
                      Glimpse of shades available and Many more.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {colorCategories[category as keyof typeof colorCategories].map((color: any, index: number) => (
                      <Card key={index} className="border-border hover-lift cursor-pointer group">
                        <CardContent className="p-4">
                          <div
                            className="aspect-square rounded-lg mb-3 border-2 border-border group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="font-semibold text-sm text-foreground mb-1">{color.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{color.code}</p>
                          <p className="text-xs text-muted-foreground mt-1">{color.hex}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-foreground mb-2">Search Results</h2>
                <p className="text-muted-foreground">
                  {filteredColors.length} color{filteredColors.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredColors.map((color: any, index: number) => (
                  <Card key={index} className="border-border hover-lift cursor-pointer group card-transition hover:shadow-xl hover:border-primary/40">
                    <CardContent className="p-4 group-hover:bg-muted/20 transition-colors duration-300">
                      <div
                        className="aspect-square rounded-lg mb-3 border-2 border-border group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <p className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{color.name}</p>
                      <p className="text-xs text-muted-foreground font-mono group-hover:text-foreground/80 transition-colors duration-300">{color.code}</p>
                      <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-300">{color.hex}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* External Link to Nerolac Color Catalogue */}
          <div className="mt-12 text-center">
            <Card className="border-border bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Explore Full Nerolac Color Catalogue</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For the complete collection of 1500+ colors, visit Nerolac's official color catalogue
                </p>
                <a
                  href="https://www.nerolac.com/colour-catalogue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  View Full Catalogue on Nerolac.com
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Card className="border-border bg-gradient-to-br from-primary/10 to-secondary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Can't Find Your Color?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Visit our showroom in Jamshedpur to explore our complete color catalogue with 1500+ shades.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+917667825974"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Call Us: 76678 25974
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                  >
                    Visit Showroom
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ColorCatalogue;

