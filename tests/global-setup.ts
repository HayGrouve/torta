import { createServer, type ViteDevServer } from "vite"

let server: ViteDevServer | undefined

export default async function setup() {
  server = await createServer({
    server: { host: "127.0.0.1", port: 4174, strictPort: true },
  })
  await server.listen()
  process.env.MARKETING_ORIGIN = "http://127.0.0.1:4174"

  return async () => {
    await server?.close()
  }
}
