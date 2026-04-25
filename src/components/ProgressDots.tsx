import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = ["hero", "about", "work", "skills", "timeline", "contact", "footer"];

const ProgressDots = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
    >
      <div className="glass-light rounded-full px-2 py-3">
        <div className="mb-2 h-10 w-px bg-stroke/60" />
        <div className="flex flex-col gap-3">
          {SECTIONS.map((id, i) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex items-center justify-end"
              data-magnetic="true"
            >
              <span className="absolute right-5 rounded-md bg-bg/80 px-2 py-0.5 text-[10px] font-accent uppercase tracking-[0.16em] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {id}
              </span>
              <motion.div
                className="rounded-full"
                animate={{
                  width: active === i ? 16 : 7,
                  height: 7,
                  backgroundColor: active === i ? "#89AACC" : "hsl(var(--stroke))",
                }}
                transition={{ duration: 0.25 }}
              />
            </button>
          ))}
        </div>
        <div className="mt-2 h-10 w-px bg-stroke/60" />
      </div>
    </motion.div>
  );
};

export default ProgressDots;
