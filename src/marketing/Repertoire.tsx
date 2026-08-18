"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { LANES } from "#/marketing/copy.ts"
import { useSnapIndex } from "#/marketing/use-snap-index.ts"

const REPERTOIRE_LABEL = "Репертоар: торти, донъти и торти за повод"

function scrollToLane(scroller: HTMLDivElement, next: number) {
  const child = scroller.children[next]
  if (!(child instanceof HTMLElement)) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  child.scrollIntoView({
    inline: "center",
    block: "nearest",
    behavior: reduce ? "auto" : "smooth",
  })
}

export function Repertoire() {
  const { ref, index } = useSnapIndex()
  const lane = LANES[index] ?? LANES[0]
  const last = LANES.length - 1

  return (
    <div>
      <div className="flex items-baseline justify-between px-6 pt-12 md:hidden">
        <p className="text-xs tracking-[0.22em] text-taupe">{lane.kicker}</p>
        <p className="font-serif text-lg tabular-nums">
          {index + 1} от {LANES.length}
        </p>
      </div>
      <div className="relative">
        <div
          ref={ref}
          data-repertoire-snap
          tabIndex={0}
          aria-label={REPERTOIRE_LABEL}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 py-8 max-md:motion-safe:animate-nudge-x md:mx-auto md:max-w-5xl md:flex-col md:overflow-visible md:px-6 md:py-16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-taupe"
        >
          {LANES.map((item, itemIndex) => (
            <article
              key={item.kicker}
              className={`flex w-[85vw] shrink-0 snap-center flex-col gap-6 px-5 md:w-full md:flex-row md:items-center md:gap-10 md:px-0 ${
                itemIndex % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={item.still.src}
                alt={item.still.alt}
                className="h-[42vh] w-full object-cover md:w-1/2"
              />
              <div className="md:w-1/2">
                <p className="hidden text-xs tracking-[0.22em] text-taupe md:block">
                  {item.kicker}
                </p>
                <h2 className="font-serif text-4xl md:mt-3">{item.title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        {index > 0 ? (
          <button
            type="button"
            className="absolute top-[calc(2rem+21vh)] left-0 z-10 grid size-11 -translate-y-1/2 place-items-center p-2 text-taupe/70 md:hidden"
            aria-label="Предишна"
            onClick={() => {
              const scroller = ref.current
              if (scroller) scrollToLane(scroller, index - 1)
            }}
          >
            <ChevronLeft className="size-6" strokeWidth={1.25} />
          </button>
        ) : null}
        {index < last ? (
          <button
            type="button"
            className="absolute top-[calc(2rem+21vh)] right-0 z-10 grid size-11 -translate-y-1/2 place-items-center p-2 text-taupe/70 md:hidden"
            aria-label="Следваща"
            onClick={() => {
              const scroller = ref.current
              if (scroller) scrollToLane(scroller, index + 1)
            }}
          >
            <ChevronRight className="size-6" strokeWidth={1.25} />
          </button>
        ) : null}
      </div>
    </div>
  )
}
