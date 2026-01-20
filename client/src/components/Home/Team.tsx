import {cn} from "@/lib/utils";
import aura from "@/assets/foto_tim_webp/Aura Kalbu Darsono.webp"
import taqiyyah from "@/assets/foto_tim_webp/TAQIYYAH NURUL _AZZAH.webp"
import salsa from "@/assets/foto_tim_webp/Salsabila Malikatul Jannah_.webp"
import hafid from "@/assets/foto_tim_webp/Hafidh Erli Nurdin Pratama.webp"
import dwi from "@/assets/foto_tim_webp/Dwi Rahmat Maulana.webp"
import ihsan from "@/assets/foto_tim_webp/Ihsan Abdillah.webp"
import rangga from "@/assets/foto_tim_webp/Airlangga Pradana Prakusa.webp"
import alfin from "@/assets/foto_tim_webp/Alfin Andhika Mardanni.webp"
import aqil from "@/assets/foto_tim_webp/Nabiel Aqila Gandung.webp"
import arina from "@/assets/foto_tim_webp/arina.webp"

const team = [
  {
    name: "Aura Kalbu Darsono",
    role: "Founder and Head of Research & Development",
    description: "Edukasi Bahasa",
    color: "bg-red-300/10 border-red-400/20",
    photo: aura,
  },
  {
    name: "Taqiyyah Nurul 'Azzah",
    role: "Research & Development",
    description: "Stimulus Fokus Anak ADHD",
    color: "bg-emerald-300/10 border-emerald-400/20",
    photo: taqiyyah,
  },
  {
    name: "Salsabila Malikatul Jannah",
    role: "Research & Development",
    description: "Respon Gerak dan Konsentrasi Anak",
    color: "bg-amber-300/10 border-amber-400/20",
    photo: salsa,
  },
  {
    name: "Hafidh Erli Nurdin Pratama",
    role: "Research & Development",
    description: "Terapi Sensori Anak",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: hafid,
  },
  {
    name: "Dwi Rahmat Maulana",
    role: "Chief Technology Officer (CTO)",
    description: "Pengembangan Produk dan Inovasi Karpet Edukasi",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: dwi,
  },
  {
    name: "Ihsan Abdillah",
    role: "Embedded System  & Hardware Integration Engineer",
    description: "Pengembangan Produk dan Inovasi Karpet Edukasi",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: ihsan,
  },
  {
    name: "Airlangga Pradana Prakusa",
    role: "Head Chief Web Developer (Frontend Developer)",
    description: "Pengembangan Website dan Platform Karpet Edukasi",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: rangga,
  },
  {
    name: "Alfin Andhika Mardanni",
    role: "Backend Web Developer",
    description: "Pengembangan Website dan Platform Karpet Edukasi",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: alfin,
  },
  {
    name: "Nabiel Aqila Gandung",
    role: "Head of Social Media & Branding",
    description: "Strategi Pemasaran dan Pengembangan Merek",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: aqil,
  },
  {
    name: "Arina Ilman Nafi'ah",
    role: "Social Media & Contect Creative Team",
    description: "Strategi Pemasaran dan Pengembangan Merek",
    color: "bg-teal-300/10 border-teal-400/20",
    photo: arina,
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-amber-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-1/4 w-20 h-20 bg-yellow-400 rounded-full blur-2xl"/>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-accent rounded-full blur-2xl"/>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-200/30 text-emerald-500 font-medium text-sm mb-4">
              Tim Kami
            </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Dikembangkan oleh Ahli
          </h2>
          <p className="text-muted-foreground text-lg">
            Tim multidisiplin yang berdedikasi untuk pendidikan anak usia dini Indonesia.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-3xl border-2 bg-card text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fade-in",
                member.color
              )}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden ring-2 ring-offset-2 ring-red-400/30">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="font-display text-lg font-bold mb-1">
                {member.name}
              </h3>
              <p className="text-red-400 text-sm font-medium mb-2">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};