import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        svgr(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log"],
            },
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (
                        id.includes("node_modules/react/index.js") ||
                        id.includes("node_modules/react/jsx-runtime")
                    ) {
                        return "react-core";
                    }
                    if (id.includes("node_modules/react-dom/")) {
                        return "react-dom";
                    }
                    if (
                        id.includes("react-i18next") ||
                        id.includes("i18next")
                    ) {
                        return "i18n";
                    }
                    if (
                        id.includes("react-textarea-autosize") ||
                        (id.includes("react-") &&
                            id.includes("node_modules") &&
                            !id.includes("react-dom") &&
                            !id.includes("react-i18next"))
                    ) {
                        return "react-extensions";
                    }
                    if (
                        id.includes("@react-aria") ||
                        id.includes("@react-stately")
                    ) {
                        return "react-aria";
                    }
                    if (id.includes("@heroui") || id.includes("heroui")) {
                        return "heroui";
                    }
                    if (id.includes("zustand")) {
                        return "zustand";
                    }
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
            },
        },
    },
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://192.168.0.19:3000/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
