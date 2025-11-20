import type { APIRoute } from 'astro';

// This is a placeholder RSS feed. Update with actual blog/news content
const items = [
  {
    title: 'Transformasi Digital: Panduan Lengkap untuk Bisnis Modern',
    link: 'https://progotek.pages.dev/id/blog/digital-transformation-guide',
    description: 'Pelajari bagaimana transformasi digital dapat meningkatkan efisiensi dan pertumbuhan bisnis Anda.',
    pubDate: new Date('2024-01-15').toUTCString(),
    category: 'Digital Transformation',
  },
  {
    title: 'Keamanan Siber: 10 Praktik Terbaik untuk Melindungi Bisnis Anda',
    link: 'https://progotek.pages.dev/id/blog/cybersecurity-best-practices',
    description: 'Strategi keamanan siber yang wajib diterapkan untuk melindungi data dan sistem perusahaan.',
    pubDate: new Date('2024-01-10').toUTCString(),
    category: 'Cybersecurity',
  },
  {
    title: 'Cloud Computing: Mengapa Bisnis Anda Membutuhkannya',
    link: 'https://progotek.pages.dev/id/blog/cloud-computing-benefits',
    description: 'Manfaat cloud computing untuk skalabilitas, efisiensi, dan inovasi bisnis.',
    pubDate: new Date('2024-01-05').toUTCString(),
    category: 'Cloud Solutions',
  },
];

function generateRSS() {
  const baseUrl = 'https://progotek.pages.dev';
  const now = new Date().toUTCString();
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>ConsultIT - TechCorp Blog</title>
    <link>${baseUrl}</link>
    <description>Insights, tips, dan berita terbaru tentang teknologi, transformasi digital, dan solusi IT untuk bisnis modern.</description>
    <language>id</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} ConsultIT - TechCorp</copyright>
    <managingEditor>info@progotek.pages.dev (ConsultIT Team)</managingEditor>
    <webMaster>webmaster@progotek.pages.dev (ConsultIT Webmaster)</webMaster>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>ConsultIT - TechCorp</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
`;

  items.forEach(item => {
    rss += `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <guid isPermaLink="true">${item.link}</guid>
      <dc:creator>ConsultIT Team</dc:creator>
    </item>
`;
  });

  rss += `  </channel>
</rss>`;
  
  return rss;
}

export const GET: APIRoute = () => {
  return new Response(generateRSS(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
