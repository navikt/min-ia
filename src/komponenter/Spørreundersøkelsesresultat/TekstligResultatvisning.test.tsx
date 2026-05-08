import React from "react";
import { render, screen } from "@testing-library/react";
import TekstligResultatvisning from "./TekstligResultatvisning";
import { SpørsmålResultat } from "./SpørreundersøkelseRad";

const spørsmålMedSvar: SpørsmålResultat = {
  id: "1",
  tekst: "Hva synes du om arbeidsmiljøet?",
  flervalg: false,
  antallDeltakereSomHarSvart: 3,
  svarListe: [
    { id: "a", tekst: "Bra", antallSvar: 2 },
    { id: "b", tekst: "Dårlig", antallSvar: 1 },
  ],
};

const spørsmålUtenSvar: SpørsmålResultat = {
  id: "2",
  tekst: "Hva synes du om ledelsen?",
  flervalg: false,
  antallDeltakereSomHarSvart: 0,
  svarListe: [
    { id: "a", tekst: "Bra", antallSvar: 0 },
    { id: "b", tekst: "Dårlig", antallSvar: 0 },
  ],
};

describe("TekstligResultatvisning", () => {
  it("Viser spørsmålstekst og tabellheadere", () => {
    render(<TekstligResultatvisning spørsmål={spørsmålMedSvar} farge="blue" />);

    expect(
      screen.getByText("Hva synes du om arbeidsmiljøet?"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Svar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Antall svar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Prosent" }),
    ).toBeInTheDocument();
  });

  it("Viser svaralternativer med antall og prosent", () => {
    render(<TekstligResultatvisning spørsmål={spørsmålMedSvar} farge="blue" />);

    expect(screen.getByText("Bra")).toBeInTheDocument();
    expect(screen.getByText("Dårlig")).toBeInTheDocument();
    expect(screen.getByText("66.7%")).toBeInTheDocument();
    expect(screen.getByText("33.3%")).toBeInTheDocument();
  });

  it("Viser spørsmålstekst og feilmelding når ingen har svart", () => {
    render(
      <TekstligResultatvisning spørsmål={spørsmålUtenSvar} farge="blue" />,
    );

    expect(
      screen.getByText("Hva synes du om ledelsen?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Ikke nok svar mottatt.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
