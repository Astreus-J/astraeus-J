import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = {
  frontend: [
    { name: "React", color: "hsl(193, 95%, 68%)" },
    { name: "Next.js", color: "hsl(0, 0%, 20%)" },
    { name: "Tailwind CSS", color: "hsl(198, 93%, 60%)" },
    { name: "TypeScript", color: "hsl(211, 60%, 48%)" },
  ],
  backend: [
    { name: "Node.js", color: "hsl(120, 33%, 45%)" },
    { name: "Python", color: "hsl(207, 51%, 44%)" },
    { name: "Django", color: "hsl(150, 50%, 35%)" },
    { name: "FastAPI", color: "hsl(172, 66%, 50%)" },
  ],
  database: [
    { name: "PostgreSQL", color: "hsl(210, 55%, 45%)" },
    { name: "MySQL", color: "hsl(198, 70%, 35%)" },
    { name: "MongoDB", color: "hsl(120, 40%, 40%)" },
    { name: "Redis", color: "hsl(0, 65%, 50%)" },
  ],
  devops: [
    { name: "Docker", color: "hsl(210, 80%, 55%)" },
    { name: "AWS", color: "hsl(35, 90%, 50%)" },
    { name: "Git", color: "hsl(12, 75%, 52%)" },
    { name: "CI/CD", color: "hsl(260, 50%, 55%)" },
  ],
};

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Banco de Dados" },
  { key: "devops", label: "DevOps & Cloud" },
] as const;

export function TechnologiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tecnologias" className="py-24 bg-muted/30">
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
            Stack Tecnológico
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Tecnologias que{" "}
            <span className="gradient-text">dominamos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Utilizamos as melhores e mais modernas tecnologias do mercado 
            para entregar soluções robustas e escaláveis.
          </p>
        </motion.div>

        {/* Technologies grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border"
            >
              <h3 className="font-display font-semibold text-lg mb-6 text-center">
                {category.label}
              </h3>
              <div className="space-y-3">
                {technologies[category.key].map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: catIndex * 0.1 + techIndex * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    <span className="font-medium text-sm">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
