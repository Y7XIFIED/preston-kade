import ScrollReveal from "./ScrollReveal";
import aboutImg from "@/assets/about-portrait.jpg";

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "120+", label: "Projects Delivered" },
  { value: "45+", label: "Happy Clients" },
  { value: "15+", label: "Awards Won" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">About</p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}
              />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={aboutImg}
                  alt="Preston Kade portrait"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
              </div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-display italic text-text mb-6 leading-tight">
                Building digital products with precision
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-muted leading-relaxed mb-6">
                I'm Preston Kade — a multidisciplinary designer and engineer based in Chicago. 
                With over eight years of professional experience, I deliver end-to-end digital solutions 
                that balance considered aesthetics with measurable performance.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-muted leading-relaxed mb-10">
                My process is grounded in strategic research, systematic design thinking, and disciplined 
                engineering practices. Every engagement is structured to produce work that performs — 
                not just work that looks polished.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="text-3xl font-display italic text-text mb-1">{stat.value}</div>
                    <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
