# Accessible snap-carousel affordances

Type: research
Status: resolved

## Question

For a three-item CSS `scroll-snap` repertoire on small screens (peek of the next lane, a 1/3 index or dots, a one-shot nudge), what does current first-party guidance say we must or must not do for discovery and accessibility — including WAI-ARIA carousel patterns, keyboard/swipe, and `prefers-reduced-motion` — without turning the lanes into a slideshow that auto-advances?

## Answer

Keep native horizontal snap (peek of the next lane). Do **not** apply the WAI-ARIA APG carousel (`aria-roledescription="carousel"` / hidden rotating slides / auto-play chrome). Discovery: visible **1 / 3** text, not a grouped-dot picker (extra tab stops). Swipe stays UA overflow (WCAG 2.5.1 does not apply); do not add custom flicks unless prev/next taps exist. One-shot nudge only, ≤5s, no loop; skip or instant-cut under `prefers-reduced-motion: reduce`. Keep lanes as `article`s; do not `aria-hidden` off-screen ones. Make the scroller keyboard-focusable if it has no focusable children.

Research: [snap-carousel-affordances.md](../research/snap-carousel-affordances.md)
