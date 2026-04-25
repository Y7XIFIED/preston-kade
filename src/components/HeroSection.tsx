import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";
import confetti from "canvas-confetti";

const VIDEO_SRC = "https://stream.mux.com/Gs3wZfrtz6ZfqZqQ02c02Z7lugV00FGZvRpcqFTel66r3g.m3u8";
const ROLES = ["Designer", "Developer", "Strategist", "Engineer"];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const fireConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#89AACC", "#4E85BF", "#f5f5f5"],
  });
};

const useTypewriter = (texts: string[], typingSpeed = 80, deleteSpeed = 50, pauseDuration = 1800) => {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplay(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
    if (!isDeleting && charIndex === currentText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplay(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deleteSpeed);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deleteSpeed, pauseDuration]);

  return display;
};

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const typedRole = useTypewriter(ROLES);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = VIDEO_SRC;
  }, []);

  const heroStagger = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="hero" ref={heroRef} className="hero-vignette grain-overlay depth-fog relative min-h-screen flex flex-col items-center justify-center overflow-hidden ambient-section">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="float-blob animate-subtle-breathe pointer-events-none absolute -top-20 right-[12%] z-0 h-60 w-60 rounded-full bg-[#89AACC]/15 blur-3xl" />
      <div className="float-blob animate-soft-float pointer-events-none absolute bottom-6 left-[10%] z-0 h-52 w-52 rounded-full bg-[#4E85BF]/14 blur-3xl" />

      <motion.div
        initial="hidden"
        animate="show"
        className="hero-tilt-3d liq-glass-refract liquid-glass-layer glass-drift border-breathe caustic-noise frost-velocity dof-by-center vol-light relative z-10 mx-4 max-w-3xl rounded-[2.1rem] px-6 py-10 text-center md:px-10 glass-panel corner-ornaments animate-subtle-breathe"
      >
        <div className="pointer-events-none absolute -inset-5 rounded-[2.4rem] border border-white/5" />
        <motion.h1 variants={heroStagger} transition={{ delay: 0.05 }} className="name-reveal extrude-text fluid-title balance text-6xl md:text-8xl lg:text-9xl font-display italic tracking-tight mb-6 liquid-glass-text select-none" data-text="Preston Kade">
          Preston Kade
        </motion.h1>
        <motion.p variants={heroStagger} transition={{ delay: 0.16 }} className="blur-in fluid-subtitle text-muted mb-10 animate-soft-float">
          A <span className="font-display italic text-text inline-block min-w-[80px]">{typedRole}<span className="animate-pulse ml-0.5 text-muted">|</span></span> shaping digital footprints.
        </motion.p>
        <motion.p variants={heroStagger} transition={{ delay: 0.25 }} className="blur-in balance text-sm md:text-base text-muted leading-relaxed max-w-md mx-auto mb-12 animate-detail-fade">
          I design and build clean, high-performing digital experiences focused on clarity, usability, and measurable impact.
        </motion.p>

        <motion.div variants={heroStagger} transition={{ delay: 0.35 }} className="blur-in flex items-center justify-center gap-4">
          <button
            onClick={() => { fireConfetti(); scrollTo("work"); }}
            className="btn-sheen micro-pop wobble-hover magnetic-target liq-glass-refract liquid-glass-layer glass-medium relative z-10 px-7 py-3.5 text-text text-sm rounded-full border border-white/20 transition-colors duration-300"
            data-magnetic="true"
          >
            Explore My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="btn-sheen micro-pop wobble-hover magnetic-target liq-glass-refract liquid-glass-layer glass-light relative z-10 px-7 py-3.5 text-text text-sm rounded-full border border-white/20 transition-colors duration-300"
            data-magnetic="true"
          >
            Let&apos;s Connect
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-accent text-xs text-muted uppercase tracking-[0.24em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 bg-text animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
