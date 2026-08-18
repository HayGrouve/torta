import { IG, IMAGES, PHONE_LABEL, STEPS, TEL, VIBER } from "./copy"

export const variantName = "Editorial cream"

export function VariantA() {
  return (
    <div className="bg-[#f4efe6] text-[#2a2218] [font-family:Outfit,sans-serif]">
      <header className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-6">
        <span
          className="text-2xl tracking-[0.08em] [font-family:'Cormorant_Garamond',serif]"
          lang="en"
        >
          Iliaora
        </span>
        <nav className="flex gap-6 text-sm">
          <a href={IG} className="underline-offset-4 hover:underline">
            Вижте в Instagram
          </a>
          <a href={TEL} className="underline-offset-4 hover:underline">
            Обадете се
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-10 text-center">
        <p className="text-sm tracking-[0.22em] uppercase text-[#6b5c48]">
          сладкиши от Илияна
        </p>
        <h1 className="mt-4 text-6xl leading-[0.95] [font-family:'Cormorant_Garamond',serif] sm:text-8xl">
          Iliaora
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#4a3f32]">
          Сладкиши по поръчка в София. Торти, донъти и торти за повод — печени
          за Вас, без витрина.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <a
            href={IG}
            className="border border-[#2a2218] px-5 py-2.5 no-underline"
          >
            Вижте в Instagram
          </a>
          <a href={VIBER} className="px-5 py-2.5 no-underline">
            Обадете се или пишете във Viber
          </a>
        </div>
      </section>

      <img
        src={IMAGES.cake}
        alt=""
        className="h-[70vh] w-full object-cover"
      />

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n}>
            <p className="text-xs tracking-[0.2em] text-[#8a7a64]">{s.n}</p>
            <h2 className="mt-2 text-2xl [font-family:'Cormorant_Garamond',serif]">
              {s.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4e3d]">{s.body}</p>
          </div>
        ))}
      </section>

      <Lane
        kicker="Торти"
        title="За деня — по поръчка."
        body="По-малки торти за рожден ден, офис, подарък. София. Печем след обаждането."
        img={IMAGES.cake}
        flip={false}
      />
      <Lane
        kicker="Донъти"
        title="Не от витрина."
        body="Донъти, когато ги поискате. Примери за работа — в Instagram."
        img={IMAGES.donut}
        flip
      />
      <Lane
        kicker="Торти за повод"
        title="Сватба и голямо тържество."
        body="Може да пътува в България по уговорка. Цена според тортата — попитайте."
        img={IMAGES.occasion}
        flip={false}
      />

      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-sm tracking-[0.2em] uppercase">За нас</p>
        <h2 className="mt-3 text-4xl [font-family:'Cormorant_Garamond',serif]">
          Илияна
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#4a3f32]">
          Пече по поръчка в София. Iliaora е името на къщата; тя е в подписа и
          тук — не в логото.
        </p>
      </section>

      <footer className="border-t border-[#2a2218]/15 px-6 py-10 text-center text-sm">
        <p className="[font-family:'Cormorant_Garamond',serif] text-xl">Iliaora</p>
        <p className="mt-2">София</p>
        <p className="mt-1">
          <a href={TEL}>{PHONE_LABEL}</a>
          {" · "}
          <a href={IG}>Instagram</a>
        </p>
      </footer>
    </div>
  )
}

function Lane({
  kicker,
  title,
  body,
  img,
  flip,
}: {
  kicker: string
  title: string
  body: string
  img: string
  flip: boolean
}) {
  return (
    <section
      className={`mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-16 md:flex-row ${flip ? "md:flex-row-reverse" : ""}`}
    >
      <img src={img} alt="" className="h-[42vh] w-full object-cover md:w-1/2" />
      <div className="md:w-1/2">
        <p className="text-xs tracking-[0.22em] uppercase text-[#8a7a64]">
          {kicker}
        </p>
        <h2 className="mt-3 text-4xl [font-family:'Cormorant_Garamond',serif]">
          {title}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c4e3d]">
          {body}
        </p>
      </div>
    </section>
  )
}
