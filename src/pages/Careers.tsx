import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CareersPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        message: "",
        resume: null as File | null,
    });
    const { toast } = useToast();

    const openPositions = [
        {
            title: "Senior Frontend Developer",
            type: "Full-time",
            location: "Remote / Hybrid",
            description: "We're looking for an experienced React/TypeScript developer to join our team.",
        },
        {
            title: "UX/UI Designer",
            type: "Full-time",
            location: "Remote",
            description: "Create stunning, user-centric designs for our diverse client portfolio.",
        },
        {
            title: "Full Stack Engineer",
            type: "Full-time",
            location: "San Francisco, CA",
            description: "Build scalable web applications using modern technologies.",
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast({
            title: "Application Submitted!",
            description: "We'll review your application and get back to you soon.",
        });

        setFormData({
            name: "",
            email: "",
            role: "",
            message: "",
            resume: null,
        });
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 py-20">
                {/* Back Button */}
                <Link to="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Briefcase className="w-16 h-16 mx-auto mb-6 text-primary" />
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Build exceptional digital experiences with a team of passionate innovators.
                        We're always looking for talented individuals to join our mission.
                    </p>
                </motion.div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="font-display text-3xl font-bold mb-8 text-center">
                        Open Positions
                    </h2>

                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="glass-card p-6 hover:border-primary/50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-display text-2xl font-semibold">
                                        {position.title}
                                    </h3>
                                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                                        {position.type}
                                    </span>
                                </div>
                                <p className="text-muted-foreground mb-3">{position.location}</p>
                                <p className="text-foreground">{position.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Application Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="max-w-2xl mx-auto glass-card p-8"
                >
                    <h2 className="font-display text-3xl font-bold mb-2 text-center">
                        Apply Now
                    </h2>
                    <p className="text-muted-foreground text-center mb-8">
                        Don't see a perfect fit? Send us your information anyway!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Role Interested In</label>
                            <Input
                                placeholder="e.g., Frontend Developer"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Why Nexus?</label>
                            <Textarea
                                placeholder="Tell us why you'd be a great fit for our team..."
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Resume/Portfolio (Optional)</label>
                            <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                            />
                        </div>

                        <Button type="submit" variant="hero" className="w-full" size="lg">
                            <Send className="mr-2 w-4 h-4" />
                            Submit Application
                        </Button>
                    </form>
                </motion.div>

                {/* Why Join Us */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-16 text-center"
                >
                    <h2 className="font-display text-3xl font-bold mb-8">Why Join Nexus?</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl font-semibold mb-3">Remote First</h3>
                            <p className="text-muted-foreground">
                                Work from anywhere in the world with flexible hours and work-life balance.
                            </p>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl font-semibold mb-3">Growth & Learning</h3>
                            <p className="text-muted-foreground">
                                Continuous learning budget, conferences, and mentorship programs.
                            </p>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl font-semibold mb-3">Cutting-Edge Projects</h3>
                            <p className="text-muted-foreground">
                                Work on innovative projects with the latest technologies and tools.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
