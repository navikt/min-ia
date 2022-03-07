import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Infographic } from "../src/Infographic/Infographic";
import {
  KvartalsvisSykefraværshistorikk,
  SykefraværshistorikkType,
} from "../src/integrasjoner/kvartalsvis-sykefraværshistorikk-api";

it("viser sykefraværsprosenten i Norge fra siste tilgjengelige kvartal", async () => {
  render(<Infographic historikk={mockSykefraværNorge} />);
  const infobolk = await screen.getByText(/Sykefraværsprosenten i Norge/);
  expect(infobolk.textContent).toBe(
    "Sykefraværsprosenten i Norge akkurat nå er: 4.9%"
  );
});

it("viser sykefraværsprosent for Bransje fra siste tilgjengelige kvartal", async () => {
  render(<Infographic historikk={mockSykefraværNæring} />);
  const infobolk = await screen.getByText(/Sykefraværsprosenten i din bransje/);
  expect(infobolk.textContent).toBe(
    "Sykefraværsprosenten i din bransje akkurat nå er: 5.1%"
  );
});

it("viser stigende fraværstrend i bransjen når dette er tilfellet", async () => {
  render(<Infographic historikk={mockSykefraværNæring} />);
  const infobolk = await screen.getByText(/Sykefraværet i din bransje/);
  expect(infobolk.textContent).toBe(
    "Sykefraværet i din bransje akkurat nå er stigende"
  );
});

it("viser årsak til sykemelding", async () => {
  render(<Infographic historikk={mockSykefraværNæring} />);
  const infobolk = await screen.getByText(/Vanligste årsak til sykemelding/);
  expect(infobolk.textContent).toBe("Vanligste årsak til sykemelding i Norge er: Muskel- og skjelettplager"
  );
});

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
