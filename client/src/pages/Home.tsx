import {Navbar} from "@/components/Home/Navbar.tsx";
import {Hero} from "@/components/Home/Hero.tsx";
import {Features} from "@/components/Home/Features.tsx";
import {Testimonials} from "@/components/Home/Testimonials.tsx";
import {HowItWorks} from "@/components/Home/HowItWorks.tsx";
import {Team} from "@/components/Home/Team.tsx";
import {CTA} from "@/components/Home/CTA.tsx";
import {Footer} from "@/components/Home/Footer.tsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full">
      <Navbar/>
      <main>
        <Hero/>
        <Features/>
        <HowItWorks/>
        <Testimonials/>
        <Team/>
        <CTA/>
      </main>
      <Footer/>
    </div>
  );
}