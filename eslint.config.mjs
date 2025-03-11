import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from '@eslint/eslintrc';
import js from "@eslint/js";
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended
})

const eslingconfig = [
	...compat.config(
		...fixupConfigRules(
			{
				extends: [
					"eslint:recommended",
					"plugin:@typescript-eslint/eslint-recommended",
					"plugin:@typescript-eslint/recommended",
					"plugin:jest/recommended",
					"next/core-web-vitals",
					"prettier", // Add "prettier" last. This will turn off eslint rules conflicting with prettier. This is not what will format our code.
				],
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
				settings: {},
				ignorePatterns: ["*.module.css", "*.{config,setup}.{ts,js}", "dist/*", "node_modules/*"],
			}
		),
	)
];

export default eslingconfig;