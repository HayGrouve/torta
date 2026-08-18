import { useEffect, useRef, useState } from "react"

export function useSnapIndex() {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const scroller = ref.current
    if (!scroller) return

    let frame = 0
    function measure() {
      const el = ref.current
      if (!el) return
      const mid = el.scrollLeft + el.clientWidth / 2
      let closest = 0
      let best = Number.POSITIVE_INFINITY
      for (let i = 0; i < el.children.length; i += 1) {
        const child = el.children[i]
        if (!(child instanceof HTMLElement)) continue
        const childMid = child.offsetLeft + child.offsetWidth / 2
        const distance = Math.abs(childMid - mid)
        if (distance < best) {
          best = distance
          closest = i
        }
      }
      setIndex((current) => (current === closest ? current : closest))
    }

    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    scroller.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      scroller.removeEventListener("scroll", onScroll)
    }
  }, [])

  return { ref, index }
}
