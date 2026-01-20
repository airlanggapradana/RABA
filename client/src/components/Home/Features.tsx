import {Footprints, AudioLines, Brain, BarChart3, Users, Shield} from "lucide-react";
import {cn} from "@/lib/utils";

const features = [
  {
    icon: Footprints,
    title: "Sensor Langkah",
    description: "Setiap langkah memicu respons audio yang membantu anak belajar sambil bergerak aktif.",
    color: "bg-red-200/40 text-red-500",
    delay: "0s",
  },
  {
    icon: AudioLines,
    title: "Audio Edukatif",
    description: "Respons suara yang dirancang khusus untuk merangsang perkembangan bahasa dan kognitif.",
    color: "bg-teal-200/40 text-teal-500",
    delay: "0.1s",
  },
  {
    icon: Brain,
    title: "Stimulasi Sensorik",
    description: "Kombinasi visual, audio, dan gerakan untuk pembelajaran multi-sensorik yang efektif.",
    color: "bg-amber-200/40 text-amber-500",
    delay: "0.2s",
  },
  {
    icon: BarChart3,
    title: "Tracking Perkembangan",
    description: "Pantau kemajuan anak dengan data real-time dan insight yang mudah dipahami.",
    color: "bg-indigo-200/40 text-indigo-500",
    delay: "0.3s",
  },
  {
    icon: Users,
    title: "Bermain Terbimbing",
    description: "Dirancang untuk interaksi orang tua-anak, bukan screen time pasif.",
    color: "bg-emerald-200/20 text-emerald-300",
    delay: "0.4s",
  },
  {
    icon: Shield,
    title: "Inklusif & Aman",
    description: "Mendukung anak dengan berbagai kebutuhan fokus dan stimulasi.",
    color: "bg-red-200/20 text-red-300",
    delay: "0.5s",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-background w-full relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"/>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2"/>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-200/10 text-teal-500 font-medium text-sm mb-4">
            Fitur Unggulan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Kenapa Memilih RABA?
          </h2>
          <p className="text-muted-foreground text-lg">
            Dirancang dengan cinta oleh tim ahli untuk memberikan pengalaman belajar terbaik bagi anak Indonesia.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              )}
              style={{animationDelay: feature.delay}}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                feature.color
              )}>
                <feature.icon className="w-7 h-7"/>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
