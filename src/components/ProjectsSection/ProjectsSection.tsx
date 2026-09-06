import { motion } from "framer-motion";
import { Github, Globe, ArrowUpRight } from "lucide-react";

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

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  featured?: boolean;
  links: ProjectLink[];
}

const projects: Project[] = [
  {
    id: "0",
    title: "Blockchain Pension Management System",
    tagline: "PROJECT_01 · UNDERGRADUATE THESIS",
    description:
      "Decentralized pension platform using Solidity smart contracts for transparent, immutable, tamper-resistant contribution and withdrawal records. Multi-contract system on Hardhat/Ethereum with on-chain verification and MetaMask wallet integration.",
    stack: ["Solidity", "Hardhat", "React", "Node.js", "MetaMask"],
    featured: true,
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Blockchain-Pension-System" }],
  },
  {
    id: "1",
    title: "TeleMed — Telemedicine Consultation & Booking",
    tagline: "PROJECT_02",
    description:
      "Web-based telemedicine platform with Admin, Doctor & Patient dashboards. Appointment booking, secure online payments, digital receipts, and prescription downloads with ASP.NET Core Identity role-based auth.",
    stack: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework", "Bootstrap"],
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Telemedicine-Consultation-Booking-System" },
      { label: "Live Demo", href: "http://telemedicine-abir.runasp.net/" },
    ],
  },
  {
    id: "2",
    title: "Omnichannel — Unified Customer Inbox SaaS",
    tagline: "PROJECT_03",
    description:
      "One inbox for every customer conversation — WhatsApp, Instagram, Messenger, and website chat merged into a single thread, paired with an AI assistant that answers on approved business knowledge and hands off to a human the moment a conversation needs one.",
    stack: ["ASP.NET Core (.NET 10)", "Angular", "EF Core", "PostgreSQL"],
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/OMNICHANNEL" },
      { label: "Live Demo", href: "https://omnichannel-1t6b.onrender.com/login" },
    ],
  },
  {
    id: "3",
    title: "Secure Integration & Secrets Management Platform",
    tagline: "PROJECT_04",
    description:
      "Reusable .NET module for wiring external services into any app through an admin UI — zero hard-coded credentials. AES-256-GCM envelope encryption with key rotation, SSRF-safe outbound requests, and an audit trail scrubbed of secret values.",
    stack: ["ASP.NET Core (.NET 10)", "C#", "AES-256-GCM", "SQLite"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Secure-Integration-Secrets-Management-Platform" }],
  },
  {
    id: "4",
    title: "StoryForge — AI Narrative Engine",
    tagline: "PROJECT_05",
    description:
      "Extracts a story's narrative DNA — genre, themes, tone, archetypes, conflict, emotional arc — then generates an entirely new, independent story from that foundation. Stateless architecture with rate limiting and safety guardrails; supports English and Bangla.",
    stack: ["Angular 21", "ASP.NET Core (.NET 10)", "Groq API"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/StoryForge" },
      { label: "Live Demo", href: "https://storyforgefrontend.onrender.com/" },
    ],
  },
  {
    id: "5",
    title: "Personal AI Search Engine",
    tagline: "PROJECT_06",
    description:
      "Self-hosted knowledge base that indexes personal documents, webpages, and bookmarks with keyword, semantic, and hybrid search. Local ONNX embeddings feed a PostgreSQL + pgvector store, and a pluggable AI assistant answers with source citations.",
    stack: ["ASP.NET Core (.NET 10)", "Angular 21", "PostgreSQL + pgvector", "ONNX"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Personal-AI-Search-Engine" }],
  },
  {
    id: "6",
    title: "Blood Network Bangladesh",
    tagline: "PROJECT_07",
    description:
      "Real-time blood donor matching platform — web (Angular) and Android (Kotlin) clients on a shared ASP.NET Core backend. Matches emergency requests to compatible, nearby, verified donors with SignalR/FCM alerts and a privacy-first design.",
    stack: ["ASP.NET Core (.NET 10)", "Angular 21", "Kotlin", "PostgreSQL", "SignalR"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Blood-Network-Bangladesh" },
      { label: "Live Demo", href: "https://blood-network-bangladesh-frontend.onrender.com/" },
    ],
  },
  {
    id: "7",
    title: "Ma Medicine Store — Pharmacy Management",
    tagline: "PROJECT_08",
    description:
      "Full-stack online pharmacy system with Admin, Pharmacist & Customer roles behind secure authentication. Real-time inventory and order tracking across the full purchase-to-fulfillment flow, plus low-stock alerts.",
    stack: ["Python", "Django", "SQLite", "Bootstrap"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Pharmacy-Management-System-by-Django" },
      { label: "Live Demo", href: "https://maa-medicine-store.onrender.com/" },
    ],
  },
  {
    id: "8",
    title: "AI Loan Prediction System",
    tagline: "PROJECT_09",
    description:
      "Expert system for loan approval prediction combining rule-based reasoning, Bayesian inference, and machine learning. Feature-engineered preprocessing pipelines feed a Flask interface for real-time predictions.",
    stack: ["Python", "Flask", "Pandas", "Scikit-learn"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Ai-Loan-Prediction-System" }],
  },
  {
    id: "9",
    title: "Intelligent Document Processing System",
    tagline: "PROJECT_10",
    description:
      "AI-ready pipeline that converts PDF, DOCX, XLSX and more into structured Markdown optimized for LLM usage — with token-reduction and cost-saving analytics, replacing manual document review.",
    stack: ["JavaScript", "OCR", "AI Pipelines"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Markdown-AI-Tool" },
      { label: "Live Demo", href: "https://doc-to-markdown-ui.onrender.com" },
    ],
  },
  {
    id: "10",
    title: "Aduri AI Agent",
    tagline: "PROJECT_11",
    description:
      "Bilingual (Bangla & English) AI assistant with text and voice interaction, chat history, and a clean ChatGPT-like interface — automates task execution via LLM API integrations.",
    stack: ["JavaScript", "Node.js", "LLM APIs"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Aduri-AI-Agent" }],
  },
  {
    id: "11",
    title: "Ma Mamata Variety Store — POS System",
    tagline: "PROJECT_12",
    description:
      "Point-of-sale system for small retail stores. Manages daily transactions, product categories, and customer data, with automated invoice generation and sales tracking for non-technical staff.",
    stack: ["C#", ".NET", "SQL Server", "Crystal Reports"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/E-commerce-Project-by-Dot-Net-MVC" },
      { label: "Live Demo", href: "http://maamamatavarietystore.runasp.net/" },
    ],
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Selected <span className="text-gradient-primary">Work</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          Twelve shipped projects — from enterprise recruitment platforms and AI search engines to
          blockchain pensions and real-time donor networks.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
            className={`group relative flex flex-col rounded-[2rem] border p-7 bg-card/80 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
              project.featured
                ? "border-indigo-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-indigo-400/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(79,70,229,0.15)]"
                : "border-border/70 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_30px_rgba(34,211,238,0.08)]"
            }`}
          >
            {/* Mouse-follow glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  project.featured
                    ? "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(79,70,229,0.09) 0%, transparent 60%)"
                    : "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.08) 0%, transparent 60%)",
              }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
              }}
            />

            {project.featured && (
              <span className="absolute top-5 right-5 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/30">
                FEATURED
              </span>
            )}

            <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
              {project.tagline}
            </span>

            <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-3 leading-snug">
              {project.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${chipStyles[chipVariant(tag)]}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-5 mt-auto">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                    link.label === "Live Demo"
                      ? "text-emerald-400 hover:text-emerald-300 hover:gap-2.5"
                      : "text-cyan-400 hover:text-cyan-300 hover:gap-2.5"
                  }`}
                >
                  {link.label === "Live Demo" ? (
                    <Globe className="w-3.5 h-3.5" />
                  ) : (
                    <Github className="w-3.5 h-3.5" />
                  )}
                  {link.label}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};