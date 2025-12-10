import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white group flex items-center justify-center">
        <img
          src={images[currentImage]}
          alt={`${productName} - Image ${currentImage + 1}`}
          className="max-w-full max-h-full w-auto h-auto object-contain image-transition group-hover:scale-105 transition-transform duration-500"
          key={currentImage}
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 bg-white flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                currentImage === index
                  ? "border-primary shadow-lg scale-105"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
