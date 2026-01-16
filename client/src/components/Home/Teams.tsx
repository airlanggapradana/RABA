import aura from "@/assets/foto_tim_webp/Aura Kalbu Darsono.webp"
import rangga from "@/assets/foto_tim_webp/Airlangga Pradana Prakusa.webp"
import taqiyyah from "@/assets/foto_tim_webp/TAQIYYAH NURUL _AZZAH.webp"
import salsa from "@/assets/foto_tim_webp/Salsabila Malikatul Jannah_.webp"
import arina from "@/assets/foto_tim_webp/arina.webp"
import dwi from "@/assets/foto_tim_webp/Dwi Rahmat Maulana.webp"
import ihsan from "@/assets/foto_tim_webp/Ihsan Abdillah.webp"
import aqil from "@/assets/foto_tim_webp/Nabiel Aqila Gandung.webp"
import alfin from "@/assets/foto_tim_webp/Alfin Andhika Mardanni.webp"
import hafidh from "@/assets/foto_tim_webp/Hafidh Erli Nurdin Pratama.webp"
import hasbi from "@/assets/foto_tim_webp/Muhammad Hasbi Assidiqi.webp"

const Teams = () => {
  return (
    <section id={'teams'} className="py-28 px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-block px-5 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full text-sm mb-4 backdrop-blur-sm">
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
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Airlangga Pradana Prakusa",
              role: "Web Developer",
              bio: "Teknik Informatika '24",
              avatar: rangga,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Alfin Andhika Mardanni",
              role: "Web Developer",
              bio: "Teknik Informatika '24",
              avatar: alfin,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Taqiyyah Nurul 'Azzah",
              role: "Research and Development",
              bio: "Fisioterapi '22",
              avatar: taqiyyah,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Salsabila Malikatul Jannah",
              role: "Research and Development",
              bio: "Fisioterapi '22",
              avatar: salsa,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Arina Ilman Nafi'ah",
              role: "Research and Development",
              bio: "Teknik Elektro '24",
              avatar: arina,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Dwi Rahmat Maulana",
              role: "Chief Technology Officer",
              bio: "Teknik Elektro '24",
              avatar: dwi,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Ihsan Abdillah",
              role: "Chief Technology Officer",
              bio: "Teknik Elektro '24",
              avatar: ihsan,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Hafidh Erli Nurdin Pratama",
              role: "Research and Development",
              bio: "Fisioterapi '23",
              avatar: hafidh,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Nabiel Aqila Gandung",
              role: "Documentation Specialist",
              bio: "Psikologi '25",
              avatar: aqil,
              gradient: "from-blue-500 to-sky-500"
            },
            {
              name: "Muhammad Hasbi Assidiqi",
              role: "Web Developer",
              bio: "Sistem Informasi '24",
              avatar: hasbi,
              gradient: "from-blue-500 to-sky-500"
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
  );
};

export default Teams;
