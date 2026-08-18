# CSS motion without a library

Type: research
Status: resolved

## Question

With Tailwind CSS 4 and no Framer Motion (or similar) in the repo, what first-party CSS/Tailwind mechanisms should we use for (a) a short one-shot nudge that the repertoire can slide and (b) light enter/settle on sections — and how must `prefers-reduced-motion` disable or replace them? Is the View Transition API in scope for this single long page, or is it the wrong tool?

## Answer

Use finite Tailwind v4 `--animate-*` `@keyframes` (not the built-in infinite `animate-*` utilities) for a one-shot repertoire `translate` nudge and a light opacity+translate enter/settle; apply them with `motion-safe:` so `prefers-reduced-motion: reduce` never runs them — keep static peek/index/dots instead. View Transitions are the wrong tool for this single long page (they animate view swaps, not in-page hints).

Full notes: [css-motion-without-a-library.md](../research/css-motion-without-a-library.md)
