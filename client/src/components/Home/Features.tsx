import {Zap, Shield, TrendingUp, Users} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience unparalleled speed and efficiency in all our solutions, optimized for peak performance.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee to keep your business running smoothly.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description: "Solutions that grow with your business, from startup to enterprise, without missing a beat.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 dedicated support team ready to help you succeed at every step of your journey.",
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Our Features
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Powerful features designed to elevate your business and deliver exceptional results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-[var(--transition-smooth)]">
                  <Icon className="w-7 h-7 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
