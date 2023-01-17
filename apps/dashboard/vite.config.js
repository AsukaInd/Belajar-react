import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      legacy({
         targets: ["defaults", "not IE 11"],
      }),
   ],
   build: {
      outDir: '../landing/public/app',
      emptyOutDir: true
   },
   base: '/app/',
   resolve: {
      alias: {
         "~/": `${resolve(__dirname, "src")}/`,
      },
   },
});
