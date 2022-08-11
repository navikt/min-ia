import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Infographic } from "../../src/Infographic/Infographic";
import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../../src/integrasjoner/aggregert-statistikk-api";
import { hentUtInfographicData } from "../../src/Infographic/datauthenting";

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
  const infobolk = await screen.getByText(/Sykefraværsprosenten i Norge/);
  expect(infobolk.textContent).toBe(
    "Sykefraværsprosenten i Norge det siste kvartalet er: 9%"
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
  const infobolk = await screen.getByText(/Sykefraværsprosenten i din/);
  expect(infobolk.textContent).toBe(
    "Sykefraværsprosenten i din bransje det siste kvartalet er: 5.1%"
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
  const infobolk = await screen.getByText(/Sykefraværet i din/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din bransje de to siste kvartalene er stigende"
  );
});

it("viser synkende fraværstrend i næring når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...hentUtInfographicData(mockAggregertStatistikkSynkendeTrend)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet i din/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er synkende"
  );
});

it("viser ingen fraværstrend når det ikke finnes data", async () => {
  await act(async () => {
    render(<Infographic {...hentUtInfographicData(mockTomtResultat)} />);
  });
  const infobolk = await screen.getByText(/Sykefraværet i din/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er -"
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
  const infobolk = await screen.getByText(/Sykefraværet i din/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er uendret"
  );
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
    "Vanligste årsak til sykemelding i Norge er: Muskel- og skjelettplager"
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
  prosentSiste4Kvartaler: [],
  trend: [],
};

const mockAggregertStatistikkMedBransjetall: AggregertStatistikkDto = {
  prosentSiste4Kvartaler: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: 9.0,
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
      verdi: 7.0,
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
      verdi: 5.1,
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  trend: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: 2.0,
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
      verdi: 4.0,
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
      verdi: -2.0,
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
  prosentSiste4Kvartaler: [],
  trend: [
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: -2.0,
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
  prosentSiste4Kvartaler: [],
  trend: [
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: 0.0,
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
  prosentSiste4Kvartaler: [],
  trend: [
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barenhager",
      verdi: 7.4,
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
