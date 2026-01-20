import {Button} from "@/components/ui/button";
import {ArrowRight, Sparkles} from "lucide-react";
import {useNavigate} from "react-router";

export const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-orange-50"/>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-400/10 rounded-full blur-3xl"/>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl"/>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <div
            className="relative p-10 md:p-16 rounded-[2rem] bg-gradient-to-br from-red-300 to-red-400/80 text-white text-center overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"/>
              <div
                className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"/>
            </div>

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4"/>
                <span>Mulai Gratis</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Siap Membuat Anak Belajar Lebih Aktif?
              </h2>

              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
                Bergabunglah dengan ratusan PAUD dan orang tua yang sudah menggunakan RABA
                untuk pembelajaran anak yang lebih bermakna.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-white text-red-600 hover:bg-white/90 shadow-lg rounded-full font-bold"
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 ml-1"/>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full font-bold border-2 border-white/30"
                >
                  Hubungi Tim
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};