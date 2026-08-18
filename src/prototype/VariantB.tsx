import { IG, IMAGES, PHONE_LABEL, STEPS, TEL, VIBER } from "./copy"

export const variantName = "Split atelier"

export function VariantB() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1916] [font-family:'Source_Sans_3',sans-serif] lg:grid lg:grid-cols-[minmax(280px,42%)_1fr]">
      <aside className="relative hidden min-h-screen lg:sticky lg:top-0 lg:block lg:h-screen">
        <img
          src={IMAGES.occasion}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1c1916]/25" />
        <p
          className="absolute bottom-8 left-8 text-4xl text-white [font-family:Fraunces,serif]"
          lang="en"
        >
          Iliaora
        </p>
      </aside>

      <div className="min-h-screen">
        <header className="flex items-center justify-between px-6 py-5 lg:px-12">
          <span className="text-lg lg:hidden [font-family:Fraunces,serif]" lang="en">
            Iliaora
          </span>
          <div className="ml-auto flex gap-5 text-sm">
            <a href={IG}>Вижте в Instagram</a>
            <a href={TEL}>Обадете се</a>
          </div>
        </header>

        <section className="px-6 pb-16 pt-8 lg:px-12 lg:pt-20">
          <p className="text-sm text-[#6f675c]">сладкиши от Илияна</p>
          <h1 className="mt-3 max-w-lg text-5xl leading-[1.05] [font-family:Fraunces,serif]">
            Печем, когато се обадите.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#4d463c]">
            София. Торти, донъти и торти за повод. Без магазин, без витрина —
            всяко нещо е за Вас.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 text-sm font-semibold">
            <a href={IG} className="border-b border-[#1c1916] pb-0.5">
              Вижте в Instagram →
            </a>
            <a href={VIBER} className="border-b border-[#1c1916] pb-0.5">
              Обадете се или пишете във Viber →
            </a>
          </div>
        </section>

        <ol className="space-y-0 border-y border-[#1c1916]/15">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[4rem_1fr] gap-4 border-b border-[#1c1916]/10 px-6 py-6 last:border-b-0 lg:px-12"
            >
              <span className="[font-family:Fraunces,serif] text-2xl">{s.n}</span>
              <div>
                <h2 className="text-base font-semibold">{s.title}</h2>
                <p className="mt-1 text-sm text-[#5a5348]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="px-6 py-14 lg:px-12">
          <p className="text-xs tracking-[0.18em] uppercase text-[#6f675c]">
            Репертоар
          </p>
          <article className="mt-8">
            <h2 className="text-3xl [font-family:Fraunces,serif]">Торти</h2>
            <p className="mt-2 max-w-md text-sm text-[#4d463c]">
              За деня в София. Печем след обаждането.
            </p>
          </article>
          <article className="mt-10">
            <h2 className="text-3xl [font-family:Fraunces,serif]">Донъти</h2>
            <p className="mt-2 max-w-md text-sm text-[#4d463c]">
              Не стоят на рафт. Примери — в Instagram.
            </p>
            <img
              src={IMAGES.donut}
              alt=""
              className="mt-6 h-52 w-full object-cover lg:hidden"
            />
          </article>
          <article className="mt-10 border-l-2 border-[#1c1916] pl-5">
            <h2 className="text-3xl [font-family:Fraunces,serif]">
              Торти за повод
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#4d463c]">
              Сватба и голямо тържество. Може да пътува в България. Попитайте —
              цената е според тортата.
            </p>
          </article>
        </section>

        <section className="px-6 py-14 lg:px-12">
          <h2 className="text-sm tracking-[0.18em] uppercase">За нас</h2>
          <p className="mt-4 max-w-md text-lg [font-family:Fraunces,serif]">
            Илияна. Първо име, в този текст — не в хедъра.
          </p>
        </section>

        <footer className="px-6 py-10 text-sm text-[#5a5348] lg:px-12">
          София · <a href={TEL}>{PHONE_LABEL}</a> · <a href={IG}>Instagram</a>
        </footer>
      </div>
    </div>
  )
}
