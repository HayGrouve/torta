import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globalSetup: "./tests/global-setup.ts",
    testTimeout: 30_000,
    hookTimeout: 60_000,
    fileParallelism: false,
    teardownTimeout: 5_000,
  },
})
