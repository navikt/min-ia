import Forside from "../../Forside/Forside";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { AltinnOrganisasjon } from "../../../integrasjoner/altinnorganisasjon-api";
import { RestRessurs, RestStatus } from "../../../integrasjoner/rest-status";
import { MockResizeObserver } from "../../jest/MockResizeObserver";
import { fleskOgFisk, heiOgHåBarnehage } from "../../altinn-mock";
import { mockAllDatahentingStatusOk } from "../../mockdata";
import { transformSykefraværAppData } from "../../hooks/useSykefraværAppData";
import * as hooks from "../../../hooks/useOrgnr";
import { mockContainerSize } from "../../../utils/test-utils";

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

const valgtBedriftMedSykefraværsstatistikkRettigheter =
  heiOgHåBarnehage[0].OrganizationNumber;
jest.mock("../../../hooks/useOrgnr", () => ({
  __esModule: true,
  ...jest.requireActual("../../../hooks/useOrgnr"),
  useOrgnr: jest.fn(() => valgtBedriftMedSykefraværsstatistikkRettigheter),
}));

describe("Tester side for manglende Altinn-rettigheter", () => {
  const MockObserver = new MockResizeObserver();
  let useOrgnrSpy: jest.SpyInstance;

  beforeEach(() => {
    MockObserver.startmock();
    useOrgnrSpy = jest.spyOn(hooks, "useOrgnr");
    useOrgnrSpy.mockReturnValue(
      valgtBedriftMedSykefraværsstatistikkRettigheter
    );
    mockContainerSize();
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

  function renderForside() {
    return render(
      <BrowserRouter>
        <Forside
          kjørerMockApp={true}
          {...transformSykefraværAppData(mockAppData)}
        />
      </BrowserRouter>
    );
  }

  it("Viser lenke til Altinn med riktig orgnr", () => {
    const valgtOrgnr = fleskOgFisk[1].OrganizationNumber;
    jest.spyOn(hooks, "useOrgnr").mockReturnValue(valgtOrgnr);

    renderForside();

    const beOmTilgangLenke = screen.getByRole("link", {
      name: "altinn-logo Be om tilgang i Altinn Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i virksomheten som får forespørselen.",
    }) as HTMLAnchorElement;

    expect(beOmTilgangLenke.href).toBe(
      `https://altinn.no/ui/DelegationRequest?offeredBy=${valgtOrgnr}&resources=3403_2`
    );
  });

  it("Vises ikke dersom valgt bedrift har IA-rettigheter", () => {
    const valgtBedriftMedSykefraværsstatistikkRettigheter =
      heiOgHåBarnehage[0].OrganizationNumber;

    jest
      .spyOn(hooks, "useOrgnr")
      .mockReturnValue(valgtBedriftMedSykefraværsstatistikkRettigheter);

    renderForside();

    const forsidensOverskrift = screen.getByRole("heading", {
      name: "Sykefraværsstatistikk for HEI OG HÅ BARNEHAGE",
    });

    expect(forsidensOverskrift).toBeInTheDocument();
  });

  it("Viser lenke til Min Side Arbeidsgiver", () => {
    const valgtBedriftUtenSykefraværsstatistikkRettigheter =
      fleskOgFisk[0].OrganizationNumber;
    jest
      .spyOn(hooks, "useOrgnr")
      .mockReturnValue(valgtBedriftUtenSykefraværsstatistikkRettigheter);

    renderForside();

    const merInfoLenke = screen.getByRole("link", {
      name: "Les mer om hvordan tilgangsstyringen i Altinn fungerer",
    }) as HTMLAnchorElement;
    expect(merInfoLenke.href).toBe(
      "https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
    );
  });

  it("Har ingen uu-feil fra axe", async () => {
    const { container } = renderForside();
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
