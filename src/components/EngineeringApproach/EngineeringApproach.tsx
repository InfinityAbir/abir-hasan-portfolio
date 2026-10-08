import { motion } from "framer-motion";
import { Search, DraftingCompass, Hammer, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Problem first",
    text: "Understand the problem, the users, the constraints, and the desired outcome before choosing any technology.",
  },
  {
    icon: DraftingCompass,
    title: "Architecture",
    text: "Choose structure from system requirements rather than trends — separation of concerns, clear boundaries, honest trade-offs.",
  },
  {
    icon: Hammer,
    title: "Build",
    text: "Focus on maintainability: reusable components, clean APIs, solid auth, data integrity, and practical UX.",
  },
  {
    icon: BadgeCheck,
    title: "Validate",
    text: "Test functionality, review edge cases, and check the result against the original problem — not the demo script.",
  },
];

export const EngineeringApproach = () => {
  return (
    <section id="approach" aria-labelledby="approach-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-[2rem] sm:rounded-[3rem] border border-foreground/10 p-5 sm:p-10 md:p-12 relative overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/15 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <h2 id="approach-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 text-center md:text-left">
            How I <span className="text-gradient-primary">approach engineering</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8 sm:mb-10 text-center md:text-left">
            Technology supports the story — it is never the story. Every project follows the same loop:
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 list-none m-0 p-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="rounded-3xl border border-border/60 bg-card/60 p-5 flex flex-col gap-3 min-w-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center" aria-hidden="true">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  );
};
