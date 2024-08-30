import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hc_practice/react_todo_list/dist/",
  plugins: [react()],
});
