/**
 * Single source of truth for all Astreus website copy and data.
 * Only facts that exist in the repository or the previous site are used here.
 */

export const SITE = {
  name: "Astreus",
  email: "astreusdev.tech@gmail.com",
  location: "Piauí, Brazil",
  social: [
    { label: "GitHub", href: "https://github.com/orgs/Astreus-J/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/astreus-j/" },
  ],
} as const;

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  title: "Software engineered for real businesses.",
  lede: "Astreus is a software engineering company. We design and build digital products, platforms and the infrastructure behind them, from product architecture to production.",
  audience: "For companies, startups and organizations that need technology built properly.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "View our work", href: "#work" },
  capabilities: [
    "Custom software",
    "SaaS platforms",
    "Web & mobile apps",
    "APIs & integrations",
    "Automation & AI",
    "Cloud infrastructure",
    "Blockchain",
  ],
} as const;

/**
 * Stages of the Constellation System. Node positions follow the geometry of the
 * Astreus mark: base-left, left edge, apex, right edge, base-right.
 */
export const STAGES = [
  { id: "N1", label: "Business problem", x: 14, y: 80, align: "below", text: "We start from the operation: who uses the system, what it must do and what constrains it." },
  { id: "N2", label: "Engineering", x: 32, y: 48, align: "left", text: "Requirements become an architecture, a technology choice and a delivery plan." },
  { id: "N3", label: "Systems", x: 50, y: 16, align: "above", text: "Services, data and integrations built as parts of one coherent system." },
  { id: "N4", label: "Infrastructure", x: 68, y: 48, align: "right", text: "Cloud environments, pipelines and monitoring that keep the system running." },
  { id: "N5", label: "Products", x: 86, y: 80, align: "below", text: "Software the business can ship, operate and keep improving." },
] as const;

/** [from, to, bend]: bend curves the connection away from a straight line. */
export const STAGE_EDGES: ReadonlyArray<readonly [string, string, number?]> = [
  ["N1", "N2"],
  ["N2", "N3"],
  ["N3", "N4"],
  ["N4", "N5"],
  ["N2", "N4", -7],
  ["N1", "N5", 9],
];

export const SERVICES = {
  title: "What we build",
  lede: "One team across the whole path, from product architecture to production.",
  items: [
    {
      id: "S1",
      title: "Product Engineering",
      summary: "Software products, from the first release to the platform they grow into.",
      detail: "SaaS platforms, web and mobile applications, MVPs and internal business systems.",
    },
    {
      id: "S2",
      title: "Backend & Cloud",
      summary: "Backend systems designed to remain reliable as your product grows.",
      detail: "APIs and integrations, services, databases, asynchronous processing, scalable architecture and cloud infrastructure.",
    },
    {
      id: "S3",
      title: "Automation & AI",
      summary: "Repetitive business processes turned into software, with AI added where it helps.",
      detail: "Workflow and process automation, AI integrations and intelligent internal tools.",
    },
    {
      id: "S4",
      title: "Blockchain Engineering",
      summary: "On-chain components for products that need them, integrated with the rest of your system.",
      detail: "Smart contracts, blockchain integrations, Web3 infrastructure and decentralized applications.",
    },
  ],
} as const;

export type Project = {
  id: string;
  name: string;
  category: string;
  status: string;
  context: string;
  solution: string;
  highlight: string;
  demonstrates: string;
  technology: string[];
  link?: { href: string; label: string };
};

export const WORK = {
  title: "Selected work",
  lede: "Two products Astreus is building in-house, both currently in development.",
  projects: [
    {
      id: "jurisense",
      name: "JuriSense",
      category: "Internal product · Legal technology",
      status: "In development",
      context: "Handling judicial processes involves repetitive manual work that is slow and hard to track.",
      solution: "A system that automates judicial process workflows.",
      highlight:
        "A backend built around asynchronous processing: FastAPI services, RabbitMQ queues and Redis, with PostgreSQL and MongoDB for data, running in Docker on GCP.",
      demonstrates: "Workflow automation and asynchronous backend systems.",
      technology: ["React", "FastAPI", "RabbitMQ", "Redis", "PostgreSQL", "MongoDB", "Docker", "GCP"],
      link: { href: "https://jurisense-frontend-36pu.onrender.com/", label: "Open the application" },
    },
    {
      id: "zettadata",
      name: "ZettaData",
      category: "Internal product · Retail analytics",
      status: "In development",
      context: "Small and mid-size retailers hold valuable fiscal data in NF-e documents but have no practical way to use it.",
      solution: "A business intelligence platform that turns NF-e data into actionable strategic insight.",
      highlight:
        "A data pipeline on Kafka with Java and Spring Boot services, PostgreSQL and Redis for storage and caching, and a React front end, containerized with Docker.",
      demonstrates: "Data-intensive product engineering, from ingestion to analytics.",
      technology: ["React", "Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Docker"],
    },
  ] satisfies Project[],
};

export const EXPERTISE = {
  title: "Technology, chosen deliberately",
  lede: "We pick tools for the problem in front of us. These are the ones we work with most.",
  groups: [
    {
      label: "Interfaces",
      focus: "Fast, accessible web and mobile interfaces.",
      tech: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter", "React Native"],
    },
    {
      label: "Systems",
      focus: "Backends, APIs and automation, including AI integrations.",
      tech: ["Python", "FastAPI", "Django", "Node.js", "Go", "Java", "Spring Boot"],
    },
    {
      label: "Data",
      focus: "Storage, caching and messaging matched to the workload.",
      tech: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Kafka", "Supabase"],
    },
    {
      label: "Infrastructure",
      focus: "Reproducible environments and automated delivery.",
      tech: ["Docker", "Terraform", "Linux", "CI/CD", "GCP", "AWS"],
    },
    {
      label: "Blockchain",
      focus: "On-chain programs and the infrastructure around them.",
      tech: ["Solana", "Rust"],
    },
  ],
} as const;

export const PROCESS = {
  title: "How an engagement works",
  lede: "Six stages, from the first conversation to a product that keeps improving.",
  steps: [
    { title: "Discovery", text: "Understand the business, product and constraints." },
    { title: "Product & Architecture", text: "Define scope, experience and technical foundations." },
    { title: "Engineering", text: "Build incrementally with continuous validation." },
    { title: "Quality", text: "Test functionality, performance, security and usability." },
    { title: "Launch", text: "Deploy the product and production infrastructure." },
    { title: "Evolution", text: "Maintain, measure and improve." },
  ],
} as const;

export const COMPANY = {
  title: "A software engineering company",
  statement:
    "Astreus is a software engineering company focused on building digital products and systems designed to evolve.",
  detail:
    "We combine product thinking, software architecture and modern engineering to take products from idea to production, and keep them healthy afterwards.",
  principles: [
    {
      title: "Architecture before code",
      text: "We settle structure, data and boundaries early, so the system can grow without rewrites.",
    },
    {
      title: "Security by design",
      text: "Access control, data handling and dependencies are considered from the first design, not added at the end.",
    },
    {
      title: "Built to be maintained",
      text: "Readable code, tests and documentation keep the system cheap to change for whoever owns it next.",
    },
    {
      title: "Product thinking",
      text: "We build for the users and the business outcome, not only for the specification.",
    },
  ],
} as const;

export const CONTACT = {
  title: "Have a product to build?",
  lede: "Tell us about it. We reply by email to discuss scope and next steps.",
  needs: [
    "Software product",
    "Web platform",
    "Mobile app",
    "Backend / infrastructure",
    "Automation / AI",
    "Blockchain",
    "Other",
  ],
  stages: ["Idea", "Planning", "Existing product", "Scaling / redesign"],
} as const;

export const FOOTER = {
  tagline: "Software engineering company.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "About", href: "#company" },
        { label: "Expertise", href: "#expertise" },
        { label: "Process", href: "#process" },
      ],
    },
    {
      title: "Services",
      links: SERVICES.items.map((s) => ({ label: s.title, href: "#services" })),
    },
    {
      title: "Work",
      links: WORK.projects.map((p) => ({ label: p.name, href: "#work" })),
    },
  ],
} as const;
