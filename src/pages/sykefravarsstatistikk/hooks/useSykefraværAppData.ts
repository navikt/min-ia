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

const genererHistorikk = (
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
        type: SykefraværshistorikkType.LAND,
        label: "Norge",
        kvartalsvisSykefraværsprosent: genererHistorikk(
          { årstall: 2015, kvartal: 2 },
          20,
          5.5,
          1,
          0.1,
          0
        ),
      },
      {
        type: SykefraværshistorikkType.SEKTOR,
        label: "Statlig forvaltning",
        kvartalsvisSykefraværsprosent: genererHistorikk(
          { årstall: 2015, kvartal: 2 },
          20,
          4,
          2,
          0.2,
          0
        ),
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
