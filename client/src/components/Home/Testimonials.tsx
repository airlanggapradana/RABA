import {Star, Quote} from "lucide-react";
import {cn} from "@/lib/utils";

const testimonials = [
  {
    name: "Bu Sari",
    role: "Guru PAUD Melati",
    content: "Anak-anak jadi lebih antusias belajar! RABA membuat mereka bergerak aktif sambil belajar mengenal huruf dan angka.",
    rating: 5,
    color: "border-red-400/20",
    bgColor: "bg-red-500/5",
  },
  {
    name: "Pak Budi",
    role: "Kepala Posyandu Harapan",
    content: "Sangat membantu untuk stimulasi anak-anak di posyandu kami. Tracking perkembangan juga sangat berguna untuk monitoring.",
    rating: 5,
    color: "border-teal-400/20",
    bgColor: "bg-teal-500/5",
  },
  {
    name: "Ibu Maya",
    role: "Orang Tua Murid",
    content: "Akhirnya ada alat belajar yang tidak pakai layar! Anak saya jadi lebih fokus dan mau bergerak aktif.",
    rating: 5,
    color: "border-amber-400/20",
    bgColor: "bg-amber-500/5",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-lavender/5 rounded-full blur-3xl"/>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-mint/5 rounded-full blur-3xl"/>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-200/30 text-indigo-500 font-medium text-sm mb-4">
            Testimoni
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Dipercaya Pendidik Indonesia
          </h2>
          <p className="text-muted-foreground text-lg">
            Lihat apa kata guru, orang tua, dan mitra kami tentang RABA.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "relative p-8 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fade-in",
                testimonial.color,
                testimonial.bgColor
              )}
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {/* Quote Icon */}
              <div
                className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                <Quote className="w-5 h-5 text-red-300"/>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({length: testimonial.rating}).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-500"/>
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-300/40 flex items-center justify-center">
                  <span className="font-bold text-red-400">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
