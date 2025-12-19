// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/jest-globals";

// Ensure jsdom-style globals exist for @testing-library/react
if (typeof window !== "undefined" && typeof document === "undefined") {
	// jest-environment-jsdom exposes window.document, but in Jest 30
	// the global "document" may not be defined by default.
	global.document = window.document;
}

// Polyfill for fetch
import "whatwg-fetch";

import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Strings/regexes for console messages that should be ignored in tests
const IGNORED_CONSOLE_PATTERNS = [
	"Det oppstod en feil ved kall til /aggregert",
	"Det oppstod en feil ved henting av aktiviteter",
	"Highcharts warning: Consider including the \"accessibility.js\" module",
	"Not implemented:",
];

function shouldIgnoreConsoleMessage(args) {
	const msg = args[0];
	if (typeof msg !== "string") {
		return false;
	}
	return IGNORED_CONSOLE_PATTERNS.some((pattern) => {
		if (typeof pattern === "string") {
			return msg.includes(pattern);
		}
		return pattern.test(msg);
	});
}

// Silence known noisy console output from expected error scenarios
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
	console.error = (...args) => {
		if (shouldIgnoreConsoleMessage(args)) {
			return;
		}
		originalConsoleError(...args);
	};

	console.warn = (...args) => {
		if (shouldIgnoreConsoleMessage(args)) {
			return;
		}
		originalConsoleWarn(...args);
	};
});

afterAll(() => {
	console.error = originalConsoleError;
	console.warn = originalConsoleWarn;
});

// Mock for CSS.supports, brukt av highcharts
Object.defineProperty(global.CSS, "supports", {
	value: () => jest.fn(),
});