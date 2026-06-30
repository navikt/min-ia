import { StaticImageData } from "next/image";
import Arbeidsmiljøhjelpen from "./Arbeidsmiljohjelpen.png";
import En_Bra_Dag_På_Jobb from "./En_bra_dag_paa_jobb.png";
import Idebanken from "./Idebanken.png";

export type Ressurs = {
  tittel: string;
  innhold: string;
  bilde: StaticImageData;
  lenketekst: string;
  variant: Ressursvariant;
};

export type Verktøy = Ressurs & {
  lenke: string;
};

export type Ressursvariant =
  | "arbeidsmiljøhjelpen"
  | "enBraDagPåJobb"
  | "idebanken";

const arbeidsmiljøhjelpen: Ressurs = {
  tittel: "Arbeidsmiljøhjelpen",
  innhold:
    "Diskuter typiske utfordringer i bransjen og lag en handlingsplan for å utvikle arbeidsmiljøet",
  bilde: Arbeidsmiljøhjelpen,
  lenketekst: "Arbeidsmiljøhjelpen",
  variant: "arbeidsmiljøhjelpen",
};
const enBraDagPåJobb: Ressurs = {
  tittel: "En bra dag på jobb",
  innhold:
    "Gjennom korte filmer og enkle diskusjonsopplegg får dere et felles grunnlag for å kartlegge utfordringer, prioritere tiltak og lage en handlingsplan",
  bilde: En_Bra_Dag_På_Jobb,
  lenketekst: "En bra dag på jobb",
  variant: "enBraDagPåJobb",
};
const idebanken: Ressurs = {
  tittel: "Idébanken",
  innhold:
    "Praktiske guider for hvordan du kan følge opp ansatte og arbeidsmiljø, og hvilken bistand du kan få til dette",
  bilde: Idebanken,
  lenketekst: "Idébanken",
  variant: "idebanken",
};

export const bransjeTilVerktøy: Record<string, Verktøy[]> = {
  barnehager: [
    {
      ...arbeidsmiljøhjelpen,
      lenke:
        "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/barnehage/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/barnehage-2/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/barnehage",
    },
  ],
  næringsmiddelindustri: [
    {
      ...arbeidsmiljøhjelpen,
      lenke:
        "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/naringsmiddelindustri/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/naeringsmiddelindustrien",
    },
  ],
  sykehus: [
    {
      ...arbeidsmiljøhjelpen,
      lenke: "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/sykehus/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/sykehus/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/sykehus",
    },
  ],
  sykehjem: [
    {
      ...arbeidsmiljøhjelpen,
      lenke: "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/sykehjem/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/sykehjem/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/sykehjem-og-hjemmetjenesten",
    },
  ],
  transport: [
    {
      ...arbeidsmiljøhjelpen,
      lenke:
        "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/rutebuss-og-persontrafikk/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/rutebuss-og-persontrafikk/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/rutebuss-og-persontrafikk",
    },
  ],
  bygg: [
    {
      ...arbeidsmiljøhjelpen,
      lenke: "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/bygg/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/bygg/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/bygg-og-anlegg",
    },
  ],
  anlegg: [
    {
      ...arbeidsmiljøhjelpen,
      lenke: "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/anlegg/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/anlegg/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/bygg-og-anlegg",
    },
  ],
  hjemmetjeneste: [
    {
      ...arbeidsmiljøhjelpen,
      lenke:
        "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/hjemmetjenesten/",
    },
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/hjemmetjenesten/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/sykehjem-og-hjemmetjenesten",
    },
  ],
  butikkhandel: [
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/varehandel/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/butikkhandel",
    },
  ],
  barnevern: [
    {
      ...enBraDagPåJobb,
      lenke: "https://enbradagpajobb.no/bransje/barnevern/",
    },
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/barnevern",
    },
  ],
  "skole og sfo": [
    {
      ...idebanken,
      lenke: "https://idebanken.no/virkemidler/skole-og-sfo",
    },
  ],
};
