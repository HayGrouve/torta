import { createFileRoute } from "@tanstack/react-router"
import { isPreviewHost } from "#/marketing/document-head.ts"
import { SITE_URL } from "#/marketing/copy.ts"

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = isPreviewHost()
          ? "User-agent: *\nDisallow: /\n"
          : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        })
      },
    },
  },
})
