const Features = () => {
  return (
    <section id="features" className="py-32 px-[5%]">
      <div className="text-center mb-20">
        <div
          className="inline-block px-6 py-2 bg-blue-500/15 border border-sky-500/30 rounded-full text-sm mb-4">
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
            className="relative p-10 bg-white/[0.03] border border-sky-500/20 rounded-3xl backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:bg-blue-500/[0.08] hover:border-sky-500/40 hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden group"
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
  );
};

export default Features;
