import Navbar from "@/components/Home/Navbar.tsx";
import Hero from "@/components/Home/Hero.tsx";
import About from "@/components/Home/About.tsx";
import Features from "@/components/Home/Features.tsx";
import Team from "@/components/Home/Team.tsx";
import Testimonials from "@/components/Home/Testimonials.tsx";
import Footer from "@/components/Home/Footer.tsx";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <Team/>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default Home;
