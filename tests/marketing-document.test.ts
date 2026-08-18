import { describe, expect, it } from "vitest"
import { getPublicDocument } from "./document.ts"

const IG = "https://www.instagram.com/iliaora_bakery/"
const TEL = "tel:+359879932060"
const VIBER = "viber://chat?number=%2B359879932060"
const PHONE_LABEL = "0879932060"
const TITLE = "Iliaora — сладкиши от Илияна"
const HERO =
  "Сладкиши по поръчка в София. Торти, донъти и торти за повод — печени за Вас, без витрина."

describe("GET / public marketing document", () => {
  it("is a Bulgarian document titled with the house and baker", async () => {
    const { status, body } = await getPublicDocument("/")
    expect(status).toBe(200)
    expect(body).toMatch(/<html[^>]*lang="bg"/)
    expect(body).toContain(`<title>${TITLE}</title>`)
  })

  it("shows Iliaora in the header with the two inquiry CTAs", async () => {
    const { body } = await getPublicDocument("/")
    const header = headerHtml(body)
    expect(header).toContain("Iliaora")
    expect(header).not.toContain("Илияна")
    expect(header).toContain("Вижте в Instagram")
    expect(header).toContain('href="https://www.instagram.com/iliaora_bakery/"')
    expect(header).toContain("Обадете се")
    expect(header).toContain("пишете във Viber")
    expect(header.match(/Обадете се/g)?.length).toBe(1)
    expect(header).toContain(`href="${TEL}"`)
    expect(header).toContain(`href="${VIBER}"`)
  })

  it("names the baker only in the byline near the hero", async () => {
    const { body } = await getPublicDocument("/")
    expect(body).toContain("сладкиши от Илияна")
    expect(body).toContain(HERO)
    expect(body).toContain(PHONE_LABEL)
    expect(body).toContain(`href="${IG}"`)
    expect(body).toContain(`href="${TEL}"`)
    expect(body).toContain(`href="${VIBER}"`)
  })

  it("does not offer a shop, form, account, or other inquiry channels", async () => {
    const { body } = await getPublicDocument("/")
    expect(body).not.toMatch(/<form[\s>]/i)
    expect(body).not.toContain("mailto:")
    expect(body).not.toMatch(/whatsapp/i)
    expect(body).not.toMatch(/cookie/i)
    expect(body).not.toMatch(/language switcher|English|EN<\/option>/i)
    expect(body).not.toMatch(/работно време|calling hours|09:00|10:00/i)
    expect(body).not.toMatch(/лв\.|€\d|SKU|custom orders/i)
    expect(body).not.toMatch(/количка|checkout|cart/i)
  })

  it("explains how the house works: inquire, baked for you, pickup or travel", async () => {
    const { body } = await getPublicDocument("/")
    const heroAt = body.indexOf(HERO)
    const step1At = body.indexOf("Обадете се или пишете във Viber")
    const step1BodyAt = body.indexOf("Един номер за София и за торта за повод.")
    const step2At = body.indexOf("Печем за Вас")
    const step2BodyAt = body.indexOf(
      "По поръчка, от репертоара. Нищо не стои на витрина.",
    )
    const step3At = body.indexOf("Вземане или пътуване")
    const step3BodyAt = body.indexOf(
      "София — по уговорка. Торта за повод може да пътува в България.",
    )
    expect(heroAt).toBeGreaterThan(-1)
    expect(step1BodyAt).toBeGreaterThan(heroAt)
    expect(step1At).toBeGreaterThan(-1)
    expect(step2At).toBeGreaterThan(step1BodyAt)
    expect(step2BodyAt).toBeGreaterThan(step2At)
    expect(step3At).toBeGreaterThan(step2BodyAt)
    expect(step3BodyAt).toBeGreaterThan(step3At)
    expect(body).toContain("01")
    expect(body).toContain("02")
    expect(body).toContain("03")
    expect(body).not.toMatch(/километр|slice-count|брой парчета/i)
  })

  it("presents three repertoire lanes and four hosted stills after the hero", async () => {
    const { body } = await getPublicDocument("/")
    const order = [
      HERO,
      "Един номер за София и за торта за повод.",
      "За деня — по поръчка.",
      "По-малки торти за рожден ден, офис, подарък. София. Печем след обаждането.",
      "Не от витрина.",
      "Донъти, когато ги поискате. Примери за работа — в Instagram.",
      "Сватба и голямо тържество.",
      "Може да пътува в България по уговорка. Цена според тортата — попитайте.",
    ]
    let cursor = -1
    for (const snippet of order) {
      const at = body.indexOf(snippet, cursor + 1)
      expect(at, snippet).toBeGreaterThan(cursor)
      cursor = at
    }

    const stills = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0])
    expect(stills).toHaveLength(4)
    const srcs = stills.map((tag) => attr(tag, "src"))
    const alts = stills.map((tag) => attr(tag, "alt"))
    expect(new Set(srcs).size).toBe(4)
    for (const src of srcs) {
      expect(src).not.toMatch(/unsplash/i)
      expect(src.startsWith("/")).toBe(true)
    }
    expect(alts.every((alt) => /[А-Яа-я]/.test(alt))).toBe(true)
    expect(alts.every((alt) => alt.length > 0)).toBe(true)

    const fullBleedAt = body.indexOf(stills[0] ?? "")
    const howItWorksAt = body.indexOf("Един номер за София и за торта за повод.")
    const tortiAt = body.indexOf("За деня — по поръчка.")
    expect(fullBleedAt).toBeGreaterThan(body.indexOf(HERO))
    expect(howItWorksAt).toBeGreaterThan(fullBleedAt)
    expect(tortiAt).toBeGreaterThan(howItWorksAt)

    expect(body).not.toMatch(/кафе|кетъринг|wholesale|хляб|солено/i)
  })

  it("names the baker in За нас and repeats inquiry in the footer", async () => {
    const { body } = await getPublicDocument("/")
    const about =
      "Пече по поръчка в София. Iliaora е името на къщата; тя е в подписа и тук — не в логото."
    const allergen = "Съставки и алергени потвърждаваме при запитване."
    const privacy =
      "Маркетинговият сайт не приема поръчки и не съхранява запитвания. Обаждане и Viber са извън сайта."

    const lanesAt = body.indexOf("Сватба и голямо тържество.")
    const aboutHeadingAt = body.indexOf("За нас")
    const aboutAt = body.indexOf(about)
    const footerMatch = body.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)
    expect(footerMatch).not.toBeNull()
    const footer = footerMatch?.[0] ?? ""

    expect(aboutHeadingAt).toBeGreaterThan(lanesAt)
    expect(aboutAt).toBeGreaterThan(aboutHeadingAt)
    expect(body).toContain("Илияна")
    expect(body).toContain(allergen)
    expect(footer).toContain("Iliaora")
    expect(footer).toContain("София")
    expect(footer).toContain(PHONE_LABEL)
    expect(footer).toContain(`href="${TEL}"`)
    expect(footer).toContain(`href="${IG}"`)
    expect(footer).toContain("Instagram")
    expect(footer).toContain(privacy)
    expect(body).not.toMatch(/ЕИК|седалище|ул\.|улица /)
    expect(body).not.toMatch(/\/privacy/)
    expect(body).not.toMatch(/Instagram DM|съобщение в Instagram/i)
  })
})

describe("crawler document on the same origin", () => {
  it("exposes Bulgarian Open Graph, Twitter, and JSON-LD for the house", async () => {
    const { body } = await getPublicDocument("/")
    expect(body).toContain(`content="${TITLE}"`)
    expect(body).toContain(`content="${HERO}"`)
    expect(body).toContain('property="og:locale"')
    expect(body).toContain("bg_BG")
    expect(body).toContain('name="twitter:card"')
    expect(body).toContain("summary_large_image")
    expect(body).toMatch(/property="og:image"[^>]*full-bleed\.jpg/)
    expect(body).toMatch(/name="twitter:image"[^>]*full-bleed\.jpg/)
    expect(body).not.toMatch(/noindex/)

    const jsonLdBlocks = [
      ...body.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ].map((match) => JSON.parse(match[1] ?? "{}") as unknown)
    const serialized = JSON.stringify(jsonLdBlocks)
    expect(serialized).toContain('"Organization"')
    expect(serialized).toContain('"WebSite"')
    expect(serialized).toContain("Iliaora")
    expect(serialized).toContain("+359879932060")
    expect(serialized).toContain(IG)
    expect(serialized).toMatch(/Sofia|София/)
    expect(serialized).not.toMatch(/Bakery/)
    expect(serialized).not.toMatch(/"Product"/)
    expect(serialized).not.toMatch(/streetAddress/)
    expect(serialized).not.toMatch(/price/)
  })

  it("indexes only the marketing home path", async () => {
    const robots = await getPublicDocument("/robots.txt")
    expect(robots.status).toBe(200)
    expect(robots.body).toMatch(/User-agent:\s*\*/i)
    expect(robots.body).toMatch(/Allow:\s*\/\s*$/m)
    expect(robots.body).toContain("https://iliaora.com/sitemap.xml")
    expect(robots.body).not.toMatch(/Allow:\s*\/blog/i)

    const sitemap = await getPublicDocument("/sitemap.xml")
    expect(sitemap.status).toBe(200)
    expect(sitemap.body).toContain("https://iliaora.com/")
    expect(sitemap.body).not.toMatch(/\/blog|\/sofia|\/en\b/)
    const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    )
    expect(locs).toEqual(["https://iliaora.com/"])
  })
})

describe("Vercel preview document on the same origin family", () => {
  it("tells crawlers not to index a preview host", async () => {
    const origin = process.env.PREVIEW_ORIGIN
    expect(origin).toBeTruthy()
    const page = await fetch(`${origin}/`)
    const html = await page.text()
    expect(page.status).toBe(200)
    expect(html).toMatch(/noindex/)

    const robots = await fetch(`${origin}/robots.txt`)
    const robotsBody = await robots.text()
    expect(robots.status).toBe(200)
    expect(robotsBody).toMatch(/Disallow:\s*\//)
    expect(robotsBody).not.toMatch(/Allow:\s*\/\s*$/m)
  })
})

function headerHtml(document: string): string {
  const match = document.match(/<header\b[^>]*>[\s\S]*?<\/header>/i)
  if (!match) {
    throw new Error("public document has no <header>")
  }
  return match[0]
}

function attr(tag: string, name: string): string {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`))
  return match?.[1] ?? ""
}
