import type { APIRoute } from 'astro';

const pages = [
  { url: '', priority: 1.0, changefreq: 'daily' },
  { url: 'services', priority: 0.9, changefreq: 'weekly' },
  { url: 'about-us', priority: 0.8, changefreq: 'monthly' },
  { url: 'cases', priority: 0.8, changefreq: 'weekly' },
  { url: 'show-case', priority: 0.7, changefreq: 'weekly' },
  { url: 'contact-us', priority: 0.9, changefreq: 'monthly' },
];

const languages = ['id', 'en'];

function generateSitemap() {
  const baseUrl = 'https://progotek.pages.dev';
  const now = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Generate URLs for each page and language
  pages.forEach(page => {
    languages.forEach(lang => {
      const url = `${baseUrl}/${lang}/${page.url}`;
      const alternates = languages
        .map(altLang => {
          const altUrl = `${baseUrl}/${altLang}/${page.url}`;
          return `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}"/>`;
        })
        .join('\n');

      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/id/${page.url}"/>
  </url>
`;
    });
  });

  sitemap += `</urlset>`;
  return sitemap;
}

export const GET: APIRoute = () => {
  return new Response(generateSitemap(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
};
