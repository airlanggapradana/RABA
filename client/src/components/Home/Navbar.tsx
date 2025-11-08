import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router";
import logo from "@/assets/logo.webp"

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({behavior: "smooth"});
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <img src={logo} alt={'logo'} className={'h-14'}></img>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground hover:text-primary transition-[var(--transition-smooth)]"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-foreground hover:text-primary transition-[var(--transition-smooth)]"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("team")}
            className="text-foreground hover:text-primary transition-[var(--transition-smooth)]"
          >
            Team
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-foreground hover:text-primary transition-[var(--transition-smooth)]"
          >
            Testimonials
          </button>
          <Button variant="default" size="sm" onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground hover:text-primary transition-[var(--transition-smooth)]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-[var(--transition-smooth)] text-left py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-[var(--transition-smooth)] text-left py-2"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-foreground hover:text-primary transition-[var(--transition-smooth)] text-left py-2"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-foreground hover:text-primary transition-[var(--transition-smooth)] text-left py-2"
            >
              Testimonials
            </button>
            <Button variant="default" size="sm" className="w-full" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
