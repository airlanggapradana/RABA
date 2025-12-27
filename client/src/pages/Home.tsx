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
                className="text-white/80 font-medium transition-all duration-300 hover:text-white relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-500 after:to-amber-500 after:transition-all after:duration-300 hover:after:w-full capitalize"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="px-7 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/50">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-[5%] pt-32 pb-16">
        <div className="relative z-10 max-w-6xl text-center">
          <div
            className="inline-block px-6 py-2 bg-sky-500/15 border border-sky-500/30 rounded-full text-sm mb-8 animate-fadeInDown">
            ✨ RABA — Media Bermain Interaktif untuk Anak Usia Dini
          </div>
          <h1
            className="text-5xl md:text-7xl font-heading font-extrabold mb-6 bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent animate-fadeInUp delay-200">
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
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/60">
              Tentang RABA
            </button>
            <button
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

          <div className="space-y-6">
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
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">Powerful AI Capabilities</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Everything you need to streamline your business operations and make data-driven decisions
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '🚀',
              title: 'Intelligent Automation',
              description: 'Automate repetitive tasks and workflows with advanced AI that learns from your business patterns.',
            },
            {
              icon: '📊',
              title: 'Real-Time Analytics',
              description: 'Get instant insights from your data with powerful analytics and visualization tools.',
            },
            {
              icon: '🔒',
              title: 'Enterprise Security',
              description: 'Bank-level encryption and security protocols to keep your data safe and compliant.',
            },
            {
              icon: '💬',
              title: 'Natural Language AI',
              description: 'Interact with your assistant using natural language for effortless communication.',
            },
            {
              icon: '🔄',
              title: 'Seamless Integration',
              description: 'Connect with your existing tools and platforms with our extensive API library.',
            },
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Experience instant responses and real-time processing with our optimized infrastructure.',
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
      <section className="py-32 px-[5%] bg-orange-500/5 border-y border-amber-500/20">
        <div className="text-center mb-20">
          <div
            className="inline-block px-6 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full text-sm mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">What Our Clients Say</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Trusted by industry leaders and innovative startups worldwide
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              className="relative p-8 bg-white/[0.03] border border-amber-500/20 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-amber-500/[0.08] hover:border-amber-500/40 hover:shadow-xl hover:shadow-orange-500/20"
            >
              <div className="text-4xl text-amber-400 mb-4">"</div>
              <p className="text-white/80 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm">
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
      <section id={'teams'} className="py-32 px-[5%]">
        <div className="text-center mb-20">
          <div
            className="inline-block px-6 py-2 bg-orange-500/15 border border-amber-500/30 rounded-full text-sm mb-4">
            Tim Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">
            Bertemu dengan Tim di Balik RABA
          </h2>
          <p className="text-xl text-white/60 max-w-4xl mx-auto">
            Mari berkenalan dengan tim di balik RABA — para inovator berdedikasi yang berkomitmen menciptakan solusi
            pembelajaran inklusif dan bermakna untuk anak usia dini.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Aura Kalbu Darsono",
              role: "Founder",
              bio: "Pendidikan Bahasa dan Sastra Indonesia '23",
              avatar: aura,
              gradient: "from-purple-500 to-pink-500"
            },
            {
              name: "Airlangga Pradana Prakusa",
              role: "Web Developer",
              bio: "Teknik Informatika '24",
              avatar: rangga,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Taqiyyah Nurul Azzah",
              role: "Research and Development",
              bio: "Fisioterapi '22",
              avatar: taqiyyah,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Salsabila Malikatul Jannah",
              role: "Research and Development",
              bio: "Fisioterapi '22",
              avatar: salsa,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Arina Ilman Naffah",
              role: "Research and Development",
              bio: "Teknik Elektro '24",
              avatar: arina,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Dwi Rahmat Maulana",
              role: "Chief Technology Officer",
              bio: "Teknik Elektro '24",
              avatar: dwi,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Ihsan Abdillah",
              role: "Chief Technology Officer",
              bio: "Teknik Elektro '24",
              avatar: ihsan,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Nabiel Aqila Gandung",
              role: "Documentation Specialist",
              bio: "Psikologi '25",
              avatar: aqil,
              gradient: "from-pink-500 to-purple-500"
            },
            {
              name: "Muhammad Hasbi Assidiqi",
              role: "Web Developer",
              bio: "Sistem Informasi '24",
              avatar: hasbi,
              gradient: "from-pink-500 to-purple-500"
            },
          ].map((member, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div
                className="relative p-8 bg-white/[0.03] border border-amber-500/20 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:bg-orange-500/[0.08] hover:border-amber-500/40 hover:shadow-2xl hover:shadow-orange-500/30">
                <div
                  className={`w-24 h-24 rounded-2xl p-[2px] mx-auto mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-r ${member.gradient}`}>
                  <div className="w-full h-full bg-slate-900 rounded-2xl overflow-hidden">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover block"/>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{member.name}</h3>
                <div className="text-amber-400 text-sm font-semibold mb-4 text-center">{member.role}</div>
                <p className="text-white/60 text-sm leading-relaxed text-center">{member.bio}</p>
              </div>
            </div>
          ))}
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