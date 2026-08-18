import type { ReactNode } from "react"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { documentHead } from "#/marketing/document-head.ts"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => {
    const head = documentHead()
    return {
      meta: head.meta,
      links: [{ rel: "stylesheet", href: appCss }, ...head.links],
      scripts: head.scripts,
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="bg">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
