import { Card, CardContent } from "@/components/ui/card";

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ApplicationProcessProps {
  steps: Step[];
}

const ApplicationProcess = ({ steps }: ApplicationProcessProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Application Process</h2>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index} className="border-border hover-lift">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ApplicationProcess;
