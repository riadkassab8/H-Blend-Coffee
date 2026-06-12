import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT || "5174";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

const isReplit = process.env.REPL_ID !== undefined;

const plugins: any[] = [
  react(),
  tailwindcss(),
];

if (isReplit) {
  const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
  plugins.push(runtimeErrorOverlay.default());
  
  const cartographer = await import("@replit/vite-plugin-cartographer");
  plugins.push(cartographer.cartographer({
    root: path.resolve(import.meta.dirname, ".."),
  }));
  
  const devBanner = await import("@replit/vite-plugin-dev-banner");
  plugins.push(devBanner.devBanner());
}

export default defineConfig({
  base: basePath,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
