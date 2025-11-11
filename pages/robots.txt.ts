import { GetServerSideProps } from 'next';

function generateRobotsTxt() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisdom-circle-malahida.com';

  return `User-agent: *
Allow: /
Disallow: /hwaya
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
}

function RobotsTxt() {
  // This component will never be rendered
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = generateRobotsTxt();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

export default RobotsTxt;

