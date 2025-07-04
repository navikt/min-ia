import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";
import { Statistikkategori } from "../domene/statistikkategori";
import { AggregertStatistikkDto } from "../../integrasjoner/aggregert-statistikk-api";
import { RestAltinnOrganisasjoner } from "../../integrasjoner/altinnorganisasjon-api";
import { useAggregertStatistikk } from "../../hooks/useAggregertStatistikk";
import {
    useAltinnOrganisasjoner,
    useAltinnOrganisasjonerMedStatistikktilgang
} from "../../hooks/useAltinnOrganisasjoner";
import { useKvartalsvisStatistikk } from "../../hooks/useKvartalsvisStatistikk";
import { usePubliseringsdato } from "../../hooks/usePubliseringsdato";

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

type SykefraværshistorikkType = Statistikkategori;

export type RestAggregertStatistikk = {
  restStatus: RestStatus;
  aggregertData?: Map<Statistikkategori, AggregertStatistikk>;
  error?: unknown;
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

export function useSykefraværAppData(): SerialiserbarAppData {
  const organisasjoner = useAltinnOrganisasjoner();
  console.log(`Antall organisasjoner brukeren har tilgang til: ${organisasjoner.status === RestStatus.Suksess ? organisasjoner.data.length : 0}`);
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
  const altinnOrganisasjonerMedStatistikktilgang =
    useAltinnOrganisasjonerMedStatistikktilgang();
  const sykefraværshistorikk = useKvartalsvisStatistikk();
  const aggregertStatistikk = useAggregertStatistikk();
  const publiseringsdatoer = usePubliseringsdato();

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
