import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Infographic } from "../../../src/komponenter/Infographic/Infographic";
import {
  AggregertStatistikkDto,
  Statistikkategori,
  tomtDataobjekt,
} from "../../../src/integrasjoner/aggregert-statistikk-api";
import { hentUtInfographicData } from "../../../src/komponenter/Infographic/datauthenting";

jest.mock("../../../src/hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

it("viser sykefraværsprosenten for Norge", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkMedBransjetall)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />
    );
  });
  const infobolk = await screen.getByText(/I Norge/);
  expect(infobolk.textContent).toBe(
    "I Norge"
  );
  const infoProsent = await screen.getByText(/9/);
  expect(infoProsent.textContent).toBe(
      "9,0%"
  );
});

it("viser sykefraværsprosent for bransje når dette er tilgjengelig", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkMedBransjetall)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />
    );
  });
  const infobolk = await screen.getByText(/I bransje/);
  expect(infobolk.textContent).toBe(
    "I bransje"
  );
  const infoProsent = await screen.getByText(/5,1%/);
  expect(infoProsent.textContent).toBe(
    "5,1%"
  );
});

it("viser stigende fraværstrend for bransjen når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkStigendeTrendBransje)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />
    );
  });
  const infobolk = await screen.getByText(/Trend i bransjen/);
  expect(infobolk.textContent).toBe("Trend i bransjenFravær stiger");
});

it("viser synkende fraværstrend når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkSynkendeTrend)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}

      />
    );
  });
  const infobolk = await screen.getByText(/Trend i bransjen/);
  expect(infobolk.textContent).toBe("Trend i bransjenFravær synker");
});

it("viser ingen fraværstrend når det ikke finnes data", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />
    );
  });
  const infobolk = await screen.getByText(
    /Vi mangler data til å kunne beregne utviklingen/
  );
  expect(infobolk.textContent).toBe(
    "Vi mangler data til å kunne beregne utviklingen i sykefraværet i din næring"
  );
});

it("viser 'uendret' som fraværstrend når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkUendretTrend)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}

      />
    );
  });
  const infobolk = await screen.getByText(/Trend i bransjen/);
  expect(infobolk.textContent).toBe("Trend i bransjenFravær er uendret");
});

it("viser årsak til sykemelding", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkMedBransjetall)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}

      />
    );
  });
  const infobolk = await screen.getByText(/Vanligste diagnose i Norge/);
  expect(infobolk.textContent).toBe(
    "Vanligste diagnose i Norge"
  );
  const infoDiagnose = await screen.getByText(/Muskel og skjelett/);
  expect(infoDiagnose.textContent).toBe(
    "Muskel og skjelett"
  );
});

it("viser lenke til sykefraværsstatistikken og forklaringstekst", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />
    );
  });
  const infobolk = await screen.getByText(/Se statistikk/);
  expect(infobolk.textContent).toBe(
    "Se statistikk"
  );
  const infotekst = await screen.getByText(/Ved å sammenligne dere/);
  expect(infotekst.textContent).toBe(
    "Ved å sammenligne dere med andre og vite årsakene til fraværet, kan dere forebygge og redusere sykefravær."
  );
});

it("lenker riktig til sykefraværsstatistikken", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(tomtDataobjekt)}
        nedlastingPågår={false}
        sykefraværsstatistikkUrl={"http://url"}
      />
    );
  });
  const lenke = await screen.getByRole("link", {
    name: /Se statistikk Ved å sammenligne dere med andre og vite årsakene til fraværet, kan dere forebygge og redusere sykefravær./,
  });

  expect(lenke).toHaveAttribute(
    "href",
    expect.stringContaining(
      "http://url?bedrift=999999999"
    )
  );
});

const mockAggregertStatistikkMedBransjetall: AggregertStatistikkDto = {
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  prosentSiste4KvartalerTotalt: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "9.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "7.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "5.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  trendTotalt: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "4.0",
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
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barenhager",
      verdi: "-2.0",
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

const mockAggregertStatistikkSynkendeTrend: AggregertStatistikkDto = {
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  prosentSiste4KvartalerTotalt: [],
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
