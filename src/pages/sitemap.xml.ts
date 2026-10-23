import type { APIRoute } from 'astro';
const paths = ['/', '/personalizar/', '/blocos/', '/restauracao/', '/sobre/', '/como-funciona/', '/privacidade/'];
export const GET: APIRoute = ({ site }) => {
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    paths.map(path => '<url><loc>' + new URL(path, site).toString() + '</loc></url>').join('') + '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
