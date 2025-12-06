import { ANALYTICS_CONFIG } from '@/config/api';

/**
 * Google Analytics 4 (GA4) Integration
 * Tracks page views, events, and user interactions
 */

// Check if Google Analytics is loaded
const isGALoaded = (): boolean => {
    return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
};

/**
 * Initialize Google Analytics
 * Call this once on app mount
 */
export const initializeAnalytics = (): void => {
    if (typeof window === 'undefined') return;

    const measurementId = ANALYTICS_CONFIG.MEASUREMENT_ID;

    // Skip if already initialized or no measurement ID
    if (isGALoaded() || measurementId === 'G-XXXXXXXXXX') {
        console.log('📊 Analytics: Skipped (not configured or already loaded)');
        return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
    });
  `;
    document.head.appendChild(script2);

    console.log('📊 Google Analytics initialized:', measurementId);
};

/**
 * Track page view
 */
export const trackPageView = (page: string): void => {
    if (!isGALoaded()) return;

    window.gtag('config', ANALYTICS_CONFIG.MEASUREMENT_ID, {
        page_path: page,
    });

    console.log('📄 Page view tracked:', page);
};

/**
 * Track custom event
 */
export const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
): void => {
    if (!isGALoaded()) {
        console.log('📊 Event (not tracked):', eventName, eventParams);
        return;
    }

    window.gtag('event', eventName, eventParams);
    console.log('✅ Event tracked:', eventName, eventParams);
};

/**
 * Pre-defined event trackers
 */
export const analytics = {
    // Portfolio interactions
    viewProject: (projectTitle: string) => {
        trackEvent('view_project', {
            event_category: 'Portfolio',
            event_label: projectTitle,
        });
    },

    // Blog interactions
    readArticle: (articleTitle: string, readTime: string) => {
        trackEvent('read_article', {
            event_category: 'Blog',
            event_label: articleTitle,
            value: readTime,
        });
    },

    shareArticle: (articleTitle: string, platform: string) => {
        trackEvent('share', {
            event_category: 'Blog',
            event_label: articleTitle,
            method: platform,
        });
    },

    // Contact interactions
    submitContactForm: (success: boolean) => {
        trackEvent('contact_form_submit', {
            event_category: 'Contact',
            event_label: success ? 'Success' : 'Failed',
            value: success ? 1 : 0,
        });
    },

    // Navigation
    clickCTA: (ctaName: string, location: string) => {
        trackEvent('cta_click', {
            event_category: 'Navigation',
            event_label: ctaName,
            location: location,
        });
    },

    scrollToSection: (sectionName: string) => {
        trackEvent('scroll_to_section', {
            event_category: 'Navigation',
            event_label: sectionName,
        });
    },

    // Footer
    clickFooterLink: (linkName: string, linkType: string) => {
        trackEvent('footer_link_click', {
            event_category: 'Footer',
            event_label: linkName,
            link_type: linkType,
        });
    },

    clickSocialLink: (platform: string) => {
        trackEvent('social_link_click', {
            event_category: 'Social',
            event_label: platform,
        });
    },

    // Engagement
    timeOnSite: (seconds: number) => {
        trackEvent('time_on_site', {
            event_category: 'Engagement',
            value: seconds,
        });
    },

    downloadResource: (resourceName: string) => {
        trackEvent('download', {
            event_category: 'Resources',
            event_label: resourceName,
        });
    },
};

/**
 * Track user properties (optional)
 */
export const setUserProperties = (properties: Record<string, any>): void => {
    if (!isGALoaded()) return;

    window.gtag('set', 'user_properties', properties);
};

/**
 * TypeScript declarations for gtag
 */
declare global {
    interface Window {
        gtag: (
            command: string,
            targetId: string,
            config?: Record<string, any>
        ) => void;
        dataLayer: any[];
    }
}
