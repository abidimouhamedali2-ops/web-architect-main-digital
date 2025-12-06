export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image: string;
  color: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  gallery?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "fintech-dashboard",
    title: "Fintech Dashboard",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-blue-500/20 to-purple-500/20",
    description: "A comprehensive financial analytics platform featuring real-time data visualization, portfolio tracking, and AI-powered investment insights. Built for scalability and security with enterprise-grade features.",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    liveUrl: "https://demo-fintech.example.com",
    githubUrl: "https://github.com/example/fintech-dashboard",
    challenge: "The client needed a real-time financial dashboard that could handle millions of transactions while providing instant insights to traders and investors. The platform had to be both powerful for professional traders and intuitive for individual investors.",
    solution: "We built a sophisticated real-time data pipeline using WebSockets and Redis for caching, implemented advanced D3.js visualizations for complex financial data, and created a modular architecture that allows for easy feature additions. The dashboard includes portfolio tracking, market analysis, predictive AI models, and customizable alerts.",
    results: [
      "Increased trading efficiency by 45% through real-time data updates",
      "Reduced data latency from 5 seconds to under 100ms",
      "Achieved 99.99% uptime over 12 months",
      "Supported 50,000+ concurrent users during peak trading hours",
      "Client reported 40% increase in user retention"
    ],
    testimonial: {
      quote: "This platform transformed how our users interact with their investments. The real-time insights and intuitive interface have been game-changing for our business.",
      author: "Sarah Mitchell",
      position: "CTO, FinanceHub"
    },
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "from-amber-500/20 to-orange-500/20",
    description: "Modern headless e-commerce solution built for a premium fashion brand, featuring AI-powered recommendations, instant checkout, and a seamless omnichannel experience across web, mobile, and in-store.",
    technologies: ["Next.js", "Stripe", "Sanity CMS", "Tailwind CSS", "Shopify API", "Vercel", "Algolia"],
    liveUrl: "https://demo-shop.example.com",
    challenge: "A luxury fashion retailer needed to modernize their outdated e-commerce platform while maintaining their brand identity. They required a system that could handle high traffic during flash sales, provide personalized shopping experiences, and integrate with their existing inventory management system.",
    solution: "We implemented a headless commerce architecture using Next.js for blazing-fast performance and Sanity CMS for flexible content management. The platform features AI-driven product recommendations, one-click checkout with Stripe, advanced search with Algolia, and real-time inventory synchronization across all channels.",
    results: [
      "300% increase in mobile conversion rates",
      "Page load times reduced from 8s to under 1.5s",
      "Average order value increased by 65% with AI recommendations",
      "Customer satisfaction score improved to 4.8/5",
      "Successfully handled 100K+ concurrent users during Black Friday"
    ],
    testimonial: {
      quote: "Our new platform not only looks stunning but performs exceptionally. Sales have tripled since launch, and our customers love the seamless shopping experience.",
      author: "Marcus Chen",
      position: "CEO, LuxeFashion"
    },
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "health-wellness-app",
    title: "Health & Wellness App",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    color: "from-emerald-500/20 to-teal-500/20",
    description: "A holistic health tracking application designed to help users achieve their wellness goals through personalized plans, real-time progress tracking, community support, and integration with popular health devices.",
    technologies: ["React Native", "Firebase", "HealthKit", "Google Fit", "TensorFlow", "Node.js"],
    liveUrl: "https://apps.apple.com/demo-health-app",
    githubUrl: "https://github.com/example/health-app",
    challenge: "Create a comprehensive wellness app that motivates users to maintain healthy habits while respecting privacy and providing personalized guidance. The app needed to work seamlessly across iOS and Android and integrate with multiple health tracking devices.",
    solution: "Built a cross-platform mobile app with React Native that uses machine learning to provide personalized health recommendations. Integrated with HealthKit and Google Fit for automatic activity tracking, implemented a social feature for community support, and created an engaging gamification system to boost user retention.",
    results: [
      "Over 500K downloads in the first 6 months",
      "4.7-star rating on both App Store and Play Store",
      "85% of users report improved health habits after 30 days",
      "Average session time of 12 minutes (industry avg: 3 minutes)",
      "Featured in 'Best Health Apps of 2024' by multiple publications"
    ],
    testimonial: {
      quote: "The app's intuitive design and smart features have helped thousands of our members achieve their health goals. It's become an essential part of our wellness program.",
      author: "Dr. Emily Rodriguez",
      position: "Wellness Director, HealthFirst"
    },
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "real-estate-portal",
    title: "Real Estate Portal",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    color: "from-rose-500/20 to-pink-500/20",
    description: "Enterprise property listing platform with advanced search filters, 3D virtual tours, integrated mortgage calculators, CRM for agents, and automated lead management. Designed to revolutionize the property search experience.",
    technologies: ["Vue.js", "Mapbox", "Three.js", "Express", "MongoDB", "Docker", "AWS S3"],
    liveUrl: "https://demo-realestate.example.com",
    challenge: "A major real estate agency needed a modern platform that could showcase properties with immersive virtual tours, provide advanced search capabilities, and streamline agent workflows. The platform had to handle thousands of listings while maintaining fast performance.",
    solution: "Developed a Vue.js application with 3D virtual tours using Three.js, implemented intelligent search with location-based filtering using Mapbox, created an integrated CRM for agent management, and built automated lead distribution. The platform includes mortgage calculators, neighborhood insights, and AI-powered property matching.",
    results: [
      "Property views increased by 220%",
      "Lead conversion rate improved by 45%",
      "Average time-to-sale reduced by 30%",
      "Agent productivity increased by 60% with CRM integration",
      "Won 'Best Real Estate Platform' at PropTech Awards 2024"
    ],
    testimonial: {
      quote: "This platform has completely transformed our business. The virtual tours and intelligent matching have made property hunting efficient and enjoyable for our clients.",
      author: "James Thompson",
      position: "Managing Director, Premier Properties"
    },
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "saas-analytics-platform",
    title: "SaaS Analytics Platform",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-indigo-500/20 to-purple-500/20",
    description: "Enterprise-grade analytics platform for SaaS companies to track user behavior, monitor product metrics, and make data-driven decisions. Features real-time dashboards, custom reporting, and predictive analytics.",
    technologies: ["React", "TypeScript", "GraphQL", "ClickHouse", "Kubernetes", "Apache Kafka"],
    liveUrl: "https://demo-analytics.example.com",
    githubUrl: "https://github.com/example/saas-analytics",
    challenge: "SaaS companies were struggling with fragmented analytics tools and needed a unified platform that could process millions of events per second while providing actionable insights in real-time.",
    solution: "Built a scalable analytics engine using ClickHouse for ultra-fast queries, implemented event streaming with Apache Kafka, created customizable dashboards with React and GraphQL, and developed ML models for churn prediction and user segmentation.",
    results: [
      "Processes 10M+ events per second with sub-second query times",
      "Helped clients reduce churn by an average of 35%",
      "Used by 500+ SaaS companies worldwide",
      "Achieved $2M ARR within 18 months of launch",
      "99.95% uptime SLA consistently met"
    ],
    testimonial: {
      quote: "Finally, an analytics platform that keeps up with our growth. The insights we've gained have been invaluable for product development and customer retention.",
      author: "Rachel Kim",
      position: "VP of Product, CloudSync"
    }
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    color: "from-pink-500/20 to-purple-500/20",
    description: "A beautiful, customizable portfolio platform for creatives, designers, and artists. Features stunning templates, drag-and-drop builder, and seamless integration with social media and e-commerce.",
    technologies: ["Gatsby", "React", "GraphQL", "Contentful", "Netlify", "Stripe"],
    liveUrl: "https://demo-creative.example.com",
    challenge: "Creatives needed a platform to showcase their work professionally without dealing with complex technical setup. The platform had to be both beautiful and highly customizable while maintaining excellent performance.",
    solution: "Created a Gatsby-based platform with beautiful pre-built templates, implemented a visual drag-and-drop editor for customization, integrated with Contentful for easy content management, and added e-commerce capabilities for selling digital products and services.",
    results: [
      "Over 50,000 portfolios created in first year",
      "Average Lighthouse score of 95+/100",
      "Users report 3x more client inquiries",
      "Featured on Awwwards and CSS Design Awards",
      "90% user satisfaction rating"
    ],
    testimonial: {
      quote: "I went from zero web presence to having a stunning portfolio in hours. The platform is intuitive, beautiful, and has directly led to new client projects.",
      author: "Alexandra Moore",
      position: "Freelance Designer"
    }
  }
];
