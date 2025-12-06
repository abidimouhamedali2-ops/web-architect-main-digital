import { analytics } from './analyticsService';

/**
 * Social Media Sharing Service
 * Provides easy sharing to various social platforms
 */

export interface ShareOptions {
    title: string;
    text?: string;
    url?: string;
    hashtags?: string[];
}

/**
 * Share to Twitter/X
 */
export const shareToTwitter = (options: ShareOptions): void => {
    const url = options.url || window.location.href;
    const text = options.text || options.title;
    const hashtags = options.hashtags?.join(',') || '';

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}${hashtags ? `&hashtags=${hashtags}` : ''}`;

    window.open(shareUrl, '_blank', 'width=550,height=420');
    analytics.shareArticle(options.title, 'Twitter');
};

/**
 * Share to LinkedIn
 */
export const shareToLinkedIn = (options: ShareOptions): void => {
    const url = options.url || window.location.href;

    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank', 'width=550,height=420');
    analytics.shareArticle(options.title, 'LinkedIn');
};

/**
 * Share to Facebook
 */
export const shareToFacebook = (options: ShareOptions): void => {
    const url = options.url || window.location.href;

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank', 'width=550,height=420');
    analytics.shareArticle(options.title, 'Facebook');
};

/**
 * Copy link to clipboard
 */
export const copyLink = async (options: ShareOptions): Promise<boolean> => {
    const url = options.url || window.location.href;

    try {
        await navigator.clipboard.writeText(url);
        analytics.shareArticle(options.title, 'Copy Link');
        return true;
    } catch (error) {
        console.error('Failed to copy link:', error);
        return false;
    }
};

/**
 * Native Web Share API (if available)
 */
export const shareNative = async (options: ShareOptions): Promise<boolean> => {
    if (!navigator.share) {
        console.warn('Native sharing not supported');
        return false;
    }

    try {
        await navigator.share({
            title: options.title,
            text: options.text,
            url: options.url || window.location.href,
        });

        analytics.shareArticle(options.title, 'Native Share');
        return true;
    } catch (error: any) {
        // User cancelled or error occurred
        if (error.name !== 'AbortError') {
            console.error('Share failed:', error);
        }
        return false;
    }
};

/**
 * Check if native sharing is available
 */
export const isNativeShareAvailable = (): boolean => {
    return typeof navigator !== 'undefined' && !!navigator.share;
};

/**
 * Get all available share options
 */
export const getShareOptions = () => {
    return {
        twitter: shareToTwitter,
        linkedin: shareToLinkedIn,
        facebook: shareToFacebook,
        copyLink: copyLink,
        native: isNativeShareAvailable() ? shareNative : null,
    };
};

/**
 * Generate shareable quote/excerpt from content
 */
export const generateShareText = (title: string, excerpt?: string): string => {
    if (excerpt) {
        return `"${excerpt}" - ${title}`;
    }
    return title;
};

/**
 * Share blog article
 */
export const shareArticle = {
    twitter: (title: string, url?: string) =>
        shareToTwitter({
            title,
            url,
            hashtags: ['WebDevelopment', 'Design', 'Tech']
        }),

    linkedin: (title: string, url?: string) =>
        shareToLinkedIn({ title, url }),

    facebook: (title: string, url?: string) =>
        shareToFacebook({ title, url }),

    copy: (title: string, url?: string) =>
        copyLink({ title, url }),
};

/**
 * Share portfolio project
 */
export const shareProject = {
    twitter: (projectTitle: string, url?: string) =>
        shareToTwitter({
            title: `Check out this amazing project: ${projectTitle}`,
            url,
            hashtags: ['Portfolio', 'WebDesign', 'Development']
        }),

    linkedin: (projectTitle: string, url?: string) =>
        shareToLinkedIn({
            title: `Check out this amazing project: ${projectTitle}`,
            url
        }),
};
