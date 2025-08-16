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
            open: false,
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
                    if (!id.includes("node_modules")) return;

                    // 1) 把 React 的所有入口聚到同一包（含 cjs / jsx-runtime / jsx-dev-runtime）
                    if (/[\\/]node_modules[\\/]react[\\/]/.test(id)) {
                        return "react";
                    }

                    // 2) react-dom 及其 scheduler 放一起，避免被拆散
                    if (
                        /[\\/]node_modules[\\/]react-dom[\\/]/.test(id) ||
                        /[\\/]node_modules[\\/]scheduler[\\/]/.test(id)
                    ) {
                        return "react-dom";
                    }

                    // 3) 其它库再分
                    if (
                        /[\\/]node_modules[\\/](react-i18next|i18next)[\\/]/.test(
                            id,
                        )
                    ) {
                        return "i18n";
                    }
                    if (
                        /[\\/]node_modules[\\/](@react-aria|@react-stately)[\\/]/.test(
                            id,
                        )
                    ) {
                        return "react-aria";
                    }
                    if (
                        /[\\/]node_modules[\\/](@heroui|heroui)[\\/]/.test(id)
                    ) {
                        return "heroui";
                    }
                    if (
                        /[\\/]node_modules[\\/]react-textarea-autosize[\\/]/.test(
                            id,
                        )
                    ) {
                        return "react-extensions";
                    }
                    if (/[\\/]node_modules[\\/]zustand[\\/]/.test(id)) {
                        return "zustand";
                    }

                    // 兜底
                    return "vendor";
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
