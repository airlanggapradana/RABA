import {Quote} from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Working with this team has been transformative for our business. Their expertise and dedication are unmatched.",
      author: "Michael Thompson",
      position: "CEO, TechVentures Inc.",
      company: "TechVentures",
    },
    {
      quote: "The results exceeded our expectations. Professional, innovative, and always delivering on their promises.",
      author: "Emily Rodriguez",
      position: "Director of Operations, Global Systems",
      company: "Global Systems",
    },
    {
      quote: "Outstanding service and support. They truly understand what it takes to scale a modern business.",
      author: "David Park",
      position: "Founder, StartupHub",
      company: "StartupHub",
    },
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            What The Experts Are Saying
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Don't just take our word for it. Here's what industry leaders have to say about working with us.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] relative"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6"/>
              <p className="text-card-foreground mb-6 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-card-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
