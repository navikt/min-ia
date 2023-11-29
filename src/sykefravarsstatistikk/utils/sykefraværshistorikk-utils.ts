import { Sykefraværsprosent } from "../Historikk/GrafEllerTabell/Tabell/tabell-utils";
import { Statistikkategori } from "../domene/statistikkategori";
import { KvartalsvisSykefraværshistorikk } from "../hooks/useSykefraværAppData";

export const HistorikkLabels = {
  virksomhet: "virksomhet",
  overordnetEnhet: "overordnetEnhet",
  næringEllerBransje: "næringEllerBransje",
  sektor: "sektor",
  land: "land",
} as const;

export type HistorikkLabels = Record<keyof typeof HistorikkLabels, string>;

export type HistorikkLabel = keyof HistorikkLabels;

export type ÅrstallOgKvartal = {
  årstall: number;
  kvartal: number;
};

export type KvartalsvisSammenligning = ÅrstallOgKvartal & {
  [Property in HistorikkLabel]: Sykefraværsprosent;
};

const TOM_PROSENT: Sykefraværsprosent = {
  erMaskert: false,
  prosent: undefined,
  tapteDagsverk: undefined,
  muligeDagsverk: undefined,
};
export const finnProsent = (
  historikkListe: KvartalsvisSykefraværshistorikk[],
  årstallOgKvartal: ÅrstallOgKvartal,
  type: Statistikkategori
): Sykefraværsprosent => {
  const historikk = historikkListe.find((historikk) => historikk.type === type);
  if (!historikk) {
    return TOM_PROSENT;
  }
  const prosent = historikk.kvartalsvisSykefraværsprosent.find(
    (prosent) =>
      prosent.årstall === årstallOgKvartal.årstall &&
      prosent.kvartal === årstallOgKvartal.kvartal
  );
  return prosent || TOM_PROSENT;
};
const mapTilKvartalsvisSammenligning = (
  historikkListe: KvartalsvisSykefraværshistorikk[],
  årstallOgKvartalerSomSkalVises: ÅrstallOgKvartal[]
): KvartalsvisSammenligning[] => {
  const harBransje = !!historikkListe.find(
    (historikk) => historikk.type === Statistikkategori.BRANSJE
  );

  return årstallOgKvartalerSomSkalVises.map((årstallOgKvartal) => {
    const getProsent = (type: Statistikkategori): Sykefraværsprosent =>
      finnProsent(historikkListe, årstallOgKvartal, type);

    return {
      ...årstallOgKvartal,
      virksomhet: getProsent(Statistikkategori.VIRKSOMHET),
      overordnetEnhet: getProsent(Statistikkategori.OVERORDNET_ENHET),
      næringEllerBransje: getProsent(
        harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
      ),
      sektor: getProsent(Statistikkategori.SEKTOR),
      land: getProsent(Statistikkategori.LAND),
    };
  });
};
export const beregnHvilkeÅrstallOgKvartalerSomSkalVises = (
  historikkListe: KvartalsvisSykefraværshistorikk[]
): ÅrstallOgKvartal[] => {
  if (historikkListe.length === 0) return [];

  let førsteKvartal = { årstall: 9999, kvartal: 4 };
  let sisteKvartal = { årstall: 0, kvartal: 1 };

  for (const historikkgruppe of historikkListe) {
    for (const historikkelement of historikkgruppe.kvartalsvisSykefraværsprosent) {
      if (
        historikkelement.årstall < førsteKvartal.årstall ||
        (historikkelement.årstall === førsteKvartal.årstall &&
          historikkelement.kvartal < førsteKvartal.kvartal)
      ) {
        førsteKvartal = historikkelement;
      }
      if (
        historikkelement.årstall > sisteKvartal.årstall ||
        (historikkelement.årstall === sisteKvartal.årstall &&
          historikkelement.kvartal > sisteKvartal.kvartal)
      ) {
        sisteKvartal = historikkelement;
      }
    }
  }

  const output = [];
  let workingKvartal = førsteKvartal;
  while (
    workingKvartal.årstall < sisteKvartal.årstall ||
    (workingKvartal.årstall === sisteKvartal.årstall &&
      workingKvartal.kvartal <= sisteKvartal.kvartal)
  ) {
    output.push(workingKvartal);

    if (workingKvartal.kvartal < 4) {
      workingKvartal = {
        årstall: workingKvartal.årstall,
        kvartal: workingKvartal.kvartal + 1,
      };
    } else {
      workingKvartal = { årstall: workingKvartal.årstall + 1, kvartal: 1 };
    }
  }

  return output;
};

export const konverterTilKvartalsvisSammenligning = (
  historikkListe: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSammenligning[] => {
  const årstallOgKvartalerSomSkalVises =
    beregnHvilkeÅrstallOgKvartalerSomSkalVises(historikkListe);
  return mapTilKvartalsvisSammenligning(
    historikkListe,
    årstallOgKvartalerSomSkalVises
  );
};

export const historikkHarOverordnetEnhet = (
  historikkListe: KvartalsvisSykefraværshistorikk[]
): boolean =>
  !!historikkListe.find(
    (historikk) =>
      historikk.type === Statistikkategori.OVERORDNET_ENHET &&
      historikk.kvartalsvisSykefraværsprosent.length > 0
  );

const emptyHistorikkLabels = Object.fromEntries(
  Object.keys(HistorikkLabels).map((key) => [key, "Ingen tilgjengelig data"])
) as HistorikkLabels;

export const isHistorikkLabel = (
  maybeLabel: unknown
): maybeLabel is HistorikkLabel => {
  if (typeof maybeLabel !== "string") return false;
  return Object.prototype.hasOwnProperty.call(HistorikkLabels, maybeLabel);
};

const historikkTypeToLabel = (
  type: Statistikkategori
): HistorikkLabel | undefined => {
  switch (type) {
    case Statistikkategori.VIRKSOMHET:
      return HistorikkLabels.virksomhet;
    case Statistikkategori.LAND:
      return HistorikkLabels.land;
    case Statistikkategori.SEKTOR:
      return HistorikkLabels.sektor;
    case Statistikkategori.NÆRING:
      return HistorikkLabels.næringEllerBransje;
    case Statistikkategori.BRANSJE:
      return HistorikkLabels.næringEllerBransje;
    case Statistikkategori.OVERORDNET_ENHET:
      return HistorikkLabels.overordnetEnhet;
  }
};

export const getHistorikkLabels = (
  historikkListe: KvartalsvisSykefraværshistorikk[]
): HistorikkLabels => {
  const labels: Partial<HistorikkLabels> = {};
  for (const historikk of historikkListe) {
    if (isSykefraværshistorikkType(historikk.type)) {
      const historikktype = historikkTypeToLabel(historikk.type);
      if (historikktype) {
        labels[historikktype] = historikk.label;
      }
    }
  }

  return { ...emptyHistorikkLabels, ...labels };
};

const isSykefraværshistorikkType = (
  maybeLabel: string
): maybeLabel is Statistikkategori => {
  return Object.prototype.hasOwnProperty.call(Statistikkategori, maybeLabel);
};
