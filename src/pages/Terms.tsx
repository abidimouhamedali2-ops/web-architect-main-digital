import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using the Nexus website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services."
        },
        {
            title: "2. Services Provided",
            content: "Nexus provides web design, development, and digital consulting services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice."
        },
        {
            title: "3. User Responsibilities",
            content: "You agree to:\n• Provide accurate and complete information when requested\n• Maintain the confidentiality of any account credentials\n• Notify us immediately of any unauthorized use\n• Use our services only for lawful purposes\n• Not engage in any activity that interferes with or disrupts our services"
        },
        {
            title: "4. Intellectual Property",
            content: "All content on this website, including text, graphics, logos, images, and software, is the property of Nexus or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission."
        },
        {
            title: "5. Project Deliverables",
            content: "For client projects:\n• Deliverables and timelines will be outlined in project-specific agreements\n• Clients retain ownership of final deliverables upon full payment\n• Nexus retains the right to showcase completed work in our portfolio\n• Source code and design files are provided based on project scope"
        },
        {
            title: "6. Payment Terms",
            content: "Payment terms for services will be specified in individual project agreements. Generally:\n• Deposits are non-refundable\n• Final payment is due before project delivery\n• Late payments may incur additional fees\n• All fees are in USD unless otherwise specified"
        },
        {
            title: "7. Confidentiality",
            content: "We respect the confidentiality of your business information. Any confidential information shared during the course of our engagement will be protected and not disclosed to third parties without your consent, except as required by law."
        },
        {
            title: "8. Warranties and Disclaimers",
            content: "Our services are provided 'as is' without warranty of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or meet your specific requirements. We are not liable for any indirect, incidental, or consequential damages."
        },
        {
            title: "9. Limitation of Liability",
            content: "To the fullest extent permitted by law, Nexus shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages."
        },
        {
            title: "10. Indemnification",
            content: "You agree to indemnify and hold Nexus harmless from any claims, losses, damages, liabilities, and expenses arising out of your use of our services or violation of these terms."
        },
        {
            title: "11. Governing Law",
            content: "These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions."
        },
        {
            title: "12. Changes to Terms",
            content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after changes constitutes acceptance of the modified terms."
        },
        {
            title: "13. Contact Information",
            content: "For questions about these Terms of Service, please contact us at:\n\nEmail: legal@nexus.studio\nAddress: 123 Main St, San Francisco, CA 94102\nPhone: +1 (555) 123-4567"
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
                    <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last Updated: December 3, 2024
                    </p>
                    <p className="text-muted-foreground mt-4">
                        Please read these terms carefully before using our services.
                    </p>
                </motion.div>

                {/* Content */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
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

                {/* Agreement Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-12 glass-card p-6 border-primary/30 text-center"
                >
                    <p className="text-foreground/90">
                        By using Nexus services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
