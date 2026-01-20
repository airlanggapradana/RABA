import {useState, useEffect} from "react";
import {Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import logo from "@/assets/logo.webp"
import {useNavigate} from "react-router";

const navLinks = [
  {href: "#features", label: "Fitur"},
  {href: "#how-it-works", label: "Cara Kerja"},
  {href: "#testimonials", label: "Testimoni"},
  {href: "#team", label: "Tim"},
];

export const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="RABA logo"
            className="w-20 h-14 rounded-xl shadow-lg shadow-red-500/20 group-hover:shadow-xl group-hover:shadow-red-500/30 transition-shadow duration-300 border-2 border-red-100/50"
            loading="lazy"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
          >
            Mulai Sekarang
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border shadow-lg">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground font-medium py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/auth");
              }}
              className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
            >
              Mulai Sekarang
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
