/** @type {import('tailwindcss').Config} */
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [addVariablesForColors],
};

function addVariablesForColors({addBase, theme}: {addBase: (obj: Record<string, Record<string, string>>) => void, theme: (key: string) => Record<string, string>}) {
    const allColors: Record<string, string> = flattenColorPalette(theme("colors"));
    const newVars: Record<string, string> = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}