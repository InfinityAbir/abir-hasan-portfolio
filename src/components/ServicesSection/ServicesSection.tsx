import { motion } from "framer-motion";
import { Code2, MonitorSmartphone, Database, Wrench, Layers, BrainCircuit } from "lucide-react";

const skillGroups = [
  {
    icon: Code2,
    title: "Languages",
    tags: ["C", "C++", "Python", "C#", "Kotlin", "R", "Solidity", "JavaScript"],
  },
  {
    icon: MonitorSmartphone,
    title: "Web & Mobile",
    tags: ["HTML", "CSS", "Django", "ASP.NET Core MVC", "Angular", "React", "Node.js", "Jetpack Compose", "ethers.js"],
  },
  {
    icon: Database,
    title: "Database",
    tags: ["SQL Server", "PostgreSQL", "pgvector", "SQLite", "Entity Framework Core"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    tags: ["Git / GitHub", "Visual Studio", "VS Code", "Keycloak", "QuestPDF", "Hardhat", "MetaMask", "Kali Linux"],
  },
  {
    icon: Layers,
    title: "Architecture & Concepts",
    tags: ["OOP · SOLID", "Clean Architecture", "CQRS / MediatR", "Repository / UoW", "REST API Design", "Role-Based Auth", "Blockchain"],
  },
  {
    icon: BrainCircuit,
    title: "AI / ML & Interests",
    tags: ["Groq API", "Semantic Search / RAG", "Scikit-learn", "Pandas", "LLM APIs", "Cybersecurity"],
  },
];

export const ServicesSection = () => {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary">
          Technical Skills
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A deliberate toolbox spanning languages, frameworks, databases, and architecture —
          tuned for shipping production-grade full-stack and blockchain systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="group h-full p-7 rounded-[2rem] border border-border/80 bg-card/80 relative overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/25 text-cyan-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground tracking-tight">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-foreground/[0.04] border border-border/60 text-sm font-medium text-foreground/90 transition-all duration-200 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/[0.06] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};