import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import {Linkedin, Mail} from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Chief Executive Officer",
      image: team1,
    },
    {
      name: "Sarah Martinez",
      role: "Chief Technology Officer",
      image: team2,
    },
    {
      name: "Maya Patel",
      role: "Head of Operations",
      image: team3,
    },
    {
      name: "Jordan Kim",
      role: "Lead Product Designer",
      image: team4,
    },
  ];

  return (
    <section id="team" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Talented professionals dedicated to driving innovation and delivering excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-muted-foreground mb-4">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <button
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-[var(--transition-smooth)]">
                    <Linkedin className="w-4 h-4"/>
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-[var(--transition-smooth)]">
                    <Mail className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
