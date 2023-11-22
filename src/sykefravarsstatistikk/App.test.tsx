import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import {
  mockAllDatahentingStatusLaster,
  mockAllDatahentingStatusOk,
} from "./mockdata";
import Forside from "./Forside/Forside";
import { transformSykefraværAppData } from "./hooks/useSykefraværAppData";
import { heiOgHåBarnehage } from "./altinn-mock";
import * as hooks from "../hooks/useOrgnr";
import { MockResizeObserver } from "./jest/MockResizeObserver";
import { mockContainerSize } from "../utils/test-utils";

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

jest.mock("../hooks/useOrgnr", () => ({
  __esModule: true,
  ...jest.requireActual("../hooks/useOrgnr"),
  useOrgnr: jest.fn(),
}));

jest.mock("../Banner/Banner", () => {
  return function Dummy() {
    return <div>dummy</div>;
  };
});

describe("App", () => {
  const MockObserver = new MockResizeObserver();

  let useOrgnrSpy: jest.SpyInstance;
  beforeEach(() => {
    MockObserver.startmock();
    useOrgnrSpy = jest.spyOn(hooks, "useOrgnr");
    useOrgnrSpy.mockReturnValue(heiOgHåBarnehage[0].OrganizationNumber);
    mockContainerSize();
  });

  afterEach(() => {
    MockObserver.stopmock();
  });

  it("renders without crashing", async () => {
    jest
      .spyOn(hooks, "useOrgnr")
      .mockReturnValue(heiOgHåBarnehage[0].OrganizationNumber);
    const { container } = render(
      <Forside
        kjørerMockApp={true}
        {...transformSykefraværAppData(mockAllDatahentingStatusOk)}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders statistics when user have rights", async () => {
    jest
      .spyOn(hooks, "useOrgnr")
      .mockReturnValue(heiOgHåBarnehage[0].OrganizationNumber);

    render(
      <Forside
        kjørerMockApp={true}
        {...transformSykefraværAppData(mockAllDatahentingStatusOk)}
      />
    );

    const forsidensOverskrift = screen.getByRole("heading", {
      name: "Sykefraværsstatistikk for HEI OG HÅ BARNEHAGE",
    });

    expect(forsidensOverskrift).toBeInTheDocument();
  });

  it("renders without data without crashing", async () => {
    const { container } = render(
      <Forside
        kjørerMockApp={true}
        {...transformSykefraværAppData(mockAllDatahentingStatusLaster)}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Har ingen uu-feil fra axe", async () => {
    const { container } = render(
      <Forside
        kjørerMockApp={true}
        {...transformSykefraværAppData(mockAllDatahentingStatusOk)}
      />
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
