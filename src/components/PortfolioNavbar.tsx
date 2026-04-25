const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const PortfolioNavbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="liq-glass-refract liquid-glass-layer glass-heavy border-b border-white/10 bg-surface/55 px-4 py-3 md:px-8">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4">
          <button
            onClick={() => scrollTo("hero")}
            className="font-accent text-sm uppercase tracking-[0.22em] text-text"
          >
            Y7XIFIED
          </button>

          <nav className="flex items-center gap-1 md:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:bg-white/10 hover:text-text md:px-4"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PortfolioNavbar;
