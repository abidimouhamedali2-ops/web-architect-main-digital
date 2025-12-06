import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Quote, CheckCircle2, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/data/portfolioData";

interface PortfolioModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal = ({ project, isOpen, onClose }: PortfolioModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden"
          >
            <div className="glass-card h-full overflow-y-auto scrollbar-hide">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="fixed top-8 right-8 md:top-14 md:right-14 z-10 rounded-full bg-background/80 hover:bg-background"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Hero Image */}
              <div className="relative w-full h-[40vh] md:h-[50vh]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} via-transparent to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Project Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="text-primary text-sm font-medium mb-2 block">
                    {project.category}
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                    {project.title}
                  </h1>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 max-w-5xl mx-auto">
                {/* Description */}
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-12">
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenge */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold">The Challenge</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg pl-13">
                    {project.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold">Our Solution</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg pl-13">
                    {project.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-12">
                  <h3 className="font-display text-2xl font-semibold mb-6">
                    Results & Impact
                  </h3>
                  <div className="grid gap-4">
                    {project.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {project.testimonial && (
                  <div className="mb-12">
                    <div className="glass-card p-8 relative">
                      <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" />
                      <blockquote className="relative z-10">
                        <p className="text-lg md:text-xl italic text-foreground mb-6 pl-8">
                          "{project.testimonial.quote}"
                        </p>
                        <footer className="pl-8">
                          <div className="font-semibold text-foreground">
                            {project.testimonial.author}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project.testimonial.position}
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="mb-12">
                    <h3 className="font-display text-2xl font-semibold mb-6">
                      Project Gallery
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.gallery.map((image, index) => (
                        <div key={index} className="aspect-video rounded-xl overflow-hidden">
                          <img
                            src={image}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/30">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <Button
                      variant="hero"
                      className="flex-1 group"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      View Live Project
                    </Button>
                  )}
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <Button
                      variant="heroOutline"
                      className="flex-1 group"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
