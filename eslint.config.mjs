import js from "@eslint/js";
import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jestPlugin from "eslint-plugin-jest";

const eslintConfig = [
    // Base JS recommendations from ESLint
    js.configs.recommended,

    // Next.js and TypeScript presets
    ...next,
    ...nextCoreWebVitals,
    ...nextTypescript,

    // Project-specific overrides
    {
        plugins: {
            jest: jestPlugin,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "jsx-a11y/anchor-ambiguous-text": [
                2,
                {
                    words: [
                        "her",
                        "klikk",
                        "klikk her",
                        "trykk",
                        "trykk her",
                        "lenken",
                        "linken",
                        "lenka",
                        "lenken her",
                        "linken her",
                        "lenka her",
                        "denne lenken",
                        "denne linken",
                        "denne lenka",
                    ],
                },
            ],
        },
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
            "*.module.css",
            "*.{config,setup}.{ts,js}",
            "dist/**",
        ],
    },
];

export default eslintConfig;