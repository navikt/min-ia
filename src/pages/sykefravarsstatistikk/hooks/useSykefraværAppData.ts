import {
  organisasjoner,
  organisasjonerMedIaRettighet,
} from "../../../local/organisasajonerMockdata";
import { mockdataOrgnr91096939 } from "../../../local/aggregertStatistikkMockdata";
import { RestRessurs, RestStatus } from "../../../integrasjoner/rest-status";
import { Statistikkategori } from "../domene/statistikkategori";
import { AggregertStatistikkDto } from "../../../integrasjoner/aggregert-statistikk-api";
import { RestAltinnOrganisasjoner } from "../../../integrasjoner/altinnorganisasjon-api";

export type ÅrstallOgKvartal = {
  årstall: number;
  kvartal: number;
};

interface Publiseringsdatoer {
  sistePubliseringsdato: Date;
  nestePubliseringsdato: Date;
  gjeldendePeriode: ÅrstallOgKvartal;
}

const SykefraværshistorikkType = {
  LAND: "LAND",
  SEKTOR: "SEKTOR",
  NÆRING: "NÆRING",
  BRANSJE: "BRANSJE",
  VIRKSOMHET: "VIRKSOMHET",
  OVERORDNET_ENHET: "OVERORDNET_ENHET",
} as const;

type SykefraværshistorikkType =
  (typeof SykefraværshistorikkType)[keyof typeof SykefraværshistorikkType];

type RestAggregertStatistikk = {
  restStatus: RestStatus;
  aggregertData?: Map<Statistikkategori, AggregertStatistikkDto>;
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
interface KvartalsvisSykefraværshistorikk {
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

export function useSykefraværAppData(): SykefraværAppData {
  const altinnOrganisasjoner = {
    status: RestStatus.Suksess,
    data: organisasjoner,
  };
  const altinnOrganisasjonerMedStatistikktilgang = {
    status: RestStatus.Suksess,
    data: organisasjonerMedIaRettighet,
  };
  const sykefraværshistorikk: RestRessurs<KvartalsvisSykefraværshistorikk[]> = {
    status: RestStatus.Suksess,
    data: [
      {
        type: "VIRKSOMHET",
        label: "Underenhet AS",
        kvartalsvisSykefraværsprosent: [
          {
            årstall: 2019,
            kvartal: 4,
            erMaskert: false,
            prosent: 5.5,
            muligeDagsverk: 200,
            tapteDagsverk: 11,
          },
          {
            årstall: 2020,
            kvartal: 1,
            erMaskert: false,
            prosent: 6,
            muligeDagsverk: 200,
            tapteDagsverk: 12,
          },
        ],
      },
    ],
  };
  const aggregertStatistikk = {
    restStatus: RestStatus.Suksess,
    data: mockdataOrgnr91096939,
  };
  const publiseringsdatoer = {
    status: RestStatus.Suksess,
    data: {
      gjeldendePeriode: {
        årstall: 2022,
        kvartal: 2,
      },
      nestePubliseringsdato: new Date("2022-12-01"),
      sistePubliseringsdato: new Date("2022-09-08"),
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
