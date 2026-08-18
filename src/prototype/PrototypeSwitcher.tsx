import { useEffect } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"

export const VARIANT_KEYS = ["A", "B", "C"] as const
export type VariantKey = (typeof VARIANT_KEYS)[number]

export const VARIANT_NAMES: Record<VariantKey, string> = {
  A: "Editorial cream",
  B: "Split atelier",
  C: "Dark cocoa",
}

function cycle(current: VariantKey, dir: 1 | -1): VariantKey {
  const i = VARIANT_KEYS.indexOf(current)
  return VARIANT_KEYS[(i + dir + VARIANT_KEYS.length) % VARIANT_KEYS.length]
}

export function PrototypeSwitcher() {
  const { variant } = useSearch({ from: "/" })
  const navigate = useNavigate({ from: "/" })

  const go = (next: VariantKey) => {
    void navigate({ search: { variant: next }, replace: true })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target
      if (
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return
      }
      if (e.key === "ArrowLeft") go(cycle(variant, -1))
      if (e.key === "ArrowRight") go(cycle(variant, 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [variant, navigate])

  if (process.env.NODE_ENV === "production") return null

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-black px-3 py-2 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      role="group"
      aria-label="Prototype variants"
    >
      <button
        type="button"
        className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-lg leading-none"
        onClick={() => go(cycle(variant, -1))}
        aria-label="Previous variant"
      >
        ←
      </button>
      <div className="min-w-[11rem] text-center text-xs tracking-wide">
        <span className="font-semibold">{variant}</span>
        <span className="text-white/70"> — {VARIANT_NAMES[variant]}</span>
      </div>
      <button
        type="button"
        className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-lg leading-none"
        onClick={() => go(cycle(variant, 1))}
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  )
}
