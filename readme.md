# Forebygge fravær

Landingsside for selvbetjente IA-tjenester

[![Build, test and deploy](https://github.com/navikt/min-ia/actions/workflows/build-deploy.yaml/badge.svg)](https://github.com/navikt/min-ia/actions/workflows/build-deploy.yaml)

# Kjøre lokalt med hot-reload
- Autentiser deg i Naisdevice hvis du skal bruke NAVs dekoratør.
- Installer avhengigheter: `yarn`
- Kjør opp applikasjon: `yarn dev`
- Åpne applikasjonen på `http://localhost:3000/forebygge-fravar` (for Safari browser, legg til `"ws://localhost:3000",` i `connect-src` variabel i `sp.js` fil.

# Kjøre applikasjonen med Docker:
0. Om du ikke har gjort det før: kjør `yarn build`
1. Autentiser deg i Naisdevice hvis du skal bruke NAVs dekoratør.
2. Start container runtime (f.eks docker desktop eller colima)
3. Kjør `docker build . -t min-ia` fra rotmappen
4. Kjør `docker run -p 3000:3000 min-ia` fra rotmappen.
5. For å stoppe, kjør `docker kill <id>`, hvor id-en hentes ved å kjøre `docker ps`

---

# Kontakt

* For spørsmål eller henvendelser, opprett gjerne et issue her på GitHub.
* Koden utvikles og driftes av Team IA i [Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
* Slack-kanal [#team-pia](https://nav-it.slack.com/archives/C02DL347ZT2)