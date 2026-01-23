/* import {
    KvartalsvisSykefraværshistorikk,
    Statistikkategori,
} from '../api/kvartalsvis-sykefraværshistorikk-api'; */

import { Statistikkategori } from "../domene/statistikkategori";
import { KvartalsvisSykefraværshistorikk } from "../hooks/useSykefraværAppData";
import {
  getHistorikkLabels,
  konverterTilKvartalsvisSammenligning,
  ÅrstallOgKvartal,
} from "./sykefraværshistorikk-utils";

describe("Tester for graf-og-tabell-utils", () => {
  test("konverterTilKvartalsvisSammenligning skal sette riktig type historikk på riktig key i returobjekt", () => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
      lagHistorikkMedEttInnslag(Statistikkategori.VIRKSOMHET, 10),
      lagHistorikkMedEttInnslag(Statistikkategori.NÆRING, 20),
      lagHistorikkMedEttInnslag(Statistikkategori.SEKTOR, 30),
      lagHistorikkMedEttInnslag(Statistikkategori.LAND, 40),
    ]);

    expect(kvartalsvisSammenligning[0].virksomhet.prosent).toEqual(10);
    expect(kvartalsvisSammenligning[0].næringEllerBransje.prosent).toEqual(20);
    expect(kvartalsvisSammenligning[0].sektor.prosent).toEqual(30);
    expect(kvartalsvisSammenligning[0].land.prosent).toEqual(40);
  });

  test("konverterTilKvartalsvisSammenligning skal returnere data for de årstall og kvartal som vi har historikk på", () => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
      lagHistorikkMedÅrstallOgKvartal(Statistikkategori.VIRKSOMHET, [
        { årstall: 1999, kvartal: 4 },
        { årstall: 2000, kvartal: 1 },
      ]),
      lagHistorikkMedÅrstallOgKvartal(Statistikkategori.LAND, [
        { årstall: 2000, kvartal: 1 },
        { årstall: 2000, kvartal: 2 },
        { årstall: 2000, kvartal: 3 },
        { årstall: 2000, kvartal: 4 },
      ]),
    ]);

    const årstallOgKvartalerSomVises = kvartalsvisSammenligning.map(
      (sammenligning) => {
        return {
          årstall: sammenligning.årstall,
          kvartal: sammenligning.kvartal,
        };
      },
    );

    const resultatInneholder = (årstall: number, kvartal: number): boolean => {
      return !!årstallOgKvartalerSomVises.find(
        (årstallOgKvartal) =>
          årstallOgKvartal.årstall === årstall &&
          årstallOgKvartal.kvartal === kvartal,
      );
    };

    expect(årstallOgKvartalerSomVises.length).toEqual(5);
    expect(resultatInneholder(1999, 4)).toBeTruthy();
    expect(resultatInneholder(2000, 1)).toBeTruthy();
    expect(resultatInneholder(2000, 2)).toBeTruthy();
    expect(resultatInneholder(2000, 3)).toBeTruthy();
    expect(resultatInneholder(2000, 4)).toBeTruthy();
  });

  test("konverterTilKvartalsvisSammenligning skal returnere alle perioder fra start til slutt, selv om det er glipe i dataen", () => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
      lagHistorikkMedÅrstallOgKvartal(Statistikkategori.VIRKSOMHET, [
        { årstall: 1999, kvartal: 4 },
        { årstall: 2000, kvartal: 1 },
      ]),
      lagHistorikkMedÅrstallOgKvartal(Statistikkategori.LAND, [
        { årstall: 2000, kvartal: 1 },
        { årstall: 2000, kvartal: 3 },
        { årstall: 2001, kvartal: 4 },
      ]),
    ]);

    const årstallOgKvartalerSomVises = kvartalsvisSammenligning.map(
      (sammenligning) => {
        return {
          årstall: sammenligning.årstall,
          kvartal: sammenligning.kvartal,
        };
      },
    );

    const resultatInneholder = (årstall: number, kvartal: number): boolean => {
      return !!årstallOgKvartalerSomVises.find(
        (årstallOgKvartal) =>
          årstallOgKvartal.årstall === årstall &&
          årstallOgKvartal.kvartal === kvartal,
      );
    };

    expect(årstallOgKvartalerSomVises.length).toEqual(9);
    expect(resultatInneholder(2000, 1)).toBeTruthy();
    expect(resultatInneholder(2000, 3)).toBeTruthy();
    expect(resultatInneholder(2000, 4)).toBeTruthy();
    expect(resultatInneholder(2001, 1)).toBeTruthy();
    expect(resultatInneholder(2001, 2)).toBeTruthy();
    expect(resultatInneholder(2001, 3)).toBeTruthy();
    expect(resultatInneholder(2001, 4)).toBeTruthy();
  });

  test("konverterTilKvartalsvisSammenligning skal legge inn tom sykefraværsprosent hvis historikken ikke inneholder et gitt kvartal", () => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
      lagHistorikkMedÅrstallOgKvartal(Statistikkategori.VIRKSOMHET, []),
      lagHistorikkMedÅrstallOgKvartal(Statistikkategori.LAND, [
        { årstall: 2000, kvartal: 1 },
      ]),
    ]);

    const resultat = kvartalsvisSammenligning.find(
      (sammenligning) =>
        sammenligning.årstall === 2000 && sammenligning.kvartal === 1,
    )?.virksomhet;

    expect(resultat?.erMaskert).toBeFalsy();
    expect(resultat?.prosent).toEqual(undefined);
  });

  test("konverterTilKvartalsvisSammenligning skal sette feltet næringEllerBransje til næring hvis historikken ikke inneholder tall for bransje", () => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
      lagHistorikkMedEttInnslag(Statistikkategori.NÆRING, 20),
      lagHistorikkMedEttInnslag(Statistikkategori.LAND, 40),
    ]);

    expect(kvartalsvisSammenligning[0].næringEllerBransje.prosent).toEqual(20);
  });

  test("konverterTilKvartalsvisSammenligning skal sette feltet næringEllerBransje til bransje hvis historikken inneholder tall for bransje", () => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
      lagHistorikkMedEttInnslag(Statistikkategori.NÆRING, 20),
      lagHistorikkMedEttInnslag(Statistikkategori.BRANSJE, 30),
      lagHistorikkMedEttInnslag(Statistikkategori.LAND, 40),
    ]);

    expect(kvartalsvisSammenligning[0].næringEllerBransje.prosent).toEqual(30);
  });

  test("historikkUtenVirksomhetVilIkkeKrasje", () => {
    expect(
      getHistorikkLabels([
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.OVERORDNET_ENHET, [
          { årstall: 2000, kvartal: 1 },
        ]),
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.LAND, [
          { årstall: 2000, kvartal: 1 },
        ]),
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.SEKTOR, [
          { årstall: 2000, kvartal: 1 },
        ]),
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.NÆRING, [
          { årstall: 2000, kvartal: 1 },
        ]),
      ]).virksomhet,
    ).toEqual("Ingen tilgjengelig data");
  });

  test("historikkUtenOverOrdnetEnhetVilIkkeKrasje", () => {
    expect(
      getHistorikkLabels([
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.VIRKSOMHET, [
          { årstall: 2000, kvartal: 1 },
        ]),
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.LAND, [
          { årstall: 2000, kvartal: 1 },
        ]),
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.SEKTOR, [
          { årstall: 2000, kvartal: 1 },
        ]),
        lagHistorikkMedÅrstallOgKvartal(Statistikkategori.NÆRING, [
          { årstall: 2000, kvartal: 1 },
        ]),
      ]).overordnetEnhet,
    ).toEqual("Ingen tilgjengelig data");
  });
});

const lagHistorikkMedEttInnslag = (
  type: Statistikkategori,
  prosent: number,
): KvartalsvisSykefraværshistorikk => {
  return {
    type,
    label: "",
    kvartalsvisSykefraværsprosent: [
      {
        kvartal: 1,
        årstall: 2000,
        prosent: prosent,
        erMaskert: false,
        tapteDagsverk: 5,
        muligeDagsverk: 100,
      },
    ],
  };
};

const lagHistorikkMedÅrstallOgKvartal = (
  type: Statistikkategori,
  årstallOgKvartalListe: ÅrstallOgKvartal[],
): KvartalsvisSykefraværshistorikk => {
  return {
    type,
    label: "",
    kvartalsvisSykefraværsprosent: årstallOgKvartalListe.map(
      (årstallOgKvartal) => {
        return {
          ...årstallOgKvartal,
          prosent: 5,
          erMaskert: false,
          tapteDagsverk: 5,
          muligeDagsverk: 100,
        };
      },
    ),
  };
};
