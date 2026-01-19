import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo-astraeus.jpeg";

const socialLinks = [
  { icon: Github, href: "https://github.com/orgs/Astreus-J/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/astreus-j/?viewAsMember=true", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/astreus_dev/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/Astreus_J", label: "Twitter" },
];

const footerLinks = [
  {
    title: "Serviços",
    links: [
      { name: "Sites e Landing Pages", href: "#servicos" },
      { name: "Sistemas Web", href: "#servicos" },
      { name: "APIs e Integrações", href: "#servicos" },
      { name: "Automação", href: "#servicos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nós", href: "#sobre" },
      { name: "Portfólio", href: "#portfolio" },
      { name: "Tecnologias", href: "#tecnologias" },
      { name: "Contato", href: "#contato" },
    ],
  },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="gradient-bg-dark text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="ASTRAEUS DEV" className="h-10 w-10 rounded-lg object-cover" />
              <span className="font-display font-bold text-xl text-secondary-foreground">
                ASTRAEUS <span className="text-primary">DEV</span>
              </span>
            </div>
            <p className="text-secondary-foreground/70 mb-6">
              Transformamos ideias em soluções digitais escaláveis. 
              Desenvolvimento de software sob medida para seu negócio.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-display font-semibold text-lg mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-secondary-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display font-semibold text-lg mb-6">Pronto para começar?</h4>
            <p className="text-secondary-foreground/70 mb-6">
              Entre em contato e receba um orçamento personalizado para seu projeto.
            </p>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contato");
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg gradient-bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
            >
              Fale Conosco
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} ASTRAEUS DEV. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-secondary-foreground/60">
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
