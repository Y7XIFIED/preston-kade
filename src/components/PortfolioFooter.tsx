import { Github, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const footerLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

const PortfolioFooter = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stroke/30 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div
                className="w-12 h-12 rounded-full p-[2px] mb-6 inline-block"
                style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}
              >
                <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
                  <span className="text-base font-display italic tracking-tighter text-text">PK</span>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed max-w-xs">
                Engineering refined digital products through disciplined design methodology and robust technical execution.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Navigation</p>
              <div className="space-y-3">
                {footerLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Connect</p>
              <div className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-3 text-sm text-muted hover:text-text transition-colors group"
                  >
                    <social.icon className="w-4 h-4" />
                    {social.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-stroke/20">
          <p className="text-xs text-muted">© 2026 Preston Kade. All rights reserved.</p>
          <p className="text-xs text-muted">Built with precision & discipline</p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
