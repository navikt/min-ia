import { render, screen } from "@testing-library/react";
import { Infographic } from "../src/Infographic/Infographic";
import {
  KvartalsvisSykefraværshistorikk,
  SykefraværshistorikkType,
} from "../src/integrasjoner/kvartalsvis-sykefraværshistorikk-api";

it("viser sykefraværsprosent for Norge fra siste tilgjengelige kvartal", async () => {
  //render(<Infographic historikk={mockSykefraværNorge} />);
  //TODO: Fix så denne testen kjører
  //const hei = await screen.getByRole("paragraph", {
  //  name: /Sykefraværsprosenten i Norge akkurat nå er:/i,
  // });
  //expect(hei).toBeInDcument();
});

it("viser sykefraværsprosent for Bransje fra siste tilgjengelige kvartal", async () => {
  // render(<Infographic historikk={mockSykefraværBransje} />);
  // //TODO: Fix så denne testen kjører
  // const hei = await screen.getByRole("paragraph", {
  //   name: /Sykefraværsprosenten i Norge akkurat nå er:/i,
  // });
  //expect(hei).toBeInDcument();
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

const mockSykefraværBransje: KvartalsvisSykefraværshistorikk[] = [
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