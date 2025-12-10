import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);

  const navigation = [
    { name: "Color Catalogue", href: "/color-catalogue" },
    { name: "Projects", href: "/projects" },
    { name: "Color Tools", href: "/color-tools" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const productCategories = {
    interior: [
      "Impressions Kashmir High sheen",
      "Impressions HD",
      "Impressions Sheen",
      "Beauty Gold washable",
      "Beauty Gold",
      "Beauty sheen",
      "Beauty little master sheen",
      "Little master",
      "Beauty little master",
      "Texture paint",
      "Impressions Ideaz",
      "Impressions Metallic finish",
    ],
    exterior: [
      "Excel everlast 12",
      "Excel total",
      "Excel MMSS",
      "Excel No dust",
      "Suraksha sheen",
      "Surakha",
    ],
    enamel: ["Enamel NSE & PU enamel"],
    waterproofing: [
      "Perma damp protect interior",
      "Perma damp protect exterior",
      "No damp",
      "No damp +",
      "Super 2K",
      "Waterproof putty",
    ],
    primers: [
      "Economy",
      "Popular",
      "Premium",
      "Exterior",
      "Alkali",
      "Red Oxide",
      "Wood",
      "Cement",
      "Zinc Yellow",
    ],
    brushes: [
      "Rollers",
      "Thinners",
      "Putty",
      "Gypsum/Po",
    ],
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Bhavan Alankar - Your Nerolac Paint Destination"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home - First */}
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-[#4169E1] transition-colors rounded-md hover:bg-muted"
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsProductsHovered(true)}
              onMouseLeave={() => setIsProductsHovered(false)}
            >
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-[#4169E1] transition-colors rounded-md hover:bg-muted flex items-center">
                Products
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className={`absolute top-full left-0 mt-1 w-80 bg-popover border border-border rounded-md shadow-lg z-50 p-2 transition-all duration-200 ${isProductsHovered
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}>
                <div className="space-y-1">
                  {/* Interior */}
                  <div className="relative group/sub">
                    <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center justify-between cursor-pointer hover:bg-accent rounded-sm transition-colors">
                      Interior
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] transition-transform duration-200" />
                    </div>
                    <div className="absolute left-full top-0 ml-1 w-64 bg-popover border border-border rounded-md shadow-lg p-2 transition-all duration-200 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible">
                      {productCategories.interior.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/products?category=interior&filter=${encodeURIComponent(item)}`}
                          className="block px-3 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Exterior */}
                  <div className="relative group/sub">
                    <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center justify-between cursor-pointer hover:bg-accent rounded-sm transition-colors">
                      Exterior
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] transition-transform duration-200" />
                    </div>
                    <div className="absolute left-full top-0 ml-1 w-64 bg-popover border border-border rounded-md shadow-lg p-2 transition-all duration-200 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible">
                      {productCategories.exterior.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/products?category=exterior&filter=${encodeURIComponent(item)}`}
                          className="block px-3 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Enamel */}
                  <Link
                    to="/products?category=enamel"
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    Enamel NSE & PU enamel
                  </Link>

                  {/* Paint Ancillary */}
                  <div className="relative group/sub">
                    <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center justify-between cursor-pointer hover:bg-accent rounded-sm transition-colors">
                      Paint Ancillary
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] transition-transform duration-200" />
                    </div>
                    <div className="absolute left-full top-0 ml-1 w-64 bg-popover border border-border rounded-md shadow-lg p-2 transition-all duration-200 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible">
                      {/* Primers */}
                      <Link
                        to="/products?category=ancillary&subcategory=primers"
                        className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                      >
                        Primers
                      </Link>
                      {/* Brushes */}
                      <Link
                        to="/products?category=ancillary&subcategory=brushes"
                        className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                      >
                        Brushes
                      </Link>
                    </div>
                  </div>

                  {/* Waterproofing */}
                  <div className="relative group/sub">
                    <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center justify-between cursor-pointer hover:bg-accent rounded-sm transition-colors">
                      Waterproofing Solutions
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] transition-transform duration-200" />
                    </div>
                    <div className="absolute left-full top-0 ml-1 w-64 bg-popover border border-border rounded-md shadow-lg p-2 transition-all duration-200 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible">
                      {productCategories.waterproofing.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/products?category=waterproofing&filter=${encodeURIComponent(item)}`}
                          className="block px-3 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Other Products */}
                  <Link
                    to="/products?category=other"
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    Other Products
                  </Link>

                  {/* Wood coating */}
                  <Link
                    to="/products?category=wood-coating"
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    Wood coating
                  </Link>

                  {/* Tools and Accessories */}
                  <Link
                    to="/products?category=tools"
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    Tools and Accessories
                  </Link>
                </div>
              </div>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-[#4169E1] transition-colors rounded-md hover:bg-muted"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <a id="header-phone" href="tel:+917667825974" className="flex items-center text-sm text-black hover:text-[#4169E1] transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                76678 25974
              </a>
              <span className="text-xs text-black mt-0.5">GSTIN: 20AEPPC9247N1Z6</span>
            </div>
            <Button variant="hero" size="sm" asChild>
              <Link to="/color-tools#calculator">
                Get Free Quote
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-[#4169E1] hover:bg-muted rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-[#4169E1] hover:bg-muted rounded-md transition-colors"
              >
                Products
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-[#4169E1] hover:bg-muted rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <div className="px-4">
                  <a id="header-phone-mobile" href="tel:+917667825974" className="flex items-center text-sm text-black hover:text-[#4169E1] transition-colors mb-1">
                    <Phone className="w-4 h-4 mr-2" />
                    76678 25974
                  </a>
                  <span className="text-xs text-black ml-6">GSTIN: 20AEPPC9247N1Z6</span>
                </div>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/color-tools#calculator" onClick={() => setIsOpen(false)}>
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
