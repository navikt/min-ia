import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { RestAltinnOrganisasjoner } from "../../../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { fleskOgFisk, heiOgHåBarnehage } from "../../altinn-mock";
import * as hooks from "../../../hooks/useOrgnr";
import { ManglerRettigheterIAltinnSide } from "./ManglerRettigheterIAltinnSide";

const valgtBedriftMedSykefraværsstatistikkRettigheter =
  heiOgHåBarnehage[0].OrganizationNumber;
jest.mock("../../../hooks/useOrgnr", () => ({
  __esModule: true,
  ...jest.requireActual("../../../hooks/useOrgnr"),
  useOrgnr: jest.fn(() => valgtBedriftMedSykefraværsstatistikkRettigheter),
}));

describe("Tester side for manglende Altinn-rettigheter", () => {
  /* TODO: denne testen kan bli reaktivert etter Altinn 3 har lansert "Be om tilgang" i Altinn
    it("Viser lenke til Altinn med riktig orgnr", () => {
      const valgtOrgnr = fleskOgFisk[1].OrganizationNumber;
      jest.spyOn(hooks, "useOrgnr").mockReturnValue(valgtOrgnr);

      const organisasjoner: RestAltinnOrganisasjoner = {
        status: RestStatus.Suksess,
        data: fleskOgFisk,
      };

      render(
        <ManglerRettigheterIAltinnSide
          restOrganisasjonerMedStatistikk={organisasjoner}
        />
      );

      const beOmTilgangLenke = screen.getByRole("link", {
        name: "altinn-logo Be om tilgang i Altinn Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i virksomheten som får forespørselen.",
      }) as HTMLAnchorElement;

      expect(beOmTilgangLenke.href).toBe(
        `https://altinn.no/ui/DelegationRequest?offeredBy=${valgtOrgnr}&resources=3403_2`
      );
    });
  */

  it("Viser lenke til Min Side Arbeidsgiver", () => {
    const valgtBedriftUtenSykefraværsstatistikkRettigheter =
      fleskOgFisk[0].OrganizationNumber;
    jest
      .spyOn(hooks, "useOrgnr")
      .mockReturnValue(valgtBedriftUtenSykefraværsstatistikkRettigheter);

    const organisasjoner: RestAltinnOrganisasjoner = {
      status: RestStatus.Suksess,
      data: heiOgHåBarnehage,
    };

    render(
      <ManglerRettigheterIAltinnSide
        restOrganisasjonerMedStatistikk={organisasjoner}
      />,
    );

    const merInfoLenke = screen.getByRole("link", {
      name: "Les mer om hvordan tilgangsstyringen i Altinn fungerer",
    }) as HTMLAnchorElement;
    expect(merInfoLenke.href).toBe(
      "https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring",
    );
  });

  it("Har ingen uu-feil fra axe", async () => {
    const organisasjoner: RestAltinnOrganisasjoner = {
      status: RestStatus.Suksess,
      data: heiOgHåBarnehage,
    };

    const { container } = render(
      <ManglerRettigheterIAltinnSide
        restOrganisasjonerMedStatistikk={organisasjoner}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
