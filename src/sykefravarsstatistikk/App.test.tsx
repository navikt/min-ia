import React from "react";
import { render } from "@testing-library/react";
import { MockResizeObserver } from "./jest/MockResizeObserver";
import { axe } from "jest-axe";
import {
  mockAllDatahentingStatusLaster,
  mockAllDatahentingStatusOk,
} from "./mockdata";
import Forside from "./Forside/Forside";
import { transformSykefraværAppData } from "./hooks/useSykefraværAppData";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
      replace: jest.fn(),
    };
  },
}));

describe("App", () => {
  const MockObserver = new MockResizeObserver();

  beforeEach(() => {
    MockObserver.startmock();
  });

  afterEach(() => {
    MockObserver.stopmock();
    jest.resetAllMocks();
  });

  it("renders without crashing", async () => {
    const { container } = render(
      <Forside {...transformSykefraværAppData(mockAllDatahentingStatusOk)} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders without data without crashing", async () => {
    const { container } = render(
      <Forside
        {...transformSykefraværAppData(mockAllDatahentingStatusLaster)}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Har ingen uu-feil fra axe", async () => {
    const { container } = render(
      <Forside {...transformSykefraværAppData(mockAllDatahentingStatusOk)} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Axe fungerer og sier fra om feil", async () => {
    const { container } = render(
      <div>
        <h1>ein</h1>
        <h3>drei</h3>
      </div>
    );
    const results = await axe(container);

    expect(results).not.toHaveNoViolations();
  });
});
