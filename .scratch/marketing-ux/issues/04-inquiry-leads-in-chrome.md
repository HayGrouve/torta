# Inquiry leads in chrome

Type: prototype
Status: resolved

## Question

How should the header and hero present actions so **inquiry** (call or Viber) is clearly primary and **Instagram** is secondary catalog — compact header, no three equal-weight hero buttons, Lucide icons on the real actions, cream/serif tone kept?

## Prototype

Throwaway variants on `/` (dev), with the locked repertoire snap underneath. Switch with the bottom bar or `?chrome=`:

- [A — Inquiry in header](http://localhost:3000/?chrome=A) — call/Viber in the header; Instagram only as a quiet hero link
- [B — Inquiry in hero](http://localhost:3000/?chrome=B) — Instagram in the header; call/Viber as the hero pair
- [C — Wordmark header](http://localhost:3000/?chrome=C) — identity only in the header; call as the filled action, Viber then Instagram quieter below

## Comments

## Answer

**B — Inquiry in hero.** Compact header: wordmark + quiet Instagram (`Instagram` icon, catalog). Hero: equal outline pair — call (`Phone`) and Viber (`MessageCircle`); Instagram is not repeated there. Locked Bulgarian labels. Prototype source: `src/marketing/prototype/inquiry-chrome/ChromeB.tsx` until [Apply the UX pass on the marketing site](./06-apply-the-ux-pass.md).
