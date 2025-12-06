import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PortfolioModal } from "@/components/portfolio/PortfolioModal";
import { Button } from "@/components/ui/button";
import { portfolioProjects } from "@/data/portfolioData";

const categories = ["All", "Web Application", "Full Stack", "Mobile Design", "Web Development"];

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeFilter === "All"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section id="work" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
              Featured <span className="gold-gradient">Work</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-4 md:mt-0 text-lg">
            A selection of our finest projects that showcase our expertise and creativity.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 group-hover:opacity-40 transition-opacity z-10`}
                />

                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              <span className="text-primary text-sm font-medium">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-semibold mt-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProjects.length > 4 && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="heroOutline" onClick={() => setShowAll(true)}>
              Load More Projects
            </Button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <PortfolioModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
