# Snap repertoire: discovery and accessibility (first-party)

Question: for a three-item CSS `scroll-snap` repertoire on small screens (peek of the next lane, a 1/3 index or dots, a one-shot nudge), what must or must not we do for discovery and accessibility — WAI-ARIA carousel, keyboard/swipe, `prefers-reduced-motion` — without turning the lanes into an auto-advancing slideshow.

Context: `MarketingPage.tsx` already uses `snap-x snap-mandatory overflow-x-auto` with three `article` lanes at `w-[85vw]` (a peek of the next lane). Destination: visitor discovers all three lanes; no auto-play; `lucide-react` already in the project.

## Verdict in one paragraph

Treat this as a **native horizontal scroll container with snap**, not as a WAI-ARIA **carousel widget**. The APG carousel pattern exists for UIs that hide the current “slide” and rotate another into view (optionally automatically). CSS scroll-snap keeps all three lanes in the overflow and lets the user agent scroll them. First-party rules then say: do not auto-rotate; do not cloak the scroller with `carousel`/`slide` roles unless you implement the full widget contract; keep native swipe/keyboard scrolling; add a visible position cue and a short, non-looping hint; skip or instant-cut that hint when `prefers-reduced-motion: reduce`.

## 1. This is not the APG carousel unless we hide and rotate slides

A carousel “presents a set of items, referred to as slides, by sequentially displaying a subset of one or more slides. Typically, one slide is displayed at a time, and users can activate a next or previous slide control that hides the current slide and ‘rotates’ the next or previous slide into view.” Automatic rotation on load is described as a common extra, not a requirement. ([APG Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/))

Iliaora’s lanes are three `article`s in an overflowing flex row. Nothing is hidden and rotated by script. Mapping APG carousel semantics onto that would **promise** a widget (rotation control if auto-rotate exists, previous/next, optional picker, live-region rules) that the native scroller does not provide. APG: “A role is a promise” — roles do not give keyboard behavior; authors must. “No ARIA is better than Bad ARIA.” ([APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/))

WAI-ARIA 1.2: authors **SHOULD** limit `aria-roledescription` to clarifying non-interactive containers (`group`/`region`) or a more specific **widget** description; misuse can block understanding of how to operate the control. ([WAI-ARIA 1.2 `aria-roledescription`](https://www.w3.org/TR/wai-aria-1.2/#aria-roledescription))

Using ARIA (discontinued but still the four rules): if a native HTML/CSS behavior already exists, use it instead of re-purposing elements with ARIA. Interactive ARIA controls **must** be keyboard-operable. Do not put `aria-hidden="true"` on focusable content. ([Using ARIA — First Rule](https://www.w3.org/TR/using-aria/#rule1))

**Must not:** `role="region"` + `aria-roledescription="carousel"` (and `group` + `aria-roledescription="slide"`) on this snap row unless we also ship APG controls and rotation semantics. **Must not:** `aria-hidden` on off-screen lanes that remain in the tab/reading order (or contain focusable content).

**May:** a named landmark around the repertoire if it is important enough to jump to. APG: a `region` **must** have a label; HTML `section` becomes a `region` only with an accessible name (`aria-label` / `aria-labelledby` / `title`). Do not put the role word in the label (“carousel”, “region”). ([APG Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)) Existing `article` + heading per lane already matches WAI-ARIA `article` (independent composition, not a landmark). ([WAI-ARIA 1.2 `article`](https://www.w3.org/TR/wai-aria-1.2/#article))

## 2. If we *did* implement a carousel widget (do not, for auto-play)

APG **requires** previous and next controls. Slide picker (dots/tabs) is optional. If automatic rotation exists, it **also** requires a stop/restart control, stop on keyboard focus into the carousel (no restart except explicit user request), and stop on mouse hover. Rotation control is first in the carousel tab sequence. Tab/Shift+Tab follow the page tab sequence — “scripting for Tab is not necessary.” ([APG Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/))

Picker styles:

- **Tabbed:** one tab stop; tabs pattern; slides as `tabpanel` (no `aria-roledescription="slide"`).
- **Grouped:** one native `button` per slide inside a labeled `group`; current slide’s picker uses `aria-disabled="true"` (not HTML `disabled`, so it stays in the tab sequence). APG: this “is the **least friendly** for keyboard users” because each selector is an extra tab stop.

Live region wrapping slides (optional): `aria-live="off"` while auto-rotating; `aria-live="polite"` when **not** auto-rotating. Auto-rotate plus polite live updates is exactly the disorientation APG warns about (user reads slide 1, next element is suddenly slide 2).

This site’s destination forbids auto-play. Implementing APG carousel **without** rotation still implies prev/next (and optional picker). That is a slideshow chrome, not a three-lane peek scroller.

## 3. CSS scroll-snap: peek, mandatory, UA physics

`scroll-snap-type` on the scroll container sets axis and strictness. `mandatory`: the container **must** be snapped when there is no active scrolling. `proximity`: the UA **may** snap at end of a scroll. Default strictness if an axis is given without a keyword is `proximity`. ([CSS Scroll Snap Level 1](https://www.w3.org/TR/css-scroll-snap-1/#scroll-snap-type); [MDN `scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type))

The spec’s gallery example uses `scroll-snap-type: x mandatory` with images smaller than the scrollport so **multiple images may be seen simultaneously** — the same idea as a peek. A second example uses `scroll-padding` so the previous page **“peek”s** in, and **proximity** so the user can stop between pages rather than being forced one page at a time. ([CSS Scroll Snap — Motivating Examples](https://www.w3.org/TR/css-scroll-snap-1/#examples))

`scroll-padding` does not change layout; it insets the **snapport** / optimal viewing region. Authors use it so snap alignment leaves a visible strip of the next/previous item, or so paging keys account for obscured edges. ([CSS Scroll Snap — `scroll-padding`](https://www.w3.org/TR/css-scroll-snap-1/#scroll-padding))

Authors **should** use `mandatory` with care on varyingly sized screens: non-adjacent mandatory siblings can make in-between content **inaccessible** if it is longer than the screen. UAs **must** let the user “escape” a snap position (naive “always nearest” can trap). The spec **does not** mandate snap animation/physics — that is left to the UA. ([CSS Scroll Snap Level 1](https://www.w3.org/TR/css-scroll-snap-1/))

MDN: if `scroll-snap-type` is `mandatory` and a child’s `scroll-snap-align` is `none` (or unset, default `none`), the user may be **unable to scroll that child into view**. ([MDN basic concepts of scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts))

`overflow: auto` makes a **scroll container** when there is overflow; scrolling may be initiated by scrollbar, touch swipe, keyboard, or script. ([CSS Overflow Level 3](https://www.w3.org/TR/css-overflow-3/#overflow-properties))

`scroll-behavior: smooth` applies to navigation, scrolling APIs, and **scroll snapping operations not initiated by the user** — not to user-driven scrolls. `auto` is instant. UAs should follow platform conventions for smooth timing. ([CSS Overflow Level 3 — `scroll-behavior`](https://www.w3.org/TR/css-overflow-3/#scoll-behavior))

Current page: `w-[85vw]` + `snap-center` already peeks without `scroll-padding`. That is consistent with the spec’s “container larger than the snapped item” pattern.

## 4. Keyboard

WCAG 2.1.1 (A): all functionality is operable through a keyboard interface without requiring specific timings for keystrokes, except where the underlying function is path-dependent (not “we chose swipe”). ([WCAG 2.2 SC 2.1.1](https://www.w3.org/TR/WCAG22/#keyboard))

WHATWG HTML: **scrollable regions** of rendered, non-inert elements **are focusable areas**. The CSS `overflow: scroll` value typically creates such a region. ([HTML Standard — focusable area](https://html.spec.whatwg.org/multipage/interaction.html#focusable-area))

APG carousel: if you build that widget, Tab moves through its **interactive** controls; you do not need to hijack Tab. Arrow keys are not specified as the way to change slides except via button/tabs patterns.

**For this site:** keep UA scrolling (arrows/Page keys once the scroller or a descendant is focused). Do not intercept arrow keys as “next slide” unless implementing a real widget. Lanes today have no links; sequential focus on the overflow box is UA-dependent. If keyboard users cannot reach clipped lanes, make the scroll container sequentially focusable (HTML allows `tabindex` on the element that owns the scrollable region) and give it an accessible name. WCAG 2.4.7 (AA): keyboard-operable UI has a visible focus indicator. ([WCAG 2.2 SC 2.4.7](https://www.w3.org/TR/WCAG22/#focus-visible))

## 5. Swipe vs author-scripted flicks

WCAG 2.5.1 (A): functionality that uses **multipoint or path-based** gestures must also work with a **single pointer** that is not path-based, unless essential. The note: this applies to **web content that interprets pointer actions**, not actions required to operate the user agent or AT. ([WCAG 2.2 SC 2.5.1](https://www.w3.org/TR/WCAG22/#pointer-gestures))

Understanding 2.5.1: **vertical/horizontal flicking to scroll native scrollable containers** is a **user-agent** gesture and is **out of scope**. A **custom** horizontal flick that the page detects to change items **is** in scope; a sufficient pattern is previous/next controls usable with a simple click/tap (visible or visually hidden but still pointer-operable). Keyboard-only alternatives are **not** enough for 2.5.1. WCAG 2.2 also: the simple pointer alternative must not be **only** a drag (SC 2.5.7). ([Understanding SC 2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html))

**Must not:** replace native overflow with a custom swipe recognizer unless we also add single-tap controls (prev/next or pickers). **May:** native swipe plus a peek, a 1/3 label, and a one-shot scripted nudge that is not the only way to move.

## 6. Auto-motion, nudge, `prefers-reduced-motion`

WCAG 2.2.2 (A): moving/blinking/**scrolling** information that (1) **starts automatically**, (2) **lasts more than five seconds**, and (3) is **in parallel with other content** needs pause, stop, or hide, unless essential. Auto-updating has no five-second exception. Content that fails this SC can fail the whole page (non-interference). ([WCAG 2.2 SC 2.2.2](https://www.w3.org/TR/WCAG22/#pause-stop-hide); [Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html))

A **one-shot** nudge that starts on load but **finishes in ≤5 seconds** and does not loop does not, by itself, trigger the moving/scrolling clause of 2.2.2. A looping or auto-advancing slideshow **does**. Do not auto-advance lanes.

WCAG 2.3.3 (AAA): motion animation triggered by **interaction** can be disabled unless essential. Understanding: **bringing new content into view by scrolling is essential**; extra parallax/decoration on scroll is not. Honor OS/UA reduce-motion, or provide a control. Sufficient technique: `@media (prefers-reduced-motion: reduce)` (or the inverse: only animate under `no-preference`). ([WCAG 2.2 SC 2.3.3](https://www.w3.org/TR/WCAG22/#animation-from-interactions); [Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39))

CSS Media Queries Level 5: `prefers-reduced-motion: reduce` means the user prefers an interface that **removes or replaces** motion-based animation that triggers vestibular discomfort or attention-deficit distraction. ([Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion))

MDN: the feature detects a request to minimize **non-essential** motion; scaling and **panning large objects** can be vestibular triggers. ([MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion))

`scroll-behavior: smooth` on a scripted nudge is author-driven motion (not user scrolling). Under `reduce`, use instant scroll (`scroll-behavior: auto` / no smooth API) or skip the nudge. Snap **physics** are UA-defined; authors who need to eliminate snap-induced animation under `reduce` can set `scroll-snap-type: none` — that is an author choice, not a CSS requirement. User-controlled scrolling of the lanes remains essential.

## 7. Peek, 1/3 index, or dots (discovery, not a new widget)

No first-party spec **requires** dots or a numeric index. Discovery is a product goal; accessibility constraints are:

- A peek is specified first-party as a **layout** technique (`scroll-padding` and/or items narrower than the scrollport). ([CSS Scroll Snap examples](https://www.w3.org/TR/css-scroll-snap-1/#examples))
- A visible **“1 / 3”** (or equivalent) is ordinary text. If it is only visual, 1.3.1/4.1.2 do not invent a carousel; screen reader users already get three `article`s with headings if we do not hide them. Updating a live region on every snap is **optional** in APG only for a carousel that is **not** auto-rotating; on a native scroller it can chatter during swipe. Prefer a static or politely updated label tied to visible text, not `aria-live` on the whole strip.
- **Dots as buttons** = APG grouped picker = extra tab stops (discouraged) unless implemented as **one** tablist. Decorative dots that look like controls but do nothing fail user expectation; if they **are** controls, they need names, keyboard activation, and they pull us toward the carousel widget.
- Prev/next **buttons** are what APG and Understanding 2.5.1 use when the page **interprets** flicks. They are not required for **native** overflow. A single one-shot nudge is not a stand-in for those buttons.

Lucide: first-party a11y does not require a particular icon set. If a control is only an icon, it still needs an accessible name (HTML `button` + text or `aria-label`).

## Recommendation for Iliaora

1. **Keep native `overflow-x-auto` + snap.** Do not auto-advance. Do not apply APG `carousel` / `slide` / live-region-on-the-track. Keep each lane an `article` with its heading. Optionally wrap the strip in a labeled `section` (repertoire), without the word “carousel” in the name.
2. **Peek + `1 / 3` index, not a dot widget.** Keep (or tune) the 85vw / `scroll-padding` peek so the next lane is visible. Add a visible `1 / 3` (or `2 / 3`, `3 / 3`) as text, updated from scroll position; do not make three tab-stopping dot buttons. Do not `aria-hidden` the other lanes.
3. **One-shot nudge only if `prefers-reduced-motion: no-preference`.** Under `reduce`, skip it or jump with no smooth scroll. Duration well under five seconds; no loop. Do not set `scroll-behavior: smooth` for that motion when reduce is on. Leave user swipes to the UA (2.5.1 does not apply). Ensure the scroll container can take keyboard focus if there are no focusable children, with a visible focus ring.
4. **Do not** add custom swipe handlers, arrow-key slide changing, or pause/play chrome unless the interaction model is rewritten as a real APG carousel — which this destination explicitly does not want.
