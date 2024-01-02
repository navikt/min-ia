import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  AggregertStatistikkDto,
  Statistikkategori,
  tomtDataobjekt,
} from "../../integrasjoner/aggregert-statistikk-api";
import { hentUtSykefraværsstatistikkData } from "../../komponenter/Infographic/datauthenting";
import {leggTilBedriftPåUrl, Sykefraværsstatistikk} from "./Sykefraværsstatistikk";
import { axe } from "jest-axe";
import { mockAggregertStatistikkMedBransjetall } from "./mockAggregertStatistikkMedBransjetall";
import { RestStatus } from "../../integrasjoner/rest-status";

jest.mock("../../../src/hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

jest.mock("../../../src/hooks/useAltinnOrganisasjoner", () => ({
  useAltinnOrganisasjoner: () => RestStatus.LasterInn,
  useAltinnOrganisasjonerMedStatistikktilgang: () => RestStatus.LasterInn,
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
    expect(infobolk.textContent).toBe("I Norge siste 12 mnd");
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
    const infobolk = screen.getByText(/I bransje/);
    expect(infobolk.textContent).toBe("I bransje siste 12 mnd");
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
    const infobolk = screen.getByText(/Fravær stiger/);
    expect(infobolk.textContent).toBe("Fravær stiger");
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
    const infobolk = screen.getByText(/Fravær synker/);
    expect(infobolk.textContent).toBe("Fravær synker");
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
      "Vi mangler data til å kunne beregne utviklingen i sykefraværet i din bransje",
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
    const infobolk = screen.getByText(/Fravær er uendret/);
    expect(infobolk.textContent).toBe("Fravær er uendret");
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
    const infobolk = screen.getByText(/I din virksomhet siste 12 MND/);
    expect(infobolk.textContent).toBe("I din virksomhet siste 12 MND");
    const prosent = screen.getByText(/8,8%/);
    expect(prosent.textContent).toBe("8,8%");
  });

  it("viser lenke til sykefraværsstatistikken og forklaringstekst", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );

    const infobolk = await screen.findByText(/Be om tilgang/);
    expect(infobolk.textContent).toBe("Be om tilgang");
    const infotekst = screen.getByText(/Klikk her for å be om tilgang/);
    expect(infotekst.textContent).toBe(
      "Klikk her for å be om tilgang for å se denne virksomhetens sykefraværsstatistikk.",
    );
  });

  it("lenker riktig til sykefraværsstatistikken", async () => {
    render(
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />,
    );

    const lenke = await screen.findByRole("link", {
      name: /Be om tilgang Klikk her for å be om tilgang for å se denne virksomhetens sykefraværsstatistikk./,
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
