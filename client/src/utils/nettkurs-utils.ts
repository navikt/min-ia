export interface QbrickVideo {
  id: string;
  tags: string[];
  created: Date;
  updated: Date;
  nbOfViews: number; // via API-et?
  metadata: {
    title: string;
    description: string;
  };
}

export enum Tags {
  IA = "Inkluderende arbeidsliv",
  ARBEIDSMILJØ = "Arbeidsmiljø",
  DIALOGMØTE = "Dialogmøte",
  MEDVIRKNING = "Medvirkning",
  OPPFØLGING = "Oppfølging",
  PSYKISK_HELSE = "Psykisk helse",
}

export const IAVideoer: QbrickVideo[] = [
  {
    id: "702ed6e6-00015227-76bc0ebe",
    created: new Date("2022-04-11T08:00:00+00:00"),
    updated: new Date("2022-04-11T08:00:00+00:00"),
    tags: [Tags.IA, Tags.PSYKISK_HELSE],
    nbOfViews: 3, // spør Monica
    metadata: {
      title: "Gode grep i krisetider - Arbeid og psykisk helse",
      description:
        "Gode grep i krisetider. Koronapandemien har satt oss i en krevende og spesiell situasjon. Hva kan du som leder gjøre for dine ansatte og deg selv?\n\nMer informasjon:\nFor arbeidsgivere: https://arbeidsgiver.nav.no/kontakt-oss/\n\nFor personbrukere: https://www.nav.no/person/koronaveiviser",
    },
  },
  {
    id: "bf6d8ad7-00015227-1228dfef",
    created: new Date("2022-04-11T08:00:00+00:00"),
    updated: new Date("2022-04-11T08:00:00+00:00"),
    tags: [Tags.IA, Tags.PSYKISK_HELSE],
    nbOfViews: 1, // spør Monica
    metadata: {
      title: "Gode grep i krisetider - Arbeid og psykisk helse",
      description:
        "Gode grep i krisetider. Koronapandemien har satt oss i en krevende og spesiell situasjon. Hva kan du som leder gjøre for dine ansatte og deg selv? Mer informasjon: For arbeidsgivere: https://arbeidsgiver.nav.no/kontakt-oss/ For personbrukere: https://www.nav.no/person/koronaveiviser",
    },
  },
  {
    id: "32361286-00015227-be0a3394",
    created: new Date("2022-04-11T09:55:14+00:00"),
    updated: new Date("2022-04-11T10:02:30+00:00"),
    tags: [Tags.IA, Tags.OPPFØLGING, Tags.DIALOGMØTE],
    nbOfViews: 5, // spør Monica
    metadata: {
      title: "Dialogmøte som fungerer",
      description:
        "Dialogmøte som fungerer. Korleis lage dialogmøte som gir gode resultat? Vi ser på rollene til dei ulike deltakarane i møtet, og korleis du kan førebu og gjennomføre eit godt dialogmøte.",
    },
  },
  {
    id: "fc48a9e8-00015227-e728460d",
    created: new Date("2022-04-11T09:55:14+00:00"),
    updated: new Date("2022-04-11T10:02:30+00:00"),
    tags: [Tags.IA, Tags.OPPFØLGING, Tags.DIALOGMØTE],
    nbOfViews: 5, // spør Monica
    metadata: {
      title: "Oppfølgingsplan som fungerer",
      description:
        "Oppfølgingsplan som fungerer. Den lovpålagde oppfølgingsplanen skal sikre dialog og dokumentasjon mellom arbeidsgjevar og arbeidstakar. Videoen viser korleis oppfølgingsplanen blir eit levande og nyttig verktøy.",
    },
  },
  {
    id: "62f13221-00015227-0618cd4a",
    created: new Date("2022-04-11T09:55:14+00:00"),
    updated: new Date("2022-04-11T10:02:30+00:00"),
    tags: [Tags.IA, Tags.ARBEIDSMILJØ, Tags.MEDVIRKNING],
    nbOfViews: 5, // spør Monica
    metadata: {
      title: "Tilrettelegging og medvirkning",
      description:
        "Kva er eigentleg tilretteleggingsplikt og medvirkningsplikt? Arbeidsgjevar har tilretteleggingsplikt, og skal ivareta arbeidstakar så langt råd er. Arbeidstakar har medverknadsplikt, og skal bidra for å finne løysingar. Videoen handlar om kva dette samarbeidet betyr i praksis.",
    },
  },
  {
    id: "43914204-00015227-666b62d3",
    created: new Date("2022-04-11T09:55:14+00:00"),
    updated: new Date("2022-04-11T10:02:30+00:00"),
    tags: [Tags.IA, Tags.ARBEIDSMILJØ],
    nbOfViews: 5, // spør Monica
    metadata: {
      title: "Tilsette har ulike behov i ulike livsfasar",
      description:
        "Tilsette har ulike behov i ulike livsfasar. Grunnen til at tilsette treng tilrettelegging eller blir sjukmeldt ligg ofte utanfor jobben. Videoen ser på grep som kan førebyggje fråvær og fråfall for tilsette i ulike livsfasar.",
    },
  },
  {
    id: "db3653cd-00015227-7015da5d",
    created: new Date("2022-04-11T09:55:14+00:00"),
    updated: new Date("2022-04-11T10:02:30+00:00"),
    tags: [Tags.IA, Tags.ARBEIDSMILJØ],
    nbOfViews: 5, // spør Monica
    metadata: {
      title:
        "Arbeidsmiljø skaper du best i samarbeid med tillitsvald og verneombod",
      description:
        "Arbeidsmiljø skapar du best i samarbeid med tillitsvald og verneombud. Samarbeidet er grunnleggande for å skape eit godt arbeidsmiljø. Videoen gir deg eksempel på korleis du kan gjere dette i di bedrift.",
    },
  },
  {
    id: "1acd36bc-00015227-4d8594c2",
    created: new Date("2022-04-11T09:55:14+00:00"),
    updated: new Date("2022-04-11T10:02:30+00:00"),
    tags: [Tags.IA, Tags.ARBEIDSMILJØ],
    nbOfViews: 5, // spør Monica
    metadata: {
      title: "Godt arbeidsmiljø er ikkje berre kaker på fredag...",
      description:
        "Godt arbeidsmiljø er ikkje berre kaker på fredag. Videoen gir eksempel på korleis du kan kome i gang med arbeidsmiljøarbeidet, og korleis du jobbar med det over tid.",
    },
  },
];
