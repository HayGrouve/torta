# Repertoire snap hint

Type: prototype
Status: resolved
Blocked by: 01, 02

## Question

How should the small-screen repertoire snap *look and behave* so a visitor can tell there are three lanes (торти, донъти, торти за повод) and can move between them — given native snap, peek, a visible **1 / 3** index (not dots, not carousel ARIA), a one-shot nudge skipped under reduced-motion, stacked from `md` up, keyboard-reachable scroller if lanes have no focusable children?

## Prototype

Throwaway variants on `/` (dev only), switchable with the bottom bar or `?variant=`:

- [A — Caption above](http://localhost:3000/?variant=A)
- [B — Index on still](http://localhost:3000/?variant=B)
- [C — Name roster](http://localhost:3000/?variant=C)

Narrow the viewport to a phone width. Arrow keys switch variants unless the repertoire scroller is focused (then they scroll the lanes).

## Comments

## Answer

**A — Caption above**, with directional chevrons: current kicker + **N от 3** over the strip; 85vw peek; stills inset so cream sits between photo and arrows; left chevron only when a previous lane exists, right only when a next lane exists; tap scrolls the native snap (instant under reduced-motion); one-shot `motion-safe:animate-nudge-x`; no APG carousel roles; stacked from `md` up.

Prototype source: `src/marketing/prototype/repertoire-snap/VariantA.tsx` (throwaway until [Apply the UX pass on the marketing site](./06-apply-the-ux-pass.md)).
