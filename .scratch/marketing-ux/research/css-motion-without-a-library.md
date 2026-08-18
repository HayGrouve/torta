# CSS motion without a library

Question: with Tailwind CSS 4 and no animation library, what first-party mechanisms should we use for (a) a short one-shot repertoire nudge and (b) light section enter/settle; how must `prefers-reduced-motion` disable or replace them; and is the View Transition API in scope for this single long page?

**Verdict:** use finite CSS `@keyframes` registered as Tailwind v4 `--animate-*` theme tokens, applied with `motion-safe:`. Do not use Tailwind’s built-in `animate-spin` / `animate-ping` / `animate-pulse` / `animate-bounce` (they loop). Do not use the View Transition API for this page.

---

## What this repo already has

`src/styles.css` already uses Tailwind v4’s CSS-first entry (`@import "tailwindcss"` plus `@theme inline`). There are no animation-library imports and no `motion-safe` / `animate-*` usage yet.

That matches Tailwind’s documented setup: custom animation tokens live in `@theme` as `--animate-*` plus nested `@keyframes`. [Tailwind: animation](https://tailwindcss.com/docs/animation) [Tailwind: theme / keyframes](https://tailwindcss.com/docs/theme)

---

## CSS primitives: animation vs transition vs scroll-driven vs view transitions

### Time-based CSS animations (right tool for one-shot motion)

A CSS animation is a named `@keyframes` sequence plus timing properties (`animation-duration`, `animation-iteration-count`, `animation-fill-mode`, etc.). [MDN: Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)

- **One-shot:** `animation-iteration-count` defaults to `1`. `infinite` repeats forever. [MDN: animation-iteration-count](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)
- **Settle (hold the end state):** `animation-fill-mode: forwards` keeps the last keyframe after the animation ends; the default `none` snaps back. [MDN: animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)
- `@starting-style` is **not** required for keyframe animations; it exists for **transitions** on first display. [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)

Tailwind v4 maps this to:

1. Define a **finite** token in `@theme` (omit `infinite`):

```css
@theme {
  --animate-nudge-x: nudge-x 0.7s ease-out 1;
  @keyframes nudge-x {
    0%,
    100% {
      translate: 0 0;
    }
    40% {
      translate: 12px 0;
    }
  }

  --animate-enter: enter 0.45s ease-out both;
  @keyframes enter {
    from {
      opacity: 0.001;
      translate: 0 8px;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }
}
```

`1` in the shorthand is iteration count; `both` is fill mode. [MDN: Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) [Tailwind: Customizing your theme](https://tailwindcss.com/docs/animation)

2. Apply with `motion-safe:animate-nudge-x` / `motion-safe:animate-enter` so the animation is **not generated** when the user asked for reduced motion. [Tailwind: animation — supporting reduced motion](https://tailwindcss.com/docs/animation) [Tailwind: prefers-reduced-motion variants](https://tailwindcss.com/docs/hover-focus-and-other-states)

Do **not** use the stock utilities `animate-spin`, `animate-ping`, `animate-pulse`, or `animate-bounce`: each compiled value includes `infinite`. [Tailwind: animation](https://tailwindcss.com/docs/animation)

Arbitrary one-offs are also first-party: `animate-[nudge-x_0.7s_ease-out_1]` or `[animation-fill-mode:forwards]`. [Tailwind: animation — custom value](https://tailwindcss.com/docs/animation)

### CSS transitions (right tool for state changes, weak for “play this once on its own”)

Transitions interpolate when a **property value changes** (hover, class toggle). They do not run a self-contained sequence unless something changes the property. [MDN: Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)

Tailwind: `transition` / `transition-transform` / `transition-opacity`, `duration-*`, `ease-*`. Gate with `motion-safe:transition` or undo with `motion-reduce:transition-none`. [Tailwind: transition-property](https://tailwindcss.com/docs/transition-property) [Tailwind: transition-duration](https://tailwindcss.com/docs/transition-duration)

**`starting` / `@starting-style`:** Tailwind’s `starting` variant compiles to `@starting-style` and is for an element’s **first render** or `display: none` → visible (popovers, dialogs, DOM insert). [Tailwind: @starting-style](https://tailwindcss.com/docs/hover-focus-and-other-states) [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)

On this marketing page, sections are already in the document. `@starting-style` would fire on **initial page style**, including below-the-fold sections, not when the visitor later scrolls to them. It is the wrong trigger for “enter when the section is seen.” It would be appropriate only if we later **insert** or un-hide UI.

### Scroll-driven animations (usually the wrong tool for one-shot enter/settle)

`animation-timeline: view()` / `scroll()` ties keyframe progress to **scroll position**, not elapsed time. Scrolling backward rewinds the animation. [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) [MDN: Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)

That is useful for progress-tied effects. It is a poor match for a **one-shot settle that should stay put**. WCAG also treats extra movement while scrolling as non-essential animation that must be disable-able. [WCAG 2.3.3 Understanding](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

If used at all, MDN requires honoring reduced motion, e.g. `animation-timeline: none` under `prefers-reduced-motion: reduce` (and declaring that **after** any `animation` shorthand, which resets `animation-timeline` to `auto`). [MDN: Scroll-driven animation timelines — accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)

### CSS cannot animate `scrollLeft`

There is no CSS property that animates a scroller’s scroll offset. A “nudge that the repertoire can slide” is therefore either:

1. **Visual hint (CSS):** a finite `translate` keyframe on the snap row, a peek, or a chevron — the scroller itself does not move; or
2. **Real scroll (platform JS, not a motion library):** one `HTMLElement.scrollBy({ left, behavior: "smooth" })` (and optionally back), skipped when `matchMedia("(prefers-reduced-motion: reduce)")` matches. Smooth scrolling is still motion.

Prefer (1) if the goal is “hint.” Use (2) only if the product decision is to actually change snap position.

---

## (a) Short one-shot repertoire nudge

**Use:** a custom `--animate-*` with **default / `1` iteration**, a short duration, ease-out, and a small `translate` along the inline axis. Apply only at the small-screen snap layout (`md:` stacked, no carousel — per the map). Prefix with `motion-safe:` (and `max-md:` / `md:animate-none` as needed). [Tailwind: animation](https://tailwindcss.com/docs/animation) [Tailwind: responsive variants](https://tailwindcss.com/docs/hover-focus-and-other-states)

**Do not:** `animate-bounce` as a “scroll hint” — it is infinite vertical bounce. [Tailwind: animation](https://tailwindcss.com/docs/animation)

**Reduced motion:** omit the animation (`motion-safe:` means it never applies). Keep the static peek / index / dots. Do not replace the nudge with a looping opacity pulse (`animate-pulse` is infinite). [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) [W3C: Media Queries Level 5 §12.1](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)

---

## (b) Light enter/settle on sections

**Use:** a finite keyframe (small opacity + few pixels of `translate`, not scale of large objects) with `animation-fill-mode: both` or `forwards` so the settled state holds. [MDN: animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode) [MDN: prefers-reduced-motion — scaling as a vestibular trigger](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

**Trigger:**

- **Above-the-fold / first paint:** applying `motion-safe:animate-enter` in markup is enough; the document timeline starts when the animation is associated with the element. [MDN: Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- **Below-the-fold “when seen”:** CSS-only `view()` timelines reverse with scroll; `@starting-style` runs at first style, not at scroll-into-view. A one-time class added when the section intersects the viewport is a **trigger**, not an animation library. The motion itself stays CSS. If that trigger is not worth the JS, skip below-fold enter entirely — static sections already communicate.

Keep motion **light** (opacity + ~8px translate, short duration). Avoid large pans/scales. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

**Reduced motion:** do not run enter motion. Final layout/opacity should already be the settled state (start in the `to` keyframe styles in the cascade; only add animation under `motion-safe:`). That is Tailwind’s documented pattern: put motion on `motion-safe:` instead of applying it then undoing with `motion-reduce:`. [Tailwind: motion-safe vs motion-reduce](https://tailwindcss.com/docs/hover-focus-and-other-states)

---

## `prefers-reduced-motion`: disable or replace

### Spec and meaning

W3C Media Queries Level 5: `prefers-reduced-motion` is `no-preference | reduce`. `reduce` means the user prefers an interface that **removes or replaces** motion that triggers vestibular discomfort or attention distraction. [W3C: Media Queries Level 5 §12.1](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)

MDN: the feature detects a request to **minimize non-essential motion**; `reduce` is boolean-true (`@media (prefers-reduced-motion)` ≡ `: reduce`). Scaling/panning large objects are called out as vestibular triggers. MDN’s own example **replaces** a scale animation with a quieter dissolve rather than only deleting CSS. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

The value is **`reduce`, not “none.”** Users expect non-essential motion (including interaction-triggered) disabled unless it is essential to function or information. Blanket `* { animation: none !important }` is not what the preference means. [MDN: Using media queries for accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility)

WCAG 2.3.3 (AAA) Animation from Interactions: motion animation from interaction can be disabled unless essential; OS reduce-motion is an accepted approach. Scrolling new content into view is essential; **extra** animation on scroll is not. [WCAG 2.3.3 Understanding](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

For this page, the nudge and enter/settle are **hints**, not essential. Under `reduce`: **disable** them (instant final state). Optional **replace:** a non-motion affordance already in the map (peek, 1/3 index, dots) — not a different animation.

### Tailwind mapping (first-party)

| Variant | Compiles to |
| --- | --- |
| `motion-safe:` | `@media (prefers-reduced-motion: no-preference)` |
| `motion-reduce:` | `@media (prefers-reduced-motion: reduce)` |

[Tailwind: hover, focus, and other states — media variants table](https://tailwindcss.com/docs/hover-focus-and-other-states)

**Rule of thumb for this work:** put **all** decorative motion on `motion-safe:`. Use `motion-reduce:` only to kill leftover transitions (`motion-reduce:transition-none`, `motion-reduce:duration-0`) if a base `transition` cannot be `motion-safe:`-only. [Tailwind: animation](https://tailwindcss.com/docs/animation) [Tailwind: transition-property](https://tailwindcss.com/docs/transition-property)

If any JS drives scroll or class toggles: `window.matchMedia("(prefers-reduced-motion: reduce)").matches` before calling `scrollBy` / adding animate classes. That is the JS counterpart of the same media feature. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

---

## View Transition API: **no**, not in scope for this page

The View Transition API animates between **views**: same-document DOM updates via `document.startViewTransition(callback)` (SPA), or **cross-document navigation** with `@view-transition { navigation: auto }`. The browser snapshots old/new UI and cross-fades (by default) through `::view-transition-*` pseudo-elements. [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) [MDN: Using the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)

This marketing surface is **one long document**. The repertoire nudge and section settle are not a view swap: nothing is unmounted and replaced, and there is no same-origin MPA navigation between sections.

Using VT here would mean inventing a DOM update solely to get a snapshot animation — extra API surface, extra reduced-motion work on `::view-transition-old/new`, and the wrong mental model.

React 19’s `<ViewTransition>` wraps that same API. It is irrelevant until we actually transition between views; it is not researched further here.

---

## Recommendation

| Need | Use | Do not use |
| --- | --- | --- |
| (a) One-shot repertoire nudge | `@theme` `--animate-*` finite keyframes (`translate` peek), `motion-safe:animate-*`, small-screen only | `animate-bounce` / any `infinite` token; View Transitions; scroll-driven timelines |
| (b) Light enter/settle | Same: finite `--animate-enter` with `forwards`/`both`; `motion-safe:`; optional one-time IO class for below-fold | `@starting-style` as a scroll-into-view trigger; `view()` as a one-shot settle; Framer Motion |
| Reduced motion | Prefer `motion-safe:` so motion is absent; keep static peek/index/dots; skip JS `scrollBy` | Looping opacity “replacement”; `* { animation: none }` |
| View Transitions | **No** | SPA/MPA snapshot API on a single long page |

Exact Tailwind/CSS tools: `--animate-*` + `@keyframes` in `@theme` (already the v4 pattern next to existing `@theme inline` in `src/styles.css`); classes `motion-safe:animate-<name>`; `animate-none` / `md:animate-none` where the snap layout goes away; `transition` + `motion-reduce:transition-none` only for hover/focus property changes, not for the nudge/enter sequences.
