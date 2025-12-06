# 🚀 API Integration Guide - Nexus Website

## Overview
This guide documents all API integrations implemented in the Nexus Digital Studio website, including setup instructions, configuration, and usage examples.

---

## 📧 1. EmailJS Integration

### Purpose
Handles contact form submissions by sending emails directly from the frontend without requiring a backend server.

### Setup Instructions

#### Step 1: Create EmailJS Account
1. Visit [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

#### Step 2: Configure Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection wizard
5. Copy the **Service ID** (e.g., `service_abc123`)

#### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Hello Nexus Team,

You have a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}
Reply-To: {{reply_to}}

Message:
{{message}}

---
This email was sent from the Nexus website contact form.
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

#### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abc123XYZ456`)

#### Step 5: Configure Environment Variables
Create/edit `.env.local` in your project root:

```bash
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abc123XYZ456
```

#### Step 6: Restart Development Server
```bash
npm run dev
```

### Usage
The contact form in `ContactSection.tsx` automatically uses EmailJS. When configured, it will:
1. Send email via EmailJS
2. Fall back to Supabase database if EmailJS fails
3. Display success/error messages to users
4. Implement rate limiting (1 email per minute per user)

### Testing
1. Fill out the contact form on your website
2. Click "Send Message"
3. Check your configured email inbox
4. Verify the email was received with correct content

### Free Tier Limitations
- **200 emails/month**
- **1 email service**
- **Basic email templates**
- Upgrade to paid plan for more emails

### Troubleshooting
- **"EmailJS not configured"**: Check environment variables are set correctly
- **"Failed to send"**: Verify Service ID, Template ID, and Public Key
- **Rate limit**: Users can only send 1 email per minute

---

## 📊 2. Google Analytics Integration

### Purpose
Tracks user interactions, page views, and conversion events for data-driven insights.

### Setup Instructions

#### Step 1: Create GA4 Property
1. Visit [https://analytics.google.com/](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Admin** → **Create Property**
4. Enter property name: "Nexus Website"
5. Select timezone and currency
6. Click **Create**

#### Step 2: Create Data Stream
1. Click **Data Streams** → **Add Stream**
2. Select **Web**
3. Enter website URL: `https://your-domain.com`
4. Enter stream name: "Nexus Production"
5. Click **Create Stream**
6. Copy the **Measurement ID** (e.g., `G-ABC123XYZ`)

#### Step 3: Configure Environment Variables
Add to `.env.local`:

```bash
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ
```

#### Step 4: Verify Installation
1. Restart dev server: `npm run dev`
2. Open your website
3. Open browser console - you should see: `📊 Google Analytics initialized: G-ABC123XYZ`
4. In GA4, go to **Reports** → **Realtime** → You should see your visit

### Pre-Configured Events
The following events are automatically tracked:

#### Portfolio Events
- `view_project` - When user opens a project modal
- `filter_portfolio` - When user filters projects by category

#### Blog Events
- `read_article` - When user opens a blog article
- `share_article` - When user shares an article

#### Contact Events
- `contact_form_submit` - When form is submitted (success/failure)

#### Navigation Events
- `cta_click` - When CTA buttons are clicked
- `scroll_to_section` - When smooth scroll is triggered
- `footer_link_click` - When footer links are clicked
- `social_link_click` - When social media links are clicked

### Custom Event Tracking
Add custom tracking in your components:

```typescript
import { analytics } from '@/services/analyticsService';

// Track custom event
analytics.trackEvent('button_click', {
  button_name: 'Download Brochure',
  location: 'Hero Section'
});

// Use pre-defined trackers
analytics.viewProject('Fintech Dashboard');
analytics.clickCTA('Get Started', 'Navbar');
```

### Privacy Considerations
- Analytics is initialized client-side
- No personal data is collected by default
- Users can block analytics with browser extensions
- Consider adding a cookie consent banner for GDPR compliance

---

## 🔗 3. Social Media Sharing

### Purpose
Enables users to share blog articles and portfolio projects on social platforms.

### Supported Platforms
- **Twitter/X**
- **LinkedIn**
- **Facebook**
- **Copy Link** (clipboard)
- **Native Share API** (mobile devices)

### Usage Examples

#### Share Blog Article
```typescript
import { shareArticle } from '@/services/socialService';

// Share to Twitter
shareArticle.twitter('Amazing Article Title');

// Share to LinkedIn
shareArticle.linkedin('Amazing Article Title', 'https://custom-url.com');

// Copy link to clipboard
const success = await shareArticle.copy('Article Title');
if (success) {
  toast({ title: 'Link copied!' });
}
```

#### Share Portfolio Project
```typescript
import { shareProject } from '@/services/socialService';

// Share project to Twitter with hashtags
shareProject.twitter('Fintech Dashboard');

// Share to LinkedIn
shareProject.linkedin('Fintech Dashboard');
```

#### Native Share (Mobile)
```typescript
import { shareNative, isNativeShareAvailable } from '@/services/socialService';

if (isNativeShareAvailable()) {
  await shareNative({
    title: 'Check this out!',
    text: 'Amazing article about web development',
    url: 'https://yoursite.com/article'
  });
}
```

### Auto-Tracking
All shares are automatically tracked in Google Analytics with:
- Platform used
- Content title
- Timestamp

---

## 🗄️ 4. Supabase Database (Fallback)

### Purpose
Stores contact form submissions and provides a fallback if EmailJS fails.

### Already Configured
The project includes Supabase integration out-of-the-box:
- Contact form data is saved to `contacts` table
- Automatic fallback if EmailJS fails
- No additional setup required

### Database Schema
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 Security Best Practices

### Environment Variables
✅ **DO:**
- Store API keys in `.env.local`
- Add `.env.local` to `.gitignore`
- Use different keys for development/production
- Set environment variables in hosting platform (Vercel, Netlify)

❌ **DON'T:**
- Commit API keys to Git
- Share keys publicly
- Use production keys in development

### API Keys Safety
- **EmailJS Public Key**: Safe to expose (it's meant for client-side use)
- **Google Analytics ID**: Safe to expose (it's public anyway)
- **GitHub Tokens**: NEVER expose (use backend proxy if needed)
- **Supabase Keys**: Use **anon key** only (not service key)

### Rate Limiting
Implemented protections:
- Email: 1 per minute per user
- API calls: Timeout after 10 seconds
- Retry logic: Max 3 attempts

---

## 📈 Performance Optimizations

### Lazy Loading
APIs are loaded only when needed:
```typescript
// EmailJS loaded only when form is submitted
const { sendContactMessage } = await import('@/services/emailService');
```

### Caching
- Analytics events are batched
- API responses can be cached with React Query
- Static data loaded once

### Error Handling
All APIs include:
- Try/catch blocks
- User-friendly error messages
- Console logging for debugging
- Graceful fallbacks

---

## 🧪 Testing APIs

### EmailJS Test
```bash
# Browser Console
1. Fill contact form
2. Submit
3. Check console for: "📧 Contact Form Submission"
4. Check email inbox
```

### Analytics Test
```bash
# Browser Console
1. Open website
2. Check for: "📊 Google Analytics initialized"
3. Perform actions (click buttons, open modals)
4. Check console for: "✅ Event tracked: ..."
5. Verify in GA4 Realtime reports
```

### Social Sharing Test
```bash
# Browser Console
1. Try sharing from blog article
2. Verify popup opens (Twitter, LinkedIn, Facebook)
3. Test clipboard copy
4. Test native share on mobile
```

---

## 📊 Monitoring & Analytics

### Key Metrics to Track
1. **Contact Form Conversion Rate**
2. **Most Viewed Projects**
3. **Popular Blog Articles**
4. **Top Traffic Sources**
5. **User Engagement Time**
6. **Button Click Rates**

### Access Your Data

#### Google Analytics
- Dashboard: [analytics.google.com](https://analytics.google.com)
- View realtime data
- Create custom reports
- Set up conversion goals

#### EmailJS
- Dashboard: [dashboard.emailjs.com](https://dashboard.emailjs.com)
- View sent emails
- Monitor delivery rates
- Check monthly quota

---

## 🚀 Deployment Configuration

### Vercel
```bash
# Add environment variables in Vercel dashboard:
Settings → Environment Variables

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Netlify
```bash
# Add in Netlify dashboard:
Site Settings → Environment Variables

Same variables as above
```

### Important Notes
- All variables MUST start with `VITE_` to be accessible
- Redeploy after adding environment variables
- Test in production after deployment

---

## 🔄 Future API Enhancements (Optional)

### Content Management System
Consider integrating:
- **Contentful** - Headless CMS for blog content
- **Strapi** - Self-hosted CMS
- **Sanity** - Real-time collaborative CMS

### GitHub API
Fetch live project data:
- Repository stats
- Recent commits
- Project descriptions

### Newsletter Service
- **Mailchimp** - Email marketing
- **ConvertKit** - Creator-focused
- **SendGrid** - Transactional emails

### Additional Analytics
- **Hotjar** - Heatmaps and session recordings
- **Mixpanel** - Advanced user analytics
- **Plausible** - Privacy-friendly alternative

---

## 📞 Support

### Resources
- EmailJS Docs: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- GA4 Docs: [https://support.google.com/analytics](https://support.google.com/analytics)
- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)

### Need Help?
Check the browser console for detailed error messages and refer to the troubleshooting sections above.

---

**Last Updated**: December 3, 2024  
**Status**: ✅ All APIs Configured and Ready
