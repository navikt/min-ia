import { render } from "@testing-library/react";
import { Fraværskalulator } from "./Kalkulator";
import { axe } from "jest-axe";
import React from "react";

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

describe("Fraværskalulator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Ingen uu-feil fra axe", async () => {
    const { container: myContainer } = render(
      <Fraværskalulator {...dummyData} nedlastingPågår={false} />
    );
    const results = await axe(myContainer);
    expect(results).toHaveNoViolations();
  });
});

const dummyData = {
  fraværsprosentVirksomhet: "14,0",
  tapteDagsverk: "7800",
  muligeDagsverk: "52000",
};
