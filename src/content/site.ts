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
  capabilities: ["Product engineering", "Web & mobile", "Backend & cloud", "Automation & AI", "Blockchain"],
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
  lede: "Five capabilities, one engineering approach, from architecture to production.",
  items: [
    {
      id: "S1",
      title: "Product Engineering",
      summary: "From product architecture to production-ready systems.",
      detail: "We design and build SaaS platforms, internal systems and digital products around real business requirements.",
    },
    {
      id: "S2",
      title: "Web & Mobile",
      summary: "Interfaces and applications designed around usability and maintainable engineering.",
      detail: "Web applications and mobile apps that are fast, accessible and easy to evolve.",
    },
    {
      id: "S3",
      title: "Backend & Cloud",
      summary: "APIs, services, databases and infrastructure designed for reliability and growth.",
      detail: "Scalable architecture, asynchronous processing and cloud environments that stay dependable as the product grows.",
    },
    {
      id: "S4",
      title: "Automation & Integrations",
      summary: "Connect systems, automate workflows and reduce manual business processes.",
      detail: "Workflow automation, system integrations and AI integrations where they remove real work.",
    },
    {
      id: "S5",
      title: "Blockchain Engineering",
      summary: "Smart contracts, on-chain applications and Web2/Web3 integrations, where blockchain provides actual value.",
      detail: "Smart contracts, blockchain integrations and Web3 infrastructure, connected to the rest of your stack.",
    },
  ],
} as const;

export type Project = {
  id: string;
  name: string;
  /** Honest ownership group, e.g. "Astreus Products". Add "Client Work" or "Astreus Labs" only when it applies. */
  collection: string;
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
  lede: "Two products Astreus is building in-house. Both are in development.",
  projects: [
    {
      id: "jurisense",
      name: "JuriSense",
      collection: "Astreus Products",
      category: "Legal technology",
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
      collection: "Astreus Products",
      category: "Retail analytics",
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
  title: "How we work",
  lede: "A clear path from the first conversation to a product that keeps improving.",
  steps: [
    { title: "Discovery", text: "We understand the problem, requirements and constraints before defining the solution." },
    { title: "Architecture", text: "We structure the product, technology and delivery strategy." },
    { title: "Engineering", text: "We build incrementally with continuous validation." },
    { title: "Quality", text: "We test functionality, performance, security and usability." },
    { title: "Launch", text: "We deploy the product and production infrastructure." },
    { title: "Evolution", text: "We maintain and improve the system after launch." },
  ],
} as const;

export const COMPANY = {
  title: "Built as systems.",
  statement:
    "Astreus is a software engineering company focused on designing and building digital products, platforms and software systems.",
  detail:
    "A product is more than screens: it is users, interfaces, services, data, infrastructure and integrations. We work across product, architecture and engineering to turn business requirements into maintainable technology.",
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
  types: [
    "Software product",
    "Web platform",
    "Mobile application",
    "Backend / API",
    "Automation",
    "Blockchain",
    "Other",
  ],
} as const;

export const FOOTER = {
  tagline: "Built as systems.",
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
