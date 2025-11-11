import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

function generateSiteMap(articles: Array<{ slug: string; updatedAt: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisdom-circle-malahida.com';

  const staticUrls = [
    '',
    '/articles',
    '/hedra',
    '/about',
    '/contact',
  ];

  const staticXml = staticUrls
    .map((path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>${path === '' || path === '/articles' ? 'daily' : 'monthly'}</changefreq>
      <priority>${path === '' ? '1.0' : path === '/articles' ? '0.9' : '0.7'}</priority>
    </url>
  `)
    .join('');

  const articlesXml = articles
    .map((article) => `
    <url>
      <loc>${baseUrl}/articles/${article.slug}</loc>
      <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${staticXml}
     ${articlesXml}
   </urlset>
 `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    await connectDB();
    const articles = await Article.find({ approved: true })
      .select('slug updatedAt')
      .lean();

    const sitemap = generateSiteMap(
      articles.map((a: any) => ({ slug: a.slug, updatedAt: a.updatedAt }))
    );

    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(sitemap);
  } catch (error: any) {
    return res.status(500).send('Failed to generate sitemap');
  }
}