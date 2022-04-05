import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Infographic } from "../../src/Infographic/Infographic";
import {
  KvartalsvisSykefraværshistorikk,
  SykefraværshistorikkType,
} from "../../src/integrasjoner/kvartalsvis-sykefraværshistorikk-api";
import { kalkulerInfographicData } from "../../src/Infographic/datatransformasjon";

jest.mock("../../src/hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

it("viser sykefraværsprosenten i Norge fra siste tilgjengelige kvartal", async () => {
  await act(async () => {
    render(<Infographic {...kalkulerInfographicData(mockSykefraværNorge)} />);
  });
  const infobolk = await screen.getByText(/Sykefraværsprosenten i Norge/);
  expect(infobolk.textContent).toBe(
    "Sykefraværsprosenten i Norge det siste kvartalet er: 4.9%"
  );
});

it("viser sykefraværsprosent for bransje fra siste tilgjengelige kvartal", async () => {
  await act(async () => {
    render(<Infographic {...kalkulerInfographicData(mockSykefraværNæring)} />);
  });
  const infobolk = await screen.getByText(/Sykefraværsprosenten i din næring/);
  expect(infobolk.textContent).toBe(
    "Sykefraværsprosenten i din næring det siste kvartalet er: 5.1%"
  );
});

it("viser stigende fraværstrend i bransjen når dette er tilfellet", async () => {
  await act(async () => {
    render(<Infographic {...kalkulerInfographicData(mockSykefraværNæring)} />);
  });
  const infobolk = await screen.getByText(/Sykefraværet i din næring/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er stigende"
  );
});

it("viser synkende fraværstrend i bransjen når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...kalkulerInfographicData(mockSykefraværNæringSynkendeTrend)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet i din næring/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er synkende"
  );
});

it("viser ingen fraværstrend når det ikke finnes data ett år tilbake", async () => {
  await act(async () => {
    render(
      <Infographic
        {...kalkulerInfographicData(mockSykefraværNæringIngenTrend)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet i din næring/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er -"
  );
});

it("viser 'uendret' som fraværstrend når dette er tilfellet", async () => {
  await act(async () => {
    render(
      <Infographic
        {...kalkulerInfographicData(mockSykefraværNæringUendretTrend)}
      />
    );
  });
  const infobolk = await screen.getByText(/Sykefraværet i din næring/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din næring de to siste kvartalene er uendret"
  );
});

it("viser årsak til sykemelding", async () => {
  await act(async () => {
    render(<Infographic {...kalkulerInfographicData(mockSykefraværNæring)} />);
  });
  const infobolk = await screen.getByText(/Vanligste årsak til sykemelding/);
  expect(infobolk.textContent).toBe(
    "Vanligste årsak til sykemelding i Norge er: Muskel- og skjelettplager"
  );
});

it("viser lenke til sykefraværsstatistikken og forklaringstekst", async () => {
  await act(async () => {
    render(<Infographic {...kalkulerInfographicData(mockTomHistorikk)} />);
  });
  const infobolk = await screen.getByText(/Trenger du en større oversikt?/);
  expect(infobolk.textContent).toBe(
    "Trenger du en større oversikt? Klikk her for å gå til tatistikksiden."
  );
});

it("lenker riktig til sykefraværsstatistikken", async () => {
  await act(async () => {
    render(<Infographic {...kalkulerInfographicData(mockTomHistorikk)} />);
  });
  const lenke = await screen.getByRole("link", {
    name: /Klikk her for å gå til tatistikksiden./,
  });

  expect(lenke).toHaveAttribute(
    "href",
    expect.stringContaining(
      "https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk?bedrift="
    )
  );
});

const mockTomHistorikk: KvartalsvisSykefraværshistorikk[] = [];

const mockSykefraværNorge: KvartalsvisSykefraværshistorikk[] = [
  {
    type: SykefraværshistorikkType.LAND,
    label: "Norge",
    kvartalsvisSykefraværsprosent: [
      {
        prosent: 5.2,
        tapteDagsverk: 95,
        muligeDagsverk: 100,
        erMaskert: false,
        kvartal: 2,
        årstall: 2021,
      },
      {
        prosent: 4.9,
        tapteDagsverk: 1,
        muligeDagsverk: 2,
        erMaskert: false,
        kvartal: 3,
        årstall: 2021,
      },
      {
        prosent: 4.3,
        tapteDagsverk: 2,
        muligeDagsverk: 3,
        erMaskert: false,
        kvartal: 4,
        årstall: 2019,
      },
    ],
  },
];

const mockSykefraværNæring: KvartalsvisSykefraværshistorikk[] = [
  {
    type: SykefraværshistorikkType.NÆRING,
    label: "En næring",
    kvartalsvisSykefraværsprosent: [
      {
        prosent: 5.7,
        tapteDagsverk: 141083.9,
        muligeDagsverk: 2478321.1,
        erMaskert: false,
        kvartal: 1,
        årstall: 2018,
      },
      {
        prosent: 5,
        tapteDagsverk: 121009.6,
        muligeDagsverk: 2417009.6,
        erMaskert: false,
        kvartal: 2,
        årstall: 2018,
      },
      {
        prosent: 4.4,
        tapteDagsverk: 117381.3,
        muligeDagsverk: 2663932.3,
        erMaskert: false,
        kvartal: 3,
        årstall: 2018,
      },
      {
        prosent: 5.4,
        tapteDagsverk: 139641.2,
        muligeDagsverk: 2588943.6,
        erMaskert: false,
        kvartal: 4,
        årstall: 2018,
      },
      {
        prosent: 5.6,
        tapteDagsverk: 139625.1,
        muligeDagsverk: 2483134.2,
        erMaskert: false,
        kvartal: 1,
        årstall: 2019,
      },
      {
        prosent: 5.1,
        tapteDagsverk: 118666.1,
        muligeDagsverk: 2305817.2,
        erMaskert: false,
        kvartal: 2,
        årstall: 2019,
      },
    ],
  },
];

const mockSykefraværNæringSynkendeTrend: KvartalsvisSykefraværshistorikk[] = [
  {
    type: SykefraværshistorikkType.NÆRING,
    label: "En næring",
    kvartalsvisSykefraværsprosent: [
      {
        prosent: 5.7,
        tapteDagsverk: 141083.9,
        muligeDagsverk: 2478321.1,
        erMaskert: false,
        kvartal: 1,
        årstall: 2018,
      },
      {
        prosent: 5.6,
        tapteDagsverk: 139625.1,
        muligeDagsverk: 2483134.2,
        erMaskert: false,
        kvartal: 1,
        årstall: 2019,
      },
    ],
  },
];

const mockSykefraværNæringIngenTrend: KvartalsvisSykefraværshistorikk[] = [
  {
    type: SykefraværshistorikkType.NÆRING,
    label: "En næring",
    kvartalsvisSykefraværsprosent: [
      {
        prosent: 5.7,
        tapteDagsverk: 141083.9,
        muligeDagsverk: 2478321.1,
        erMaskert: false,
        kvartal: 2,
        årstall: 2018,
      },
      {
        prosent: 5.6,
        tapteDagsverk: 139625.1,
        muligeDagsverk: 2483134.2,
        erMaskert: false,
        kvartal: 1,
        årstall: 2019,
      },
    ],
  },
];

const mockSykefraværNæringUendretTrend: KvartalsvisSykefraværshistorikk[] = [
  {
    type: SykefraværshistorikkType.NÆRING,
    label: "En næring",
    kvartalsvisSykefraværsprosent: [
      {
        prosent: 5.6,
        tapteDagsverk: 141083.9,
        muligeDagsverk: 2478321.1,
        erMaskert: false,
        kvartal: 1,
        årstall: 2020,
      },
      {
        prosent: 5.6,
        tapteDagsverk: 139625.1,
        muligeDagsverk: 2483134.2,
        erMaskert: false,
        kvartal: 1,
        årstall: 2021,
      },
    ],
  },
];
