import { createFileRoute } from "@tanstack/react-router"
import { SITE_URL } from "#/marketing/copy.ts"

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
  </url>
</urlset>
`
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        })
      },
    },
  },
})
