// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/jest-globals";

// Polyfill for fetch
import "whatwg-fetch";

import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Mock for CSS.supports, brukt av highcharts
Object.defineProperty(global.CSS, 'supports', {
	value: () => jest.fn()
});