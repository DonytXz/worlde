import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPages =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName !== "" &&
  !repositoryName.endsWith(".github.io");

export default defineConfig({
  base: isProjectPages ? `/${repositoryName}/` : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
