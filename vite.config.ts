/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

  // @ts-ignore
  test: {
    globals: true,
    environment: "jsdom",
  },
});
