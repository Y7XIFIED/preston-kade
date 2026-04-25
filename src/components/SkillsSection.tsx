import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Node.js", level: 88 },
  { name: "Figma / Design", level: 90 },
  { name: "Python / AI", level: 78 },
  { name: "AWS / Cloud", level: 82 },
  { name: "Three.js / WebGL", level: 72 },
  { name: "PostgreSQL", level: 85 },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-text">{name}</span>
        <span className="text-xs text-muted tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-stroke/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDuration: `${0.8 + delay * 0.1}s`,
            transitionDelay: `${delay * 0.05}s`,
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Proficiencies</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-text mb-16">
            Technical expertise
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.05}>
              <SkillBar name={skill.name} level={skill.level} delay={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
