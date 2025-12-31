import bg_2 from "@/assets/bg_2.jpg"

const Testimonials = () => {
  return (
    <section className="relative py-32 px-[5%] border-y border-sky-500/20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.75)), url(${bg_2})`,
          backgroundBlendMode: 'multiply, normal',
          filter: 'blur(2px)',
          transform: 'scale(1.03)',
        }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none"/>

      <div className="relative z-10 text-center mb-20">
        <div className="inline-block px-6 py-2 bg-sky-500/15 border border-sky-500/30 rounded-full text-sm mb-4">
          Testimonials
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">
          Apa Kata Mereka Tentang RABA
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          RABA telah membantu banyak guru PAUD dan orang tua dalam menciptakan pengalaman belajar yang lebih
          interaktif dan bermakna bagi anak-anak mereka.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            quote: "RABA telah benar-benar mengubah cara kami menangani data pelanggan. Wawasan AI-nya sangat akurat dan membantu kami meningkatkan konversi hingga 40%.",
            author: "Sarah Chen",
            role: "CEO, TechFlow",
            avatar: "SC"
          },
          {
            quote: "Kemampuan otomatisasinya luar biasa. Kami menghemat ratusan jam setiap bulan dan tim kini dapat fokus pada inisiatif strategis.",
            author: "Michael Rodriguez",
            role: "Operations Director, StartupHub",
            avatar: "MR"
          },
          {
            quote: "Investasi terbaik yang kami lakukan tahun ini. ROI terlihat dalam bulan pertama. Tim dukungan RABA juga sangat responsif dan membantu.",
            author: "Emily Watson",
            role: "CTO, DataSync",
            avatar: "EW"
          },
          {
            quote: "Pemrosesan bahasa alaminya fenomenal. Anggota tim non-teknis kami sekarang dapat mengajukan pertanyaan pada data kompleks tanpa perlu pelatihan khusus.",
            author: "James Park",
            role: "VP of Analytics, CloudCore",
            avatar: "JP"
          },
          {
            quote: "Keamanan adalah prioritas utama kami, dan RABA melampaui semua harapan. Perlindungan setara enterprise dengan performa yang sangat baik.",
            author: "Lisa Thompson",
            role: "CISO, SecureNet",
            avatar: "LT"
          },
          {
            quote: "Integrasinya mulus. Dalam beberapa hari, RABA sudah bekerja dengan semua alat yang kami pakai. Dokumentasi API sangat lengkap.",
            author: "David Kumar",
            role: "Lead Developer, DevPros",
            avatar: "DK"
          }
        ].map((testimonial, index) => (
          <div
            key={index}
            className="relative p-8 bg-white/[0.03] border border-sky-500/20 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-sky-500/[0.08] hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/20"
          >
            <div className="text-4xl text-sky-400 mb-4">"</div>
            <p className="text-white/80 mb-6 leading-relaxed">{testimonial.quote}</p>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-white/60">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
