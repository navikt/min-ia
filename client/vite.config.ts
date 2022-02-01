import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  server: {
    host: true,
  },

  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["fetch-mock", "node-fetch"])],
    },
    include: ["encoding"],
  },
});
