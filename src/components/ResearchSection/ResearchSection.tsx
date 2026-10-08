import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, FileText, Globe, FlaskConical, FolderKanban } from "lucide-react";
import {
  featuredPublication,
  manuscriptPublications,
  STATUS_META,
  type Publication,
} from "../../data/publications";

export const OPEN_PUBLICATION_EVENT = "open-publication";
export const OPEN_PROJECT_EVENT = "open-project";

export function requestOpenPublication(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PUBLICATION_EVENT, { detail: id }));
}

export function requestOpenProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: id }));
}

export function scrollToSectionId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function StatusBadge({ status }: { status: Publication["status"] }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border ${meta.badge}`}
    >
      {meta.label}
    </span>
  );
}

function AreaTags({ areas }: { areas: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {areas.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 rounded-full border border-border/60 bg-foreground/[0.04] text-[11px] font-mono text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function GlowOverlay({ tone }: { tone: "emerald" | "cyan" }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
      style={{
        background:
          tone === "emerald"
            ? "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(52,211,153,0.09) 0%, transparent 60%)"
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

function DetailsButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-primary hover:gap-2.5 transition-all duration-200 cursor-pointer"
    >
      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
      {label}
      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
    </button>
  );
}

function FeaturedPublicationCard({ onDetails }: { onDetails: (p: Publication) => void }) {
  const p = featuredPublication;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      aria-labelledby={`pub-title-${p.id}`}
      className="group relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] border p-5 sm:p-8 bg-card/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden min-w-0 border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-emerald-400/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(52,211,153,0.12)] mb-6"
    >
      <GlowOverlay tone="emerald" />

      <div className="absolute top-5 right-5 z-10">
        <StatusBadge status={p.status} />
      </div>

      <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase mb-3 pr-28 break-words">
        Featured publication · {p.statusLine}
      </span>

      <h3 id={`pub-title-${p.id}`} className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight mb-3 leading-snug break-words max-w-3xl">
        {p.title}
      </h3>

      <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-5 break-words">
        {p.venue} · {p.date} · {p.location}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">
            Research problem
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.problem}</p>
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">
            What I did &amp; found
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">{p.summary}</p>
        </div>
      </div>

      <AreaTags areas={p.researchAreas} />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-6">
        <DetailsButton onClick={() => onDetails(p)} label="Research Details" />
        {p.links?.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${link.label} for ${p.title} (opens in new tab)`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-emerald-400 hover:text-emerald-300 hover:gap-2.5 transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            {link.label}
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        ))}
      </div>
    </motion.article>
  );
}

function ManuscriptCard({ pub, index, onDetails }: { pub: Publication; index: number; onDetails: (p: Publication) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      aria-labelledby={`pub-title-${pub.id}`}
      className="group relative flex flex-col rounded-[1.5rem] border p-5 sm:p-6 bg-card/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden min-w-0 border-border/70 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_30px_rgba(34,211,238,0.08)]"
    >
      <GlowOverlay tone="cyan" />
      <div className="mb-3">
        <StatusBadge status={pub.status} />
      </div>
      <h3 id={`pub-title-${pub.id}`} className="text-base sm:text-lg font-extrabold text-foreground tracking-tight mb-2 leading-snug break-words">
        {pub.title}
      </h3>
      {pub.author && (
        <p className="text-xs font-mono text-muted-foreground mb-2">Abir Hasan</p>
      )}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pub.problem}</p>
      <p className="text-sm text-foreground/85 leading-relaxed mb-4 flex-1">{pub.summary}</p>
      <div className="mb-5">
        <AreaTags areas={pub.researchAreas.slice(0, 4)} />
      </div>
      <div className="mt-auto">
        <DetailsButton onClick={() => onDetails(pub)} label="View Details" />
      </div>
    </motion.article>
  );
}

function PublicationDialog({ pub, onClose }: { pub: Publication; onClose: () => void }) {
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

  const openRelatedProject = () => {
    if (!pub.relatedProjectId) return;
    onClose();
    const id = pub.relatedProjectId;
    window.setTimeout(() => {
      scrollToSectionId("projects");
      window.setTimeout(() => requestOpenProject(id), 500);
    }, 60);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="presentation"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`pub-detail-${pub.id}`}
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-[1.5rem] sm:rounded-[2rem] border border-border bg-card p-6 sm:p-9 shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={`Close details for ${pub.title}`}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full glass-panel border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="mb-2 pr-10">
          <StatusBadge status={pub.status} />
        </div>
        <h3 id={`pub-detail-${pub.id}`} className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mt-2 mb-2 pr-10 break-words">
          {pub.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-6">
          {pub.statusLine}
          {pub.author ? ` · ${pub.author}` : ""}
        </p>

        <dl className="space-y-5">
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Research problem</dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">{pub.problem}</dd>
          </div>
          {pub.detail?.question && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Research question</dt>
              <dd className="text-sm text-foreground/90 leading-relaxed">{pub.detail.question}</dd>
            </div>
          )}
          {pub.detail?.methodology && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Methodology</dt>
              <dd>
                <ul className="space-y-1.5">
                  {pub.detail.methodology.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {pub.detail?.findings && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Key findings</dt>
              <dd>
                <ul className="space-y-1.5">
                  {pub.detail.findings.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {pub.detail?.note && (
            <div className="rounded-xl border border-border/60 bg-foreground/[0.03] px-4 py-3">
              <dd className="text-[13px] text-muted-foreground leading-relaxed">{pub.detail.note}</dd>
            </div>
          )}
          <div>
            <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Research areas</dt>
            <dd><AreaTags areas={pub.researchAreas} /></dd>
          </div>
          {pub.venue && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Venue</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">
                {pub.venue}
                {pub.venueDetail ? ` (${pub.venueDetail})` : ""}
                {pub.date || pub.location ? (
                  <>
                    <br />
                    {[pub.date, pub.location].filter(Boolean).join(" · ")}
                  </>
                ) : null}
              </dd>
            </div>
          )}
          {pub.relatedProjectTitle && (
            <div>
              <dt className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-primary/90 mb-1.5">Related project</dt>
              <dd>
                <button
                  type="button"
                  onClick={openRelatedProject}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 hover:text-cyan-300 hover:gap-2.5 transition-all duration-200 cursor-pointer"
                >
                  <FolderKanban className="w-3.5 h-3.5" aria-hidden="true" />
                  {pub.relatedProjectTitle}
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </dd>
            </div>
          )}
        </dl>

        {pub.links && pub.links.length > 0 && (
          <div className="mt-7 pt-5 border-t border-border/60 flex flex-wrap gap-x-5 gap-y-3">
            {pub.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${link.label} (opens in new tab)`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-emerald-400 hover:text-emerald-300 hover:gap-2.5 transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                {link.label}
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export const ResearchSection = () => {
  const [activePub, setActivePub] = useState<Publication | null>(null);
  const openDetails = useCallback((p: Publication) => setActivePub(p), []);
  const closeDetails = useCallback(() => setActivePub(null), []);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found =
        featuredPublication.id === id
          ? featuredPublication
          : manuscriptPublications.find((p) => p.id === id);
      if (found) setActivePub(found);
    };
    window.addEventListener(OPEN_PUBLICATION_EVENT, handler);
    return () => window.removeEventListener(OPEN_PUBLICATION_EVENT, handler);
  }, []);

  return (
    <section id="research" aria-labelledby="research-heading" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-10 md:mb-12 text-center md:text-left"
      >
        <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
          <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center" aria-hidden="true">
            <FlaskConical className="w-5 h-5" />
          </span>
          <h2 id="research-heading" className="text-3xl md:text-5xl font-bold tracking-tight">
            Research <span className="text-gradient-primary">&amp; Publications</span>
          </h2>
        </div>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          Beyond shipping software, I investigate practical problems — designing experiments,
          evaluating technical trade-offs, and turning the results into research.
        </p>
      </motion.div>

      <FeaturedPublicationCard onDetails={openDetails} />

      <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 text-center md:text-left">
        Research manuscripts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {manuscriptPublications.map((pub, i) => (
          <ManuscriptCard key={pub.id} pub={pub} index={i} onDetails={openDetails} />
        ))}
      </div>

      <AnimatePresence>
        {activePub && <PublicationDialog pub={activePub} onClose={closeDetails} />}
      </AnimatePresence>
    </section>
  );
};
