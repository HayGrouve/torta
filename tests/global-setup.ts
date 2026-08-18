import { spawn, type ChildProcess } from "node:child_process"
import { createServer, type ViteDevServer } from "vite"

let server: ViteDevServer | undefined
let previewChild: ChildProcess | undefined

export default async function setup() {
  server = await createServer({
    server: { host: "127.0.0.1", port: 4174, strictPort: true },
  })
  await server.listen()
  process.env.MARKETING_ORIGIN = "http://127.0.0.1:4174"

  previewChild = spawn(
    "pnpm",
    ["exec", "vite", "dev", "--host", "127.0.0.1", "--port", "4175"],
    {
      env: { ...process.env, VERCEL_ENV: "preview" },
      stdio: "ignore",
    },
  )
  process.env.PREVIEW_ORIGIN = "http://127.0.0.1:4175"
  await waitForOrigin(process.env.PREVIEW_ORIGIN)

  return async () => {
    previewChild?.kill("SIGTERM")
    await server?.close()
  }
}

async function waitForOrigin(origin: string, attempts = 40): Promise<void> {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(origin)
      if (response.ok) return
    } catch {
      // The preview origin is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`preview origin did not start: ${origin}`)
}
