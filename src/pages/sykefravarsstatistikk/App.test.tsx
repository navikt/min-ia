import React from "react";
import { AppContent } from ".";
import { render } from "@testing-library/react";
import { MockResizeObserver } from "./jest/MockResizeObserver";
import { axe } from "jest-axe";
import {
  mockAllDatahentingStatusLaster,
  mockAllDatahentingStatusOk,
} from "./mockdata";

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
    };
  },
}));

describe("App", () => {
  const MockObserver = new MockResizeObserver();

  beforeEach(() => {
    //jest.spyOn(amplitudeMock, 'setUserProperties');
    MockObserver.startmock();
  });

  afterEach(() => {
    MockObserver.stopmock();
    jest.resetAllMocks();
  });

  it("renders without crashing", async () => {
    const { container } = render(
      <AppContent {...mockAllDatahentingStatusOk} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders without data without crashing", async () => {
    const { container } = render(
      <AppContent {...mockAllDatahentingStatusLaster} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TODO: Test at amplitude-events sendes med riktige properties når det er på plass
  // eslint-disable-next-line jest/no-commented-out-tests
  /* it('Amplitude-events sendes med riktige user properties', async () => {
        render(<AppContent {...mockAllDatahentingStatusOk} />);

        await waitFor(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledWith({
                antallAnsatte: '50-99',
                bransje: 'BARNEHAGER',
                sektor: 'offentlig',
                næring2siffer: '88 Sosiale omsorgstjenester uten botilbud',
                prosent: '10-12',
                sykefraværsvurdering: 'UNDER',
            });
        });
    }); */

  it("Har ingen uu-feil fra axe", async () => {
    const { container } = render(
      <AppContent {...mockAllDatahentingStatusOk} />
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
