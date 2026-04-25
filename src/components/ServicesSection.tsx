import { Palette, Code, Smartphone, Layers } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Developing cohesive visual systems and brand guidelines that establish credibility and market distinction.",
  },
  {
    icon: Code,
    title: "Web Engineering",
    description: "Architecting performant, accessible web applications using modern frameworks and scalable infrastructure.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Delivering cross-platform mobile applications with native performance and considered user experiences.",
  },
  {
    icon: Layers,
    title: "Product Strategy",
    description: "Translating business objectives into actionable product roadmaps through research-driven insights and data analysis.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-text mb-16">
            Services & expertise
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <MagneticButton className="h-full" strength={0.15}>
                <div className="glass-card group h-full p-8 rounded-2xl transition-all duration-500">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, rgba(137,170,204,0.15) 0%, rgba(78,133,191,0.15) 100%)" }}
                  >
                    <service.icon className="w-6 h-6 text-text/70" />
                  </div>
                  <h3 className="text-lg font-display italic text-text mb-3">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                </div>
              </MagneticButton>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
