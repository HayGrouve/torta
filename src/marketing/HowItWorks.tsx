import { CookingPot, MapPin, MessageCircle, Phone } from "lucide-react"
import { ALLERGEN, HOW_IT_WORKS } from "#/marketing/copy.ts"

const STEP_ICONS = [
  [Phone, MessageCircle],
  [CookingPot],
  [MapPin],
] as const

export function HowItWorks() {
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 motion-safe:animate-enter md:grid-cols-3">
      {HOW_IT_WORKS.map((step, index) => {
        const icons = STEP_ICONS[index] ?? []
        return (
          <div key={step.n}>
            <p className="flex items-center gap-2 text-xs tracking-[0.2em] text-taupe">
              <span>{step.n}</span>
              {icons.map((Icon, iconIndex) => (
                <Icon
                  key={iconIndex}
                  className="size-3.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
              ))}
            </p>
            <h2 className="mt-2 font-serif text-2xl">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
          </div>
        )
      })}
      <p className="text-sm leading-relaxed text-ink/70 md:col-span-3">
        {ALLERGEN}
      </p>
    </section>
  )
}
