import { EMAILJS_CONFIG, RATE_LIMITS } from '@/config/api';

// Track last email send time to prevent spam
const emailCooldowns = new Map<string, number>();

interface EmailParams {
    name: string;
    email: string;
    message: string;
}

interface EmailResponse {
    success: boolean;
    message: string;
    error?: string;
}

/**
 * Check if user can send email (rate limiting)
 */
const canSendEmail = (email: string): boolean => {
    const lastSent = emailCooldowns.get(email);
    if (!lastSent) return true;

    const timeSinceLastEmail = Date.now() - lastSent;
    return timeSinceLastEmail >= RATE_LIMITS.EMAIL_COOLDOWN_MS;
};

/**
 * Send email via EmailJS
 * Note: Requires EmailJS library to be installed
 */
export const sendContactEmail = async (params: EmailParams): Promise<EmailResponse> => {
    try {
        // Rate limiting check
        if (!canSendEmail(params.email)) {
            const cooldownSeconds = Math.ceil(RATE_LIMITS.EMAIL_COOLDOWN_MS / 1000);
            return {
                success: false,
                message: `Please wait ${cooldownSeconds} seconds before sending another message.`,
                error: 'RATE_LIMIT',
            };
        }

        // Validate required fields
        if (!params.name || !params.email || !params.message) {
            return {
                success: false,
                message: 'Please fill in all required fields.',
                error: 'VALIDATION_ERROR',
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.email)) {
            return {
                success: false,
                message: 'Please enter a valid email address.',
                error: 'INVALID_EMAIL',
            };
        }

        // Check if EmailJS is configured
        if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key_here') {
            console.warn('EmailJS not configured. Email simulation mode.');

            // Simulate email sending in development
            console.log('📧 Contact Form Submission (Simulated):');
            console.log('From:', params.name, `<${params.email}>`);
            console.log('Message:', params.message);

            return {
                success: true,
                message: 'Message received! (EmailJS not configured - simulation mode)',
            };
        }

        // Prepare template parameters
        const templateParams = {
            from_name: params.name,
            from_email: params.email,
            message: params.message,
            to_name: 'Nexus Team',
            reply_to: params.email,
        };

        // Send email using EmailJS
        // Note: This requires the emailjs-com package
        const { default: emailjs } = await import('@emailjs/browser');

        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        );

        if (response.status === 200) {
            // Set cooldown
            emailCooldowns.set(params.email, Date.now());

            return {
                success: true,
                message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
            };
        }

        return {
            success: false,
            message: 'Failed to send message. Please try again.',
            error: 'SEND_FAILED',
        };

    } catch (error: any) {
        console.error('Email send error:', error);

        // Handle specific EmailJS errors
        if (error.text) {
            return {
                success: false,
                message: 'Email service error. Please try again later.',
                error: error.text,
            };
        }

        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
            error: error.message || 'UNKNOWN_ERROR',
        };
    }
};

/**
 * Fallback: Send email data to Supabase (already configured in the app)
 * This provides a backup if EmailJS fails
 */
export const saveToDatabase = async (params: EmailParams): Promise<EmailResponse> => {
    try {
        const { supabase } = await import('@/integrations/supabase/client');

        const { error } = await supabase.from('contacts').insert({
            name: params.name,
            email: params.email,
            message: params.message,
        });

        if (error) throw error;

        return {
            success: true,
            message: 'Your message has been saved. We\'ll contact you soon!',
        };
    } catch (error: any) {
        console.error('Database save error:', error);
        return {
            success: false,
            message: 'Failed to save message.',
            error: error.message,
        };
    }
};

/**
 * Hybrid approach: Try EmailJS first, fall back to database
 */
export const sendContactMessage = async (params: EmailParams): Promise<EmailResponse> => {
    // Try EmailJS first
    const emailResult = await sendContactEmail(params);

    if (emailResult.success) {
        // Also save to database for backup
        saveToDatabase(params).catch(err =>
            console.warn('Database backup failed:', err)
        );
        return emailResult;
    }

    // If EmailJS fails, save to database
    console.warn('EmailJS failed, using database fallback');
    return saveToDatabase(params);
};
