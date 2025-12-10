import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Specifications {
  coverage: string;
  dryingTime: string;
  recoatTime: string;
  finishType: string;
  dilution: string;
  warranty: string;
}

interface Downloads {
  tds: string;
  msds: string;
}

interface ProductSpecsProps {
  specifications: Specifications;
  downloads: Downloads;
}

const ProductSpecs = ({ specifications, downloads }: ProductSpecsProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Product Specifications</h2>

      <Card className="border-border">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Coverage</h3>
              <p className="text-foreground">{specifications.coverage}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Drying Time</h3>
              <p className="text-foreground">{specifications.dryingTime}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Recoat Time</h3>
              <p className="text-foreground">{specifications.recoatTime}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Finish Type</h3>
              <p className="text-foreground">{specifications.finishType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Dilution</h3>
              <p className="text-foreground">{specifications.dilution}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Warranty</h3>
              <p className="text-foreground font-semibold text-primary">{specifications.warranty}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download buttons hidden as per request
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex-1" asChild>
          <a href={downloads.tds} download>
            <Download className="w-4 h-4 mr-2" />
            Download TDS
          </a>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <a href={downloads.msds} download>
            <Download className="w-4 h-4 mr-2" />
            Download MSDS
          </a>
        </Button>
      </div>
      */}
    </section>
  );
};

export default ProductSpecs;
