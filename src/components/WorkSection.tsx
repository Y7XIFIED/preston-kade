import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const CATEGORIES = ["All", "Web", "Brand", "Mobile", "Product"] as const;

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
}

const projects: Project[] = [
  { id: 1, title: "Nebula", category: "Web", image: project1, description: "A dynamic web platform for creative collaboration featuring real-time editing, AI-powered suggestions, and seamless team workflows.", tags: ["React", "Node.js", "WebSocket"], year: "2025" },
  { id: 2, title: "Prism", category: "Brand", image: project2, description: "Complete brand identity system for a luxury fintech startup, including visual language, guidelines, and digital assets.", tags: ["Figma", "Illustrator", "Brand"], year: "2025" },
  { id: 3, title: "Flux", category: "Mobile", image: project3, description: "Fintech mobile application with advanced analytics dashboard, real-time market data, and intuitive portfolio management.", tags: ["React Native", "TypeScript", "D3"], year: "2024" },
  { id: 4, title: "Echo", category: "Product", image: project4, description: "Premium e-commerce experience for a direct-to-consumer brand with 3D product visualization and AR try-on features.", tags: ["Next.js", "Three.js", "Stripe"], year: "2024" },
  { id: 5, title: "Drift", category: "Web", image: project5, description: "Enterprise SaaS analytics dashboard with real-time data streaming, custom reporting, and team collaboration tools.", tags: ["Vue.js", "Python", "PostgreSQL"], year: "2023" },
  { id: 6, title: "Apex", category: "Product", image: project6, description: "Immersive digital art platform connecting creators with collectors through curated exhibitions and blockchain provenance.", tags: ["React", "Solidity", "IPFS"], year: "2023" },
];

const WorkSection = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-text mb-12">
            Recent projects
          </h2>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-12 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 ${
                  filter === cat
                    ? "border-text/30 bg-text/10 text-text"
                    : "border-stroke/50 text-muted hover:text-text hover:border-text/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(project)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl border border-stroke/30 bg-surface/50 hover:border-white/10 transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted uppercase tracking-wider">{project.category} — {project.year}</span>
                      <ExternalLink className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-display italic text-text">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default WorkSection;
