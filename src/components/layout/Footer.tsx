import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

interface FooterLink {
  label: string;
  href?: string;
  section?: string;
  external?: boolean;
  comingSoon?: boolean;
  route?: string;
}

const footerLinks: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", section: "about" },
      { label: "Careers", route: "/careers" },
      { label: "Press", comingSoon: true },
      { label: "Blog", section: "blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Design", section: "services" },
      { label: "Development", section: "services" },
      { label: "Consulting", section: "contact" },
      { label: "Support", section: "contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", route: "/privacy" },
      { label: "Terms", route: "/terms" },
      { label: "Cookies", comingSoon: true },
      { label: "License", comingSoon: true },
    ],
  },
];

// Coming Soon Modal Component
const ComingSoonModal = ({ isOpen, onClose, title }: { isOpen: boolean; onClose: () => void; title: string }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-card p-8 md:p-12 max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <ExternalLink className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg mb-8">
          This page is coming soon! We're working hard to bring you amazing content.
        </p>
        <Button variant="hero" onClick={onClose} className="w-full">
          Got It
        </Button>
      </motion.div>
    </motion.div>
  );
};

export const Footer = () => {
  const [comingSoonModal, setComingSoonModal] = useState<{ isOpen: boolean; title: string }>({
    isOpen: false,
    title: "",
  });

  const handleLinkClick = (link: FooterLink, e: React.MouseEvent) => {
    e.preventDefault();

    if (link.comingSoon) {
      setComingSoonModal({ isOpen: true, title: link.label });
      return;
    }

    if (link.route) {
      // Navigate to route
      window.location.href = link.route;
      return;
    }

    if (link.section) {
      const element = document.getElementById(link.section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (link.href) {
      window.open(link.href, link.external ? "_blank" : "_self");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <button
                onClick={scrollToTop}
                className="font-display text-2xl font-bold gold-gradient inline-block mb-4 hover:scale-105 transition-transform cursor-pointer"
              >
                Nexus
              </button>
              <p className="text-muted-foreground max-w-sm mb-6">
                Transforming ideas into exceptional digital experiences. Let's
                build something amazing together.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="font-display font-semibold mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href="#"
                        onClick={(e) => handleLinkClick(link, e)}
                        className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleLinkClick(link, e as any);
                          }
                        }}
                      >
                        {link.label}
                        {link.comingSoon && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Soon
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nexus. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Crafted with passion by creative minds.
            </p>
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal({ isOpen: false, title: "" })}
        title={comingSoonModal.title}
      />
    </>
  );
};
