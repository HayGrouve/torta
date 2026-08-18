export function marketingOrigin(): string {
  const origin = process.env.MARKETING_ORIGIN
  if (!origin) {
    throw new Error("MARKETING_ORIGIN is not set; global setup did not start the origin")
  }
  return origin
}

export async function getPublicDocument(path: string): Promise<{
  status: number
  contentType: string
  body: string
}> {
  const response = await fetch(`${marketingOrigin()}${path}`)
  return {
    status: response.status,
    contentType: response.headers.get("content-type") ?? "",
    body: await response.text(),
  }
}
