import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Award, Users, Building2, Target, Heart, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                About Us
              </h1>
            </div>
          </div>
        </section>

        {/* Main About Content */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Bhavan Alankar, a trusted name with over 50 years of excellence in paints and painting solutions across Bihar, has now extended its commitment to quality and service to the Steel city, Jamshedpur.
                </p>
                <p>
                  Our new Nerolac Premium Shoppe—an extension of our Patna flagship—was inaugurated by Shri Saryu Rai, MLA Jamshedpur West, marking a new chapter in providing painting solutions.
                </p>
                <p>
                  As a Premium Shoppe, the showroom is designed as an interactive experience center where customers can explore over 1500 shades for both interior and exterior applications. The kiosk allows you to engage, experiment, and visualize shades with your own hands.
                </p>
                <p>
                  Being Jamshedpur's smartest and most prominent Nerolac showrooms, we offer a complete range of Nerolac paint categories—from economy to luxury finishes—along with textures, designer walls, waterproofing, and NxtGen solutions.
                </p>
                <p>
                  To support homeowners with expert guidance, a dedicated Nerolac Service Engineer is attached exclusively to this showroom. Customers receive professional advice on colors, waterproofing, textures, surface preparation, and complete end-to-end painting solutions through the Nerolac NxtGen Service.
                </p>
                <p>
                  We also provide digital preview and visualization, enabling you to see your home in different colour combinations before finalizing your dream palette—making the selection process simple, confident, and delightful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Founders */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Founders
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src="/BHavan owner.jpeg"
                      alt="Bhavan Alankar Founders"
                      className="w-full h-auto object-cover max-h-[400px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/600x800?text=Founders+Photo";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This showroom is run by two former Corporate Officers of Tata Steel, bringing with them:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Strong professional ethics & reliability</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">A commitment to quality, transparency, and disciplined service</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Customer-first mindset and structured processes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Corporate-level experience in operations, execution, and project management</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What This Means for Customers */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What This Means for Customers
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  With our corporate background and Bhavan Alankar's five-decade legacy, customers at our Premium Shoppe enjoy:
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Professional & Transparent Service</h3>
                        <p className="text-sm text-muted-foreground">
                          Experience corporate-level professionalism with complete transparency in all dealings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Accurate Shade Guidance</h3>
                        <p className="text-sm text-muted-foreground">
                          Data-driven recommendations to help you choose the perfect shades for your space.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">End-to-End Painting Project Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete support from consultation to execution for your entire painting project.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Timely Delivery & Structured Processes</h3>
                        <p className="text-sm text-muted-foreground">
                          Reliable timelines and organized processes ensuring smooth project execution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Trusted Product Knowledge & Quality Assurance</h3>
                        <p className="text-sm text-muted-foreground">
                          Expert knowledge of products with guaranteed quality assurance on all materials.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Premium Showroom Experience</h3>
                        <p className="text-sm text-muted-foreground">
                          A premium showroom experience with personalized attention to every customer.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

