import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const approved = import.meta.env.PUBLIC_SITE_APPROVED === 'true';
  return new Response(
    approved ? 'User-agent: *\nAllow: /\nSitemap: ' + new URL('/sitemap.xml', site).toString() + '\n' : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
