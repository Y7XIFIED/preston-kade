import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    text: "Michael's ability to translate complex requirements into elegant, intuitive interfaces is unmatched. He elevated our product beyond what we thought possible.",
    name: "Sarah Chen",
    role: "CEO, Vertex Studio",
    initials: "SC",
  },
  {
    text: "Working with Michael was transformative. His strategic approach to design thinking helped us achieve a 340% increase in user engagement within the first quarter.",
    name: "Alex Rivera",
    role: "Head of Product, Nebula Labs",
    initials: "AR",
  },
  {
    text: "The attention to detail and craft in every pixel is remarkable. Michael doesn't just design — he engineers delightful experiences that users love.",
    name: "Jamie Park",
    role: "CTO, Echo Digital",
    initials: "JP",
  },
  {
    text: "An exceptional collaborator who brings both creative vision and technical expertise. Our rebrand under Michael's direction exceeded all expectations.",
    name: "Morgan Blake",
    role: "Marketing Director, Prism Co",
    initials: "MB",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-text mb-16">
            Kind words
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            <Quote className="w-10 h-10 text-stroke/50 mb-8" />

            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-display italic text-text/90 leading-relaxed mb-10">
                    "{testimonials[current].text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-display italic text-text"
                      style={{ background: "linear-gradient(135deg, rgba(137,170,204,0.2) 0%, rgba(78,133,191,0.2) 100%)" }}
                    >
                      {testimonials[current].initials}
                    </div>
                    <div>
                      <p className="text-sm text-text">{testimonials[current].name}</p>
                      <p className="text-xs text-muted">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-stroke/50 flex items-center justify-center text-muted hover:text-text hover:border-text/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-text" : "w-1.5 bg-stroke"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-stroke/50 flex items-center justify-center text-muted hover:text-text hover:border-text/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
