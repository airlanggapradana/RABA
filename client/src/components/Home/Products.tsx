import {CheckCircle, Award, Clock, Users} from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/*  Diagonal Cross Grid Bottom Background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.4,
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)",
        }}
      />
      {/* Your Content/Components */}
      <section id="products" className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-14 sm:mb-20">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm border border-sky-500/30 bg-sky-500/10 text-sky-300 tracking-wide">
              Produk Kami
            </div>
            <h2 className="mt-4 mb-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-100 leading-tight">
              Cerita di Balik RABA
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-300">
              Mengenal latar belakang hadirnya RABA sebagai media bermain interaktif yang mendukung tumbuh kembang anak
              usia dini secara inklusif dan kontekstual.
            </p>
          </div>

          {/* Product Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-14 sm:mb-20">
            <div className="order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
                Perjalanan dan Visi RABA
              </h3>
              <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                RABA lahir dari kegelisahan para pendidik dan pendamping anak usia dini yang melihat keterbatasan media
                belajar yang terlalu bergantung pada layar dan kurang melibatkan tubuh serta interaksi nyata. Banyak
                anak, terutama yang memiliki kesulitan fokus dan kebutuhan stimulasi tambahan, membutuhkan pendekatan
                belajar yang lebih aktif dan manusiawi.
                <br/>
                <br/>
                Berangkat dari kebutuhan tersebut, RABA dikembangkan sebagai media bermain interaktif berbentuk karpet
                pintar yang menggabungkan gerak, suara, dan pendampingan langsung. Setiap aktivitas dirancang sederhana
                namun bermakna, agar anak dapat belajar melalui pengalaman fisik, bahasa, dan interaksi sosial secara
                alami.
              </p>
              <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
                RABA tidak menggantikan peran guru atau orang tua, melainkan memperkuatnya. Dengan pendekatan guided
                play, RABA membantu pendamping menjaga fokus anak, membangun rasa aman, serta menciptakan proses belajar
                yang inklusif, menyenangkan, dan relevan dengan konteks lingkungan belajar sehari-hari.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm hover:bg-white/10 transition">
                  <CheckCircle className="w-5 h-5 text-sky-500"/>
                  <span className="text-sm sm:text-base text-gray-300 font-semibold">Belajar Aktif Tanpa Layar</span>
                </div>
                <div
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm hover:bg-white/10 transition">
                  <CheckCircle className="w-5 h-5 text-sky-500"/>
                  <span className="text-sm sm:text-base text-gray-300 font-semibold">Mendukung Fokus dan Regulasi Emosi Anak</span>
                </div>
                <div
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm hover:bg-white/10 transition">
                  <CheckCircle className="w-5 h-5 text-sky-500"/>
                  <span
                    className="text-sm sm:text-base text-gray-300 font-semibold">Pendampingan Guru \& Orang Tua</span>
                </div>
                <div
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm hover:bg-white/10 transition">
                  <CheckCircle className="w-5 h-5 text-sky-500"/>
                  <span
                    className="text-sm sm:text-base text-gray-300 font-semibold">Fleksibel: Kelas, Posyandu, Rumah</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/30 via-primary/10 to-accent/20 p-8 sm:p-12 aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center backdrop-blur-md shadow-[var(--shadow-soft)]">
                <div
                  className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)]"/>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-extrabold text-primary drop-shadow-md mb-2">6+</div>
                  <p className="text-muted-foreground">Years of Innovation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div
            className="rounded-2xl border border-amber-500 bg-gradient-to-b from-amber-500 to-sky-900 backdrop-blur-md p-6 sm:p-10 shadow-[var(--shadow-soft)] mb-14 sm:mb-20">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-8 text-center">
              Apa yang Membuat RABA Berbeda
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="group rounded-xl border border-amber-500 bg-white/5 p-5 hover:bg-white/10 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-amber-400"/>
                  <h4 className="font-semibold text-gray-100">Belajar Aktif Tanpa Layar</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  RABA mengajak anak belajar melalui gerak, pijakan, dan respons suara sederhana. Tanpa layar dan
                  distraksi visual, anak lebih fokus dan terlibat.
                </p>
              </div>
              <div className="group rounded-xl border border-amber-500 bg-white/5 p-5 hover:bg-white/10 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-sky-300"/>
                  <h4 className="font-semibold text-gray-100">Pendampingan Lebih Bermakna</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Dirancang untuk digunakan bersama guru dan orang tua. Guided play menjaga fokus, rasa aman, dan
                  regulasi emosi anak.
                </p>
              </div>
              <div className="group rounded-xl border border-amber-500 bg-white/5 p-5 hover:bg-white/10 transition">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-300"/>
                  <h4 className="font-semibold text-gray-100">Fleksibel dan Inklusif</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Cocok di kelas PAUD, posyandu, hingga rumah. Mendukung kebutuhan stimulasi anak yang beragam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
