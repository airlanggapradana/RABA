import {Footprints, Volume2, TrendingUp, CheckCircle2} from "lucide-react";
import {cn} from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Footprints,
    title: "Anak Melangkah",
    description: "Anak berdiri dan melangkah di area karpet pintar RABA.",
    color: "bg-red-400",
  },
  {
    number: "02",
    icon: Volume2,
    title: "Sensor Mendeteksi",
    description: "Sensor tekanan mendeteksi langkah dan memicu respons audio.",
    color: "bg-emerald-400",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Audio Merespons",
    description: "Suara edukatif merespons, mengajarkan kata, angka, atau konsep baru.",
    color: "bg-amber-400",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Belajar & Berkembang",
    description: "Anak belajar sambil bermain, perkembangan terpantau real-time.",
    color: "bg-teal-400",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 w-full bg-amber-50/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-purple-500/20 rounded-3xl rotate-12"/>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-pink-500/20 rounded-full"/>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-blue-500/20 rounded-2xl -rotate-12"/>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-200/30 text-red-500 font-medium text-sm mb-4">
            Cara Kerja
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Simpel & Menyenangkan
          </h2>
          <p className="text-muted-foreground text-lg">
            Empat langkah mudah untuk memulai perjalanan belajar aktif anak Anda.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line - Desktop */}
          <div
            className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-1 bg-gradient-to-r from-red-400 via-emerald-300 to-teal-100 rounded-full"/>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center animate-fade-in"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                {/* Step Circle */}
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10",
                  step.color
                )}>
                  <step.icon className="w-9 h-9 text-white"/>
                </div>

                {/* Step Number */}
                <span
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-xs font-bold text-foreground shadow-sm">
                  {step.number}
                </span>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
