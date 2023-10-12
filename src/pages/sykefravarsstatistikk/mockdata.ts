import { RestStatus } from "../../integrasjoner/rest-status";
import { mockdataOrgnr91096939 } from "../../local/aggregertStatistikkMockdata";
import {
  getOrganisasjonerBrukerHarIaRettigheterTilMock,
  getOrganisasjonerMock,
} from "./altinn-mock";
import { Statistikkategori } from "./domene/statistikkategori";
import {
  AggregertStatistikk,
  SerialiserbarAppData,
  SerialiserbarPubliseringsdatoer,
  SerialiserbarStatistikk,
  SykefraværAppData,
} from "./hooks/useSykefraværAppData";

export const siste4KvartalerMock = [
  { årstall: 2021, kvartal: 3 },
  { årstall: 2021, kvartal: 4 },
  { årstall: 2022, kvartal: 1 },
  { årstall: 2022, kvartal: 2 },
];

export const siste2KvartalerMock = [
  { årstall: 2022, kvartal: 1 },
  { årstall: 2022, kvartal: 2 },
];

const aggregertStatistikkMock = new Map<
  Statistikkategori,
  AggregertStatistikk
>();
aggregertStatistikkMock.set(Statistikkategori.VIRKSOMHET, {
  prosentSiste4KvartalerTotalt: {
    statistikkategori: Statistikkategori.VIRKSOMHET,
    label: "Virksomheten min",
    kvartalerIBeregningen: siste4KvartalerMock,
    verdi: "10.0",
    antallPersonerIBeregningen: 100,
  },
});
aggregertStatistikkMock.set(Statistikkategori.BRANSJE, {
  prosentSiste4KvartalerTotalt: {
    statistikkategori: Statistikkategori.BRANSJE,
    label: "Bransjen mi",
    kvartalerIBeregningen: siste4KvartalerMock,
    verdi: "13.0",
    antallPersonerIBeregningen: 1000,
  },
});

export const mockAllDatahentingStatusOk: SerialiserbarAppData = {
  aggregertStatistikk: {
    restStatus: RestStatus.Suksess,
    data: mockdataOrgnr91096939 as SerialiserbarStatistikk,
  },
  altinnOrganisasjoner: {
    status: RestStatus.Suksess,
    data: getOrganisasjonerMock(),
  },
  altinnOrganisasjonerMedStatistikktilgang: {
    status: RestStatus.Suksess,
    data: getOrganisasjonerBrukerHarIaRettigheterTilMock(),
  },
  publiseringsdatoer: {
    status: RestStatus.Suksess,
    data: getMockPubliseringsdatoer(),
  },
  sykefraværshistorikk: {
    status: RestStatus.Suksess,
    data: [
      {
        type: Statistikkategori.LAND,
        label: "Norge",
        kvartalsvisSykefraværsprosent: [
          {
            årstall: 2015,
            kvartal: 2,
            erMaskert: false,
            prosent: 5.5,
            tapteDagsverk: 55,
            muligeDagsverk: 5500,
          },
        ],
      },
      {
        type: Statistikkategori.SEKTOR,
        label: "Statlig forvaltning",
        kvartalsvisSykefraværsprosent: [
          {
            årstall: 2015,
            kvartal: 2,
            erMaskert: false,
            prosent: 4,
            tapteDagsverk: 40,
            muligeDagsverk: 4000,
          },
        ],
      },
      {
        type: Statistikkategori.VIRKSOMHET,
        label: "FLESK OG FISK AS",
        kvartalsvisSykefraværsprosent: [
          {
            årstall: 2017,
            kvartal: 2,
            erMaskert: false,
            prosent: 8.3,
            tapteDagsverk: 83,
            muligeDagsverk: 8300,
          },
        ],
      },
      {
        type: Statistikkategori.OVERORDNET_ENHET,
        label: "THE FISHING GROUP",
        kvartalsvisSykefraværsprosent: [
          {
            årstall: 2016,
            kvartal: 2,
            erMaskert: false,
            prosent: 7.1,
            tapteDagsverk: 71,
            muligeDagsverk: 7100,
          },
        ],
      },
      {
        type: Statistikkategori.NÆRING,
        label: "Produksjon av nærings- og nytelsesmidler",
        kvartalsvisSykefraværsprosent: [
          {
            årstall: 2015,
            kvartal: 2,
            erMaskert: false,
            prosent: 6.7,
            tapteDagsverk: 67,
            muligeDagsverk: 6700,
          },
        ],
      },
    ],
  },
};

export const mockAllDatahentingStatusLaster: SerialiserbarAppData = {
  aggregertStatistikk: { restStatus: RestStatus.LasterInn },
  altinnOrganisasjoner: { status: RestStatus.LasterInn },
  altinnOrganisasjonerMedStatistikktilgang: {
    status: RestStatus.LasterInn,
  },
  publiseringsdatoer: {
    status: RestStatus.Suksess,
    data: getMockPubliseringsdatoer(),
  },
  sykefraværshistorikk: { status: RestStatus.Suksess, data: [] },
};

export const mockAllDatahentingFeiler: SykefraværAppData = {
  aggregertStatistikk: { restStatus: RestStatus.Feil },
  altinnOrganisasjoner: { status: RestStatus.Feil },
  altinnOrganisasjonerMedStatistikktilgang: { status: RestStatus.Feil },
  publiseringsdatoer: { status: RestStatus.Feil },
  sykefraværshistorikk: { status: RestStatus.Feil },
};

function getMockPubliseringsdatoer(): SerialiserbarPubliseringsdatoer {
  return {
    gjeldendePeriode: {
      årstall: 2022,
      kvartal: 2,
    },
    nestePubliseringsdato: "2022-12-01",
    sistePubliseringsdato: "2022-09-08",
  };
}

export enum ArbeidsmiljøportalenBransje {
  BARNEHAGER = "BARNEHAGER",
  NÆRINGSMIDDELINDUSTRI = "NÆRINGSMIDDELINDUSTRI",
  SYKEHUS = "SYKEHUS",
  SYKEHJEM = "SYKEHJEM",
  TRANSPORT = "TRANSPORT",
  BYGG = "BYGG",
  ANLEGG = "ANLEGG",
  ANDRE_BRANSJER = "ANDRE_BRANSJER",
}

export interface Beliggenhetsadresse {
  kommune: string;
  kommunenummer: string;
}

export type Næringskode5Siffer = {
  kode: string;
  beskrivelse: string;
};

export interface Næring {
  kode: string;
  beskrivelse?: string;
}

export interface Underenhet {
  orgnr: string;
  overordnetEnhet: string;
  beliggenhetsadresse: Beliggenhetsadresse;
  næringskode?: Næringskode5Siffer;
  næring?: Næring;
  bransje?: ArbeidsmiljøportalenBransje;
  antallAnsatte: number;
}

export interface UnderenhetDto {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: OrganisasjonsformDto;
  registreringsdatoEnhetsregisteret: string;
  registrertIMvaregisteret: boolean;
  naeringskode1?: NæringskodeDto;
  antallAnsatte: number;
  overordnetEnhet: string;
  oppstartsdato: string;
  beliggenhetsadresse: AdresseDto;
  _links: {
    self: {
      href: string;
    };
    overordnetEnhet: {
      href: string;
    };
  };
}

interface NæringskodeDto {
  beskrivelse: string;
  kode: string;
}

interface OrganisasjonsformDto {
  kode: string;
  beskrivelse: string;
  _links: {
    self: {
      href: string;
    };
  };
}

interface AdresseDto {
  land: string;
  landkode: string;
  postnummer: string;
  poststed: string;
  adresse: string[];
  kommune: string;
  kommunenummer: string;
}
