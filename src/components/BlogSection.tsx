import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const articles = [
  {
    title: "The Future of Interface Design",
    excerpt: "Exploring how AI and spatial computing are reshaping the way we think about digital interfaces.",
    date: "Feb 2026",
    readTime: "8 min read",
    category: "Design",
  },
  {
    title: "Building Performant React Apps",
    excerpt: "A deep dive into optimization patterns, server components, and the evolving React ecosystem.",
    date: "Jan 2026",
    readTime: "12 min read",
    category: "Engineering",
  },
  {
    title: "Design Systems at Scale",
    excerpt: "Lessons learned building and maintaining design systems across multiple product teams.",
    date: "Dec 2025",
    readTime: "6 min read",
    category: "Design",
  },
  {
    title: "Creative Coding with WebGL",
    excerpt: "Using shaders and generative algorithms to create immersive web experiences.",
    date: "Nov 2025",
    readTime: "10 min read",
    category: "Creative",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Journal</p>
              <h2 className="text-4xl md:text-5xl font-display italic text-text">
                Latest thoughts
              </h2>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-sm text-muted hover:text-text transition-colors">
              View all <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="space-y-0 divide-y divide-stroke/30">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.08}>
              <article className="group py-8 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-muted uppercase tracking-wider">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stroke" />
                    <span className="text-xs text-muted">{article.date}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-display italic text-text group-hover:text-text/80 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted mt-2 max-w-lg">{article.excerpt}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted">{article.readTime}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
