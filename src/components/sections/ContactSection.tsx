import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, Twitter, Linkedin, Github, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nexus.studio",
    href: "mailto:hello@nexus.studio",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "https://maps.google.com/?q=San+Francisco,+CA",
  },
];

const serviceTypes = [
  "Web Design",
  "Web Development",
  "Mobile App Development",
  "E-Commerce Solutions",
  "Branding & Identity",
  "UI/UX Design",
  "Digital Marketing",
  "Consulting",
  "Other"
];

const socialContacts = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/nexusstudio", color: "hover:text-blue-400" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/nexus", color: "hover:text-blue-600" },
  { icon: Github, label: "GitHub", href: "https://github.com/nexusstudio", color: "hover:text-purple-500" },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const validateField = (field: string, value: string) => {
    try {
      contactSchema.shape[field as keyof typeof contactSchema.shape].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Use the email service (EmailJS + database fallback)
      const { sendContactMessage } = await import('@/services/emailService');
      const result = await sendContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Message sent!",
          description: result.message,
        });

        setFormData({ name: "", email: "", phone: "", serviceType: "", message: "" });
        setAttachedFile(null);
        setShowParticles(true);

        // Reset success state and particles after animation
        setTimeout(() => {
          setIsSuccess(false);
          setShowParticles(false);
        }, 3000);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's Create Something{" "}
              <span className="gold-gradient">Amazing</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Ready to start your next project? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}\n
            </div>

            {/* Social Media Quick Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-8 mt-8 border-t border-border/30"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Or connect with us on social media
              </p>
              <div className="flex gap-3">
                {socialContacts.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-6"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center relative overflow-hidden"
                >
                  {/* Particle Effects */}
                  {showParticles && (
                    <>
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [1, 0],
                            scale: [0, 1],
                            x: Math.cos((i / 12) * 2 * Math.PI) * 100,
                            y: Math.sin((i / 12) * 2 * Math.PI) * 100,
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="absolute w-2 h-2 rounded-full bg-primary"
                          style={{
                            left: '50%',
                            top: '50%'
                          }}
                        />
                      ))}
                    </>
                  )}

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative z-10"
                  >
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        validateField("name", e.target.value);
                      }}
                      className={`bg-secondary/50 border-border/50 focus:border-primary ${errors.name ? "border-destructive" : ""
                        }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        validateField("email", e.target.value);
                      }}
                      className={`bg-secondary/50 border-border/50 focus:border-primary ${errors.email ? "border-destructive" : ""
                        }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-foreground"
                      >
                        Phone <span className="text-muted-foreground text-xs">(Optional)</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-secondary/50 border-border/50 focus:border-primary"
                      />
                    </div>

                    {/* Service Type Dropdown */}
                    <div className="space-y-2">
                      <label
                        htmlFor="serviceType"
                        className="text-sm font-medium text-foreground"
                      >
                        Service Needed
                      </label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => {
                          setFormData({ ...formData, serviceType: value });
                          validateField("serviceType", value);
                        }}
                      >
                        <SelectTrigger
                          className={`bg-secondary/50 border-border/50 focus:border-primary ${errors.serviceType ? "border-destructive" : ""
                            }`}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.serviceType && (
                        <p className="text-xs text-destructive">{errors.serviceType}</p>
                      )}
                    </div>
                  </div>

                  {/* File Upload Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Attach File <span className="text-muted-foreground text-xs">(Optional - Max 5MB)</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && file.size > 5 * 1024 * 1024) {
                            toast({
                              title: "File too large",
                              description: "Please select a file smaller than 5MB",
                              variant: "destructive"
                            });
                            e.target.value = "";
                            return;
                          }
                          setAttachedFile(file || null);
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-secondary/50 border border-border/50 rounded-md cursor-pointer hover:bg-secondary transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">
                          {attachedFile ? attachedFile.name : "Choose a file..."}
                        </span>
                      </label>
                      {attachedFile && (
                        <button
                          type="button"
                          onClick={() => setAttachedFile(null)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-destructive/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        validateField("message", e.target.value);
                      }}
                      className={`bg-secondary/50 border-border/50 focus:border-primary resize-none ${errors.message ? "border-destructive" : ""
                        }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
