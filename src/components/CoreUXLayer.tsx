import { useEffect, useMemo, useState } from "react";
import { trackSectionView } from "@/lib/analytics";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
];

const CoreUXLayer = () => {
  const [current, setCurrent] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight * 0.33;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= pos) {
          setCurrent(SECTIONS[i].id);
          break;
        }
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        return;
      }
      if (e.key === "Escape") {
        return;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    const hash = `#${current}`;
    if (window.location.hash !== hash) {
      window.history.replaceState({}, "", hash);
    }
    trackSectionView(current);
  }, [current]);

  const currentLabel = useMemo(() => SECTIONS.find((s) => s.id === current)?.label ?? "Section", [current]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div className="fixed top-16 left-1/2 z-[60] -translate-x-1/2 md:hidden">
        <div className="glass-light rounded-full px-4 py-2 text-xs text-muted" role="status" aria-live="polite">
          {currentLabel} / Portfolio
        </div>
      </div>
    </>
  );
};

export default CoreUXLayer;
