import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { LegendMedToggles } from "./LegendMedToggles";
import {
  HistorikkLabel,
  HistorikkLabels,
} from "../../../../utils/sykefraværshistorikk-utils";
import { heiOgHåBarnehage } from "../../../../altinn-mock";

const valgtBedriftMedSykefraværsstatistikkRettigheter =
  heiOgHåBarnehage[0].OrganizationNumber;
jest.mock("../../../../../hooks/useOrgnr", () => ({
  __esModule: true,
  ...jest.requireActual("../../../../../hooks/useOrgnr"),
  useOrgnr: jest.fn(() => valgtBedriftMedSykefraværsstatistikkRettigheter),
}));

jest.mock("../../../../../integrasjoner/ia-tjenestemetrikker-api", () => ({
  __esModule: true,
  ...jest.requireActual(
    "../../../../../integrasjoner/ia-tjenestemetrikker-api",
  ),
  sendDigitalIaTjenesteMetrikk: jest.fn(),
}));

jest.mock("../../../../../amplitude/events", () => ({
  __esModule: true,
  ...jest.requireActual("../../../../../amplitude/events"),
  sendCheckboxLagtTil: jest.fn(),
  sendCheckboxFjernet: jest.fn(),
}));

describe("LegendMedToggles", () => {
  const labels: HistorikkLabels = {
    virksomhet: "Virksomhet",
    overordnetEnhet: "Overordnet enhet",
    næringEllerBransje: "Bransje",
    sektor: "Sektor",
    land: "Land",
  };

  const linjerSomKanVises: HistorikkLabel[] = [
    "virksomhet",
    "overordnetEnhet",
    "næringEllerBransje",
    "sektor",
    "land",
  ];

  it("Sjekker at alle linjer som skal vises vises", () => {
    render(
      <LegendMedToggles
        labels={labels}
        linjerSomKanVises={linjerSomKanVises}
        linjerSomSkalVises={[]}
        setLinjerSomSkalVises={() => {}}
      />,
    );

    expect(screen.getByLabelText(`Virksomhet: Virksomhet`)).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Overordnet enhet: Overordnet enhet`),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(`Bransje: Bransje`)).toBeInTheDocument();
    expect(screen.getByLabelText(`Sektor: Sektor`)).toBeInTheDocument();
    expect(screen.getByLabelText(`Land`)).toBeInTheDocument();
  });

  it("Kaller setLinjerSomSkalVises med rikgig verdi på check", () => {
    const setLinjerSomSkalVises = jest.fn();

    render(
      <LegendMedToggles
        labels={labels}
        linjerSomKanVises={linjerSomKanVises}
        linjerSomSkalVises={[]}
        setLinjerSomSkalVises={setLinjerSomSkalVises}
      />,
    );

    fireEvent.click(screen.getByLabelText(`Virksomhet: Virksomhet`));

    expect(setLinjerSomSkalVises).toHaveBeenCalledWith(["virksomhet"]);
  });

  it("Kaller setLinjerSomSkalVises med rikgig verdi check med eksisterende verdi", () => {
    const setLinjerSomSkalVises = jest.fn();

    render(
      <LegendMedToggles
        labels={labels}
        linjerSomKanVises={linjerSomKanVises}
        linjerSomSkalVises={["virksomhet"]}
        setLinjerSomSkalVises={setLinjerSomSkalVises}
      />,
    );

    fireEvent.click(
      screen.getByLabelText(`Overordnet enhet: Overordnet enhet`),
    );

    expect(setLinjerSomSkalVises).toHaveBeenCalledWith([
      "virksomhet",
      "overordnetEnhet",
    ]);
  });

  it("Kaller setLinjerSomSkalVises med rikgig verdi på uncheck", () => {
    const setLinjerSomSkalVises = jest.fn();

    render(
      <LegendMedToggles
        labels={labels}
        linjerSomKanVises={linjerSomKanVises}
        linjerSomSkalVises={["virksomhet"]}
        setLinjerSomSkalVises={setLinjerSomSkalVises}
      />,
    );

    fireEvent.click(screen.getByLabelText(`Virksomhet: Virksomhet`));

    expect(setLinjerSomSkalVises).toHaveBeenCalledWith([]);
  });
});
