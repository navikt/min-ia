import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Infographic } from "../../src/komponenter/Infographic/Infographic";
import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../../src/integrasjoner/aggregert-statistikk-api";
import { hentUtInfographicData } from "../../src/komponenter/Infographic/datauthenting";

jest.mock("../../src/hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

it("viser sykefraværsprosenten for Norge", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkMedBransjetall)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet i Norge/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i Norge de siste tolv månedene er: 9,0%"
  );
});

it("viser sykefraværsprosent for bransje når dette er tilgjengelig", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkMedBransjetall)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet i din/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din bransje de siste tolv månedene er: 5,1%"
  );
});

it("viser stigende fraværstrend for bransjen når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkStigendeTrendBransje)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet er/);
  expect(infobolk.textContent).toBe("Sykefraværet er stigende i din bransje");
});

it("viser synkende fraværstrend når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkSynkendeTrend)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet er/);
  expect(infobolk.textContent).toBe("Sykefraværet er synkende i din næring");
});

it("viser ingen fraværstrend når det ikke finnes data", async () => {
  await act(async () => {
    render(<Infographic {...hentUtInfographicData(mockTomtResultat)} />);
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
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet er/);
  expect(infobolk.textContent).toBe("Sykefraværet er uendret i din næring");
});

it("viser årsak til sykemelding", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkMedBransjetall)}
      />
    );
  });
  const infobolk = await screen.getByText(/Vanligste årsak til sykemelding/);
  expect(infobolk.textContent).toBe(
    "Vanligste årsak til sykemelding i Norge er: muskel- og skjelettplager"
  );
});

it("viser lenke til sykefraværsstatistikken og forklaringstekst", async () => {
  await act(async () => {
    render(<Infographic {...hentUtInfographicData(mockTomtResultat)} />);
  });
  const infobolk = await screen.getByText(/Trenger du en større oversikt?/);
  expect(infobolk.textContent).toBe(
    "Trenger du en større oversikt? Klikk her for å gå til statistikksiden."
  );
});

it("lenker riktig til sykefraværsstatistikken", async () => {
  await act(async () => {
    render(<Infographic {...hentUtInfographicData(mockTomtResultat)} />);
  });
  const lenke = await screen.getByRole("link", {
    name: /Klikk her for å gå til statistikksiden./,
  });

  expect(lenke).toHaveAttribute(
    "href",
    expect.stringContaining(
      "https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk?bedrift="
    )
  );
});

const mockTomtResultat: AggregertStatistikkDto = {
  prosentSiste4KvartalerTotalt: [],
  trendTotalt: [],
};

const mockAggregertStatistikkMedBransjetall: AggregertStatistikkDto = {
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
