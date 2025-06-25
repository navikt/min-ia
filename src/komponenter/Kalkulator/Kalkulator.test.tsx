import { render } from "@testing-library/react";
import { Fraværskalulator } from "./Kalkulator";
import { axe } from "jest-axe";
import React from "react";
import Kalkulator from "../../pages/kalkulator";

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

const mockredactSearchParam = jest.fn();

Object.defineProperty(window, "skyra", {
  value: {
    redactSearchParam: mockredactSearchParam,
    getUrl: jest.fn(() => "https://arbeidsgiver.nav.no/forebygge-fravar"),
  },
});

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
  it("Maskerer bedrift i URL hos Skyra", () => {
    expect(mockredactSearchParam).not.toHaveBeenCalled();
    render(
      <Kalkulator
        page={{
          title: "Fraværskalkulator",
          description: "Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.",
        }}
        kjørerMockApp={false}
        grafanaAgentUrl="https://grafana-agent-url"
        prodUrl="https://prod-url"
      />
    );

    expect(mockredactSearchParam).toHaveBeenCalledWith("bedrift", { "path": "/forebygge-fravar" });
  });
});

const dummyData = {
  fraværsprosentVirksomhet: "14,0",
  tapteDagsverk: "7800",
  muligeDagsverk: "52000",
};
