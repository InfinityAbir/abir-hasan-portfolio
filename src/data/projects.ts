export type ProjectStatus =
  | "Research Prototype"
  | "Internship Project"
  | "Live Demo"
  | "Personal Project"
  | "Academic Project"
  | "Developer Tool";

export interface ProjectLink {
  label: "GitHub" | "Live Demo";
  href: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  featured: boolean;
  /** 1–2 concise sentences: what real-world problem existed. */
  problem: string;
  /** 1–2 concise sentences: what was built to address it. */
  solution: string;
  /** 2–4 short bullets: technical challenge / decision / implementation. */
  engineeringHighlights: string[];
  /** 1 concise sentence: what was achieved. No invented metrics. */
  outcome: string;
  /** 4–6 primary technologies shown on the card. */
  technologies: string[];
  /** Shown only inside the detail view. */
  detail?: {
    goal?: string;
    architecture?: string;
    challenges?: string[];
    extraTechnologies?: string[];
  };
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "blockchain-pension",
    title: "Blockchain Pension Management System",
    tagline: "PROJECT_01 · UNDERGRADUATE THESIS",
    status: "Research Prototype",
    featured: true,
    problem:
      "Public pension systems depend on centralized records that are hard to audit, leaving contribution and payout history vulnerable to tampering and trust gaps.",
    solution:
      "A research prototype exploring Ethereum smart contracts and decentralized storage for transparent, tamper-resistant pension record-keeping.",
    engineeringHighlights: [
      "Multi-contract Solidity system for contributions and withdrawals",
      "On-chain verification with MetaMask wallet integration",
      "Feasibility and cost evaluation, not just a working demo",
    ],
    outcome:
      "A working prototype plus a thesis study evaluating whether blockchain pension infrastructure is technically and economically practical.",
    technologies: ["Solidity", "Hardhat", "React", "Node.js", "MetaMask"],
    detail: {
      goal: "Answer whether blockchain and decentralized storage can provide a technically feasible architecture for a universal pension scheme while remaining economically practical.",
      architecture:
        "Hardhat/Ethereum development setup with a multi-contract Solidity system, a React front end, and MetaMask for wallet-based identity and transaction signing.",
      challenges: [
        "Modeling pension contribution and withdrawal rules as auditable on-chain state transitions.",
        "Keeping transaction costs realistic — evaluating gas cost against practical deployment constraints.",
        "Separating what the prototype proves from what would be needed for production use.",
      ],
      extraTechnologies: ["Ethereum", "ethers.js"],
    },
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Blockchain-Pension-System" }],
  },
  {
    id: "recruitment-platform",
    title: "Recruitment Management System",
    tagline: "PROJECT_02 · INTERNSHIP",
    status: "Internship Project",
    featured: true,
    problem:
      "Hiring workflows split across disconnected steps — job postings, applications, shortlisting, interviews, and documents — slow down recruiters and candidates alike.",
    solution:
      "A single full-stack platform covering the hiring lifecycle, with separate HR, Admin, and Candidate portals behind role-based access control.",
    engineeringHighlights: [
      "Clean Architecture with CQRS/MediatR and Repository + Unit-of-Work",
      "Keycloak authentication with RBAC across three portals",
      "Automated document generation with QuestPDF",
    ],
    outcome:
      "A deployed, demoable system built with senior-developer code review in an Agile, Git-based workflow — including real lessons from Keycloak startup time and database persistence constraints.",
    technologies: ["ASP.NET Core Web API", "Angular", "PostgreSQL", "EF Core", "Keycloak", "QuestPDF"],
    detail: {
      goal: "Bring postings, applications, shortlisting, hiring pipelines, interviews, and document generation into one coherent, deployable system.",
      architecture:
        "Angular front end consuming RESTful ASP.NET Core Web API endpoints, structured with Clean Architecture, CQRS via MediatR, PostgreSQL with EF Core migrations, and Keycloak as the external identity provider.",
      challenges: [
        "Coordinating multiple subsystems (pipeline, exams, interviews, payments, documents) without leaking concerns across boundaries.",
        "Enforcing role-based access consistently across HR, Admin, and Candidate portals.",
        "Real deployment constraints: Keycloak startup time, persistent database configuration, and memory limits on hosted infrastructure.",
      ],
    },
    links: [{ label: "Live Demo", href: "https://sylviang-frontend.onrender.com/" }],
  },
  {
    id: "blood-network",
    title: "Blood Network Bangladesh",
    tagline: "PROJECT_03 · SOCIAL IMPACT",
    status: "Live Demo",
    featured: true,
    problem:
      "People who urgently need blood depend on fragmented social networks and manual outreach to find a compatible donor in time.",
    solution:
      "A donor-discovery platform matching emergency requests to compatible, nearby, verified donors — with web and Android clients on one shared backend.",
    engineeringHighlights: [
      "Real-time matching with SignalR push and FCM alerts",
      "Shared ASP.NET Core backend serving Angular + Kotlin clients",
      "Privacy-first donor data design",
    ],
    outcome:
      "A live, working platform that shortens the path between someone searching for blood and a compatible donor.",
    technologies: ["ASP.NET Core", "Angular", "Kotlin", "PostgreSQL", "SignalR"],
    detail: {
      goal: "Make compatible-donor discovery fast and accessible instead of dependent on who you happen to know.",
      architecture:
        "Single ASP.NET Core backend with PostgreSQL, exposing APIs to an Angular web client and a native Kotlin Android client; SignalR channels and FCM deliver time-critical request alerts.",
      challenges: [
        "Matching on compatibility plus proximity under time pressure.",
        "Keeping donor contact information accessible for emergencies yet privacy-conscious.",
        "Serving two client platforms from one backend without duplicating domain logic.",
      ],
    },
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Blood-Network-Bangladesh" },
      { label: "Live Demo", href: "https://blood-network-bangladesh-frontend.onrender.com/" },
    ],
  },
  {
    id: "telemed",
    title: "TeleMed — Telemedicine Consultation & Booking",
    tagline: "PROJECT_04 · HEALTHCARE WORKFLOW",
    status: "Live Demo",
    featured: true,
    problem:
      "Manual clinic workflows mean repetitive data entry, inconsistent prescription formatting, and no reliable patient history when booking consultations.",
    solution:
      "A digital consultation and booking system built around real doctor workflows — appointments, payments, receipts, and downloadable prescriptions.",
    engineeringHighlights: [
      "Role-based Admin, Doctor, and Patient dashboards",
      "Structured prescription flow with history and digital receipts",
      "Secure payments wired into the booking lifecycle",
    ],
    outcome:
      "A deployed telemedicine platform that replaces paper-driven consultation steps with a consistent digital workflow.",
    technologies: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework", "Bootstrap"],
    detail: {
      goal: "Digitize the consultation loop — booking, payment, consultation, prescription — without forcing clinics to change how they work.",
      architecture:
        "ASP.NET Core MVC with Identity role-based auth, SQL Server via Entity Framework, and server-rendered dashboards per role plus payment and receipt handling.",
      challenges: [
        "Modeling multi-role workflows (admin, doctor, patient) with correct access boundaries.",
        "Keeping prescription output consistent and printable across consultations.",
        "Preserving patient history so repeat visits don't repeat data entry.",
      ],
    },
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Telemedicine-Consultation-Booking-System" },
      { label: "Live Demo", href: "http://telemedicine-abir.runasp.net/" },
    ],
  },
  {
    id: "ai-search",
    title: "Personal AI Search Engine",
    tagline: "PROJECT_05 · AI SYSTEMS",
    status: "Personal Project",
    featured: true,
    problem:
      "Personal knowledge scattered across documents, bookmarks, and saved pages is effectively unsearchable — keyword search misses meaning, and chatbots cite nothing.",
    solution:
      "A self-hosted knowledge base that indexes personal documents with keyword, semantic, and hybrid search, then answers with source citations.",
    engineeringHighlights: [
      "Hybrid retrieval: keyword + semantic over PostgreSQL + pgvector",
      "Local ONNX embeddings keep indexing self-hosted",
      "Pluggable assistant answers grounded in cited sources",
    ],
    outcome:
      "A working self-hosted search and Q&A system over a personal corpus, with retrieval quality as the core engineering focus.",
    technologies: ["ASP.NET Core", "Angular", "PostgreSQL + pgvector", "ONNX"],
    detail: {
      goal: "Make a personal document collection answer questions with evidence, not just retrieve files.",
      architecture:
        "Ingestion pipeline chunks and embeds documents with local ONNX models into pgvector; an ASP.NET Core API serves keyword, semantic, and hybrid retrieval to an Angular client with a pluggable LLM assistant layer.",
      challenges: [
        "Balancing keyword precision against semantic recall in hybrid ranking.",
        "Chunking and embedding documents so retrieved passages stay useful as LLM context.",
        "Keeping the whole pipeline self-hostable without a managed vector database.",
      ],
    },
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Personal-AI-Search-Engine" }],
  },
  {
    id: "omnichannel",
    title: "Omnichannel — Unified Customer Inbox SaaS",
    tagline: "PROJECT_06",
    status: "Personal Project",
    featured: false,
    problem: "Customer conversations scattered across WhatsApp, Instagram, Messenger, and web chat bury support teams in tab-switching.",
    solution: "One inbox merging every channel into a single thread, with an AI assistant answering from approved business knowledge and handing off to humans when needed.",
    engineeringHighlights: ["Multi-channel thread unification", "Grounded AI replies with human handoff"],
    outcome: "A working SaaS prototype of a unified support inbox.",
    technologies: ["ASP.NET Core (.NET 10)", "Angular", "EF Core", "PostgreSQL"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/OMNICHANNEL" },
      { label: "Live Demo", href: "https://omnichannel-1t6b.onrender.com/login" },
    ],
  },
  {
    id: "secrets-platform",
    title: "Secure Integration & Secrets Management Platform",
    tagline: "PROJECT_07",
    status: "Developer Tool",
    featured: false,
    problem: "Hard-coded credentials and ad-hoc HTTP wiring leak secrets and resist auditing.",
    solution: "A reusable .NET module for wiring external services through an admin UI — AES-256-GCM envelope encryption, key rotation, SSRF-safe requests, and a secret-scrubbed audit trail.",
    engineeringHighlights: ["Envelope encryption with key rotation", "SSRF-safe outbound requests"],
    outcome: "A drop-in module any .NET app can use instead of hard-coding credentials.",
    technologies: ["ASP.NET Core (.NET 10)", "C#", "AES-256-GCM", "SQLite"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Secure-Integration-Secrets-Management-Platform" }],
  },
  {
    id: "storyforge",
    title: "StoryForge — AI Narrative Engine",
    tagline: "PROJECT_08",
    status: "Live Demo",
    featured: false,
    problem: "Writers wanting fresh stories from a narrative spark have no tool that extracts story DNA and regenerates something genuinely new.",
    solution: "An engine that extracts genre, themes, tone, and emotional arc from a story, then generates an independent new story — in English and Bangla, with rate limiting and safety guardrails.",
    engineeringHighlights: ["Stateless narrative-DNA extraction", "Bilingual generation pipeline"],
    outcome: "A live bilingual storytelling app with guardrailed generation.",
    technologies: ["Angular 21", "ASP.NET Core (.NET 10)", "Groq API"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/StoryForge" },
      { label: "Live Demo", href: "https://storyforgefrontend.onrender.com/" },
    ],
  },
  {
    id: "pharmacy",
    title: "Ma Medicine Store — Pharmacy Management",
    tagline: "PROJECT_09",
    status: "Live Demo",
    featured: false,
    problem: "Small pharmacies tracking inventory and orders on paper lose stock visibility and mishandle fulfillment.",
    solution: "A full-stack pharmacy system with Admin, Pharmacist, and Customer roles, real-time inventory and order tracking, and low-stock alerts.",
    engineeringHighlights: ["Role-based fulfillment flow", "Real-time inventory with low-stock alerts"],
    outcome: "A deployed ordering and inventory system for a real shop context.",
    technologies: ["Python", "Django", "SQLite", "Bootstrap"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Pharmacy-Management-System-by-Django" },
      { label: "Live Demo", href: "https://maa-medicine-store.onrender.com/" },
    ],
  },
  {
    id: "loan-prediction",
    title: "AI Loan Prediction System",
    tagline: "PROJECT_10",
    status: "Academic Project",
    featured: false,
    problem: "Manual loan screening is slow and inconsistent without a structured way to weigh applicant features.",
    solution: "An expert system combining rule-based reasoning, Bayesian inference, and ML over engineered features, served through a Flask interface for real-time predictions.",
    engineeringHighlights: ["Feature-engineered preprocessing pipelines", "Hybrid rules + Bayesian + ML reasoning"],
    outcome: "A working prediction system demonstrating applied ML methodology.",
    technologies: ["Python", "Flask", "Pandas", "Scikit-learn"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Ai-Loan-Prediction-System" }],
  },
  {
    id: "doc-processing",
    title: "Intelligent Document Processing System",
    tagline: "PROJECT_11",
    status: "Live Demo",
    featured: false,
    problem: "Manual document review across PDF, DOCX, and XLSX wastes hours before LLM workflows can even start.",
    solution: "A pipeline converting office documents into structured, LLM-ready Markdown with token-reduction and cost-saving analytics.",
    engineeringHighlights: ["Multi-format ingestion with OCR", "Token/cost analytics for LLM use"],
    outcome: "A live tool that turns messy documents into LLM-ready input.",
    technologies: ["JavaScript", "OCR", "AI Pipelines"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/Markdown-AI-Tool" },
      { label: "Live Demo", href: "https://doc-to-markdown-ui.onrender.com" },
    ],
  },
  {
    id: "aduri",
    title: "Aduri AI Agent",
    tagline: "PROJECT_12",
    status: "Personal Project",
    featured: false,
    problem: "Bangla speakers lack a natural bilingual assistant with voice interaction and persistent chat history.",
    solution: "A bilingual Bangla/English AI assistant with text and voice input, chat history, and a clean chat interface over LLM APIs.",
    engineeringHighlights: ["Bilingual voice + text interaction", "Persistent chat history"],
    outcome: "A working bilingual assistant prototype.",
    technologies: ["JavaScript", "Node.js", "LLM APIs"],
    links: [{ label: "GitHub", href: "https://github.com/InfinityAbir/Aduri-AI-Agent" }],
  },
  {
    id: "pos",
    title: "Ma Mamata Variety Store — POS System",
    tagline: "PROJECT_13",
    status: "Live Demo",
    featured: false,
    problem: "Small retail stores without digital billing lose track of daily transactions and stock.",
    solution: "A point-of-sale system for daily transactions, product categories, and customer data, with automated invoices and sales tracking for non-technical staff.",
    engineeringHighlights: ["Invoice generation with Crystal Reports", "Workflow tuned for non-technical staff"],
    outcome: "A deployed POS used in a real small-store context.",
    technologies: ["C#", ".NET", "SQL Server", "Crystal Reports"],
    links: [
      { label: "GitHub", href: "https://github.com/InfinityAbir/E-commerce-Project-by-Dot-Net-MVC" },
      { label: "Live Demo", href: "http://maamamatavarietystore.runasp.net/" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
