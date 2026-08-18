# Marketing site UX pass

Label: `wayfinder:map`

## Destination

The marketing site changed in place: a visitor on a phone can discover all three repertoire lanes, inquiry (call or Viber) leads, Instagram is the quieter catalog, and functional icons plus subtle motion help that understanding. Done when `MarketingPage` carries those decisions — not when a new spec document exists.

## Notes

- Domain: public marketing site for Iliaora. Glossary: [`CONTEXT.md`](../../CONTEXT.md). Prefer Visitor, inquiry, repertoire, catalog, still — not app, shop, or carousel-as-product.
- Skills: `/grilling`, `/domain-modeling`, `/prototype` (UI), `/research`. For React/Tailwind work, `/vercel-react-best-practices`.
- This effort **carries execution**: the pass is on the marketing site — see [Apply the UX pass on the marketing site](./issues/06-apply-the-ux-pass.md).
- Whole page: header through footer. No new sections, pages, or stills unless a ticket later proves one is required.
- Icons and motion serve **understanding**, not atmosphere. Icons on inquiry, Instagram, and the three how-it-works steps. Motion is a hint and light enter/settle. Honor `prefers-reduced-motion`. No looping decoration.
- Inquiry is **primary** in the hero as an equal call/Viber pair; Instagram is **secondary** in the compact header — see [Inquiry leads in chrome](./issues/04-inquiry-leads-in-chrome.md). Marks: `Phone`, `MessageCircle` (Viber), `Instagram`.
- Small screens: native repertoire snap as in [Repertoire snap hint](./issues/03-repertoire-snap-hint.md) (caption above, **N от 3**, inset stills, directional chevrons only when a lane exists that way). From `md` up: stacked, full-width, not a snap.
- Copy: locked Bulgarian sentences stay; this pass did not find a line that blocks inquiry.
- Icons: `lucide-react` is already the shadcn icon library — do not add another kit.
- Motion: finite Tailwind `--animate-*` keyframes with `motion-safe:` — see [CSS motion without a library](./issues/02-css-motion-without-a-library.md). No animation library. View Transitions stay off this page.

## Decisions so far

- [CSS motion without a library](./issues/02-css-motion-without-a-library.md) — Finite `--animate-*` keyframes + `motion-safe:`; View Transitions are out of scope on this page.
- [Accessible snap-carousel affordances](./issues/01-snap-carousel-affordances.md) — Keep native snap (peek + 1/3 index, no autoplay); skip carousel ARIA and honor reduced-motion on the nudge.
- [Repertoire snap hint](./issues/03-repertoire-snap-hint.md) — Caption above + **N от 3**; chevrons only toward an existing lane; inset stills; native snap, no APG carousel.
- [Inquiry leads in chrome](./issues/04-inquiry-leads-in-chrome.md) — Instagram in the header; call/Viber as the hero pair (`Phone` / `MessageCircle` / `Instagram`).
- [How-it-works, About, and footer](./issues/05-how-it-works-about-footer.md) — Step icons as labels (Phone+MessageCircle, CookingPot, MapPin); About unchanged; footer a quiet three-link colophon; no copy rewrites.
- [Apply the UX pass on the marketing site](./issues/06-apply-the-ux-pass.md) — Live `MarketingPage` carries chrome B, repertoire A, step icons, footer colophon, and motion-safe enter/nudge.

## Not yet specified

- Whether the full-bleed still’s crop fights the new flow (composition only — not a new photograph).

## Out of scope

- New pages, accounts, order forms, email, or WhatsApp.
- New stills or a photography shoot.
- A brand restyle (new type, new palette, new wordmark).
- Replacing the small-screen snap with a stack or tabs.
- Putting the catalog on the marketing site (Instagram embeds, a shop, a menu-as-checkout).
- Looping or auto-playing decoration; WAI-ARIA APG carousel roles. Modest directional chevrons on the repertoire are in [Repertoire snap hint](./issues/03-repertoire-snap-hint.md), not this list.
