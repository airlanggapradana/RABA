const About = () => {
  return (
    <section id="about" className="py-32 px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-10">
          <div>
            <div
              className="inline-block px-6 py-2 bg-blue-500/15 border border-sky-500/30 rounded-full text-sm mb-6">
              Tentang RABA
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Belajar Lewat Gerak, Tumbuh Lewat Interaksi.</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              RABA adalah media bermain interaktif berbentuk karpet pintar yang dirancang untuk membantu stimulasi
              bahasa, sensorik, dan fokus anak usia dini, khususnya anak dengan kesulitan konsentrasi dan kebutuhan
              stimulasi tambahan. RABA menggabungkan permainan fisik sederhana dengan respons audio edukatif, sehingga
              anak dapat belajar melalui gerak, suara, dan interaksi langsung secara alami dan menyenangkan.
            </p>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Berbeda dari media belajar digital yang bersifat pasif dan berpotensi overstimulatif, RABA dirancang
              dengan pendekatan guided play, di mana guru dan orang tua berperan sebagai pendamping utama. Anak tetap
              menjadi pusat aktivitas, sementara interaksi dewasa hadir secara minimal namun bermakna untuk menjaga
              fokus, rasa aman, dan regulasi emosi anak selama bermain.
            </p>
          </div>
          <div className="relative">
            <div
              className="relative p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-3xl backdrop-blur-md">
              <div
                className="aspect-square bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-2xl flex items-center justify-center text-8xl">
                🚀
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="space-y-6 py-28" id={'how-it-works'}>
          <div
            className="inline-block px-6 py-2 bg-blue-500/15 border border-sky-500/30 rounded-full text-sm">
            Cara Kerja RABA
          </div>

          <div className="p-6 bg-blue-500/10 border border-sky-500/30 rounded-2xl">
            <p className="text-white/80 leading-relaxed">
              RABA dikembangkan bersama guru PAUD dan komunitas desa sebagai solusi yang kontekstual, mudah
              digunakan, dan dapat diadaptasi sesuai kebutuhan lingkungan belajar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue/[0.03] border border-sky-500/20 rounded-2xl backdrop-blur-md">
              <h4 className="text-lg font-semibold mb-2 text-amber-400">Interaksi Pijakan</h4>
              <p className="text-white/70 leading-relaxed">
                Setiap pijakan pada karpet memicu respons audio sederhana \- kata, instruksi, atau suara \- yang
                mendorong anak untuk merespons, meniru, dan berinteraksi tanpa tekanan.
              </p>
            </div>
            <div className="p-6 bg-blue/[0.03] border border-sky-500/20 rounded-2xl backdrop-blur-md">
              <h4 className="text-lg font-semibold mb-2 text-amber-400">Modular & Sederhana</h4>
              <p className="text-white/70 leading-relaxed">
                Dengan desain modular dan teknologi yang sederhana, RABA dapat digunakan di ruang kelas, posyandu,
                maupun rumah.
              </p>
            </div>
          </div>

          <div className="p-6 bg-blue-500/10 border border-sky-500/30 rounded-2xl flex items-start gap-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blu-400 flex items-center justify-center text-2xl shadow-lg animate-pulse transform transition-all duration-300 hover:scale-110"
              aria-hidden="true"
              title="Liveliness icon"
            >
              ✨
            </div>
            <p className="text-white/80 leading-relaxed">
              Melalui RABA, proses belajar tidak lagi berpusat pada layar, tetapi kembali pada pengalaman tubuh,
              bahasa, dan hubungan sosial. Inovasi ini menjadi bagian dari upaya membangun pendidikan anak usia
              dini yang lebih inklusif, berkelanjutan, dan berakar pada praktik pendampingan yang manusiawi.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-9">
          {/* VISI */}
          <div
            className="p-10 bg-white/[0.03] border border-sky-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-blue-500/[0.08] hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/20">
            <div
              className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-amber-500/30">
              🌟
            </div>
            <h3 className="text-2xl font-bold mb-4">VISI</h3>
            <p className="text-white/80 leading-relaxed">
              Menjadi media bermain edukatif yang mendukung tumbuh kembang anak melalui interaksi terpandu antara
              anak, guru, dan orang tua, dengan pendekatan yang inklusif, aman, dan berpusat pada kebutuhan
              perkembangan anak.
            </p>
          </div>

          {/* MISI */}
          <div
            className="p-10 bg-white/[0.03] border border-sky-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-blue-500/[0.08] hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/20">
            <div
              className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-amber-500/30">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-4">MISI</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed list-decimal list-inside marker:text-amber-400">
              <li>Mengembangkan media bermain edukatif berbasis aktivitas fisik dan audio yang mendukung stimulasi
                kognitif, bahasa, dan fokus anak.
              </li>
              <li>Mendorong peran aktif guru dan orang tua sebagai fasilitator pembelajaran tanpa mengganggu
                konsentrasi anak.
              </li>
              <li>Menyediakan sistem bermain yang sederhana, adaptif, dan ramah anak untuk mendukung proses belajar di
                rumah maupun di lingkungan pendidikan.
              </li>
              <li>Mengintegrasikan evaluasi pembelajaran berbasis observasi dan pendampingan sebagai dasar
                pengembangan anak secara berkelanjutan.
              </li>
            </ul>
          </div>

          {/* GOALS */}
          <div
            className="p-10 bg-white/[0.03] border border-sky-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-blue-500/[0.08] hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/20">
            <div
              className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-amber-500/30">
              🚀
            </div>
            <h3 className="text-2xl font-bold mb-4">GOALS</h3>
            <ul className="space-y-3 text-white/80 leading-relaxed list-decimal list-inside marker:text-amber-400">
              <li>Meningkatkan kualitas interaksi belajar antara anak, guru, dan orang tua melalui media bermain yang
                terarah.
              </li>
              <li>Membantu anak belajar dengan lebih fokus, nyaman, dan minim distraksi digital.</li>
              <li>Menyediakan alternatif media pembelajaran yang inklusif dan mudah diterapkan di berbagai lingkungan
                sosial.
              </li>
              <li>Mendorong praktik pembelajaran kolaboratif yang berkelanjutan dalam mendukung perkembangan anak usia
                dini.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
