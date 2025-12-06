import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "Nexus transformed our digital presence completely. The attention to detail and creative approach exceeded all expectations. Our conversion rates increased by 150%.",
    author: "Sarah Chen",
    role: "CEO, TechVentures",
    avatar: "https://i.pravatar.cc/100?img=32",
    company: "TechVentures",
  },
  {
    id: 2,
    quote: "Working with Nexus was an absolute pleasure. They understood our vision from day one and delivered a website that truly represents our brand.",
    author: "Michael Roberts",
    role: "Founder, Artisan Co",
    avatar: "https://i.pravatar.cc/100?img=33",
    company: "Artisan Co",
  },
  {
    id: 3,
    quote: "The team's expertise in UX design helped us create an intuitive platform that our users love. Best investment we've made for our startup.",
    author: "Emily Watson",
    role: "Product Lead, FinFlow",
    avatar: "https://i.pravatar.cc/100?img=47",
    company: "FinFlow",
  },
  {
    id: 4,
    quote: "Professional, creative, and incredibly responsive. Nexus delivered our e-commerce platform ahead of schedule with outstanding quality.",
    author: "David Kim",
    role: "Director, Urban Style",
    avatar: "https://i.pravatar.cc/100?img=52",
    company: "Urban Style",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            What Our <span className="gold-gradient">Clients Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />

            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={false}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : index < currentIndex ? -50 : 50,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${index === currentIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                  <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 text-center">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full border-2 border-primary/30"
                    />
                    <div className="text-left">
                      <div className="font-display font-semibold text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="glass"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="glass"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <p className="text-center text-muted-foreground text-sm mb-8">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            {["TechVentures", "Artisan Co", "FinFlow", "Urban Style", "DataCore"].map(
              (company) => (
                <div
                  key={company}
                  className="font-display text-xl font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
