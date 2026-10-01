/**
 * Single source of truth for all Astraeus website copy and data.
 * Only facts that exist in the repository or the previous site are used here.
 */

export const SITE = {
  name: "Astraeus",
  url: "https://astraeus-j.vercel.app",
  email: "astreusdev.tech@gmail.com",
  location: "Piauí, Brazil",
  social: [
    { label: "GitHub", href: "https://github.com/orgs/Astreus-J/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/astreus-j/" },
  ],
} as const;

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Software engineering company",
  title: "Software engineered for real businesses.",
  lede: "Astraeus designs and develops digital products, platforms and infrastructure — from web applications and backend systems to automation and blockchain solutions.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "View our work", href: "#work" },
} as const;

/** Stages of the Constellation System shown in the hero. */
export const STAGES = [
  { id: "N1", label: "Business problem", x: 11, y: 22, align: "left" },
  { id: "N2", label: "Engineering", x: 36, y: 47, align: "below" },
  { id: "N3", label: "Systems", x: 64, y: 24, align: "above" },
  { id: "N4", label: "Infrastructure", x: 60, y: 74, align: "below" },
  { id: "N5", label: "Products", x: 88, y: 50, align: "right" },
] as const;

export const STAGE_EDGES: ReadonlyArray<readonly [string, string]> = [
  ["N1", "N2"],
  ["N2", "N3"],
  ["N2", "N4"],
  ["N3", "N4"],
  ["N3", "N5"],
  ["N4", "N5"],
];

export const SERVICES = {
  eyebrow: "Services",
  title: "What we build",
  lede: "Four engineering disciplines that work as one system: the product, the backend behind it, the automation around it, and the infrastructure it runs on.",
  items: [
    {
      id: "S1",
      title: "Product Engineering",
      summary: "End-to-end delivery of software products, from first release to long-term evolution.",
      points: ["SaaS platforms", "Web applications", "MVP development", "Internal platforms"],
    },
    {
      id: "S2",
      title: "Backend & Infrastructure",
      summary: "The services, data layer and cloud foundation that products depend on.",
      points: [
        "Backend systems",
        "APIs & integrations",
        "Databases",
        "Scalable architecture",
        "Cloud infrastructure",
      ],
    },
    {
      id: "S3",
      title: "Automation & AI",
      summary: "Business processes turned into reliable software, with AI integrated where it adds value.",
      points: [
        "Workflow automation",
        "Business process automation",
        "AI integrations",
        "Intelligent internal systems",
      ],
    },
    {
      id: "S4",
      title: "Blockchain Engineering",
      summary: "Smart contracts and Web3 infrastructure, built as part of a larger system.",
      points: [
        "Smart contracts",
        "Blockchain integrations",
        "Web3 infrastructure",
        "Decentralized applications",
      ],
    },
  ],
} as const;

export const EXPERTISE = {
  eyebrow: "Expertise",
  title: "Engineering depth across the stack",
  lede: "The technologies we use in production work, grouped by the problem they solve.",
  groups: [
    {
      label: "Frontend",
      focus: "Fast, accessible interfaces for complex products.",
      tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      label: "Backend",
      focus: "Services and APIs designed for correctness and scale.",
      tech: ["Python", "FastAPI", "Django", "Node.js", "Express", "Go", "Java", "Spring Boot"],
    },
    {
      label: "Data & Messaging",
      focus: "Storage and event pipelines matched to the workload.",
      tech: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Kafka", "Supabase"],
    },
    {
      label: "Cloud & DevOps",
      focus: "Reproducible environments and automated delivery.",
      tech: ["Docker", "Terraform", "Linux", "CI/CD", "GCP", "AWS"],
    },
    {
      label: "Blockchain",
      focus: "On-chain programs and the infrastructure around them.",
      tech: ["Solana", "Rust"],
    },
    {
      label: "Automation & AI",
      focus: "Queue-driven workflows and AI services wired into products.",
      tech: ["Workflow automation", "Message queues", "API integrations", "AI service integration"],
    },
  ],
} as const;

export type Project = {
  id: string;
  name: string;
  industry: string;
  status: string;
  summary: string;
  services: string[];
  challenge: string;
  solution: string;
  engineering: string;
  outcome: string;
  link?: { href: string; label: string };
  /** Technology grouped by architectural layer. */
  layers: ReadonlyArray<{ layer: string; tech: string[] }>;
};

export const WORK = {
  eyebrow: "Work",
  title: "Selected projects",
  lede: "Products we are building as Astraeus. Both are in active development.",
  projects: [
    {
      id: "PRJ-01",
      name: "JuriSense",
      industry: "Legal technology",
      status: "In development",
      summary: "A system that automates judicial process workflows.",
      services: ["Product Engineering", "Backend & Infrastructure", "Automation"],
      challenge: "Handling judicial processes involves repetitive manual work that is slow and hard to track.",
      solution: "A platform that automates judicial process handling end to end.",
      engineering:
        "FastAPI services with RabbitMQ and Redis for asynchronous work, PostgreSQL and MongoDB for data, running in Docker on GCP. Built with a four-person team.",
      outcome: "In active development. Results will be reported after launch.",
      link: { href: "https://jurisense-frontend-36pu.onrender.com/", label: "Open the application" },
      layers: [
        { layer: "Client", tech: ["React"] },
        { layer: "Services", tech: ["FastAPI"] },
        { layer: "Messaging", tech: ["RabbitMQ", "Redis"] },
        { layer: "Data", tech: ["PostgreSQL", "MongoDB"] },
        { layer: "Infrastructure", tech: ["Docker", "GCP"] },
      ],
    },
    {
      id: "PRJ-02",
      name: "ZettaData",
      industry: "Retail analytics",
      status: "In development",
      summary: "A business intelligence platform built on NF-e fiscal data.",
      services: ["Product Engineering", "Backend & Infrastructure"],
      challenge: "Small and mid-size retailers hold rich fiscal data in NF-e documents but have no practical way to use it.",
      solution: "A BI platform that turns NF-e data into actionable strategic insight.",
      engineering:
        "Java and Spring Boot services with Kafka for data pipelines, PostgreSQL and Redis for storage and caching, a React front end, all containerized with Docker.",
      outcome: "In active development. Results will be reported after launch.",
      layers: [
        { layer: "Client", tech: ["React"] },
        { layer: "Services", tech: ["Java", "Spring Boot"] },
        { layer: "Messaging", tech: ["Kafka"] },
        { layer: "Data", tech: ["PostgreSQL", "Redis"] },
        { layer: "Infrastructure", tech: ["Docker"] },
      ],
    },
  ] satisfies Project[],
};

export const COMPANY = {
  eyebrow: "Company",
  title: "A software engineering company",
  statement:
    "Astraeus is a software engineering company focused on designing and building digital products and systems for modern businesses.",
  detail:
    "We treat software as long-lived infrastructure: it has to be understood by the people who run it, change safely, and keep working as the business grows.",
  principles: [
    {
      title: "Engineering-first",
      text: "Decisions start from technical requirements and constraints, not from trends.",
    },
    {
      title: "Scalable architecture",
      text: "Systems are structured to grow in load and scope without being rewritten.",
    },
    {
      title: "Product thinking",
      text: "We build for the users and the business outcome, not only for the specification.",
    },
    {
      title: "Security by design",
      text: "Access control, data handling and dependencies are considered from the first design.",
    },
    {
      title: "Proven technology",
      text: "We choose tools with mature ecosystems and use newer ones where they earn their place.",
    },
    {
      title: "Long-term maintainability",
      text: "Readable code, tests and documentation so the system stays cheap to change.",
    },
  ],
} as const;

export const PROCESS = {
  eyebrow: "Process",
  title: "How we work",
  lede: "A clear sequence from first conversation to production and beyond.",
  steps: [
    { title: "Discovery", text: "Understand the business, users and technical requirements." },
    { title: "Architecture", text: "Define the product architecture and engineering strategy." },
    { title: "Build", text: "Design and develop the system iteratively." },
    { title: "Validate", text: "Test functionality, usability, security and performance." },
    { title: "Launch", text: "Deploy and prepare production infrastructure." },
    { title: "Evolve", text: "Maintain, monitor and continuously improve the product." },
  ],
} as const;

export const CONTACT = {
  eyebrow: "Contact",
  title: "Have a product or system to build?",
  lede: "Tell us what you're working on. We'll reply by email to discuss scope and next steps.",
  projectTypes: [
    "Product / SaaS platform",
    "Web application",
    "Backend, API or integrations",
    "Automation or AI",
    "Blockchain",
    "Other",
  ],
} as const;

export const FOOTER = {
  tagline: "Software engineering company.",
  columns: [
    {
      title: "Services",
      links: SERVICES.items.map((s) => ({ label: s.title, href: "#services" })),
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#company" },
        { label: "Expertise", href: "#expertise" },
        { label: "Process", href: "#process" },
      ],
    },
    {
      title: "Work",
      links: WORK.projects.map((p) => ({ label: p.name, href: "#work" })),
    },
  ],
} as const;
