import { RestStatus } from "../../integrasjoner/rest-status";
import { mockdataOrgnr91096939 } from "../../local/aggregertStatistikkMockdata";
import {
  getOrganisasjonerBrukerHarIaRettigheterTilMock,
  getOrganisasjonerMock,
} from "./altinn-mock";
import { getArbeidsmiljøportalenBransje } from "./bransje-utils";
import { Statistikkategori } from "./domene/statistikkategori";
import {
  AggregertStatistikk,
  SerialiserbarAppData,
  SerialiserbarPubliseringsdatoer,
  SerialiserbarStatistikk,
  SykefraværAppData,
} from "./hooks/useSykefraværAppData";
import { næringskodeTilNæring } from "./næringsbeskrivelser";

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

const mapTilUnderenhet = (underenhetDto: UnderenhetDto): Underenhet => {
  const orgnr = underenhetDto.organisasjonsnummer;
  const overordnetEnhet = underenhetDto.overordnetEnhet;
  const næringskode = underenhetDto.naeringskode1
    ? {
        kode: underenhetDto.naeringskode1.kode.replace(".", ""),
        beskrivelse: underenhetDto.naeringskode1.beskrivelse,
      }
    : undefined;
  const antallAnsatte = underenhetDto.antallAnsatte;
  const næring = næringskodeTilNæring(næringskode);
  const bransje = getArbeidsmiljøportalenBransje(næringskode);
  const beliggenhetsadresse = {
    kommune: underenhetDto.beliggenhetsadresse.kommune,
    kommunenummer: underenhetDto.beliggenhetsadresse.kommunenummer,
  };
  return {
    orgnr,
    overordnetEnhet,
    antallAnsatte,
    beliggenhetsadresse,
    bransje,
    næring,
    næringskode,
  };
};

const underenheterResponseMock = {
  organisasjonsnummer: "999999999",
  navn: "HEI OG HÅ BARNEHAGE",
  organisasjonsform: {
    kode: "BEDR",
    beskrivelse: "Bedrift",
    _links: {
      self: {
        href: "https://data.brreg.no/enhetsregisteret/api/organisasjonsformer/BEDR",
      },
    },
  },
  registreringsdatoEnhetsregisteret: "1990-01-01",
  registrertIMvaregisteret: false,
  naeringskode1: {
    beskrivelse: "næringskoden til barnehage",
    kode: "88.911",
  },
  naeringskode2: {
    beskrivelse: "random næringskode",
    kode: "88.992",
  },
  antallAnsatte: 62,
  overordnetEnhet: "999999991",
  oppstartsdato: "1990-01-01",
  beliggenhetsadresse: {
    land: "Norge",
    landkode: "NO",
    postnummer: "9999",
    poststed: "OSLO",
    adresse: ["testadresse AS"],
    kommune: "OSLO",
    kommunenummer: "9999",
  },
  _links: {
    self: {
      href: "https://data.brreg.no/enhetsregisteret/api/underenheter/999999999",
    },
    overordnetEnhet: {
      href: "https://data.brreg.no/enhetsregisteret/api/enheter/999999991",
    },
  },
};

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
  enhetsregisterdata: {
    restUnderenhet: {
      status: RestStatus.Suksess,
      data: mapTilUnderenhet(underenheterResponseMock),
    },
    restOverordnetEnhet: {
      status: RestStatus.Suksess,
      data: {
        orgnr: "999999991",
        institusjonellSektorkode: { kode: "6100", beskrivelse: "min sektor" },
      },
    },
  },
  publiseringsdatoer: {
    status: RestStatus.Suksess,
    data: getMockPubliseringsdatoer(),
  },
  sykefraværshistorikk: {
    status: RestStatus.Suksess,
    data: [
      {
        type: "LAND",
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
        type: "SEKTOR",
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
        type: "VIRKSOMHET",
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
        type: "OVERORDNET_ENHET",
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
        type: "NÆRING",
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
