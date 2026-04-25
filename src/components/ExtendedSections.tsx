import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Copy, Grid2X2, List, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

type Status = "live" | "concept" | "archived";

type Project = {
  id: number;
  title: string;
  category: "web" | "branding" | "product";
  status: Status;
  description: string;
  stats: string;
  readTime: string;
};

const allProjects: Project[] = [
  { id: 1, title: "Creative Portfolio Platform", category: "web", status: "live", description: "Responsive portfolio experience with storytelling and performance focus.", stats: "95+ Lighthouse", readTime: "2 min" },
  { id: 2, title: "SaaS Marketing Website", category: "web", status: "live", description: "Messaging-driven growth website with modular design system.", stats: "2.8x conversion", readTime: "3 min" },
  { id: 3, title: "Mobile App Design System", category: "product", status: "concept", description: "Reusable UI language and scalable interaction kit.", stats: "40% faster handoff", readTime: "2 min" },
  { id: 4, title: "Brand Narrative Refresh", category: "branding", status: "archived", description: "Visual identity and voice refresh for enterprise team.", stats: "Brand consistency +56%", readTime: "2 min" },
];

const tools = ["Figma", "Framer", "React", "TypeScript", "GSAP", "Tailwind", "Next.js", "Vite"];
const skillGroups = [
  {
    title: "Design",
    blurb: "Interface systems, visual rhythm, and interaction direction.",
    items: ["UX/UI Design", "Design Systems", "Interaction Design", "Motion Design"],
  },
  {
    title: "Engineering",
    blurb: "Modern frontend architecture with maintainable implementation.",
    items: ["Frontend Development", "Responsive Web Design", "Type-safe UI", "Accessibility"],
  },
  {
    title: "Product",
    blurb: "Outcome-focused delivery with performance and conversion in mind.",
    items: ["Performance Engineering", "Product Thinking", "Information Architecture", "Experimentation"],
  },
];

const strengths = [
  { label: "UI Craft", score: 94 },
  { label: "Frontend", score: 92 },
  { label: "Motion", score: 88 },
  { label: "Performance", score: 90 },
];

const statusClass: Record<Status, string> = {
  live: "bg-emerald-500/12 text-emerald-300 border-emerald-400/30",
  concept: "bg-sky-500/12 text-sky-300 border-sky-400/30",
  archived: "bg-zinc-500/15 text-zinc-300 border-zinc-400/25",
};

const sectionIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

const ExtendedSections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">((searchParams.get("view") as "grid" | "list") || "grid");
  const [selectedCats, setSelectedCats] = useState<string[]>(searchParams.get("cats")?.split(",").filter(Boolean) ?? []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const visibleGroups = skillGroups;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set("view", viewMode);
    if (selectedCats.length) next.set("cats", selectedCats.join(","));
    else next.delete("cats");
    setSearchParams(next, { replace: true });
  }, [viewMode, selectedCats]);

  useEffect(() => {
    trackEvent("view_mode_changed", { viewMode });
  }, [viewMode]);

  useEffect(() => {
    trackEvent("filters_changed", { selectedCats });
  }, [selectedCats]);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    allProjects.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return Array.from(map.entries());
  }, []);

  const filtered = useMemo(() => {
    if (!selectedCats.length) return allProjects;
    return allProjects.filter((p) => selectedCats.includes(p.category));
  }, [selectedCats]);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const noopAction = () => {};

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@prestonkade.dev");
      setEmailCopied(true);
      trackEvent("email_copied");
      setTimeout(() => setEmailCopied(false), 1400);
    } catch {
      setError("Clipboard unavailable. Use: hello@prestonkade.dev");
      trackEvent("email_copy_failed");
    }
  };

  return (
    <div className="relative overflow-hidden bg-bg" role="main" aria-label="Portfolio content">
      <motion.section id="about" className="ambient-section section-space relative px-4 md:px-8" {...sectionIn}>
        <div className="mx-auto max-w-6xl">
          <h2 className="mt-4 balance max-w-3xl fluid-title font-display italic text-text">Personal portfolio of <span className="gradient-word">design</span>, development, and digital craft.</h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-muted md:text-lg">I am Preston Kade, a multidisciplinary designer and developer creating polished digital products from concept to launch.</p>
        </div>
      </motion.section>

      <motion.section id="work" className="ambient-section section-space relative px-4 md:px-8" {...sectionIn}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-3xl md:text-5xl font-display italic text-text">Selected projects</h3>
            <div className="flex items-center gap-2">
              <button title="Grid view" aria-label="Grid view" onClick={() => setViewMode("grid")} className={`min-h-11 rounded-lg px-3 ${viewMode === "grid" ? "glass-medium text-text" : "glass-light text-muted"}`}><Grid2X2 className="h-4 w-4" /></button>
              <button title="List view" aria-label="List view" onClick={() => setViewMode("list")} className={`min-h-11 rounded-lg px-3 ${viewMode === "list" ? "glass-medium text-text" : "glass-light text-muted"}`}><List className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(([cat, count]) => (
              <button key={cat} onClick={() => toggleCat(cat)} className={`min-h-11 rounded-full px-4 text-xs uppercase tracking-[0.16em] border ${selectedCats.includes(cat) ? "border-white/30 text-text bg-white/5" : "border-stroke/60 text-muted"}`}>
                {cat} ({count})
              </button>
            ))}
            <button onClick={() => setSelectedCats([])} className="min-h-11 rounded-full px-4 text-xs border border-stroke/60 text-muted">Clear all</button>
          </div>

          {loading && <div className="grid gap-4 md:grid-cols-2"><div className="skeleton-shimmer h-40 rounded-xl" /><div className="skeleton-shimmer h-40 rounded-xl" /></div>}
          {error && <div className="glass-light rounded-xl p-4 text-sm text-rose-300">{error} <button onClick={() => setError(null)} className="underline ml-2">Dismiss</button></div>}
          {!loading && !filtered.length && <div className="glass-light rounded-xl p-4 text-sm text-muted">No projects match these filters.</div>}

          {!loading && !!filtered.length && (
            <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2" : "grid gap-4"}>
              {filtered.map((card) => (
                <motion.article key={card.id} layout className="tilt-card-3d liq-glass-refract liquid-glass-layer glass-drift glass-medium rounded-[1.15rem] p-6" whileHover={{ y: -4 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${statusClass[card.status]}`}>{card.status}</span>
                    <span className="text-xs text-muted">{card.readTime} read</span>
                  </div>
                  <h4 className="mt-4 text-2xl font-display italic text-text">{card.title}</h4>
                  <p className="mt-2 text-sm text-muted leading-relaxed max-w-prose">{card.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-stroke/60 pt-4">
                    <span className="text-sm text-text">{card.stats}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={noopAction} className="micro-pop min-h-11 rounded-full px-3 text-xs glass-light">Quick action</button>
                      <button aria-label="Compare project" onClick={noopAction} className="micro-pop min-h-11 rounded-full px-3 text-xs glass-light">Compare</button>
                      <button className="micro-pop min-h-11 rounded-full px-3 text-xs glass-light" aria-label="Open project" title="Open project"><ArrowUpRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section id="skills" className="ambient-section section-space relative px-4 md:px-8" {...sectionIn}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full glass-light px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                <Sparkles className="h-3.5 w-3.5" /> Capabilities
              </p>
              <h3 className="mt-3 text-3xl md:text-5xl font-display italic text-text">What I bring to a project</h3>
              <p className="mt-3 max-w-prose text-sm md:text-base text-muted">Design precision, engineering reliability, and product judgment in one workflow.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {visibleGroups.map((group) => (
              <motion.article key={group.title} className="glass-medium liquid-glass-layer glass-drift rounded-2xl p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                <h4 className="text-xl font-display italic text-text">{group.title}</h4>
                <p className="mt-1 text-sm text-muted">{group.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-stroke/60 bg-black/15 px-3 py-1.5 text-xs text-text">{item}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 glass-light liquid-glass-layer rounded-2xl p-5 anim-breathe">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Strength profile</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {strengths.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted">
                    <span>{s.label}</span>
                    <span>{s.score}%</span>
                  </div>
                  <div className="strength-track">
                    <div className="strength-fill" style={{ width: `${s.score}%` }}>
                      <span className="strength-flow strength-flow-a" />
                      <span className="strength-flow strength-flow-b" />
                      <span className="strength-flow strength-flow-c" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ticker glass-light mt-8 rounded-2xl border border-stroke/40 px-4 py-4 anim-bob">
            <div className="ticker-lane font-accent text-xs uppercase tracking-[0.22em] text-muted">
              <div className="ticker-track">
                {tools.map((tool, i) => <span key={`a-${tool}-${i}`} className="rounded-full border border-stroke/50 px-4 py-1.5 sheen-surface">{tool}</span>)}
              </div>
              <div className="ticker-track" aria-hidden="true">
                {tools.map((tool, i) => <span key={`b-${tool}-${i}`} className="rounded-full border border-stroke/50 px-4 py-1.5 sheen-surface">{tool}</span>)}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="contact" className="ambient-section section-space relative px-4 md:px-8" {...sectionIn}>
        <div className="mesh-bg liq-glass-refract frost-velocity glass-panel mx-auto max-w-6xl rounded-[2rem] p-8 md:p-12">
          <h3 className="text-3xl md:text-5xl font-display italic">Contact</h3>
          <p className="mt-3 text-sm text-muted">2 min read · choose your preferred channel.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <button onClick={copyEmail} className="min-h-11 glass-light rounded-xl px-4 py-3 text-center">Email: hello@prestonkade.dev {emailCopied ? "(copied)" : ""} <Copy className="inline h-3.5 w-3.5 ml-2" /></button>
            <a href="tel:+13125550147" className="min-h-11 glass-light rounded-xl px-4 py-3 text-center">Call</a>
            <a href="mailto:hello@prestonkade.dev" className="min-h-11 glass-light rounded-xl px-4 py-3 text-center">Email app</a>
            <button className="min-h-11 btn-sheen liq-glass-refract liquid-glass-layer glass-medium rounded-xl border border-white/20 text-text px-4 py-3 text-center">Send message</button>
          </div>
          <p className="mt-4 text-xs text-muted">Helper: include timeline, budget range, and outcomes.</p>
        </div>
      </motion.section>

      <footer id="footer" className="ambient-section px-4 pb-8 md:px-8">
        <div className="mx-auto w-full max-w-6xl border-t border-stroke/40 pt-5">
          <p className="text-center text-2xl tracking-[0.16em] text-text md:text-3xl">Y7XIFIED</p>
          <p className="mt-1 text-center text-xs uppercase tracking-[0.16em] text-muted">© 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default ExtendedSections;
