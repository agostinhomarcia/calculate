export default function handler(req, res) {
  // Define o cabeçalho como XML
  res.setHeader('Content-Type', 'application/xml');

  // Cria o XML do sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://calcularbrasil.com.br</loc>
    <lastmod>2024-04-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  res.send(xml);
} 