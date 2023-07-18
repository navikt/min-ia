export const notifikasjonerMockdata = {
  notifikasjoner: {
    feilAltinn: false,
    feilDigiSyfo: false,
    notifikasjoner: [
      {
        __typename: "Beskjed",
        brukerKlikk: {
          id: "01908498131-f30d34ac-7058-45f5-8ae4-7148425779ef",
          klikketPaa: true,
          __typename: "BrukerKlikk",
        },
        virksomhet: {
          navn: "VIRKSOMHET MED NOTIFIKASJON AS",
          virksomhetsnummer: "123456789",
          __typename: "Virksomhet",
        },
        lenke: "https://dev.nav.no",
        tekst: "dette er en notifikasjon",
        merkelapp: "fager",
        opprettetTidspunkt: "2023-01-05T09:41:52.62916Z",
        sorteringTidspunkt: "2023-01-05T09:41:52.62916Z",
        id: "f30d34ac-7058-45f5-8ae4-7148425779ef",
      },
    ],
    __typename: "NotifikasjonerResultat",
  },
};
