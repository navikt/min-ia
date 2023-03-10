export interface QbrickVideo {
  id: string;
  tags: string[];
  metadata: {
    title: string;
    description: string;
  };
}

export enum Tags {
  ARBEIDSMILJØ = "Arbeidsmiljø",
  MEDVIRKNING = "Medvirkning",
  OPPFØLGING = "Oppfølging",
  PSYKISK_HELSE = "Psykisk helse",
  ALLE = "Alle",
}

export const IAVideoer: QbrickVideo[] = [
  {
    id: "bdd038ea-00015227-44a44546",
    tags: [Tags.OPPFØLGING, Tags.MEDVIRKNING, Tags.ARBEIDSMILJØ],
    metadata: {
      title: "Hvorfor klare kjøreregler er viktig når fraværet oppstår",
      description: "",
    },
  },
  {
    id: "702ed6e6-00015227-76bc0ebe",
    tags: [Tags.PSYKISK_HELSE],
    metadata: {
      title: "Gode grep i krisetider - Arbeid og psykisk helse",
      description:
        "Gode grep i krisetider. Koronapandemien har satt oss i en krevende og spesiell situasjon. Hva kan du som leder gjøre for dine ansatte og deg selv?\n\nMer informasjon:\nFor arbeidsgivere: https://arbeidsgiver.nav.no/kontakt-oss/\n\nFor personbrukere: https://www.nav.no/person/koronaveiviser",
    },
  },
  {
    id: "bf6d8ad7-00015227-1228dfef",
    tags: [Tags.OPPFØLGING],
    metadata: {
      title: "Få den sjukmelde raskare tilbake i jobb",
      description:
        "Få den sjukemelde raskare tilbake i jobb. Videopresentasjon om sykefraværsoppfølging i praksis.",
    },
  },
  {
    id: "32361286-00015227-be0a3394",
    tags: [Tags.OPPFØLGING],
    metadata: {
      title: "Dialogmøte som fungerer",
      description:
        "Dialogmøte som fungerer. Korleis lage dialogmøte som gir gode resultat? Vi ser på rollene til dei ulike deltakarane i møtet, og korleis du kan førebu og gjennomføre eit godt dialogmøte.",
    },
  },
  {
    id: "c51beca0-a06c-4b12-8f0a-f0f4709946b9",
    tags: [Tags.OPPFØLGING],
    metadata: {
      title: "Oppfølgingsplan som fungerer",
      description:
        "Oppfølgingsplan som fungerer. Den lovpålagde oppfølgingsplanen skal sikre dialog og dokumentasjon mellom arbeidsgjevar og arbeidstakar. Videoen viser korleis oppfølgingsplanen blir eit levande og nyttig verktøy.",
    },
  },
  {
    id: "b3474b5c-c246-4834-b936-89f17a0b1281",
    tags: [Tags.OPPFØLGING, Tags.MEDVIRKNING],
    metadata: {
      title: "Tilrettelegging og medvirkning",
      description:
        "Kva er eigentleg tilretteleggingsplikt og medvirkningsplikt? Arbeidsgjevar har tilretteleggingsplikt, og skal ivareta arbeidstakar så langt råd er. Arbeidstakar har medverknadsplikt, og skal bidra for å finne løysingar. Videoen handlar om kva dette samarbeidet betyr i praksis.",
    },
  },
  {
    id: "43914204-00015227-666b62d3",
    tags: [Tags.ARBEIDSMILJØ],
    metadata: {
      title: "Tilsette har ulike behov i ulike livsfasar",
      description:
        "Tilsette har ulike behov i ulike livsfasar. Grunnen til at tilsette treng tilrettelegging eller blir sjukmeldt ligg ofte utanfor jobben. Videoen ser på grep som kan førebyggje fråvær og fråfall for tilsette i ulike livsfasar.",
    },
  },
  {
    id: "db3653cd-00015227-7015da5d",
    tags: [Tags.ARBEIDSMILJØ, Tags.MEDVIRKNING],
    metadata: {
      title:
        "Arbeidsmiljø skaper du best i samarbeid med tillitsvald og verneombod",
      description:
        "Arbeidsmiljø skapar du best i samarbeid med tillitsvald og verneombod. Samarbeidet er grunnleggande for å skape eit godt arbeidsmiljø. Videoen gir deg eksempel på korleis du kan gjere dette i di bedrift.",
    },
  },
  {
    id: "1acd36bc-00015227-4d8594c2",
    tags: [Tags.ARBEIDSMILJØ],
    metadata: {
      title: "Godt arbeidsmiljø er ikkje berre kaker på fredag...",
      description:
        "Godt arbeidsmiljø er ikkje berre kaker på fredag. Videoen gir eksempel på korleis du kan kome i gang med arbeidsmiljøarbeidet, og korleis du jobbar med det over tid.",
    },
  },
  {
    id: "103542a5-f8df-49f6-af22-117a69fa4548",
    tags: [Tags.OPPFØLGING],
    metadata: {
      title: "Ekspertbistand // hva og hvordan",
      description: "",
    },
  },
];
