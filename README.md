# Abir Hasan — Portfolio

Personal portfolio website showcasing my work as a full-stack engineer specializing in ASP.NET Core, Angular, Solidity, and AI-powered systems.

**Live:** [abir-hasan-portfolio](https://infinityabir.github.io/abir-hasan-portfolio/)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite + SWC |
| CSS | Tailwind CSS v4 |
| Animations | Framer Motion, GSAP, Three.js |
| UI Library | Lightswind (155 components) |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Deploy | GitHub Pages (Actions CI/CD) |

## Sections

- **Hero** — Animated intro with hanging ID card, tech stack marquee, and aurora text effects
- **About** — Quick stats and background
- **Skills** — Languages, web/mobile, databases, tools, architecture, AI/ML
- **Projects** — 13 shipped projects with live demos and source code
- **Experience** — Software Engineering Intern at Millennium Information Solution
- **Education** — BCSE from IUBAT (CGPA 3.72/4.00)
- **Contact** — Email, phone, LinkedIn, GitHub, location

## Getting Started

```bash
git clone https://github.com/InfinityAbir/abir-hasan-portfolio.git
cd abir-hasan-portfolio
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Build & Deploy

```bash
npm run build    # Output in dist/
npm run preview  # Preview production build
```

Deployment is handled automatically via GitHub Actions on push to `main`.

## Features

- Dark mode by default with animated light/dark theme toggle using the View Transition API
- Custom cursor with glow and trail effects (desktop)
- Scroll-triggered entrance animations on every section
- Glass-morphism panels throughout
- Responsive design with mobile-first approach
- macOS-style floating dock navigation (appears on scroll)

## Project Structure

```
src/
├── components/
│   ├── Header/          — Sticky nav + theme toggle
│   ├── HeroSection/     — Intro, avatar, tech marquee
│   ├── AboutSection/    — Stats grid
│   ├── ServicesSection/ — Skill categories
│   ├── ProjectsSection/ — Project cards grid
│   ├── CareerSection/   — Experience timeline
│   ├── EducationSection/— Education + professional profile
│   ├── ContactSection/  — Contact form + info
│   ├── Footer/          — Links, morphing text, socials
│   └── lightswind/      — Vendored UI component library
├── hooks/               — Custom hooks (toast, mobile detection)
├── lib/                 — Utilities (cn, debounce, throttle)
└── assets/              — Avatar, static files
```

## License

This project is for personal portfolio purposes.
