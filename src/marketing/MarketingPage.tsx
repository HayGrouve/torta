import { Instagram, MessageCircle, Phone } from "lucide-react"
import {
  ABOUT,
  CTA_VIBER_WRITE,
  IG,
  PHONE_LABEL,
  PRIVACY,
  TEL,
  VIBER,
} from "#/marketing/copy.ts"
import { Chrome } from "#/marketing/Chrome.tsx"
import { HowItWorks } from "#/marketing/HowItWorks.tsx"
import { Repertoire } from "#/marketing/Repertoire.tsx"

export function MarketingPage() {
  return (
    <div className="min-h-svh bg-cream font-sans text-ink">
      <Chrome />

      <HowItWorks />

      <Repertoire />

      <section className="bg-ink px-6 py-24 text-center text-cream motion-safe:animate-enter">
        <div className="mx-auto max-w-xl">
          <p className="text-sm tracking-[0.2em] uppercase text-cream/80">За нас</p>
          <h2 className="mt-3 font-serif text-4xl">Илияна — сладкар</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/80">{ABOUT}</p>
        </div>
      </section>

      <footer className="border-t border-ink/15 px-6 py-10 text-center text-sm">
        <p className="font-serif text-xl">Iliaora</p>
        <p className="mt-2">София</p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <a href={TEL} className="inline-flex items-center gap-1.5">
            <Phone className="size-3.5" strokeWidth={1.5} aria-hidden />
            {PHONE_LABEL}
          </a>
          <a href={VIBER} className="inline-flex items-center gap-1.5">
            <MessageCircle className="size-3.5" strokeWidth={1.5} aria-hidden />
            {CTA_VIBER_WRITE}
          </a>
          <a href={IG} className="inline-flex items-center gap-1.5">
            <Instagram className="size-3.5" strokeWidth={1.5} aria-hidden />
            Instagram
          </a>
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-ink/70">
          {PRIVACY}
        </p>
      </footer>
    </div>
  )
}

