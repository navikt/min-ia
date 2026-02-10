# Forebygge fravær

Landingsside for selvbetjente IA-tjenester

[![Build, test and deploy](https://github.com/navikt/min-ia/actions/workflows/build-deploy.yaml/badge.svg)](https://github.com/navikt/min-ia/actions/workflows/build-deploy.yaml)

# Kjøre lokalt med hot-reload

- Autentiser deg i Naisdevice hvis du skal bruke NAVs dekoratør.
- Installer avhengigheter: `yarn`
- Kjør opp applikasjon: `yarn dev`
- Åpne applikasjonen på `http://localhost:3000/forebygge-fravar` (for Safari browser, legg til `"ws://localhost:3000",` i `connect-src` variabel i `sp.js` fil.

# Kjøre applikasjonen med Docker:

## Autentiser med Naisdevice og bygg docker image

0. Kjør `nais login` for å autentisere deg i Naisdevice. Dette er nødvendig for å kunne laste ned Chainguard image som
   brukes i Dockerfile-en.
1. Om du ikke har gjort det før: kjør `yarn build`
2. Autentiser deg i Naisdevice hvis du skal bruke NAVs dekoratør.
3. Start container runtime (f.eks docker desktop eller colima)
4. Kjør `docker build . -t min-ia` fra rotmappen
5. Kjør `docker run -p 3000:3000 min-ia` fra rotmappen.
6. For å stoppe, kjør `docker kill <id>`, hvor id-en hentes ved å kjøre `docker ps`

## Fix: build med Colima (hvis du ikke bruker Docker Desktop)

Hvis du kjører Docker med Colima, og får feilmeldingen`parent snapshot sha256:[hash] does not exist: not found`,

og/eller får følgende warning ved bygging av docker image:

`DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
Install the buildx component to build images with BuildKit:`

kan det hjelpe å

0. installere docker BuildKit med brew `brew install docker-buildx`
1. oppdatere Docker config og legge til i `~/.docker/config.json` (👉 sjekk at lenken til `cli-plugins` er riktig for din
   maskin):

```json
{
  "cliPluginsExtraDirs": [
    "/opt/homebrew/lib/docker/cli-plugins"
  ]
}
```

2. restart docker runtime (f.eks Colima) og bygg docker image på nytt

---

# Kontakt

- For spørsmål eller henvendelser, opprett gjerne et issue her på GitHub.
- Koden utvikles og driftes av Team IA i [Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
- Slack-kanal [#team-pia](https://nav-it.slack.com/archives/C02DL347ZT2)
