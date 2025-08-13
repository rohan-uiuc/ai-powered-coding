import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
const siteUrl = process.env.SITE_URL || vercelUrl || 'http://localhost:3030'

const distDir = path.resolve(process.cwd(), 'dist')
await mkdir(distDir, { recursive: true })

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap.trim() + '\n')

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

await writeFile(path.join(distDir, 'robots.txt'), robots)

console.log('Generated sitemap.xml and robots.txt in dist/')