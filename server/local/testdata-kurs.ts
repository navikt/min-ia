const getTomorrowsDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow;
}

const getIsoDateWithTime = (dato : Date, time: String): String => {
    return `${dato.getFullYear()}-${String(dato.getMonth() +1).padStart(2, '0')}-${String(dato.getDate()).padStart(2, '0')}${time}`;
}
// @ts-ignore
export const kurslisteMockTomt=[];
export const kurslisteMock = [
    {
        Title: "Hvorfor jobbe med arbeidsmiljø?",
        ShowInActivityList: 1,
        RegistrationUrl: "https://kurs.nav.no/s/pamelding?id=a162o00000Ajzx9AAB",
        RegistrationToDateTime: getIsoDateWithTime(getTomorrowsDate(), "T15:00:00.000Z"),
        RegistrationPlaceName: "Digitalt - Teams samling",
        RegistrationID: "a162o00000Ajzx9AAB",
        RegistrationFromDateTime: getIsoDateWithTime(getTomorrowsDate(), "T09:00:00.000Z"),
        RegistrationDeadline: "2021-10-18T23:45:00.000Z",
        NumberOfParticipants: 1,
        MaxNumberOfParticipants: 150,
        FrontPageDescription: null,
        Description: "Arbeidsplassene er hovedarenaen for arbeidsmiljøarbeidet. Til hjelp i arbeidet med å redusere sykefraværet og hindre frafall fra arbeidslivet er det etablert en nasjonal arbeidsmiljøsatsing.  \r\nI denne sendingen møter du NAV og Arbeidstilsynet som vil belyse arbeidsmiljøets betydning for å redusere sykefravær. Vi vil presentere verktøyet Arbeidsmiljøportalen. Dette er et kunnskapsbasert verktøy til hjelp for arbeidsplassen i utvikling av arbeidsmiljøet.",
        configurable_custom: {
            Underkategori: null,
            Type: "Webinar",
            Tema: "Inkluderende arbeidsliv (IA)",
            Fylke: "Rogaland"
        },
        AvailableSeats: 149
    },
    {
        Title: "Syn: Webinar: Overgang til høyere utdanning med redusert syn",
        ShowInActivityList: 0,
        RegistrationUrl: "https://kurs.nav.no/s/pamelding?id=a162o00000Ajp7FAAR",
        RegistrationToDateTime: "2021-02-08T11:00:00.000Z",
        RegistrationPlaceName: "Webinar ved NAV Hjelpemiddelsentral Oslo",
        RegistrationID: "a162o00000Ajp7FAAR",
        RegistrationFromDateTime: "2021-02-08T09:30:00.000Z",
        RegistrationDeadline: "2021-02-04T09:00:00.000Z",
        NumberOfParticipants: 18,
        MaxNumberOfParticipants: 30,
        FrontPageDescription: "<h3>Mål</h3><p>Forberede elever med en synshemming på overgangen fra vgs til høyere utdanning.</p><p> </p><h3>Innhold</h3><p><span style=\"font-size: 14px; color: black;\">-       </span>  Hva bør man tenke på ved valg av utdanning?</p><p>-         Hva kan NAV bistå med?</p><p>-         Planlegge oppstart av studiet</p><p>-        Tilpasning og bruk av programvare og hjelpemidler</p><p><span style=\"font-size: 14px;\"> </span></p><h3>Praktisk informasjon</h3><p>Ved behov for tolk, gi oss beskjed snarest mulig.</p><p>Kursansvarlig: Anne Marit Arnegaard e-post: anne.marit.arnegaard@nav.no</p><p><br></p><p>Kurset vil foregå digitalt via Teams:</p><p>Dette kurset vil ikke bli gjort opptak av </p><p>Ditt navn vil være synlig for andre deltagere i kurset </p><p>Du kan selv velge om du vil ha på bilde/lyd av deg selv </p><p>Ingen deltagere har lov til å gjøre opptak av kurset som holdes </p><p> </p><p>Meld deg på kurset her og du vil få tilsendt link til pålogging i forkant av kurset. </p><p>Les her hvordan du blir med i et møte uten en Teams konto:</p><p>https://support.microsoft.com/nb-no/office/bli-med-i-et-m%C3%B8te-uten-en-teams-konto-c6efc38f-4e03-4e79-b28f-e65a4c039508</p><p> </p>",
        Description: "Kurset tar for seg veiledning i valg av høyere utdanning, NAV's virkemidler, forberedelser og tilrettelegging av undervisningen for oppnå gode læringsforhold. Kurset er for elever, rådgivere og andre interesserte i videregående skole, samt foreldre i Oslo, Follo, Romerike og Bærum.",
        configurable_custom: {
            Underkategori: null,
            Type: "Webinar",
            Tema: "Hjelpemidler og tilrettelegging",
            Fylke: null
        }, AvailableSeats: 12
    },
    {
        Title: "LinkedIn - digitalt kurs",
        ShowInActivityList: 1,
        RegistrationUrl: "https://kurs.nav.no/s/pamelding?id=a162o00000AjvVWAAZ",
        RegistrationToDateTime: "2021-11-16T13:00:00.000Z",
        RegistrationPlaceName: "Kurset avholdes digitalt av NAV Lillestrøm",
        RegistrationID: "a162o00000AjvVWAAZ",
        RegistrationFromDateTime: "2021-11-16T11:00:00.000Z",
        RegistrationDeadline: "2021-11-12T12:00:00.000Z",
        NumberOfParticipants: 5,
        MaxNumberOfParticipants: 100,
        FrontPageDescription: "<h1><b style=\"color: rgb(240, 35, 35);\">Digitalt kurs</b></h1><p> </p><h1><b>LinkedIn </b></h1><h2><b style=\"font-size: 20px;\">Beskrivelse</b></h2><p><span style=\"font-size: 14px;\">På dette kurset kan du lære mer om hvordan du bygger en god profil på LinkedIn slik at du blir mer synlig for fremtidige arbeidsgivere. Kurset vil gi deg en god plattform på hvordan du skal bruke LinkedIn som et verktøy i din jobbsøkerprosess.</span></p><p><br></p><p><b style=\"font-size: 14px;\">Kursinnhold:</b></p><p><span style=\"font-size: 14px;\">Hvordan forstå algoritmen</span></p><p><span style=\"font-size: 14px;\">Tips til hvordan bruke LinkedIn som arbeidssøker</span></p><p><span style=\"font-size: 14px;\">Nettverksbygging </span></p><p><span style=\"font-size: 14px;\">Jobbmatch</span></p><h2><br></h2><h2><b style=\"font-size: 20px;\">Målgruppe</b></h2><p><span style=\"font-size: 14px;\">Perfekt for deg som ønsker å bruke LinkedIn til personlig merkevarebygging og nettverksbygging</span></p><p><br></p><h2><b style=\"font-size: 20px;\">Viktig informasjon</b></h2><p><span style=\"font-size: 14px;\">Alle påmeldte vil kort tid etter påmeldingsfristen få en epost med informasjon om pålogging til kurset</span></p>",
        Description: "På dette kurset kan du lære mer om hvordan du bygger en god profil på LinkedIn slik at du blir mer synlig for fremtidige arbeidsgivere.",
        configurable_custom: {
            Underkategori: null,
            Type: "Kurs",
            Tema: "Arbeidssøkeraktivitet",
            Fylke: "Øst-Viken"
        },
        AvailableSeats: 95
    },
    {
        Title: "Frokostmøte for arbeidsgivere, Sør-Varanger",
        ShowInActivityList: 0,
        RegistrationUrl: "https://kurs.nav.no/s/pamelding?id=a162o00000AjwQpAAJ",
        RegistrationToDateTime: "2021-09-07T10:00:00.000Z",
        RegistrationPlaceName: "Scandic hotell Kirkenes",
        RegistrationID: "a162o00000AjwQpAAJ",
        RegistrationFromDateTime: "2021-09-07T09:00:00.000Z",
        RegistrationDeadline: "2021-08-23T12:00:00.000Z",
        NumberOfParticipants: 27,
        MaxNumberOfParticipants: 27,
        FrontPageDescription: "<p>Du som arbeidsgiver kjenner dine ansatte best - bør du også kjenne til kompetansetiltaket for sykmeldte?</p><p><br></p><p>NAV Troms og Finnmark er 1 av 5 fylker i landet som har øremerkede midler for sykmeldte som har behov for kompetanseheving for å fortsatt kunne stå i arbeid. Kompetansetiltaket innenfor sykemeldingsperioden er et av få virkemidler i NAV som er rettet inn mot de som allerede er en del av arbeidslivet.</p><p><br></p><p>NAV Arbeidslivssenter Troms og Finnmark inviterer arbeidsgivere, tillitsvalgte og verneombud til informasjon om tiltaket. Vi vil servere frokost og det vil være anledning til spørsmål. </p>",
        Description: "Har du arbeidstakere som på grunn av sykdom/skade sliter med å stå i sin jobb?  NAV Arbeidslivssenter Troms og Finnmark inviterer til frokostmøte.\r\nDet er begrenset antall plasser - først til mølla!",
        configurable_custom: {
            Underkategori: null,
            Type: "Informasjonsmøte",
            Tema: "Inkluderende arbeidsliv (IA)",
            Fylke: "Troms og Finnmark"
        },
        AvailableSeats: 0
    },
    {
        Title: "Nettverkssamling prosessledelse HelseIArbeid",
        ShowInActivityList: 0,
        RegistrationUrl: "https://kurs.nav.no/s/pamelding?id=a162o00000AjwWJAAZ",
        RegistrationToDateTime: "2021-09-20T14:00:00.000Z",
        RegistrationPlaceName: null,
        RegistrationID: "a162o00000AjwWJAAZ",
        RegistrationFromDateTime: "2021-09-20T12:00:00.000Z",
        RegistrationDeadline: "2021-09-17T12:00:00.000Z",
        NumberOfParticipants: 6,
        MaxNumberOfParticipants: 8,
        FrontPageDescription: "<p>I samlingen vil vi se på det teoretiske grunnlaget for valgene som er tatt for prosessen i HelseIArbeid, og deretter knytte det konkret til møter og moduler.</p><p>Samlinga er dialogbasert og en arena for erfaringsdeling og å lære av hverandre.</p><p>Målgruppe er IA-rådgivere som jobber/skal jobbe med HelseIArbeid.</p>",
        Description: "Nettverkssamling om Prosessledelse med spesielt fokus på HelseIArbeid.",
        configurable_custom: {
            Underkategori: null,
            Type: "Nettverks- og erfaringssamling",
            Tema: "Inkluderende arbeidsliv (IA)",
            Fylke: null
        },
        AvailableSeats: 2
    },
    {
        Title: "Spørsmål og svar - et webinar om sykefravær, sykmeldinger og ferietid",
        ShowInActivityList: 0,
        RegistrationUrl: "https://kurs.nav.no/s/pamelding?id=a162o00000AjvJDAAZ",
        RegistrationToDateTime: "2021-06-16T11:00:00.000Z",
        RegistrationPlaceName: "Digitalt møte på Teams",
        RegistrationID: "a162o00000AjvJDAAZ",
        RegistrationFromDateTime: "2021-06-16T10:00:00.000Z",
        RegistrationDeadline: "2021-06-14T12:00:00.000Z",
        NumberOfParticipants: 84,
        MaxNumberOfParticipants: 150,
        FrontPageDescription: "<p>NAV Arbeidslivssenter Rogaland inviterer til digitalt møte med hovedtema knyttet til sykefravær. Vi vil besvare spørsmål som er innsendt i forkant av møtet. Dersom det er tid igjen vil vi også besvare spørsmål under direkte sending. Det vil ikke være mulig å ta opp enkeltsaker. Spørsmål kan sendes på epost til: marit.fuglestein.kristensen@nav.no</p>",
        Description: "Digitalt møte om sykefravær generelt for målgruppen arbeidsgivere.",
        configurable_custom: {
            Underkategori: null,
            Type: "Webinar",
            Tema: "Inkluderende arbeidsliv (IA)",
            Fylke: null
        },
        AvailableSeats: 66
    },
];
