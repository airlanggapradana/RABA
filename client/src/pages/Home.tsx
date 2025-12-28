import {useState, useEffect} from 'react';
import logo from "@/assets/logo.webp"
import aura from "@/assets/foto_tim_webp/Aura Kalbu Darsono.webp"
import rangga from "@/assets/foto_tim_webp/Airlangga Pradana Prakusa.webp"
import taqiyyah from "@/assets/foto_tim_webp/TAQIYYAH NURUL _AZZAH.webp"
import salsa from "@/assets/foto_tim_webp/Salsabila Malikatul Jannah_.webp"
import arina from "@/assets/foto_tim_webp/arina.webp"
import dwi from "@/assets/foto_tim_webp/Dwi Rahmat Maulana.webp"
import ihsan from "@/assets/foto_tim_webp/Ihsan Abdillah.webp"
import aqil from "@/assets/foto_tim_webp/Nabiel Aqila Gandung.webp"
import hasbi from "@/assets/foto_tim_webp/Muhammad Hasbi Assidiqi.webp"
import bg from "@/assets/bg.jpg"
import bg_2 from "@/assets/bg_2.jpg"
import {useNavigate} from "react-router";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

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

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950 to-slate-950 text-white overflow-x-hidden">

      {/* Animated Particles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? 'py-4 px-[5%] bg-slate-950/95 backdrop-blur-md'
            : 'py-6 px-[5%] bg-slate-950/80 backdrop-blur-md'
        } border-b border-purple-500/10`}
      >
        <a href="#" className="flex items-center">
          <img src={logo} alt="RABA logo" className="h-16 w-auto"/>
        </a>
        <ul className="hidden md:flex gap-10 list-none">
          {['features', 'about', 'teams'].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                className="text-white/80 font-medium transition-all duration-300 hover:text-white relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-sky-500 after:to-sky-500 after:transition-all after:duration-300 hover:after:w-full capitalize"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('auth')}
          className="px-7 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/50">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
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
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-600/25 to-amber-500/50 border border-amber-500/50 rounded-full text-sm mb-8 animate-fadeInDown"
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
            className="text-5xl md:text-7xl py-4 font-heading font-extrabold mb-6 bg-gradient-to-br from-orange-300 to-gray-200 bg-clip-text text-transparent animate-fadeInUp delay-200">
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
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/60">
              Tentang RABA
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-10 py-4 bg-white/5 border-2 border-amber-500/50 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:bg-amber-500/15 hover:border-amber-500/80 hover:-translate-y-1 backdrop-blur-md">
              Lihat Cara Kerjanya
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-10">
            <div>
              <div
                className="inline-block px-6 py-2 bg-orange-500/15 border border-amber-500/30 rounded-full text-sm mb-6">
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
              className="inline-block px-6 py-2 bg-orange-500/15 border border-amber-500/30 rounded-full text-sm">
              Cara Kerja RABA
            </div>

            <div className="p-6 bg-orange-500/10 border border-amber-500/30 rounded-2xl">
              <p className="text-white/80 leading-relaxed">
                RABA dikembangkan bersama guru PAUD dan komunitas desa sebagai solusi yang kontekstual, mudah
                digunakan, dan dapat diadaptasi sesuai kebutuhan lingkungan belajar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/[0.03] border border-amber-500/20 rounded-2xl backdrop-blur-md">
                <h4 className="text-lg font-semibold mb-2 text-amber-400">Interaksi Pijakan</h4>
                <p className="text-white/70 leading-relaxed">
                  Setiap pijakan pada karpet memicu respons audio sederhana \- kata, instruksi, atau suara \- yang
                  mendorong anak untuk merespons, meniru, dan berinteraksi tanpa tekanan.
                </p>
              </div>
              <div className="p-6 bg-white/[0.03] border border-amber-500/20 rounded-2xl backdrop-blur-md">
                <h4 className="text-lg font-semibold mb-2 text-amber-400">Modular & Sederhana</h4>
                <p className="text-white/70 leading-relaxed">
                  Dengan desain modular dan teknologi yang sederhana, RABA dapat digunakan di ruang kelas, posyandu,
                  maupun rumah.
                </p>
              </div>
            </div>

            <div className="p-6 bg-orange-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-lg animate-pulse transform transition-all duration-300 hover:scale-110"
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
              className="p-10 bg-white/[0.03] border border-amber-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-orange-500/[0.08] hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/20">
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
              className="p-10 bg-white/[0.03] border border-amber-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-orange-500/[0.08] hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/20">
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
              className="p-10 bg-white/[0.03] border border-amber-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-orange-500/[0.08] hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/20">
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

      {/* Features Section */}
      <section id="features" className="py-32 px-[5%]">
        <div className="text-center mb-20">
          <div
            className="inline-block px-6 py-2 bg-orange-500/15 border border-amber-500/30 rounded-full text-sm mb-4">
            Fitur
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">
            Fitur Unggulan RABA
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Dirancang untuk memberikan pengalaman belajar yang interaktif, aman, dan menyenangkan bagi anak usia dini.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '🚀',
              title: 'Terintegrasi dengan Karpet',
              description: 'Sensorik Pintar yang Memicu Respon Audio Edukatif saat Dipijak.',
            },
            {
              icon: '📊',
              title: 'Real-Time Data',
              description: 'Dapatkan wawasan instan tentang interaksi dan kemajuan anak melalui dashboard intuitif kami.',
            },
            {
              icon: '🔄',
              title: 'Progress Tracking',
              description: 'Pantau perkembangan anak secara menyeluruh dengan laporan kemajuan yang mudah dipahami.',
            },
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Nikmati kecepatan akses data dan respons sistem yang optimal untuk pengalaman pengguna terbaik.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative p-10 bg-white/[0.03] border border-amber-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:bg-orange-500/[0.08] hover:border-amber-500/40 hover:shadow-2xl hover:shadow-orange-500/30 overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"/>
              <div
                className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-amber-500/30">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-[5%] border-y border-amber-500/20 overflow-hidden">
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
          <div className="inline-block px-6 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full text-sm mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">What Our Clients Say</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Trusted by industry leaders and innovative startups worldwide
          </p>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              quote: "RABA has completely transformed how we handle customer data. The AI insights are incredibly accurate and have helped us increase conversion by 40%.",
              author: "Sarah Chen",
              role: "CEO, TechFlow",
              avatar: "SC"
            },
            {
              quote: "The automation capabilities are mind-blowing. We've saved hundreds of hours each month and our team can now focus on strategic initiatives.",
              author: "Michael Rodriguez",
              role: "Operations Director, StartupHub",
              avatar: "MR"
            },
            {
              quote: "Best investment we've made this year. The ROI was evident within the first month. RABA's support team is also exceptional.",
              author: "Emily Watson",
              role: "CTO, DataSync",
              avatar: "EW"
            },
            {
              quote: "The natural language processing is phenomenal. Our non-technical team members can now query complex data without any training.",
              author: "James Park",
              role: "VP of Analytics, CloudCore",
              avatar: "JP"
            },
            {
              quote: "Security was our top concern, and RABA exceeded all expectations. Enterprise-grade protection with incredible performance.",
              author: "Lisa Thompson",
              role: "CISO, SecureNet",
              avatar: "LT"
            },
            {
              quote: "Integration was seamless. Within days, we had RABA working with all our existing tools. The API documentation is top-notch.",
              author: "David Kumar",
              role: "Lead Developer, DevPros",
              avatar: "DK"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-white/[0.03] border border-amber-500/20 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-sky-500/[0.08] hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/20"
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

      {/* Team Section */}
      <section id={'teams'} className="py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm mb-4 backdrop-blur-sm">
              Tim Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
              Bertemu dengan Tim di Balik RABA
            </h2>
            <p className="text-md md:text-lg text-white/60 max-w-3xl mx-auto">
              Para inovator berdedikasi yang merancang solusi pembelajaran inklusif dan bermakna untuk anak usia dini.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {[
              {
                name: "Aura Kalbu Darsono",
                role: "Founder",
                bio: "Pendidikan Bahasa dan Sastra Indonesia '23",
                avatar: aura,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Airlangga Pradana Prakusa",
                role: "Web Developer",
                bio: "Teknik Informatika '24",
                avatar: rangga,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Taqiyyah Nurul Azzah",
                role: "Research and Development",
                bio: "Fisioterapi '22",
                avatar: taqiyyah,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Salsabila Malikatul Jannah",
                role: "Research and Development",
                bio: "Fisioterapi '22",
                avatar: salsa,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Arina Ilman Naffah",
                role: "Research and Development",
                bio: "Teknik Elektro '24",
                avatar: arina,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Dwi Rahmat Maulana",
                role: "Chief Technology Officer",
                bio: "Teknik Elektro '24",
                avatar: dwi,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Ihsan Abdillah",
                role: "Chief Technology Officer",
                bio: "Teknik Elektro '24",
                avatar: ihsan,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Nabiel Aqila Gandung",
                role: "Documentation Specialist",
                bio: "Psikologi '25",
                avatar: aqil,
                gradient: "from-orange-500 to-amber-500"
              },
              {
                name: "Muhammad Hasbi Assidiqi",
                role: "Web Developer",
                bio: "Sistem Informasi '24",
                avatar: hasbi,
                gradient: "from-orange-500 to-amber-500"
              },
            ].map((member, index) => (
              <article
                key={index}
                className="relative bg-white/[0.03] border border-amber-500/12 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2"
              >
                <div className={`rounded-full p-[2px] bg-gradient-to-tr ${member.gradient} shadow-md`}>
                  <div className="w-28 h-28 rounded-full bg-slate-900 overflow-hidden">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover block"/>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <span className="inline-block text-xs text-amber-300 bg-white/5 px-3 py-1 rounded-full font-medium">
                    {member.role}
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-[5%] text-center">
        <div
          className="bg-amber-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 max-w-4xl text-center shadow-2xl mx-auto">
          <h1
            className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Siap Mendukung Tumbuh Kembang Anak dengan Cara yang Lebih Bermakna?
          </h1>
          <p className="text-xl leading-relaxed text-amber-100 mb-10">
            Bergabunglah dengan ratusan guru PAUD dan orang tua yang telah menggunakan RABA untuk mendukung stimulasi
            bahasa, sensorik, dan fokus anak melalui bermain yang terarah dan inklusif.
          </p>
          <button
            className="bg-gradient-to-r from-orange-500 to-amber-500 px-12 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 transition-all">
            Coba RABA Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-[5%] border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'API', 'Documentation'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Blog', 'Press'],
            },
            {
              title: 'Resources',
              links: ['Help Center', 'Community', 'Guides', 'Webinars'],
            },
            {
              title: 'Legal',
              links: ['Privacy', 'Terms', 'Security', 'Cookies'],
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-amber-500 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-purple-500/20 text-center text-white/50">
          <p>&copy; 2025 RABA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}