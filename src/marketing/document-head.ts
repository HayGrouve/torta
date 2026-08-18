import {
  HERO,
  IG,
  SITE_TITLE,
  SITE_URL,
  STILLS,
  TELEPHONE_E164,
} from "#/marketing/copy.ts"

export const SHARE_IMAGE = `${SITE_URL}${STILLS.fullBleed.src}`

export function isPreviewHost(): boolean {
  return process.env.VERCEL_ENV === "preview"
}

export function jsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Iliaora",
        url: SITE_URL,
        telephone: TELEPHONE_E164,
        sameAs: [IG],
        areaServed: {
          "@type": "City",
          name: "Sofia",
        },
      },
      {
        "@type": "WebSite",
        name: "Iliaora",
        url: SITE_URL,
        description: HERO,
        inLanguage: "bg-BG",
      },
    ],
  }
}

export function documentHead() {
  const preview = isPreviewHost()
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: HERO },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: HERO },
      { property: "og:locale", content: "bg_BG" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: HERO },
      { name: "twitter:image", content: SHARE_IMAGE },
      ...(preview
        ? [{ name: "robots", content: "noindex, nofollow" }]
        : [{ name: "robots", content: "index, follow" }]),
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLdGraph()),
      },
    ],
  }
}
