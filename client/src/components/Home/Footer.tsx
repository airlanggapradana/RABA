import {Mail, Phone, MapPin, Instagram, Youtube, Linkedin} from "lucide-react";

const footerLinks = {
  product: [
    {label: "Fitur", href: "#features"},
    {label: "Cara Kerja", href: "#how-it-works"},
    {label: "Harga", href: "#pricing"},
    {label: "Demo", href: "#demo"},
  ],
  company: [
    {label: "Tentang Kami", href: "#about"},
    {label: "Tim", href: "#team"},
    {label: "Karir", href: "#careers"},
    {label: "Blog", href: "#blog"},
  ],
  support: [
    {label: "Bantuan", href: "#help"},
    {label: "FAQ", href: "#faq"},
    {label: "Kontak", href: "#contact"},
    {label: "Kebijakan Privasi", href: "#privacy"},
  ],
};

const socialLinks = [
  {icon: Instagram, href: "#", label: "Instagram"},
  {icon: Youtube, href: "#", label: "Youtube"},
  {icon: Linkedin, href: "#", label: "LinkedIn"},
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">R</span>
              </div>
              <span className="font-display font-bold text-2xl text-background">RABA</span>
            </div>
            <p className="text-background/60 mb-6 max-w-sm leading-relaxed">
              Karpet pintar interaktif untuk pembelajaran aktif anak Indonesia.
              Belajar tanpa layar, tumbuh dengan bermain.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@raba.id"
                 className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4"/>
                hello@raba.id
              </a>
              <a href="tel:+6281234567890"
                 className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4"/>
                +62 812 3456 7890
              </a>
              <p className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4"/>
                Jakarta, Indonesia
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-bold text-background mb-4">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-background mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-background mb-4">Dukungan</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © 2024 RABA. Hak cipta dilindungi.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <social.icon className="w-5 h-5"/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
