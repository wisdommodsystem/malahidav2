import { GetServerSideProps } from 'next';
import connectDB from '@/lib/mongodb';
import Article, { IArticle } from '@/models/Article'; // تأكد أن الموديل عندك فيه interface IArticle فيها slug و updatedAt

// دالة توليد الـ Sitemap
function generateSiteMap(articles: Array<{ slug: string; updatedAt: string }>) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://wisdom-circle-malahida.com';

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseUrl}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/articles</loc>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${baseUrl}/hedra</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${baseUrl}/contact</loc>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     ${articles
       .map(
         (article) => `
       <url>
           <loc>${baseUrl}/articles/${article.slug}</loc>
           <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.8</priority>
       </url>`
       )
       .join('')}
   </urlset>`;
}

// Component placeholder (لن يتم عرضه)
function SiteMap() {
  return null;
}

// Server-side generation
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  await connectDB();

  // نحدد نوع البيانات يدوياً باش TypeScript يعرف شكلها
  const articles = (await Article.find({ approved: true })
    .select('slug updatedAt')
    .lean()) as Array<{ slug: string; updatedAt: string }>;

  const sitemap = generateSiteMap(articles);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
