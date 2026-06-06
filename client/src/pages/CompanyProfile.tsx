import {Users, MapPin, Target, Heart} from "lucide-react";
import {Navbar} from "@/components/Home/Navbar.tsx";
import {Footer} from "@/components/Home/Footer.tsx";

const CompanyProfile = () => {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar/>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Company Profile
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Mengenal lebih dekat tentang RABA dan misi kami
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* About Section */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600"/>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                Tentang RABA
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              RABA adalah inisiatif media bermain edukatif berbasis karpet interaktif yang lahir dari kolaborasi
              mahasiswa lintas disiplin Universitas Muhammadiyah Surakarta (UMS), melibatkan bidang Pendidikan Bahasa
              dan Sastra Indonesia, Fisioterapi, Teknik Informatika, Teknik Elektro, Psikologi, dan Sistem Informasi.
              RABA dikembangkan sebagai solusi pembelajaran yang berpusat pada anak, dengan pendekatan bermain terpandu
              yang aman, inklusif, dan minim distraksi.
            </p>
          </div>

          {/* Implementation Section */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600"/>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                Implementasi Perdana
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Berangkat dari kebutuhan nyata masyarakat, RABA pertama kali diimplementasikan di Desa Gonilan sebagai
              ruang uji dampak sosial dan pendidikan. Karpet interaktif RABA dirancang untuk membantu stimulasi
              kognitif, bahasa, dan motorik anak melalui aktivitas fisik dan respons audio, sekaligus membuka ruang
              keterlibatan aktif guru dan orang tua sebagai pendamping belajar tanpa mengganggu fokus anak.
            </p>
          </div>

          {/* Approach Section */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600"/>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                Pendekatan Multidisipliner
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Melalui pendekatan multidisipliner, RABA memadukan pedagogi, psikologi perkembangan, teknologi interaktif,
              dan prinsip kesehatan gerak dalam satu media pembelajaran yang sederhana dan mudah diterapkan di
              lingkungan desa. Setiap proses pengembangan RABA berorientasi pada kebermanfaatan jangka panjang,
              partisipasi komunitas, dan keberlanjutan sosial.
            </p>
          </div>

          {/* Vision Section */}
          <div
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600"/>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                Visi Kami
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              RABA percaya bahwa pendidikan bermakna dapat dimulai dari desa. Dengan menjadikan Desa Gonilan sebagai
              titik awal, RABA berkomitmen untuk menghadirkan inovasi pendidikan yang tumbuh dari akar masyarakat dan
              dapat direplikasi secara luas sebagai bagian dari upaya mencetak generasi yang adaptif, kolaboratif, dan
              berdaya saing.
            </p>
          </div>

          {/* Disciplines Grid */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Kolaborasi Lintas Disiplin
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Pendidikan Bahasa dan Sastra Indonesia",
                "Fisioterapi",
                "Teknik Informatika",
                "Teknik Elektro",
                "Psikologi",
              ].map((discipline, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors duration-300"
                >
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {discipline}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default CompanyProfile;