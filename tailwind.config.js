import { heroui } from "@heroui/theme";

export default {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        // "./node_modules/@heroui/theme/dist/components/button.js",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
};
