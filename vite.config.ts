import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    base: "/reborn/",
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("zustand")) {
                            return "zustand";
                        }
                        if (id.includes("react")) {
                            return "react";
                        }
                        return "vendor";
                    }
                },
            },
        },
    },
    server: {
        host: "0.0.0.0",
    },
});
