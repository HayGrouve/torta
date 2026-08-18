import { Button } from "#/components/ui/button.tsx"
import {
  ABOUT,
  ALLERGEN,
  BYLINE,
  CTA_CALL,
  CTA_INQUIRY,
  CTA_INSTAGRAM,
  CTA_VIBER_WRITE,
  HERO,
  HOW_IT_WORKS,
  IG,
  LANES,
  PHONE_LABEL,
  PRIVACY,
  STILLS,
  TEL,
  VIBER,
} from "#/marketing/copy.ts"

export function MarketingPage() {
  return (
    <div className="min-h-svh bg-cream font-sans text-ink">
      <header className="mx-auto flex max-w-5xl items-baseline justify-between gap-6 px-6 py-6">
        <span className="font-serif text-2xl tracking-[0.08em]" lang="en">
          Iliaora
        </span>
        <nav className="flex flex-wrap items-baseline justify-end gap-x-6 gap-y-2 text-sm">
          <Button asChild variant="link" className="h-auto p-0">
            <a href={IG}>{CTA_INSTAGRAM}</a>
          </Button>
          <span className="flex flex-wrap items-baseline gap-x-1">
            <Button asChild variant="link" className="h-auto p-0">
              <a href={TEL}>{CTA_CALL}</a>
            </Button>
            <span>или</span>
            <Button asChild variant="link" className="h-auto p-0">
              <a href={VIBER}>{CTA_VIBER_WRITE}</a>
            </Button>
          </span>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-10 text-center">
        <p className="font-sans text-sm tracking-[0.22em] text-taupe">
          {BYLINE}
        </p>
        <h1 className="mt-4 font-serif text-6xl leading-[0.95] sm:text-8xl">
          Iliaora
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink/80">
          {HERO}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Button
            asChild
            variant="outline"
            className="rounded-none border-ink bg-transparent px-5 py-2.5"
          >
            <a href={IG}>{CTA_INSTAGRAM}</a>
          </Button>
          <Button asChild variant="link" className="h-auto px-5 py-2.5">
            <a href={TEL}>{PHONE_LABEL}</a>
          </Button>
          <Button asChild variant="link" className="h-auto px-5 py-2.5">
            <a href={VIBER}>{CTA_INQUIRY}</a>
          </Button>
        </div>
      </section>

      <img
        src={STILLS.fullBleed.src}
        alt={STILLS.fullBleed.alt}
        className="h-[70vh] w-full object-cover"
      />

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-3">
        {HOW_IT_WORKS.map((step) => (
          <div key={step.n}>
            <p className="text-xs tracking-[0.2em] text-taupe">{step.n}</p>
            <h2 className="mt-2 font-serif text-2xl">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
          </div>
        ))}
        <p className="text-sm leading-relaxed text-ink/70 md:col-span-3">
          {ALLERGEN}
        </p>
      </section>

      <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto bg-cream px-6 py-16 md:mx-auto md:max-w-5xl md:flex-col md:overflow-visible md:px-6">
        {LANES.map((lane, index) => (
          <article
            key={lane.kicker}
            className={`flex w-[85vw] shrink-0 snap-center flex-col items-center gap-10 md:w-full md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={lane.still.src}
              alt={lane.still.alt}
              className="h-[42vh] w-full object-cover md:w-1/2"
            />
            <div className="md:w-1/2">
              <p className="text-xs tracking-[0.22em] text-taupe">
                {lane.kicker}
              </p>
              <h2 className="mt-3 font-serif text-4xl">{lane.title}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
                {lane.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-sm tracking-[0.2em] uppercase">За нас</p>
        <h2 className="mt-3 font-serif text-4xl">Илияна</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/80">{ABOUT}</p>
      </section>

      <footer className="border-t border-ink/15 px-6 py-10 text-center text-sm">
        <p className="font-serif text-xl">Iliaora</p>
        <p className="mt-2">София</p>
        <p className="mt-1">
          <a href={TEL}>{PHONE_LABEL}</a>
          {" · "}
          <a href={IG}>Instagram</a>
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-ink/70">
          {PRIVACY}
        </p>
      </footer>
    </div>
  )
}
