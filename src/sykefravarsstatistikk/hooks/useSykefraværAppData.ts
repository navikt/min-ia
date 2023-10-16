import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";
import { Statistikkategori } from "../domene/statistikkategori";
import { StatistikkDto } from "../../integrasjoner/aggregert-statistikk-api";
import { RestAltinnOrganisasjoner } from "../../integrasjoner/altinnorganisasjon-api";
import { useAggregertStatistikk } from "../../hooks/useAggregertStatistikk";
import { useAltinnOrganisasjoner } from "../../hooks/useAltinnOrganisasjoner";
import { useAltinnOrganisasjonerMedStatistikktilgang } from "../../hooks/useAltinnOrganisasjonerMedStatistikktilgang";
import { useKvartalsvisStatistikk } from "../../hooks/useKvartalsvisStatistikk";

export type ÅrstallOgKvartal = {
  årstall: number;
  kvartal: number;
};

export interface Publiseringsdatoer {
  sistePubliseringsdato: Date;
  nestePubliseringsdato: Date;
  gjeldendePeriode: ÅrstallOgKvartal;
}

export interface SerialiserbarPubliseringsdatoer {
  sistePubliseringsdato: string;
  nestePubliseringsdato: string;
  gjeldendePeriode: ÅrstallOgKvartal;
}

export const SykefraværshistorikkType = Statistikkategori;

type SykefraværshistorikkType = Statistikkategori;

export type RestAggregertStatistikk = {
  restStatus: RestStatus;
  aggregertData?: Map<Statistikkategori, AggregertStatistikk>;
  error?: unknown;
};

type SerialiserbarStatistikkInnhold = {
  label: string;
  statistikkategori: Statistikkategori;
  verdi: string;
  antallPersonerIBeregningen: number;
  kvartalerIBeregningen: {
    årstall: number;
    kvartal: number;
  }[];
}[];

export type SerialiserbarStatistikk = {
  prosentSiste4KvartalerTotalt: SerialiserbarStatistikkInnhold;
  prosentSiste4KvartalerGradert: SerialiserbarStatistikkInnhold;
  prosentSiste4KvartalerKorttid: SerialiserbarStatistikkInnhold;
  prosentSiste4KvartalerLangtid: SerialiserbarStatistikkInnhold;
  trendTotalt: SerialiserbarStatistikkInnhold;
  tapteDagsverkTotalt: SerialiserbarStatistikkInnhold;
  muligeDagsverkTotalt: SerialiserbarStatistikkInnhold;
};

type KvartalsvisSykefraværsprosent = {
  kvartal: number;
  årstall: number;
} & Sykefraværsprosent;

type Sykefraværsprosent =
  | {
      erMaskert: true;
      prosent: null;
      tapteDagsverk: null;
      muligeDagsverk: null;
    }
  | {
      erMaskert: false;
      prosent: number | undefined;
      tapteDagsverk: number | undefined;
      muligeDagsverk: number | undefined;
    };

export interface KvartalsvisSykefraværshistorikk {
  type: SykefraværshistorikkType;
  label: string;
  kvartalsvisSykefraværsprosent: KvartalsvisSykefraværsprosent[];
}

export interface SykefraværAppData {
  altinnOrganisasjoner: RestAltinnOrganisasjoner;
  altinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
  sykefraværshistorikk: RestRessurs<KvartalsvisSykefraværshistorikk[]>;
  aggregertStatistikk: RestAggregertStatistikk;
  publiseringsdatoer: RestRessurs<Publiseringsdatoer>;
  skalSendeMetrikkerAutomatisk?: boolean;
}

export interface SerialiserbarAppData {
  altinnOrganisasjoner: RestAltinnOrganisasjoner;
  altinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
  sykefraværshistorikk: RestRessurs<KvartalsvisSykefraværshistorikk[]>;
  aggregertStatistikk: RestRessurs<AggregertStatistikkDto>;
  publiseringsdatoer: RestRessurs<SerialiserbarPubliseringsdatoer>;
  skalSendeMetrikkerAutomatisk?: boolean;
}

export const genererHistorikk = (
  startÅrstallOgKvartal: ÅrstallOgKvartal,
  antallKvartaler: number,
  startprosent: number,
  variasjon: number,
  randomness: number,
  vekst: number
): KvartalsvisSykefraværsprosent[] => {
  const historikk: KvartalsvisSykefraværsprosent[] = [];

  let årstallOgKvartal = { ...startÅrstallOgKvartal };
  let prosent = startprosent;

  for (let i = 0; i < antallKvartaler; i += 1) {
    historikk.push({
      ...årstallOgKvartal,
      erMaskert: false,
      prosent: prosent,
      tapteDagsverk: prosent * 10,
      muligeDagsverk: prosent * 1000,
    });
    årstallOgKvartal = neste(årstallOgKvartal);
    prosent =
      prosent +
      variasjon * Math.sin(0.5 + (Math.PI * i) / 2) +
      randomNumber(vekst - randomness, vekst + randomness);
    prosent = Math.max(0, prosent);
    prosent = parseFloat(prosent.toFixed(1));
  }

  return historikk;
};
const randomNumber = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const neste = (årstallOgKvartal: ÅrstallOgKvartal): ÅrstallOgKvartal => {
  const { årstall, kvartal } = årstallOgKvartal;
  if (kvartal === 4) {
    return {
      årstall: årstall + 1,
      kvartal: 1,
    };
  } else {
    return {
      årstall,
      kvartal: kvartal + 1,
    };
  }
};

export function useSykefraværAppData(): SerialiserbarAppData {
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
  const altinnOrganisasjonerMedStatistikktilgang =
    useAltinnOrganisasjonerMedStatistikktilgang();

  // TODO: Vi trenger dette kallet
  const sykefraværshistorikk = useKvartalsvisStatistikk();

  const aggregertStatistikk = useAggregertStatistikk();
  // TODO: Vi trenger dette kallet
  const publiseringsdatoer = {
    status: RestStatus.Suksess,
    data: {
      gjeldendePeriode: {
        årstall: 2022,
        kvartal: 2,
      },
      nestePubliseringsdato: "2022-12-01",
      sistePubliseringsdato: "2022-09-08",
    },
  };

  return {
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikktilgang,
    sykefraværshistorikk,
    aggregertStatistikk,
    publiseringsdatoer,
  };
}

function getTransformedPubliseringsdatoer(
  serialiserbarPubliseringsdatoer: RestRessurs<SerialiserbarPubliseringsdatoer>
): RestRessurs<Publiseringsdatoer> {
  if (serialiserbarPubliseringsdatoer.status === RestStatus.Suksess) {
    return {
      ...serialiserbarPubliseringsdatoer,
      data: {
        ...serialiserbarPubliseringsdatoer.data,
        nestePubliseringsdato: new Date(
          serialiserbarPubliseringsdatoer.data.nestePubliseringsdato
        ),
        sistePubliseringsdato: new Date(
          serialiserbarPubliseringsdatoer.data.sistePubliseringsdato
        ),
      },
    };
  }

  return {
    status: serialiserbarPubliseringsdatoer.status,
  };
}

function getTransformedAggregertStatistikk(
  serialisertAggregertStatistikk: RestRessurs<AggregertStatistikkDto>
): RestAggregertStatistikk {
  if (
    serialisertAggregertStatistikk.status === RestStatus.Suksess &&
    serialisertAggregertStatistikk.data !== undefined
  ) {
    return {
      restStatus: serialisertAggregertStatistikk.status,
      aggregertData: groupByCategory(serialisertAggregertStatistikk.data),
    };
  }

  return { restStatus: serialisertAggregertStatistikk.status };
}

export function transformSykefraværAppData(
  serialiserbarData: SerialiserbarAppData
): SykefraværAppData {
  return {
    altinnOrganisasjoner: serialiserbarData.altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikktilgang:
      serialiserbarData.altinnOrganisasjonerMedStatistikktilgang,
    sykefraværshistorikk: serialiserbarData.sykefraværshistorikk,
    aggregertStatistikk: getTransformedAggregertStatistikk(
      serialiserbarData.aggregertStatistikk
    ),
    publiseringsdatoer: getTransformedPubliseringsdatoer(
      serialiserbarData.publiseringsdatoer
    ),
  };
}

export const groupByCategory = (
  aggregertStatistikk: AggregertStatistikkDto
) => {
  const map = new Map<Statistikkategori, AggregertStatistikk>();
  Object.values(Statistikkategori).forEach((kategori) => {
    map.set(kategori, {
      prosentSiste4KvartalerTotalt: getCategory(
        kategori,
        aggregertStatistikk.prosentSiste4KvartalerTotalt
      ),
      prosentSiste4KvartalerGradert: getCategory(
        kategori,
        aggregertStatistikk.prosentSiste4KvartalerGradert
      ),
      prosentSiste4KvartalerKorttid: getCategory(
        kategori,
        aggregertStatistikk.prosentSiste4KvartalerKorttid
      ),
      prosentSiste4KvartalerLangtid: getCategory(
        kategori,
        aggregertStatistikk.prosentSiste4KvartalerLangtid
      ),
      trendTotalt: getCategory(kategori, aggregertStatistikk.trendTotalt),
    });
  });

  return map;
};

interface AggregertStatistikkDto {
  prosentSiste4KvartalerTotalt: StatistikkDto[];
  prosentSiste4KvartalerGradert: StatistikkDto[];
  prosentSiste4KvartalerKorttid: StatistikkDto[];
  prosentSiste4KvartalerLangtid: StatistikkDto[];
  trendTotalt: StatistikkDto[];
}

export type AggregertStatistikk = {
  prosentSiste4KvartalerTotalt?: Statistikk;
  prosentSiste4KvartalerGradert?: Statistikk;
  prosentSiste4KvartalerKorttid?: Statistikk;
  prosentSiste4KvartalerLangtid?: Statistikk;
  trendTotalt?: Statistikk;
};

export type Statistikk = {
  label: string;
  statistikkategori: Statistikkategori;
  verdi: string;
  antallPersonerIBeregningen: number;
  kvartalerIBeregningen: {
    årstall: number;
    kvartal: number;
  }[];
};

const getCategory = (category: Statistikkategori, statistikk: Statistikk[]) => {
  return statistikk?.find((e) => e.statistikkategori === category);
};
