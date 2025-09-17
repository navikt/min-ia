import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  AggregertStatistikkDto,
  Statistikkategori,
  tomtDataobjekt,
} from "../../integrasjoner/aggregert-statistikk-api";
import { hentUtSykefraværsstatistikkData } from "../../komponenter/Infographic/datauthenting";
import { leggTilBedriftPåUrl, Sykefraværsstatistikk } from "./Sykefraværsstatistikk";
import { axe } from "jest-axe";
import { mockAggregertStatistikkMedBransjetall } from "./mockAggregertStatistikkMedBransjetall";
import { RestStatus } from "../../integrasjoner/rest-status";
import { useAltinnOrganisasjonerMedStatistikktilgang } from "../../hooks/useAltinnOrganisasjoner";

jest.mock("../../hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

jest.mock("../../hooks/useAltinnOrganisasjoner", () => ({
  useAltinnOrganisasjoner: jest.fn(() => ({
    status: RestStatus.Suksess,
    data: [
      {
        Name: "FIKTIVT SYKEHUS [TEST]",
        Type: "Enterprise",
        OrganizationNumber: "999999999",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
    ],
  })),
  useAltinnOrganisasjonerMedStatistikktilgang: jest.fn(() => ({
    status: RestStatus.Suksess,
    data: [
      {
        Name: "FIKTIVT SYKEHUS [TEST]",
        Type: "Enterprise",
        OrganizationNumber: "999999999",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
    ],
  })),
}));

describe("Tester at bedrift legges korrekt til på URL", () => {
  it("returnerer opprinnelig URL dersom orgnummer er undefined", () => {
    expect(leggTilBedriftPåUrl("url", undefined)).toBe("url");
  });

  it("legger på orgnr dersom orgnummer finnes", () => {
    expect(leggTilBedriftPåUrl("url", "999999999")).toBe("url?bedrift=999999999");
  });
});


describe("Sykefraværsstatistikk", () => {
  it("viser sykefraværsprosenten for Norge", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkMedBransjetall,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(/I Norge/);
    expect(infobolk.textContent).toBe("I Norge:");
    const infoProsent = screen.getByText(/9/);
    expect(infoProsent.textContent).toBe("9,0%");
  });

  it("viser sykefraværsprosent for bransje når dette er tilgjengelig", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkMedBransjetall,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(/I din bransje/);
    expect(infobolk.textContent).toBe("I din bransje:");
    const infoProsent = screen.getByText(/5,1%/);
    expect(infoProsent.textContent).toBe("5,1%");
  });

  it("viser stigende fraværstrend for bransjen når dette er tilfellet", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkStigendeTrendBransje,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(/Fraværet stiger i bransjen/);
    expect(infobolk.textContent).toBe("Fraværet stiger i bransjen");
  });

  it("viser synkende fraværstrend når dette er tilfellet", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkSynkendeTrend,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(/Fraværet synker i næringen/);
    expect(infobolk.textContent).toBe("Fraværet synker i næringen");
  });

  it("viser ingen fraværstrend når det ikke finnes data", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(
      /Vi mangler data til å kunne beregne utviklingen/,
    );
    expect(infobolk.textContent).toBe(
      "Vi mangler data til å kunne beregne utviklingen i sykefraværet i din næring",
    );
  });

  it("viser 'uendret' som fraværstrend når dette er tilfellet", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkUendretTrend,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(/Fraværet er uendret i næringen/);
    expect(infobolk.textContent).toBe("Fraværet er uendret i næringen");
  });

  it("viser sykefravær i virksomhet", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkMedBransjetall,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    const infobolk = screen.getByText(/I din virksomhet:/);
    expect(infobolk.textContent).toBe("I din virksomhet:");
    const prosent = screen.getByText(/8,8%/);
    expect(prosent.textContent).toBe("8,8%");
  });

  it("Forteller bruker at de ikke har tilgang til noen virksomheter", async () => {
    (useAltinnOrganisasjonerMedStatistikktilgang as jest.Mock).mockReturnValueOnce({
      status: RestStatus.Suksess,
      data: [],
    });

    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    expect(screen.getByText("Du mangler tilgang i Altinn for å kunne se tall for denne virksomheten.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Les mer om tilgang til sykefraværsstatistikk/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Les mer om tilgang til sykefraværsstatistikk/ })).toHaveAttribute(
      "href",
      expect.stringContaining("http://url?bedrift=999999999"),
    );
  });
  it("Forteller bruker at de mangler tilgang til sykefraværsstatistikk i virksomheten", async () => {
    (useAltinnOrganisasjonerMedStatistikktilgang as jest.Mock).mockReturnValueOnce({
      status: RestStatus.Suksess,
      data: [
        {
          Name: "FIKTIVT SYKEHUS [TEST]",
          Type: "Enterprise",
          OrganizationNumber: "123123123",
          OrganizationForm: "AS",
          Status: "Active",
          ParentOrganizationNumber: "",
        },
      ],
    });

    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    expect(screen.getByText("Du mangler tilgang i Altinn for å kunne se tall for denne virksomheten.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Les mer om tilgang til sykefraværsstatistikk/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Les mer om tilgang til sykefraværsstatistikk/ })).toHaveAttribute(
      "href",
      expect.stringContaining("http://url?bedrift=999999999"),
    );
  });

  it("Forteller IKKE bruker at de mangler tilgang til sykefraværsstatistikk dersom de ikke gjør det", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkMedBransjetall,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    expect(screen.queryByText("Du mangler tilgang i Altinn for å kunne se tall for denne virksomheten.")).toBeNull();
  });

  test("Viser riktig lenke til sykefravørsstatistikken dersom bruker ikke har tilgang", async () => {
    (useAltinnOrganisasjonerMedStatistikktilgang as jest.Mock).mockReturnValueOnce({
      status: RestStatus.Suksess,
      data: [
        {
          Name: "FIKTIVT SYKEHUS [TEST]",
          Type: "Enterprise",
          OrganizationNumber: "123123123",
          OrganizationForm: "AS",
          Status: "Active",
          ParentOrganizationNumber: "",
        },
      ],
    });

    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );

    const lenke = await screen.findByRole("link", {
      name: /Les mer om tilgang til sykefraværsstatistikk/,
    });

    expect(lenke).toHaveAttribute(
      "href",
      expect.stringContaining("http://url?bedrift=999999999"),
    );
  });

  test("uu-feil fra axe", async () => {
    let { container } = render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );
    let results = await axe(container);
    expect(results).toHaveNoViolations();

    container = render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkMedBransjetall,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    ).container;
    results = await axe(container);
    expect(results).toHaveNoViolations();

    container = render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkUendretTrend,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    ).container;
    results = await axe(container);
    expect(results).toHaveNoViolations();

    container = render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkSynkendeTrend,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    ).container;
    results = await axe(container);
    expect(results).toHaveNoViolations();

    container = render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(
          mockAggregertStatistikkStigendeTrendBransje,
        )}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    ).container;
    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const mockAggregertStatistikkSynkendeTrend: AggregertStatistikkDto = {
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  prosentSiste4KvartalerTotalt: [],
  prosentSiste4KvartalerGradert: [],
  prosentSiste4KvartalerKorttid: [],
  prosentSiste4KvartalerLangtid: [],
  trendTotalt: [
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "-2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
};

const mockAggregertStatistikkUendretTrend: AggregertStatistikkDto = {
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  prosentSiste4KvartalerTotalt: [],
  prosentSiste4KvartalerGradert: [],
  prosentSiste4KvartalerKorttid: [],
  prosentSiste4KvartalerLangtid: [],
  trendTotalt: [
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barnehager",
      verdi: "0.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
};

const mockAggregertStatistikkStigendeTrendBransje: AggregertStatistikkDto = {
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  prosentSiste4KvartalerTotalt: [
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "3.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2021,
          kvartal: 2,
        },
        {
          årstall: 2021,
          kvartal: 3,
        },
        {
          årstall: 2021,
          kvartal: 4,
        },
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  prosentSiste4KvartalerGradert: [
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "3.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2021,
          kvartal: 2,
        },
        {
          årstall: 2021,
          kvartal: 3,
        },
        {
          årstall: 2021,
          kvartal: 4,
        },
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  prosentSiste4KvartalerKorttid: [
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "3.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2021,
          kvartal: 2,
        },
        {
          årstall: 2021,
          kvartal: 3,
        },
        {
          årstall: 2021,
          kvartal: 4,
        },
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  prosentSiste4KvartalerLangtid: [
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "3.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2021,
          kvartal: 2,
        },
        {
          årstall: 2021,
          kvartal: 3,
        },
        {
          årstall: 2021,
          kvartal: 4,
        },
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  trendTotalt: [
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "7.4",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
        {
          årstall: 2021,
          kvartal: 1,
        },
      ],
    },
  ],
};
