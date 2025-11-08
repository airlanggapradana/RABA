import {Target, Lightbulb, Award} from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            About Us
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            We are a forward-thinking company dedicated to delivering exceptional results through innovation, expertise,
            and unwavering commitment to our clients' success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div
            className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary"/>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To revolutionize industries by providing innovative solutions that drive growth and create lasting value.
            </p>
          </div>

          <div
            className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-primary"/>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              To be the leading partner for businesses seeking transformation and excellence in the digital age.
            </p>
          </div>

          <div
            className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary"/>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">Our Values</h3>
            <p className="text-muted-foreground">
              Integrity, innovation, and excellence guide everything we do, ensuring superior outcomes for our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
