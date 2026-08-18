import { Instagram, MessageCircle, Phone } from "lucide-react"
import { Button } from "#/components/ui/button.tsx"
import {
  CTA_CALL,
  CTA_INSTAGRAM,
  CTA_VIBER_WRITE,
  HERO,
  HOUSE_LINE,
  IG,
  STILLS,
  TEL,
  VIBER,
} from "#/marketing/copy.ts"

export function Chrome() {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-6">
        <span className="font-serif text-2xl tracking-[0.08em]" lang="en">
          Iliaora
        </span>
        <Button asChild variant="link" className="h-auto gap-1.5 p-0 text-taupe">
          <a href={IG}>
            <Instagram className="size-3.5" strokeWidth={1.5} />
            {CTA_INSTAGRAM}
          </a>
        </Button>
      </header>
      <div>
        <div className="relative">
          <section className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-10 text-center">
            <h1 className="font-serif text-6xl leading-[0.95] sm:text-8xl">
              Iliaora
            </h1>
            <p className="mt-5 font-serif text-2xl italic text-ink/80 sm:text-3xl">
              {HOUSE_LINE}
            </p>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink/80">
              {HERO}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 motion-safe:animate-enter">
              <Button
                asChild
                className="rounded-none bg-ink px-6 py-2.5 text-cream hover:bg-ink/90"
              >
                <a href={TEL} className="text-cream">
                  <Phone className="size-4" strokeWidth={1.5} />
                  {CTA_CALL}
                </a>
              </Button>
              <Button
                asChild
                className="rounded-none bg-ink px-6 py-2.5 text-cream hover:bg-ink/90"
              >
                <a href={VIBER} className="text-cream">
                  <MessageCircle className="size-4" strokeWidth={1.5} />
                  {CTA_VIBER_WRITE}
                </a>
              </Button>
            </div>
          </section>
          <img
            src={STILLS.fullBleed.src}
            alt={STILLS.fullBleed.alt}
            className="absolute top-1/2 left-0 h-[70vh] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1/2 bg-gradient-to-b from-cream to-transparent" />
        </div>
        <div className="h-[70vh]" aria-hidden="true" />
      </div>
    </>
  )
}
