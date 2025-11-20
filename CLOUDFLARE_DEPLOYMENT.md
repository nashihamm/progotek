# 🚀 Cloudflare Pages Deployment Guide

## 📋 Overview

Website ini dikonfigurasi untuk deployment optimal di **Cloudflare Pages** dengan fitur-fitur:

✅ **Global CDN** - 300+ data centers worldwide
✅ **Automatic HTTPS** - SSL certificate otomatis
✅ **DDoS Protection** - Enterprise-grade security
✅ **Web Analytics** - Privacy-first analytics
✅ **Edge Caching** - Ultra-fast content delivery
✅ **Custom Headers** - Security dan performance headers
✅ **Redirects** - SEO-friendly URL management

---

## 🎯 Quick Deployment

### Method 1: Git Integration (Recommended)

1. **Push ke Git Repository**
   ```bash
   git add .
   git commit -m "Initial commit with advanced SEO"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to **Pages** → **Create a project**
   - Connect your Git repository (GitHub/GitLab)
   - Select repository: `consultit`

3. **Build Configuration**
   ```
   Framework preset: Astro
   Build command: pnpm run build
   Build output directory: dist
   Root directory: /
   ```

4. **Environment Variables** (Optional)
   ```
   NODE_VERSION = 18
   ```

5. **Deploy!**
   - Click **Save and Deploy**
   - Wait 2-3 minutes for first build
   - Your site will be live at: `consultit.pages.dev`

### Method 2: Wrangler CLI

1. **Install Wrangler**
   ```bash
   pnpm add -D wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **Deploy**
   ```bash
   pnpm run build
   npx wrangler pages deploy dist --project-name=consultit
   ```

---

## ⚙️ Configuration Files

### 1. Headers Configuration
**File:** `public/_headers`

Cloudflare Pages automatically applies headers from this file:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Strict-Transport-Security: max-age=63072000
  Content-Security-Policy: [policy]
```

**Features:**
- Security headers (XSS, Clickjacking protection)
- Cache control for optimal performance
- CORS headers for fonts
- Content-Type headers

### 2. Redirects Configuration
**File:** `public/_redirects`

```
/  /id/  302
/sitemap_index.xml  /sitemap.xml  301
```

**Features:**
- Root to default language redirect
- SEO-friendly 301 redirects
- Trailing slash handling

### 3. Wrangler Configuration
**File:** `wrangler.toml`

```toml
name = "consultit"
compatibility_date = "2024-01-15"

[build]
command = "pnpm run build"
dir = "dist"
```

---

## 🌐 Custom Domain Setup

### 1. Add Custom Domain

1. Go to **Pages** → Your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `progotek.pages.dev`
4. Click **Continue**

### 2. DNS Configuration

Cloudflare will automatically configure DNS if domain is on Cloudflare:

```
Type: CNAME
Name: progotek.pages.dev
Target: consultit.pages.dev
Proxy: Enabled (Orange cloud)
```

For www subdomain:
```
Type: CNAME
Name: www
Target: consultit.pages.dev
Proxy: Enabled
```

### 3. SSL/TLS Configuration

1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode: **Full (strict)**
3. Enable **Always Use HTTPS**
4. Enable **Automatic HTTPS Rewrites**

---

## 🔒 Security Configuration

### 1. Security Headers

Already configured in `public/_headers`:

- ✅ **X-Frame-Options: DENY** - Clickjacking protection
- ✅ **X-Content-Type-Options: nosniff** - MIME sniffing protection
- ✅ **X-XSS-Protection** - XSS filter
- ✅ **Strict-Transport-Security** - HTTPS enforcement
- ✅ **Content-Security-Policy** - XSS and injection protection
- ✅ **Referrer-Policy** - Privacy protection
- ✅ **Permissions-Policy** - Feature control

### 2. Cloudflare Security Features

Enable in Cloudflare Dashboard:

**Security → WAF**
- ✅ Enable Managed Rules
- ✅ Enable OWASP Core Ruleset
- ✅ Enable Cloudflare Managed Ruleset

**Security → DDoS**
- ✅ Automatic DDoS protection (always on)

**Security → Bots**
- ✅ Enable Bot Fight Mode (free)
- ✅ Or upgrade to Bot Management (paid)

**SSL/TLS → Edge Certificates**
- ✅ Always Use HTTPS: On
- ✅ Automatic HTTPS Rewrites: On
- ✅ Minimum TLS Version: 1.2
- ✅ TLS 1.3: On

---

## ⚡ Performance Optimization

### 1. Caching Configuration

**Already configured in `public/_headers`:**

```
# Static assets - 1 year cache
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# HTML - 1 hour cache
/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

### 2. Cloudflare Performance Features

**Speed → Optimization**
- ✅ Auto Minify: HTML, CSS, JS
- ✅ Brotli compression: On
- ✅ Early Hints: On
- ✅ HTTP/2: On
- ✅ HTTP/3 (QUIC): On

**Caching → Configuration**
- ✅ Caching Level: Standard
- ✅ Browser Cache TTL: Respect Existing Headers
- ✅ Always Online: On

### 3. Image Optimization

Enable Cloudflare Images (optional, paid):
- Automatic WebP/AVIF conversion
- Responsive images
- Lazy loading
- Polish (lossy/lossless compression)

Or use free alternatives:
- Manual WebP conversion
- Astro Image optimization
- External CDN (Cloudinary, ImageKit)

---

## 📊 Analytics Setup

### 1. Cloudflare Web Analytics (Free)

**Privacy-first, no cookies required:**

1. Go to **Analytics** → **Web Analytics**
2. Click **Add a site**
3. Enter site name: `ConsultIT`
4. Copy the script tag
5. Add to `src/layouts/Layout.astro`:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

**Features:**
- Page views
- Unique visitors
- Bounce rate
- Page load time
- Core Web Vitals
- No cookie consent needed

### 2. Google Analytics 4

Already configured in Layout.astro:

```javascript
gtag('config', 'G-XXXXXXXXXX');  // Replace with your GA4 ID
```

### 3. Microsoft Clarity (Optional)

Already configured in Layout.astro:

```javascript
clarity("script", "YOUR_CLARITY_ID");  // Replace with your Clarity ID
```

---

## 🚀 Deployment Workflow

### Automatic Deployments

**Production Branch (main):**
```bash
git push origin main
```
- Triggers automatic build
- Deploys to production
- Available at: progotek.pages.dev

**Preview Branches:**
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```
- Creates preview deployment
- Available at: feature-new-feature.consultit.pages.dev
- Perfect for testing

### Manual Deployments

```bash
# Build locally
pnpm run build

# Deploy with Wrangler
npx wrangler pages deploy dist --project-name=consultit
```

---

## 🔍 SEO Configuration

### 1. Sitemap Submission

**Google Search Console:**
1. Add property: `https://progotek.pages.dev`
2. Verify ownership
3. Submit sitemap: `https://progotek.pages.dev/sitemap.xml`

**Bing Webmaster Tools:**
1. Add site: `https://progotek.pages.dev`
2. Verify ownership
3. Submit sitemap: `https://progotek.pages.dev/sitemap.xml`

### 2. Robots.txt

Already configured at `public/robots.txt`:
- Allows all major search engines
- Blocks bad bots
- Lists sitemap location

### 3. Structured Data

Already implemented:
- Organization schema
- Service schema
- FAQ schema
- Breadcrumb schema
- WebSite schema with SearchAction

**Test with:**
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

## 🌍 Multi-Language Setup

### Current Configuration

- **Default Language:** Indonesian (id)
- **Supported Languages:** Indonesian, English
- **URL Structure:** `/id/page` and `/en/page`
- **Hreflang Tags:** Automatic
- **Language Switcher:** In header

### Cloudflare Configuration

**Rules → Page Rules** (Optional):
```
progotek.pages.dev/*
- Cache Level: Cache Everything
- Edge Cache TTL: 2 hours
```

**Rules → Transform Rules** (Optional):
```
# Redirect based on Accept-Language header
If Accept-Language contains "en"
Then rewrite to /en/
```

---

## 📈 Monitoring & Maintenance

### 1. Cloudflare Analytics

**Real-time Metrics:**
- Requests
- Bandwidth
- Threats blocked
- Cache hit ratio
- Response time

**Access:** Dashboard → Analytics

### 2. Performance Monitoring

**Tools:**
- Cloudflare Web Analytics
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**Target Metrics:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- TTFB < 800ms

### 3. Error Monitoring

**Cloudflare Logs:**
- Access logs
- Error logs
- Security events

**Enable:** Dashboard → Analytics → Logs

---

## 🛠️ Troubleshooting

### Common Issues

**Issue:** Build fails
**Solution:**
```bash
# Check build locally
pnpm run build

# Check Node version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf node_modules dist .astro
pnpm install
pnpm run build
```

**Issue:** Headers not applied
**Solution:**
- Verify `public/_headers` file exists
- Check syntax (no tabs, proper spacing)
- Clear Cloudflare cache
- Wait 5 minutes for propagation

**Issue:** Redirects not working
**Solution:**
- Verify `public/_redirects` file exists
- Check syntax (source → destination → status)
- Clear Cloudflare cache
- Test with curl: `curl -I https://progotek.pages.dev/`

**Issue:** Slow performance
**Solution:**
- Enable Auto Minify
- Enable Brotli compression
- Check cache hit ratio
- Optimize images
- Enable HTTP/3

**Issue:** SSL errors
**Solution:**
- Set SSL/TLS mode to "Full (strict)"
- Enable "Always Use HTTPS"
- Wait for certificate provisioning (up to 24h)
- Check DNS configuration

---

## 📋 Pre-Launch Checklist

### Cloudflare Configuration
- [ ] Custom domain added
- [ ] DNS configured correctly
- [ ] SSL/TLS set to Full (strict)
- [ ] Always Use HTTPS enabled
- [ ] Auto Minify enabled
- [ ] Brotli compression enabled
- [ ] WAF rules enabled
- [ ] Bot protection enabled

### Build Configuration
- [ ] Build succeeds locally
- [ ] All pages render correctly
- [ ] Images load properly
- [ ] Forms work correctly
- [ ] Language switcher works
- [ ] Mobile responsive

### SEO Configuration
- [ ] Sitemap submitted to GSC
- [ ] Robots.txt accessible
- [ ] Meta tags correct
- [ ] Structured data valid
- [ ] Hreflang tags working
- [ ] Canonical URLs correct

### Analytics
- [ ] Google Analytics tracking
- [ ] Cloudflare Analytics enabled
- [ ] Microsoft Clarity (optional)
- [ ] Conversion tracking setup

### Performance
- [ ] PageSpeed score > 90
- [ ] Core Web Vitals passing
- [ ] Images optimized
- [ ] Fonts optimized
- [ ] Cache headers correct

---

## 🎓 Best Practices

### 1. Branch Strategy

```
main (production)
├── develop (staging)
└── feature/* (preview)
```

### 2. Environment Variables

Set in Cloudflare Dashboard:
```
Production:
- GA4_ID = G-XXXXXXXXXX
- CLARITY_ID = YOUR_CLARITY_ID

Preview:
- GA4_ID = G-PREVIEW-ID
- CLARITY_ID = PREVIEW_CLARITY_ID
```

### 3. Cache Strategy

```
Static Assets: 1 year (immutable)
HTML Pages: 1 hour (must-revalidate)
API Routes: No cache
Sitemap/RSS: 1 hour
```

### 4. Security

- Always use HTTPS
- Enable all security headers
- Regular security audits
- Monitor security events
- Keep dependencies updated

---

## 📞 Support

### Cloudflare Resources
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Status](https://www.cloudflarestatus.com/)

### Project Resources
- Documentation: `SEO_GUIDE.md`
- Checklist: `SEO_CHECKLIST.md`
- Summary: `ADVANCED_SEO_SUMMARY.md`

### Contact
- Email: support@progotek.pages.dev
- Website: https://progotek.pages.dev

---

## 🎉 Ready to Deploy!

Your website is fully configured for Cloudflare Pages with:

✅ Optimal performance configuration
✅ Enterprise-grade security
✅ Advanced SEO optimization
✅ Multi-language support
✅ Analytics integration
✅ Automatic deployments

**Deploy now and go live!** 🚀

---

**Last Updated:** January 2024  
**Version:** 1.0.0  
**Platform:** Cloudflare Pages
