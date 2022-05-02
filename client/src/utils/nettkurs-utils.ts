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
enum Tags {
  IA = "IA",
  PSYKISK_HELSE = "Psykisk helse",
  ARBEIDSMILJØ = "Arbeidsmiljø",
  OPPFØLGING = "Oppfølging",
  MEDVIRKNING = "Medvirkning",
}

export const IAVideoer: QbrickVideo[] = [
  {
    id: "bc3d3292-00015227-90d08ad0",
    created: new Date(),
    updated: new Date(),
    tags: ["Arbeidsmiljø"],
    nbOfViews: 5, // spør Monica
    metadata: {
      title: "Arbeidsgiver og permittering",
      description: "Reglar gjeldande til 28.2.2022.",
    },
  },
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
        "Gode grep i krisetider. Koronapandemien har satt oss i en krevende og spesiell situasjon. Hva kan du som leder gjøre for dine ansatte og deg selv?\n\nMer informasjon:\nFor arbeidsgivere: https://arbeidsgiver.nav.no/kontakt-oss/\n\nFor personbrukere: https://www.nav.no/person/koronaveiviser",
    },
  },
];
