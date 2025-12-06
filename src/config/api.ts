// API Configuration and Integration Layer for Nexus Website

/**
 * EMAILJS CONFIGURATION
 * Free tier: 200 emails/month
 * Setup: https://www.emailjs.com/
 */
export const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_nexus',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_nexus_contact',
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here',
};

/**
 * GOOGLE ANALYTICS CONFIGURATION
 * Setup: https://analytics.google.com/
 */
export const ANALYTICS_CONFIG = {
    MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

/**
 * GITHUB API CONFIGURATION
 * For fetching project data dynamically
 */
export const GITHUB_CONFIG = {
    USERNAME: import.meta.env.VITE_GITHUB_USERNAME || 'nexus-studio',
    ACCESS_TOKEN: import.meta.env.VITE_GITHUB_TOKEN, // Optional, for higher rate limits
};

/**
 * CONTENTFUL CMS CONFIGURATION (Optional)
 * For dynamic blog content
 * Setup: https://www.contentful.com/
 */
export const CONTENTFUL_CONFIG = {
    SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    ENVIRONMENT: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
};

/**
 * API BASE URLS
 */
export const API_URLS = {
    GITHUB_API: 'https://api.github.com',
    EMAILJS_API: 'https://api.emailjs.com/api/v1.0',
};

/**
 * Rate Limiting Configuration
 */
export const RATE_LIMITS = {
    EMAIL_COOLDOWN_MS: 60000, // 1 minute between emails from same user
    API_RETRY_ATTEMPTS: 3,
    API_TIMEOUT_MS: 10000, // 10 seconds
};

/**
 * Feature Flags
 * Enable/disable features based on API availability
 */
export const FEATURES = {
    EMAIL_INTEGRATION: true, // EmailJS for contact form
    ANALYTICS: true, // Google Analytics
    DYNAMIC_BLOG: false, // Contentful CMS (set to true when configured)
    GITHUB_PROJECTS: false, // GitHub API for projects (set to true when configured)
    SOCIAL_SHARING: true, // Social media sharing
};
