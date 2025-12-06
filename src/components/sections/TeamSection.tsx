import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

const team = [
  {
    name: "Alexandra Rivera",
    role: "Founder & Creative Director",
    bio: "10+ years leading digital transformations. Former Design Lead at Google.",
    avatar: "https://i.pravatar.cc/300?img=49",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Marcus Chen",
    role: "Head of Engineering",
    bio: "Full-stack architect. Built scalable platforms for Fortune 500 companies.",
    avatar: "https://i.pravatar.cc/300?img=12",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Sophie Williams",
    role: "Lead UX Designer",
    bio: "Human-centered design advocate. Award-winning interaction designer.",
    avatar: "https://i.pravatar.cc/300?img=45",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "James Park",
    role: "Senior Developer",
    bio: "React & TypeScript specialist. Open source contributor.",
    avatar: "https://i.pravatar.cc/300?img=68",
    socials: { github: "#", linkedin: "#" },
  },
];

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Team
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Meet the <span className="gold-gradient">Experts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Talented professionals passionate about crafting exceptional digital experiences.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Avatar Card */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay with Bio */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-sm text-foreground mb-4">{member.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-foreground" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-foreground" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                      >
                        <Github className="w-4 h-4 text-foreground" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Gold Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>

              {/* Info */}
              <h3 className="font-display text-lg font-semibold">{member.name}</h3>
              <p className="text-primary text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
