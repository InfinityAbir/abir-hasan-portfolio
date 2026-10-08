import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, ArrowUpRight, X, FileText, FlaskConical } from "lucide-react";
import { featuredProjects, moreProjects, type Project } from "../../data/projects";
import {
  OPEN_PROJECT_EVENT,
  requestOpenPublication,
  scrollToSectionId,
} from "../ResearchSection/ResearchSection";

type ChipVariant = "python" | "csharp" | "js" | "kotlin" | "default";

const chipStyles: Record<ChipVariant, string> = {
  python: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  csharp: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  js: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  kotlin: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  default: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function chipVariant(tag: string): ChipVariant {
  const t = tag.toLowerCase();
  if (t.includes("python") || t.includes("django") || t.includes("flask") || t.includes("pandas") || t.includes("scikit")) return "python";
  if (t.includes("c#") || t.includes("asp.net") || t.includes(".net")) return "csharp";
  if (t.includes("react") || t.includes("angular") || t.includes("javascript") || t.includes("node")) return "js";
  if (t.includes("kotlin")) return "kotlin";
  return "default";
}

function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
      {project.links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${link.label} for ${project.title} (opens in new tab)`}
          className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
            link.label === "Live Demo"
              ? "text-emerald-400 hover:text-emerald-300 hover:gap-2.5"
              : "text-cyan-400 hover:text-cyan-300 hover:gap-2.5"
          }`}
        >
          {link.label === "Live Demo" ? (
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          {link.label}
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function GlowOverlay({ featured }: { featured?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
      style={{
        background: featured
          ? "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(79,70,229,0.09) 0%, transparent 60%)"
          : "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.08) 0%, transparent 60%)",
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    />
  );
}

function StoryLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">
      {children}
    </p>
  );
}

function FeaturedCard({ project, index, onDetails }: { project: Project; index: number; onDetails: (p: Project) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      aria-labelledby={`project-title-${project.id}`}
      className="group relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] border p-5 sm:p-7 bg-card/80 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden min-w-0 border-indigo-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-indigo-400/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(79,70,229,0.15)]"
    >
      <GlowOverlay featured />

      <div className="absolute top-5 right-5 z-10 flex gap-2">
        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30">
          FEATURED
        </span>
      </div>

      <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase mb-3 pr-24 break-words">
        {project.tagline}
      </span>

      <h3 id={`project-title-${project.id}`} className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight mb-1.5 leading-snug break-words">
        {project.title}
      </h3>
      <p className="mb-4">
        <span className="inline-block px-2 py-0.5 rounded-full border border-border/70 bg-foreground/[0.04] text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">
          {project.status}
        </span>
      </p>

      <div className="space-y-4 mb-5 flex-1">
        <div>
          <StoryLabel>The problem</StoryLabel>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <StoryLabel>The solution</StoryLabel>
          <p className="text-sm text-foreground/90 leading-relaxed">{project.solution}</p>
        </div>
        <div className="border-t border-border/60 pt-4">
          <StoryLabel>Engineering</StoryLabel>
          <ul className="space-y-1.5">
            {project.engineeringHighlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[13px] text-foreground/85 leading-relaxed">
                <span className="mt-[7px] w-1 h-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border/60 pt-4">
          <StoryLabel>Result</StoryLabel>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.outcome}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${chipStyles[chipVariant(tag)]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-auto">
        <button
          type="button"
          onClick={() => onDetails(project)}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-primary hover:gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          View Details
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </button>
        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      aria-labelledby={`project-title-${project.id}`}
      className="group relative flex flex-col rounded-[1.5rem] border p-5 sm:p-6 bg-card/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden min-w-0 border-border/70 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_30px_rgba(34,211,238,0.08)]"
    >
      <GlowOverlay />
      <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase mb-2 break-words">
        {project.tagline}
      </span>
      <h3 id={`project-title-${project.id}`} className="text-base sm:text-lg font-extrabold text-foreground tracking-tight mb-2 leading-snug break-words">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {project.solution}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${chipStyles[chipVariant(tag)]}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <ProjectLinks project={project} className="mt-auto" />
    </motion.article>
  );
}

function ProjectDetailDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const openRelatedResearch = () => {
    if (!project.relatedResearch) return;
    const id = project.relatedResearch.id;
    onClose();
    window.setTimeout(() => {
      scrollToSectionId("research");
      window.setTimeout(() => requestOpenPublication(id), 500);
    }, 60);
  };

  const allTech = project.detail?.extraTechnologies
    ? [...project.technologies, ...project.detail.extraTechnologies]
    : project.technologies;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detail-title-${project.id}`}
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-[1.5rem] sm:rounded-[2rem] border border-border bg-card p-6 sm:p-9 shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={`Close details for ${project.title}`}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full glass-panel border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase break-words">
          {project.tagline}
        </span>
        <h3 id={`detail-title-${project.id}`} className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mt-2 mb-2 pr-10 break-words">
          {project.title}
        </h3>
        <p className="mb-6">
          <span className="inline-block px-2 py-0.5 rounded-full border border-border/70 bg-foreground/[0.04] text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">
            {project.status}
          </span>
        </p>

        <dl className="space-y-5">
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Problem</dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">{project.problem}</dd>
          </div>
          {project.detail?.goal && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Goal</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{project.detail.goal}</dd>
            </div>
          )}
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Solution</dt>
            <dd className="text-sm text-foreground/90 leading-relaxed">{project.solution}</dd>
          </div>
          {project.detail?.architecture && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Architecture / Approach</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{project.detail.architecture}</dd>
            </div>
          )}
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Key engineering challenges</dt>
            <dd>
              <ul className="space-y-1.5">
                {(project.detail?.challenges ?? project.engineeringHighlights).map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Result</dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">{project.outcome}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Technologies</dt>
            <dd className="flex flex-wrap gap-2">
              {allTech.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${chipStyles[chipVariant(tag)]}`}
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-7 pt-5 border-t border-border/60">
          <ProjectLinks project={project} />
        </div>

        {project.relatedResearch && (
          <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3.5">
            <p className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-emerald-400/90 mb-1.5">
              Related research
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed mb-1 break-words">
              {project.relatedResearch.title}
            </p>
            <p className="text-xs font-mono text-muted-foreground mb-2.5">
              {project.relatedResearch.statusLine}
            </p>
            <button
              type="button"
              onClick={openRelatedResearch}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-emerald-400 hover:text-emerald-300 hover:gap-2.5 transition-all duration-200 cursor-pointer"
            >
              <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
              View Research
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const openDetails = useCallback((p: Project) => setActiveProject(p), []);
  const closeDetails = useCallback(() => setActiveProject(null), []);

  useEffect(() => {
    const all = [...featuredProjects, ...moreProjects];
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = all.find((p) => p.id === id);
      if (found) setActiveProject(found);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, handler);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, handler);
  }, []);

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-10 md:mb-14 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Selected <span className="text-gradient-primary">Work</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          Software I built to solve practical problems — across healthcare, recruitment,
          public-sector systems, and developer tooling. Each project starts from the
          problem, not the tech stack.
        </p>
      </motion.div>

      <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 text-center md:text-left">
        Featured work — problems, approaches &amp; outcomes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {featuredProjects.map((project, i) => (
          <FeaturedCard key={project.id} project={project} index={i} onDetails={openDetails} />
        ))}
      </div>

      <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 text-center md:text-left">
        More projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moreProjects.map((project, i) => (
          <CompactCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectDetailDialog project={activeProject} onClose={closeDetails} />
        )}
      </AnimatePresence>
    </section>
  );
};
