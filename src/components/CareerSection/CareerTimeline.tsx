import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    year: "2026",
    role: "Software Engineering Intern",
    place: "MILLENNIUM INFORMATION SOLUTION LTD. · JUN – SEP 2026",
    current: true,
    icon: <Briefcase className="w-4 h-4" />,
    description: "Completed a full-stack Recruitment Management System (ASP.NET Core Web API + Angular) built on Clean Architecture, CQRS with MediatR, and the Repository/Unit-of-Work pattern, working across candidate applications, shortlisting, hiring pipelines, and interview management.",
    details: [
      "Implemented Keycloak-based authentication and role-based access control (RBAC) across HR, Admin, and Candidate portals, and built RESTful APIs consumed by Angular front-end components.",
      "Worked with PostgreSQL and Entity Framework Core for schema design and migrations, used QuestPDF for automated document generation, and collaborated with senior developers through code review and Agile, Git-based delivery.",
    ],
  },
  {
    year: "2023",
    role: "Mentor — Programming with C",
    place: "DEPT. OF CSE, IUBAT · DHAKA",
    current: false,
    icon: <GraduationCap className="w-4 h-4" />,
    description:
      "Conducted lab sessions on C programming fundamentals, debugging techniques, and logic development. Helped junior students strengthen programming concepts and problem-solving confidence.",
    details: [],
  },
];

export const CareerTimeline = () => {
  return (
    <section id="career" className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary">
          Experience
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          From mentoring junior programmers to building enterprise recruitment systems in production.
        </p>
      </motion.div>

      <div className="relative pl-8 md:pl-10 border-l-2 border-cyan-400/20 ml-3 space-y-10">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <span
              className={`absolute -left-[43px] md:-left-[51px] top-7 w-3.5 h-3.5 rounded-full border-2 border-background shadow-[0_0_10px_rgba(34,211,238,0.6)] ${
                exp.current ? "bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.7)]" : "bg-cyan-400"
              }`}
            />

            <div
              className={`glass-panel rounded-[2rem] border p-8 transition-all duration-300 hover:translate-x-1 ${
                exp.current
                  ? "border-emerald-500/25 hover:border-emerald-500/40"
                  : "border-foreground/10 hover:border-cyan-400/40"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                  {exp.year}
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                  {exp.role}
                </h3>
                {exp.current && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                    CURRENT
                  </span>
                )}
              </div>

              <p className="text-xs font-mono tracking-wider text-muted-foreground mb-4">{exp.place}</p>

              <p className="text-foreground/90 leading-relaxed mb-3">{exp.description}</p>

              {exp.details.length > 0 && (
                <ul className="space-y-2.5">
                  {exp.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};