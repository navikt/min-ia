import js from "@eslint/js";
import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jestPlugin from "eslint-plugin-jest";

const eslintConfig = [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.module.css",
      "*.{config,setup}.{ts,js}",
      "dist/**",
      "coverage/**",
    ],
  },

  // Base JS recommendations from ESLint
  js.configs.recommended,

  // Next.js and TypeScript presets
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,

  // Global project rules
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
  },

  // Jest setup and config
  {
    files: ["jest.config.js", "jest.setup.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
        expect: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // React hooks/compiler rules that are currently too strict for these components
  {
    files: [
      "src/komponenter/Kalkulator/KalkulatorMedDagsverk.tsx",
      "src/komponenter/Kalkulator/KalkulatorMedProsent.tsx",
      "src/sykefravarsstatistikk/Forside/PrintOnlyHref.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["src/komponenter/Spørreundersøkelsesresultat/Grafer/BarChart.tsx"],
    rules: {
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
