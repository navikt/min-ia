export type AktivitetType = {
  tittel: string;
  innhold: AktivitetinnholdType[];
};

export type AktivitetTekstType = {
  type: "tekst";
  innhold: string;
};

export type AktivitetUndertittelType = {
  type: "undertittel";
  innhold: string;
};

export type AktivitetOppgaveType = {
  type: "oppgave";
  tittel: string;
  id: string;
  innhold: AktivitetinnholdType[];
};

export type AktivitetinnholdType =
  | AktivitetTekstType
  | AktivitetUndertittelType
  | AktivitetOppgaveType;

export type StatusType = "AVBRUTT" | "STARTET" | "FULLFØRT";

export const aktiviteter: AktivitetType[] = [
  {
    tittel: "Bli gode på å tilrettelegge for ansatte",
    innhold: [
      {
        type: "tekst",
        innhold: "Her kan vi ha en lang tekst, eller en kort en...",
      },
      {
        type: "undertittel",
        innhold: "Undertittel",
      },
      {
        type: "tekst",
        innhold: "Her kan vi ha litt mer tekst",
      },
      {
        type: "oppgave",
        tittel: "Oppgave 1",
        id: "oppgave1",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Her kan vi ha ting av samme type som innhold på aktivitet",
          },
        ],
      },
    ],
  },
  {
    tittel: "Kom i gang med å føre din egen sykefraværsstatistikk",
    innhold: [
      {
        type: "tekst",
        innhold:
          "Mange nyoppstartede virksomheter har ikke kommet i gang med å føre sin egen sykefraværsstatistikk. Vi har laget en mal og innføring for denne situasjonen.",
      },
      {
        type: "undertittel",
        innhold: "Mål",
      },
      {
        type: "tekst",
        innhold:
          "Du er i stand til å lage sykefraværsstatistikk i egen virksomhet.",
      },
      {
        type: "oppgave",
        tittel: "Oppgave: Lag din egen statistikk",
        id: "lagDinEgenStatistikk",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Gå til veiledning og mal på nav.no (https://www.nav.no/arbeidsgiver/fore-sykefravar#kort-om) ",
          },
        ],
      },
    ],
  },
  {
    tittel: "Bruk egen sykefraværstatistikk forebyggende",
    innhold: [
      {
        type: "tekst",
        innhold: "Her kan vi ha en lang tekst, eller en kort en...",
      },
      {
        type: "undertittel",
        innhold: "Undertittel",
      },
      {
        type: "tekst",
        innhold: "Her kan vi ha litt mer tekst",
      },
      {
        type: "oppgave",
        tittel: "Oppgave 1",
        id: "oppgave1",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Her kan vi ha ting av samme type som innhold på aktivitet",
          },
        ],
      },
    ],
  },
];
