import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ExtendedSections from "@/components/ExtendedSections";
import ProgressDots from "@/components/ProgressDots";
import PortfolioNavbar from "@/components/PortfolioNavbar";
import GlobalFX from "@/components/GlobalFX";
import CoreUXLayer from "@/components/CoreUXLayer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight || 1), 1);
      const shift = 16 + progress * 28;
      document.documentElement.style.setProperty("--ambient-shift", `${shift}%`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content p, #main-content li, #main-content .text-muted, #main-content .gradient-word",
      ),
    );

    nodes.forEach((el, i) => {
      el.classList.add("reveal-on-scroll");
      el.style.setProperty("--reveal-delay", `${Math.min(i % 8, 7) * 45}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      nodes.forEach((el) => {
        el.classList.remove("reveal-on-scroll", "is-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <PortfolioNavbar />
        <CoreUXLayer />
        <GlobalFX />
        <ProgressDots />
        <main id="main-content">
          <HeroSection />
          <ExtendedSections />
        </main>
      </motion.div>
    </>
  );
};

export default Index;
