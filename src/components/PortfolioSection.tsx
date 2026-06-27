import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, Code2, Clock } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  stack: string[];
  accent: string;
  link?: string;
  inDev?: boolean;
  image?: string;
  livePreview?: boolean;
};

const IFRAME_WIDTH = 1280;
const IFRAME_HEIGHT = 800;

function LivePreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.375);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / IFRAME_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-white">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
      <div
        style={{
          width: IFRAME_WIDTH,
          height: IFRAME_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={url}
          title={title}
          width={IFRAME_WIDTH}
          height={IFRAME_HEIGHT}
          scrolling="no"
          onLoad={() => setLoaded(true)}
          style={{ border: "none", display: "block" }}
        />
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    title: "JuriSense",
    desc: "Sistema de automação de processos judiciais. Em desenvolvimento com equipe de 4 pessoas.",
    stack: ["FastAPI", "Redis", "RabbitMQ", "Docker", "PostgreSQL", "React", "GCP", "MongoDB"],
    link: "https://jurisense-frontend-36pu.onrender.com/",
    accent: "from-cyan-500/30 to-blue-500/20",
    livePreview: true,
    inDev: true,
  },
  {
    title: "ZettaData",
    desc: "Plataforma de Business Intelligence que transforma dados fiscais de NF-e em inteligência estratégica acionável para pequenos e médios varejistas.",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Kafka", "Docker"],
    accent: "from-orange-500/30 to-amber-500/20",
    inDev: true,
  },
];

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover-lift h-full"
    >
      {/* Thumbnail */}
      <div className={`h-52 bg-gradient-to-br ${project.accent} relative overflow-hidden`}>
        {project.livePreview && project.link ? (
          <LivePreview url={project.link} title={project.title} />
        ) : project.image ? (
          <img
            src={project.image}
            alt={`Preview ${project.title}`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Code2 className="w-16 h-16 text-white/40" />
            </div>
          </>
        )}

        {/* Badge de status */}
        {project.inDev ? (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            Em desenvolvimento
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
        )}

        {/* Overlay de hover no live preview para indicar que é clicável */}
        {project.livePreview && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-center pb-4 z-10 opacity-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 text-white text-xs font-medium">
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir site
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-semibold text-xl leading-tight">{project.title}</h3>
          {project.inDev && (
            <span className="shrink-0 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              Astreus Dev
            </span>
          )}
        </div>

        <p className="text-muted-foreground mb-5 text-sm leading-relaxed">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            Portfólio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Projetos que{" "}
            <span className="gradient-text">entregamos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) =>
            project.link ? (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <ProjectCard project={project} index={index} isInView={isInView} />
              </a>
            ) : (
              <div key={project.title}>
                <ProjectCard project={project} index={index} isInView={isInView} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
