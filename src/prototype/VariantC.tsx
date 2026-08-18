import { IG, IMAGES, PHONE_LABEL, STEPS, TEL, VIBER } from "./copy"

export const variantName = "Dark cocoa"

export function VariantC() {
  return (
    <div className="bg-[#14110e] text-[#ece6dc] [font-family:Outfit,sans-serif]">
      <header className="flex items-center justify-between px-5 py-4">
        <span
          className="text-xl italic [font-family:'Instrument_Serif',serif]"
          lang="en"
        >
          Iliaora
        </span>
        <a
          href={TEL}
          className="rounded-full border border-[#ece6dc]/30 px-4 py-1.5 text-xs tracking-wide"
        >
          {PHONE_LABEL}
        </a>
      </header>

      <section className="flex min-h-[88vh] flex-col justify-end px-5 pb-12 pt-24">
        <p className="text-xs tracking-[0.28em] uppercase text-[#c4b49a]">
          сладкиши от Илияна
        </p>
        <h1 className="mt-4 max-w-xl text-5xl leading-[0.95] italic [font-family:'Instrument_Serif',serif] sm:text-7xl">
          Нищо на рафта.
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#c9c0b2]">
          Торти, донъти, торти за повод. София. По поръчка.
        </p>
        <a
          href={IG}
          className="mt-8 inline-block text-sm underline decoration-[#c4b49a] underline-offset-8"
        >
          Вижте в Instagram
        </a>
      </section>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10">
        {[
          ["Торти", IMAGES.cake, "За деня в София."],
          ["Донъти", IMAGES.donut, "Печем след обаждането."],
          [
            "Торти за повод",
            IMAGES.occasion,
            "Сватба. Голямо тържество. Може да пътува в България.",
          ],
        ].map(([title, img, body]) => (
          <article
            key={title}
            className="relative h-[70vh] w-[85vw] shrink-0 snap-center overflow-hidden sm:w-[28rem]"
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110e] via-[#14110e]/20 to-transparent" />
            <div className="absolute bottom-6 left-5 right-5">
              <h2 className="text-3xl italic [font-family:'Instrument_Serif',serif]">
                {title}
              </h2>
              <p className="mt-2 text-sm text-[#ddd4c6]">{body}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="grid gap-8 px-5 py-16 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n}>
            <p className="text-[#c4b49a] [font-family:'Instrument_Serif',serif] text-3xl italic">
              {s.n}
            </p>
            <h2 className="mt-2 text-sm font-medium">{s.title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#b5aa9a]">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="px-5 py-10">
        <p className="text-xs tracking-[0.2em] uppercase text-[#c4b49a]">За нас</p>
        <p className="mt-3 max-w-md text-2xl italic [font-family:'Instrument_Serif',serif]">
          Илияна пече за Вас. Къщата е Iliaora.
        </p>
      </section>

      <section className="px-5 py-16 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#c4b49a]">
          Обадете се или пишете във Viber
        </p>
        <a
          href={TEL}
          className="mt-4 block text-5xl italic [font-family:'Instrument_Serif',serif] sm:text-7xl"
        >
          {PHONE_LABEL}
        </a>
        <a href={VIBER} className="mt-4 inline-block text-sm text-[#c4b49a]">
          Viber
        </a>
      </section>

      <footer className="px-5 pb-24 pt-8 text-center text-xs text-[#8f8578]">
        София · <a href={IG}>Instagram</a>
      </footer>
    </div>
  )
}
