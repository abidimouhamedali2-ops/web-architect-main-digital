import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide."
        },
        {
            title: "2. How We Use Your Information",
            content: "We use the information we collect to:\n• Respond to your inquiries and provide customer support\n• Send you updates, newsletters, and marketing communications (with your consent)\n• Improve our website and services\n• Comply with legal obligations"
        },
        {
            title: "3. Information Sharing",
            content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with:\n• Service providers who assist in operating our website\n• Legal authorities when required by law\n• Business partners with your explicit consent"
        },
        {
            title: "4. Data Security",
            content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure."
        },
        {
            title: "5. Your Rights",
            content: "You have the right to:\n• Access your personal information\n• Correct inaccurate data\n• Request deletion of your data\n• Opt-out of marketing communications\n• Lodge a complaint with a supervisory authority"
        },
        {
            title: "6. Cookies and Tracking",
            content: "We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. We use Google Analytics to understand how visitors interact with our site."
        },
        {
            title: "7. Third-Party Links",
            content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies."
        },
        {
            title: "8. Children's Privacy",
            content: "Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13."
        },
        {
            title: "9. Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated effective date."
        },
        {
            title: "10. Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: privacy@nexus.studio\nAddress: 123 Main St, San Francisco, CA 94102"
        }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 py-20 max-w-4xl">
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
                    className="text-center mb-12"
                >
                    <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Effective Date: December 3, 2024
                    </p>
                    <p className="text-muted-foreground mt-4">
                        At Nexus, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
                    </p>
                </motion.div>

                {/* Content */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6"
                        >
                            <h2 className="font-display text-2xl font-semibold mb-4 text-primary">
                                {section.title}
                            </h2>
                            <p className="text-foreground/90 whitespace-pre-line leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* GDPR Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-12 glass-card p-6 border-primary/30"
                >
                    <h3 className="font-display text-xl font-semibold mb-3">
                        GDPR Compliance
                    </h3>
                    <p className="text-foreground/90">
                        We are committed to compliance with the General Data Protection Regulation (GDPR) and other applicable data protection laws. If you are a resident of the European Economic Area, you have specific rights regarding your personal data.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
