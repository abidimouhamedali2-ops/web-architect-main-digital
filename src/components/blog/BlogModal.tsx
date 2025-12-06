import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogArticle } from "@/data/blogData";

interface BlogModalProps {
    article: BlogArticle | null;
    isOpen: boolean;
    onClose: () => void;
}

export const BlogModal = ({ article, isOpen, onClose }: BlogModalProps) => {
    if (!article) return null;

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
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                                {/* Category Badge */}
                                <div className="absolute top-8 left-8">
                                    <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 md:px-12 lg:px-20 py-12 max-w-4xl mx-auto">
                                {/* Title */}
                                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                    {article.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border/30">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={article.author.avatar}
                                            alt={article.author.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-foreground">
                                                {article.author.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {article.author.role}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">{article.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{article.readTime}</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full bg-secondary text-xs font-medium border border-border/30"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <div
                                        className="article-content"
                                        dangerouslySetInnerHTML={{
                                            __html: article.content
                                                .split('\n')
                                                .map(line => {
                                                    // Convert markdown-style headers
                                                    if (line.startsWith('# ')) {
                                                        return `<h1 class="font-display text-3xl font-bold mt-12 mb-6 first:mt-0">${line.slice(2)}</h1>`;
                                                    }
                                                    if (line.startsWith('## ')) {
                                                        return `<h2 class="font-display text-2xl font-semibold mt-10 mb-4">${line.slice(3)}</h2>`;
                                                    }
                                                    if (line.startsWith('### ')) {
                                                        return `<h3 class="font-display text-xl font-semibold mt-8 mb-3">${line.slice(4)}</h3>`;
                                                    }
                                                    // Convert markdown-style bold
                                                    line = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
                                                    // Convert code blocks
                                                    if (line.startsWith('```')) {
                                                        return '<pre class="bg-secondary/50 p-4 rounded-lg overflow-x-auto my-4 border border-border/30"><code>';
                                                    }
                                                    if (line === '```') {
                                                        return '</code></pre>';
                                                    }
                                                    // Convert inline code
                                                    line = line.replace(/`(.+?)`/g, '<code class="bg-secondary/50 px-2 py-1 rounded text-sm">$1</code>');
                                                    // Regular paragraphs
                                                    if (line.trim() && !line.startsWith('<')) {
                                                        return `<p class="text-muted-foreground leading-relaxed mb-4">${line}</p>`;
                                                    }
                                                    return line;
                                                })
                                                .join('\n')
                                        }}
                                    />
                                </div>

                                {/* Author Bio */}
                                <div className="mt-16 pt-8 border-t border-border/30">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={article.author.avatar}
                                            alt={article.author.name}
                                            className="w-16 h-16 rounded-full"
                                        />
                                        <div>
                                            <div className="font-semibold text-foreground mb-1">
                                                Written by {article.author.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {article.author.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
