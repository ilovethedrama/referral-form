// import { defineConfig } from 'vitest/config'
// import react from '@vitejs/plugin-react'
// import { resolve } from 'node:path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   // plugins: [react()],
//   // test: {
//   //   environment: 'jsdom',
//   //   globals: true,
//   //   setupFiles: './src/setup.ts'
//   // },
//   // resolve: {
//   //   alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
//   // }
//   test: {},
// })

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setup.ts",
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
