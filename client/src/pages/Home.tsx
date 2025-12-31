import Navbar from "@/components/Home/Navbar.tsx";
import Hero from "@/components/Home/Hero.tsx";
import About from "@/components/Home/About.tsx";
import Features from "@/components/Home/Features.tsx";
import Testimonials from "@/components/Home/Testimonials.tsx";
import Teams from "@/components/Home/Teams.tsx";
import Products from "@/components/Home/Products.tsx";

export default function Home() {
  const Particle = ({delay, duration, left}: { delay: number, duration: number, left: number }) => (
    <div
      className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
      style={{
        left: `${left}%`,
        animation: `float ${duration}s infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );

  const particles = Array.from({length: 50}, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
  }));


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-950 text-white overflow-x-hidden">

      {/* Animated Particles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      {/* About Section */}
      <About/>

      {/* Features Section */}
      <Features/>
      
      {/* Product Section */}
      <Products/>

      {/* Testimonials Section */}
      <Testimonials/>

      {/* Team Section */}
      <Teams/>

      {/* CTA Section */}
      <section className="py-32 px-[5%] text-center">
        <div
          className="bg-sky-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 max-w-4xl text-center shadow-2xl mx-auto">
          <h1
            className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
            Siap Mendukung Tumbuh Kembang Anak dengan Cara yang Lebih Bermakna?
          </h1>
          <p className="text-xl leading-relaxed text-sky-100 mb-10">
            Bergabunglah dengan ratusan guru PAUD dan orang tua yang telah menggunakan RABA untuk mendukung stimulasi
            bahasa, sensorik, dan fokus anak melalui bermain yang terarah dan inklusif.
          </p>
          <button
            className="bg-gradient-to-r from-blue-500 to-sky-500 px-12 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
            Coba RABA Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-[5%] border-t border-purple-500/20">
        <div className="pt-8 border-t border-purple-500/20 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} RABA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}