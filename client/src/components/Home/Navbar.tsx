import logo from "@/assets/logo.webp";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

const Navbar = () => {
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
  const navigate = useNavigate();
  return (
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
        {['features', 'products', 'about', 'teams'].map((item) => (
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
        className="px-7 py-3 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/50">
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;
