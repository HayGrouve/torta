// Three variants of the Iliaora marketing page, switchable via ?variant=, throwaway route on /.
import { createFileRoute } from "@tanstack/react-router"
import { PrototypeSwitcher, type VariantKey } from "../prototype/PrototypeSwitcher"
import { VariantA } from "../prototype/VariantA"
import { VariantB } from "../prototype/VariantB"
import { VariantC } from "../prototype/VariantC"

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { variant: VariantKey } => {
    const v = search.variant
    return { variant: v === "B" || v === "C" ? v : "A" }
  },
  component: Page,
})

function Page() {
  const { variant } = Route.useSearch()
  return (
    <>
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      <PrototypeSwitcher />
      <p className="sr-only">
        Prototype state: variant={variant}
      </p>
    </>
  )
}
