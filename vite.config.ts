import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3035,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});

export default config;
