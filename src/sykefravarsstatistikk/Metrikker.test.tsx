import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { mockAllDatahentingStatusOk } from "./mockdata";
import { BrowserRouter } from "react-router-dom";
import { Forside } from "./Forside/Forside";
import * as metrikker from "../integrasjoner/ia-tjenestemetrikker-api";
import { act } from "react-dom/test-utils";
import { MockResizeObserver } from "./jest/MockResizeObserver";
import { RestRessurs, RestStatus } from "../integrasjoner/rest-status";
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
import { fleskOgFisk, heiOgHåBarnehage } from "./altinn-mock";
import { transformSykefraværAppData } from "./hooks/useSykefraværAppData";
import * as hooks from "../hooks/useOrgnr";

const valgtBedriftMedSykefraværsstatistikkRettigheter =
  heiOgHåBarnehage[0].OrganizationNumber;
jest.mock("../hooks/useOrgnr", () => ({
  __esModule: true,
  ...jest.requireActual("../hooks/useOrgnr"),
  useOrgnr: jest.fn(() => valgtBedriftMedSykefraværsstatistikkRettigheter),
}));

jest.mock("../integrasjoner/ia-tjenestemetrikker-api", () => ({
  __esModule: true,
  ...jest.requireActual("../integrasjoner/ia-tjenestemetrikker-api"),
  sendSykefraværsstatistikkIaMetrikk: jest.fn(),
}));

describe("Metrikkutsendelser", () => {
  const MockObserver = new MockResizeObserver();
  let sykefravarsSpy: jest.SpyInstance;
  let useOrgnrSpy: jest.SpyInstance;

  beforeEach(() => {
    MockObserver.startmock();
    sykefravarsSpy = jest.spyOn(
      metrikker,
      "sendSykefraværsstatistikkIaMetrikk"
    );
    useOrgnrSpy = jest.spyOn(hooks, "useOrgnr");
    useOrgnrSpy.mockReturnValue(
      valgtBedriftMedSykefraværsstatistikkRettigheter
    );
  });

  afterEach(() => {
    MockObserver.stopmock();
    jest.resetAllMocks();
  });

  const altinnOrganisasjoner: RestRessurs<AltinnOrganisasjon[]> = {
    status: RestStatus.Suksess,
    data: [...fleskOgFisk, ...heiOgHåBarnehage],
  };

  const altinnOrganisasjonerMedStatistikktilgang: RestRessurs<
    AltinnOrganisasjon[]
  > = {
    status: RestStatus.Suksess,
    data: heiOgHåBarnehage,
  };

  const mockAppData = {
    ...mockAllDatahentingStatusOk,
    altinnOrganisasjonerMedStatistikktilgang,
    altinnOrganisasjoner,
  };

  function renderForside(skalSendeMetrikkerAutomatisk = true) {
    return render(
      <BrowserRouter>
        <Forside
          kjørerMockApp={true}
          {...transformSykefraværAppData(mockAppData)}
          skalSendeMetrikkerAutomatisk={skalSendeMetrikkerAutomatisk}
        />
      </BrowserRouter>
    );
  }

  it("Sender ia-tjenestermetrikk etter ca. 5 sekunder", async () => {
    jest.useFakeTimers();

    renderForside();

    expect(sykefravarsSpy).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(sykefravarsSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("Sender ia-tjenestermetrikk ved toggle mellom graf og tabell", async () => {
    renderForside(false);

    const toggle = screen.getByRole("radio", { name: "Tabell" });

    expect(toggle).toBeDefined();
    expect(sykefravarsSpy).not.toHaveBeenCalled();

    fireEvent.click(toggle);
    await waitFor(() => {
      expect(sykefravarsSpy).toHaveBeenCalled();
    });
  });

  it("Sender it-metrikk når feltere i historikkgrafen toggles", async () => {
    renderForside(false);

    const checkbox = screen.getByRole("checkbox", {
      name: /bransje: produksjon av nærings- og nytelsesmidler/i,
    });

    expect(sykefravarsSpy).not.toHaveBeenCalled();

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(sykefravarsSpy).toHaveBeenCalled();
    });
  });

  it("Sender ia-tjenestermetrikk ved print-klikk", async () => {
    renderForside(false);

    const knapp = screen.getByText("Last ned");

    expect(knapp).toBeDefined();

    expect(sykefravarsSpy).not.toHaveBeenCalled();

    fireEvent.click(knapp);
    await waitFor(() => {
      expect(sykefravarsSpy).toHaveBeenCalled();
    });
  });
});
