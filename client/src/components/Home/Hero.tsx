import bg from "@/assets/bg.jpg"

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-[5%] pt-32 pb-16 text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.75)), radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.10), rgba(0,0,0,0)), url(${bg})`,
          backgroundBlendMode: 'multiply, normal, normal',
          filter: 'blur(2px)',
          transform: 'scale(1.03)',
        }}
      />
      {/* Background overlay for better text contrast */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-none"/>
      <div className="relative z-10 max-w-6xl text-center">
        <div
          className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-sky-600/25 to-blue-500/50 border border-sky-500/50 rounded-full text-sm mb-8 animate-fadeInDown"
          role="status"
          aria-live="polite"
        >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-white text-sm shadow-sm"
              aria-hidden="true">
              ✨
            </span>
          <span className="text-white/90 leading-tight">
              <span className="font-semibold">RABA</span>
              <span className="hidden sm:inline"> — Media Bermain Interaktif untuk Anak Usia Dini</span>
              <span className="sm:hidden"> — Media Bermain Interaktif</span>
            </span>
        </div>
        <h1
          className="text-5xl md:text-7xl py-4 font-heading font-extrabold mb-6 bg-gradient-to-br from-sky-50 to-blue-100 bg-clip-text text-transparent animate-fadeInUp delay-200">
          Ruang Bermain Interaktif
          <br/>
          untuk Tumbuh Kembang Anak yang Inklusif
        </h1>
        <p
          className="text-lg md:text-xl text-white/75 mb-12 max-w-5xl mx-auto tracking-wide text-center animate-fadeInUp delay-400">
            <span className="block mt-4 text-white/65">
              Dirancang khusus untuk anak usia dini, termasuk anak dengan kebutuhan stimulasi tambahan, RABA menghadirkan pengalaman belajar yang aktif, aman, dan bermakna — tanpa bergantung pada layar.
            </span>
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center animate-fadeInUp delay-600">
          <button
            onClick={() => scrollToSection('about')}
            className="px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/60">
            Tentang RABA
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-10 py-4 bg-white/5 border-2 border-sky-500/50 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:bg-sky-500/15 hover:border-sky-500/80 hover:-translate-y-1 backdrop-blur-md">
            Lihat Cara Kerjanya
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
