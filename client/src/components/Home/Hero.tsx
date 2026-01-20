import {Button} from "@/components/ui/button";
import {Play, Sparkles} from "lucide-react";
import {useNavigate} from "react-router";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-hero"/>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"/>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed"/>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"/>

      {/* Decorative shapes */}
      <div
        className="absolute top-32 right-20 w-16 h-16 bg-yellow-400 rounded-2xl rotate-12 opacity-60 animate-bounce-gentle hidden lg:block"/>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-emerald-400 rounded-full opacity-60 animate-float hidden lg:block"/>
      <div
        className="absolute top-1/2 right-32 w-8 h-8 bg-violet-400 rounded-lg rotate-45 opacity-60 animate-float-delayed hidden lg:block"/>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-200/50 text-red-500 font-medium text-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4"/>
            <span>Karpet Pintar untuk Anak Indonesia</span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in"
            style={{animationDelay: '0.1s'}}>
            Belajar Aktif
            <span className="text-gradient block">Tanpa Layar</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
             style={{animationDelay: '0.2s'}}>
            RABA adalah karpet pintar interaktif yang menggabungkan gerakan fisik dengan
            respons audio edukatif untuk merangsang kemampuan bahasa, sensorik, dan fokus anak.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in"
               style={{animationDelay: '0.3s'}}>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/auth")}
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all"
            >
              Mulai Sekarang
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold border-2 border-red-600 text-red-600 hover:bg-red-50 group"
            >
              <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"/>
              Lihat Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground animate-fade-in"
               style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"/>
              <span className="text-sm font-medium">100+ PAUD Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"/>
              <span className="text-sm font-medium">Ramah Anak Inklusif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-400"/>
              <span className="text-sm font-medium">Dikembangkan Ahli</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"/>
        </svg>
      </div>
    </section>
  );
};