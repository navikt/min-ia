export type AktivitetType = {
  tittel: string;
  innhold: AktivitetinnholdType[];
};

export type AktivitetTekstType = {
  type: "tekst";
  innhold: string;
};

export type AktivitetInlinetekstType = {
  type: "inlinetekst";
  innhold: (string | AktivitetinnholdType)[];
};

export type AktivitetUndertittelType = {
  type: "undertittel";
  innhold: string;
};

export type AktivitetPunktlisteType = {
  type: "punktliste";
  innhold: AktivitetPunktType[];
};

export type AktivitetNumrertlisteType = {
  type: "numrertliste";
  innhold: AktivitetPunktType[];
};

export type AktivitetPunktType = {
  type: "punkt";
  innhold: AktivitetinnholdType | AktivitetinnholdType[];
};

export type AktivitetLenkeType = {
  type: "lenke";
  tekst: string;
  url: string;
};

export type AktivitetInfoboksType = {
  type: "infoboks";
  tittel: string;
  innhold: AktivitetinnholdType[];
};

export type DeresSykstatBransjeType = {
  type: "deresSykstatBransje";
};

export type AktivitetOppgaveType = {
  type: "oppgave";
  tittel: string;
  id: string;
  innhold: AktivitetinnholdType[];
};

export type AktivitetinnholdType =
  | AktivitetTekstType
  | AktivitetInlinetekstType
  | AktivitetUndertittelType
  | AktivitetOppgaveType
  | AktivitetPunktlisteType
  | AktivitetNumrertlisteType
  | AktivitetLenkeType
  | AktivitetInfoboksType
  | DeresSykstatBransjeType
  | string;

export type StatusType = "AVBRUTT" | "STARTET" | "FULLFØRT";

export const aktiviteter: AktivitetType[] = [
  {
    tittel: "Bli gode på å tilrettelegge for ansatte",
    innhold: [
      {
        type: "tekst",
        innhold:
          "Tilrettelegging er aktuelt for å unngå sykmelding, ved gradert sykmelding og når den ansatte kommer tilbake fra en sykmelding. Dere må tilrettelegge for alle arbeidstakere, ikke bare for de med redusert arbeidsevne.",
      },
      {
        type: "undertittel",
        innhold: "Mål",
      },
      {
        type: "tekst",
        innhold: "Bli bedre på å tilrettelegge for arbeidstakere.",
      },
      {
        type: "undertittel",
        innhold:
          "Tilrettelegging for ansatte kan hindre sykefravær. For å lykkes med tilrettelegging bør du ha:",
      },
      {
        type: "punktliste",
        innhold: [
          {
            type: "punkt",
            innhold: "Kunnskap om tilrettelegging",
          },
          {
            type: "punkt",
            innhold:
              "Kjennskap til tilretteleggingsmulighetene i arbeidsplassen din",
          },
          {
            type: "punkt",
            innhold:
              "Et godt samarbeid med de ansatte og ansattrepresentantene",
          },
        ],
      },
      {
        type: "tekst",
        innhold:
          "Vi har laget fire oppgaver som hjelper deg med å øke kunnskap og samarbeide med andre på arbeidsplassen.",
      },
      {
        type: "oppgave",
        tittel: "Oppgave: Kunnskap om tilrettelegging",
        id: "9D9E8ACC-CB8E-4763-8B04-B345B9F3DE68",
        innhold: [
          {
            type: "tekst",
            innhold: "I denne oppgaven får du kompetanse om:",
          },
          {
            type: "punktliste",
            innhold: [
              {
                type: "punkt",
                innhold: "Hva tilrettelegging er",
              },
              {
                type: "punkt",
                innhold: "De lovpålagte pliktene dine",
              },
              {
                type: "punkt",
                innhold:
                  "Hvordan dine ansatte kan medvirke i egen tilrettelegging",
              },
            ],
          },
          {
            type: "lenke",
            tekst: "Start med å se denne videoen.",
            url: "https://vimeo.com/showcase/8652399/video/573965951",
          },
          {
            type: "tekst",
            innhold:
              "Hvis du vil vite mer om hvilke lover og plikter som gjelder anbefaler vi at du leser videre her:",
          },
          {
            type: "punktliste",
            innhold: [
              {
                type: "punkt",
                innhold: {
                  type: "lenke",
                  tekst: "Slik følger du opp sykmeldte, fra NAV",
                  url: "https://www.nav.no/arbeidsgiver/oppfolging-sykmeldte#tilrettelegging",
                },
              },
              {
                type: "punkt",
                innhold: {
                  type: "lenke",
                  tekst: "Tilrettelegging av arbeidet, fra Arbeidstilsynet",
                  url: "https://www.arbeidstilsynet.no/arbeidsforhold/tilrettelegging/",
                },
              },
            ],
          },
        ],
      },
      {
        type: "oppgave",
        tittel:
          "Oppgave: Slik forbedrer du dine ferdigheter om tilrettelegging",
        id: "B7881929-4104-44F7-B409-2FB0AB3F16BF",
        innhold: [
          {
            type: "tekst",
            innhold:
              "I denne oppgaven bruker du egne erfaringer med tilrettelegging for å identifisere forbedringspunkter. Du kan også bruke notatene dine fra denne oppgaven, inn i oppgave 3.",
          },
          {
            type: "punktliste",
            innhold: [
              {
                type: "punkt",
                innhold: [
                  "Har du tilrettelagt for en ansatt uten at personen var sykmeldt de siste seks månedene?",
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Hvis ja: Var det du eller den ansatte som tok initiativet?",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Hvis nei: Kunne det ha vært aktuelt? Ble den ansatte sykmeldt? Kunne det vært unngått?",
                      },
                    ],
                  },
                ],
              },
              {
                type: "punkt",
                innhold: [
                  "Tenk på de siste gangene du fulgte opp en sykmeldt. Hvordan fungerte tilretteleggingen?",
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold: "Kjente du til mulighetene på arbeidsplassen?",
                      },
                      {
                        type: "punkt",
                        innhold: [
                          "Kom den ansatte med egne forslag?",
                          {
                            type: "punktliste",
                            innhold: [
                              {
                                type: "punkt",
                                innhold: "Hvis ja: Bra! Hva var de?",
                              },
                              {
                                type: "punkt",
                                innhold: "Hvis nei: Hva kan årsakene være?",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "punkt",
                        innhold: [
                          "Evaluerte du og den ansatte tiltakene?",
                          {
                            type: "punktliste",
                            innhold: [
                              {
                                type: "punkt",
                                innhold: "Justerte dere tiltakene underveis?",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "punkt",
                innhold: [
                  "Noter erfaringene dine.",
                  {
                    type: "tekst",
                    innhold:
                      "Det kan lønne seg å notere ned hvilke erfaringer du har med å tilrettelegge. Dette kan gjøre det lettere å vurdere hva du bør gjøre annerledes i fremtiden, når du skal tilrettelegge på nytt.",
                  },
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Noter ned erfaringene dine med tilrettelegging.",
                      },
                      {
                        type: "punkt",
                        innhold: "Velg et punkt du ønsker å forbedre.",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Velg en dato der du evaluerer om du har nådd forbedringsmålet ditt.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "oppgave",
        tittel:
          "Oppgave: Slik involverer du dine ansatte for å forbedre tilretteleggingen",
        id: "81282F61-8A8B-4027-9AA6-3E04A5D30B4B",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Ta med notatene fra oppgave 2 i møte med ansatte eller de ansattes representanter. Notatene kan være et godt utgangspunkt for å diskutere muligheter og utfordringer med tilrettelegging generelt på arbeidsplassen.",
          },
          {
            type: "punktliste",
            innhold: [
              {
                type: "punkt",
                innhold: [
                  "Spør hvilke erfaringer de ansatte har med tilrettelegging, og hvilke forbedringspunkter de ønsker å jobbe med. For eksempel:",
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Vet ansatte at de kan be om tilrettelegging for å forhindre sykefravær?",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Kjenner de ansatte til hvilken tilrettelegging som er mulig på arbeidsplassen?",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Hvordan sikrer dere at tilrettelegging for en eller flere ansatte, ikke fører til uønsket ekstra belastning for de øvrige ansatte?",
                      },
                    ],
                  },
                ],
              },
              {
                type: "punkt",
                innhold:
                  "Spør om det er ansattrepresentanter som har behov for kompetanse om tilrettelegging.",
              },
            ],
          },
          {
            type: "tekst",
            innhold:
              "Møtet bør resultere i en liste med aksjonspunkter og ansvarsfordeling.",
          },
        ],
      },
      {
        type: "oppgave",
        tittel:
          "Oppgave: Lag oversikt over tilretteleggingsmulighetene på arbeidsplassen din",
        id: "57F04A11-2D32-4F6F-90DE-A0043D64F242",
        innhold: [
          {
            type: "inlinetekst",
            innhold: [
              "Slik gjør du: gå inn på siden ",
              {
                type: "lenke",
                tekst: '"Slik kan din arbeidsplass lykkes med tilrettelegging"',
                url: "https://www.idebanken.org/kloke-grep/artikler/slik-lykkes-dere-med-tilrettelegging-pa-arbeidsplassen",
              },
              " på Idébanken.",
            ],
          },
          {
            type: "tekst",
            innhold:
              "Oppgaven heter “Idemyldring med de ansatte” og tar ca. 1 time og inkluderer alle medarbeidere. Oppgaven er ment å føre til eierskap hos ansatte.",
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
            type: "inlinetekst",
            innhold: [
              "Gå til ",
              {
                type: "lenke",
                tekst: "veiledning og mal på nav.no",
                url: "https://www.nav.no/arbeidsgiver/fore-sykefravar#kort-om",
              },
            ],
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
        innhold:
          "Dere skal føre statistikk over fraværet hos dere. Tilrettelegging og forebygging av sykefravær blir enklere hvis dere også sammenligner dere med andre og vet når fraværet er arbeidsrelatert. NAV anbefaler at dere gjør dette fire ganger i året.",
      },
      {
        type: "undertittel",
        innhold: "Mål",
      },
      {
        type: "tekst",
        innhold:
          "Dere lærer de ulike typer sykefravær og plager som skyldes forhold på arbeidsplassen. Dere bruker egen sykefraværstatistikk og vurderer mulige tiltak.",
      },
      {
        type: "deresSykstatBransje",
      },
      {
        type: "infoboks",
        tittel: "Fra individuell oppfølging til forebyggende arbeid",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Når du følger opp en ansatt som har helseplager, er det viktig å se dette i sammenheng med forebyggende arbeid generelt på arbeidsplassen:",
          },
          {
            type: "numrertliste",
            innhold: [
              {
                type: "punkt",
                innhold: [
                  "Når sykefravær oppstår:",
                  {
                    type: "numrertliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Individuell oppfølging: Følg opp medarbeideren",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Forebyggende arbeid: Registrer fravær med/uten arbeidsrelatert årsak",
                      },
                    ],
                  },
                ],
              },
              {
                type: "punkt",
                innhold: [
                  "Der det er mulig å tilrettelegge:",
                  {
                    type: "numrertliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Individuell oppfølging: Tilrettelegg for den sykmeldte",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Forebyggende arbeid: Vurder om flere ansatte har samme behov for tilrettelegging og om det bør løses som en del av HMS-/forebyggende arbeidet.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "tekst",
            innhold:
              "Har dere rutiner og kompetanse som sikrer at innsikt fra oppfølgingsarbeidet blir brukt i forebyggende arbeidet?",
          },
        ],
      },
      {
        type: "infoboks",
        tittel: "Korttidsfravær",
        innhold: [
          {
            type: "tekst",
            innhold: "Kortidsfravær er fravær under 16 dager.",
          },
          {
            type: "lenke",
            tekst:
              "NAV har oversikt over ditt og bransjens legemeldte korttidsfravær.",
            url: "https://arbeidsgiver.nav.no/sykefravarsstatistikk/",
          },
          {
            type: "tekst",
            innhold:
              "Tall fra Statistisk sentralbyrå (SSB) viser at egenmeldt fravær ofte ligger mellom:",
          },
          {
            type: "tekst",
            innhold: "2 og 3 kvartal (sommer): 0,6 – 0,9 %",
          },
          {
            type: "tekst",
            innhold: "1 og 4 kvartal (vinter): 0,9 – 1,3 %",
          },
        ],
      },
      {
        type: "infoboks",
        tittel: "Langtidsfravær",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Langtidsfravær er fravær over 16 dager. Omtrent 25-35% av langtidsfravær har sammenheng med forhold på arbeidsplassen.",
          },
          {
            type: "lenke",
            tekst: "Se ditt og bransjens langtidsfravær",
            url: "https://arbeidsgiver.nav.no/sykefravarsstatistikk/",
          },
        ],
      },
      {
        type: "infoboks",
        tittel: "Bruk gradert sykemelding der det er mulig",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Vi vet at sykmeldte som jobber gradert kommer oftere og tidligere tilbake i arbeid enn de som er helt borte fra jobb. Økt bruk av gradert arbeid kan bidra til å redusere sykefraværet totalt.",
          },
        ],
      },
      {
        type: "oppgave",
        tittel:
          "Oppgave: Vurder sykefraværstatistikken deres og diskuter årsaker og tiltak",
        id: "D7067365-8971-4D08-A6DE-915AE1CDCE5E",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Statistikk gir mer verdi når dere tolker betydningen i fellesskap på egen arbeidsplass.",
          },
          {
            type: "punktliste",
            innhold: [
              {
                type: "punkt",
                innhold:
                  "Hvordan er sykefraværet over tid hos dere sammenlignet med andre?",
              },
              {
                type: "punkt",
                innhold: [
                  "Er noe av sykefraværet relatert til forhold på arbeidsplassen?",
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Hvis ja: Vurder tiltak som treffer kjente risikoer",
                      },
                      {
                        type: "punkt",
                        innhold:
                          "Hvis nei: Er det likevel noe dere kan gjøre? (eks. enkeltansatte som trenger ekstra oppfølging)",
                      },
                    ],
                  },
                ],
              },
              {
                type: "punkt",
                innhold:
                  "Hvilke årsaker påvirker deres korttidsfravær? (eks. smitte, arbeidsmiljø, manglende tilrettelegging)",
              },
              {
                type: "punkt",
                innhold: [
                  "Hvilke årsaker påvirker deres langtidsfravær? (eks. arbeidsmiljø, manglende tilrettelegging)",
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Fører langtidsfraværet til belastning på øvrige medarbeidere?",
                      },
                    ],
                  },
                ],
              },
              {
                type: "punkt",
                innhold: [
                  "Hvordan bruker dere gradert sykmelding?",
                  {
                    type: "punktliste",
                    innhold: [
                      {
                        type: "punkt",
                        innhold:
                          "Hvorfor er vi på dette nivået for gradert sykmelding? (eks. god/manglende kultur og kompetanse)",
                      },
                      {
                        type: "punkt",
                        innhold: "Kan bruken av gradert sykmelding økes?",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "oppgave",
        tittel: "Oppgave: Hvordan få ned kortidsfraværet?",
        id: "43384261-71DF-4AC5-ACAE-C9FC062A337A",
        innhold: [
          {
            type: "tekst",
            innhold:
              "Når noen er borte fra jobb påvirker det arbeidsmiljøet. Grunnene til at ansatte er borte kan være mange, og korttidsfravær kan være vanskelig å snakke om. Dette verktøyet hjelper dere på vei.",
          },
          {
            type: "lenke",
            tekst: "Gå til oppgave om korttidsfravær på Idebanken",
            url: "https://www.idebanken.org/kloke-grep/artikler/hvordan-fa-ned-korttidsfravaeret",
          },
        ],
      },
    ],
  },
];
