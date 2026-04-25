import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    period: "2023 — Present",
    role: "Lead Product Designer",
    company: "Vertex Studio",
    description: "Leading design systems and product strategy for enterprise SaaS platform serving 2M+ users.",
  },
  {
    period: "2021 — 2023",
    role: "Senior Fullstack Engineer",
    company: "Nebula Labs",
    description: "Architected and built scalable web applications, mentored junior developers, and drove technical decisions.",
  },
  {
    period: "2019 — 2021",
    role: "Creative Developer",
    company: "Echo Digital",
    description: "Created award-winning interactive experiences combining design thinking with cutting-edge web technologies.",
  },
  {
    period: "2017 — 2019",
    role: "UI/UX Designer",
    company: "Pixel Forge",
    description: "Designed intuitive user interfaces for mobile and web applications across fintech and healthcare sectors.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Career</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-text mb-16">
            Professional experience
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-stroke/50 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-px bg-stroke/50 md:hidden" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.company} delay={i * 0.1}>
                <div className={`flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <span className="text-xs text-muted uppercase tracking-wider">{exp.period}</span>
                    <h3 className="text-xl font-display italic text-text mt-2">{exp.role}</h3>
                    <p className="text-sm text-muted mt-1">{exp.company}</p>
                    <p className="text-sm text-muted/70 mt-3 leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="hidden md:flex items-start justify-center relative">
                    <div
                      className="w-3 h-3 rounded-full border-2 mt-1"
                      style={{ borderColor: "#89AACC", background: i === 0 ? "#89AACC" : "transparent" }}
                    />
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
