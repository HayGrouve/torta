import { createFileRoute } from "@tanstack/react-router"
import { MarketingPage } from "#/marketing/MarketingPage.tsx"

export const Route = createFileRoute("/")({
  component: MarketingPage,
})
