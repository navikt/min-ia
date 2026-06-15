export type Risikofaktor = {
    risiko: string;
    andel: number;
}

export type NoaInfo = {
    tittel: string;
    lenke: string;
    noaBransje: string;
    beskrivelse: string;
    ingress: string;
    risikofaktorer: Risikofaktor[];
}

export const bransjeTilNoa: Record<string, NoaInfo> = {
    barnehager: {
        tittel: "Fakta om arbeidsmiljøet i barnehage og skolefritidsordning",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/barnehage/",
        noaBransje: "Barnehage og skolefritidsordning",
        beskrivelse: "Flest jobber som assistent eller barnehagelærer.",
        ingress: "I barnehager og skolefritidsordninger oppgir 1 av 2 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "opplever høye emosjonelle krav",
                andel: 31,
            },
            {
                risiko: "utfører arbeid på huk eller knærne",
                andel: 60,
            },
            {
                risiko: "har kontakt med kroppsvæsker",
                andel: 74,
            }
        ],
    },
    næringsmiddelindustri: {
        tittel: "Fakta om arbeidsmiljøet i næringsmiddelindustri",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/naeringsmiddelindustri/",
        noaBransje: "Næringsmiddelindustri",
        beskrivelse: "Flest jobber som operatører.",
        ingress: "I næringsmiddelindustrien oppgir 1 av 2 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "er utsatt for sterk støy",
                andel: 27,
            },
            {
                risiko: "har ensformig arbeid",
                andel: 48,
            },
            {
                risiko: "løfter tungt",
                andel: 29,
            }
        ],
    },
    sykehus: {
        tittel: "Fakta om arbeidsmiljøet på sykehus",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/sykehus/",
        noaBransje: "Sykehus",
        beskrivelse: "Flest jobber som sykepleier eller lege.",
        ingress: "På sykehus oppgir 1 av 3 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "opplever høye jobbkrav og lav jobbkontroll",
                andel: 35,
            },
            {
                risiko: "utfører vått arbeid",
                andel: 51,
            },
            {
                risiko: "er utsatt for uønsket seksuell oppmerksomhet",
                andel: 11,
            }
        ],
    },
    sykehjem: {
        tittel: "Fakta om arbeidsmiljøet på sykehjem og omsorgsinstitusjoner",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/sykehjem/",
        noaBransje: "Sykehjem og omsorgsinstitusjoner",
        beskrivelse: "Flest jobber som helsefagarbeider, sykepleier, pleiemedarbeider, vernepleier eller sosialarbeider.",
        ingress: "På sykehjem og omsorgsinstitusjoner oppgir 1 av 3 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "er utsatt for vold",
                andel: 34,
            },
            {
                risiko: "er utsatt for uønsket seksuell oppmerksomhet",
                andel: 18,
            },
            {
                risiko: "er utsatt for hudirriterende stoffer",
                andel: 73,
            },
        ],
    },
    transport: {
        tittel: "Fakta om arbeidsmiljøet innen passasjertransport på vei og bane",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/passasjertransport/",
        noaBransje: "Passasjertransport",
        beskrivelse: "Flest jobber som sjåfører.",
        ingress: "Innen passasjertransport på vei og bane oppgir 2 av 5 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "opplever lav jobbkontroll",
                andel: 57,
            },
            {
                risiko: "er utsatt for mobbing",
                andel: 10,
            },
            {
                risiko: "er utsatt for helkroppsvibrasjoner",
                andel: 16,
            },
        ],
    },
    bygg: {
        tittel: "Fakta om arbeidsmiljøet i byggevirksomhet ",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/bygg/",
        noaBransje: "Byggevirksomhet",
        beskrivelse: "Flest jobber som tømrer, elektriker, byggearbeider eller ingeniør.",
        ingress: "I byggevirksomheter oppgir 1 av 2 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "er utsatt for vibrasjoner",
                andel: 33,
            },
            {
                risiko: "jobber med hender over skulderhøyde",
                andel: 48,
            },
            {
                risiko: "er utsatt for sterk støy",
                andel: 18,
            },
        ],
    },
    anlegg: {
        tittel: "Fakta om arbeidsmiljøet i anleggsvirksomheter",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/anlegg/",
        noaBransje: "Anleggsvirksomheter",
        beskrivelse: "Flest jobber som anleggsarbeider, byggearbeider, ingeniør eller leder.",
        ingress: "I anleggsvirksomheter oppgir 2 av 5 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "er utsatt for støv, røyk, gass eller damp",
                andel: 56,
            },
            {
                risiko: "er utsatt for vibrasjoner",
                andel: 41,
            },
            {
                risiko: "er utsatt for sterk støy",
                andel: 20,
            }
        ],
    },
    hjemmetjeneste: {
        tittel: "Fakta om arbeidsmiljøet i hjemmetjenesten",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/hjemmetjenesten/",
        noaBransje: "Hjemmetjenesten",
        beskrivelse: "Flest jobber som helsefagarbeider, sykepleier eller pleiemedarbeider.",
        ingress: "I hjemmetjenesten oppgir 2 av 5 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "løfter i ubekvemme stillinger",
                andel: 34,
            },
            {
                risiko: "opplever høye emosjonelle krav",
                andel: 38,
            },
            {
                risiko: "er utsatt for vold",
                andel: 12,
            },
        ]
    },
    butikkhandel: {
        tittel: "Fakta om arbeidsmiljøet innen butikkhandel",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/varehandel/",
        noaBransje: "Butikkhandel",
        beskrivelse: "Flest jobber som butikkmedarbeider, selger eller leder.",
        ingress: "Innen butikkhandel oppgir 2 av 5 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "jobber stående",
                andel: 73,
            },
            {
                risiko: "jobber med hender over skulderhøyde",
                andel: 29,
            },
            {
                risiko: "opplever konflikter med kunder",
                andel: 27,
            },
        ]
    },
    barnevern: {
        tittel: "Fakta om arbeidsmiljøet i barnevern og sosialtjenester",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/barnevern-og-sosialtjenester/",
        noaBransje: "Barnevern og sosialtjenester",
        beskrivelse: "Flest jobber som vernepleier, sosialarbeider eller assistent.",
        ingress: "I barnevern og sosialtjenester oppgir 1 av 3 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "opplever høye emosjonelle krav",
                andel: 42
            },
            {
                risiko: "er utsatt for hets eller trusler",
                andel: 23,
            },
            {
                risiko: "opplever høy grad av rollekonflikt",
                andel: 16,
            },
        ]
    },
    'skole og sfo': {
        tittel: "Fakta om arbeidsmiljøet innen undervisning",
        lenke: "https://noa.stami.no/yrker-og-naeringer/noa/undervisning/",
        noaBransje: "Undervisning",
        beskrivelse: "Flest jobber som lærer i grunnskole, på videregående skole eller ved universitet/høyskole.",
        ingress: "Innen undervisning oppgir 1 av 3 med sykefravær at fraværet er relatert til jobben.",
        risikofaktorer: [
            {
                risiko: "er utsatt for vold",
                andel: 13,
            },
            {
                risiko: "opplever høye emosjonelle krav",
                andel: 32
            },
            {
                risiko: "opplever høy grad av rollekonflikt",
                andel: 18,
            },
        ]
    },
}