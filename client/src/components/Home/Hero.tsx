import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] relative text-gray-900 flex items-center justify-center">
      {/* Diagonal Grid with Light */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Your Content/Components */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in py-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Transform Your Business
            <span className="block text-primary">With Innovation</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
            Empowering companies to reach their full potential through cutting-edge solutions and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 px-4">
            <Button variant="default" size="lg" className="group w-full sm:w-auto">
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
