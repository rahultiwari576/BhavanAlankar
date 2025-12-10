import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const productLinks = [
    { name: "Interior Paints", href: "/products#interior" },
    { name: "Exterior Paints", href: "/products#exterior" },
    { name: "Primers", href: "/products#primers" },
    { name: "Specialty Coatings", href: "/products#specialty" },
  ];

  const colorCatalogueLinks = [
    { name: "Browse All Colors", href: "/color-catalogue" },
    { name: "Color Visualizer", href: "/color-tools" },
    { name: "Nerolac Catalogue", href: "https://www.nerolac.com/colour-catalogue", external: true },
    { name: "Color Palette Generator", href: "https://www.nerolac.com/paint-colours/colour-palette.html", external: true },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Bhavan Alankar - Your Nerolac Paint Destination"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Transforming spaces with premium quality paints. A century of trust and innovation in every stroke.
            </p>
            <div className="space-y-2">
              <div>
                <a href="tel:+917667825974" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  76678 25974
                </a>
                <span className="text-xs text-muted-foreground ml-6">GSTIN: 20AEPPC9247N1Z6</span>
              </div>
              <a href="mailto:info@bhavanalankar.com" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@bhavanalankar.com
              </a>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>C/123, Dispensary Road/ Gudri Bazaar, Sonari, Jamshedpur - 831011</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Color Catalogue */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Color Catalogue</h3>
            <ul className="space-y-2">
              {colorCatalogueLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Backed by legacy Bhavan Alankar Patna
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-border">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="https://www.facebook.com/profile.php?id=61577709382249" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/bhavanalankar_jsr/?igsh=MXZ1NWw3a295bTJw#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <span>© 2024 bhavan Alankar. All rights reserved.</span>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
