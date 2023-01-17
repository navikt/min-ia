# Forebygge fravær

Landingsside for selvbetjente IA-tjenester

## Kjøre lokalt med hot-reload
- Autentiser deg i Naisdevice hvis du skal bruke NAVs dekoratør.
- Naviger til `/server`
- Rename filen `.env.example` -> `.env`
- Installer avhengigheter: `yarn`
- Kjør opp applikasjon: `yarn dev` eller `TEST_MODE=KREVER_INNLOGGING yarn dev` (se `package.json` for flere opsjoner)
- Naviger til `../client`
- Installer avhengigheter: `yarn`
- Kjør opp applikasjon: `yarn dev`
- Åpne applikasjonen på `http://localhost:3000/forebygge-fravar` (for Safari browser, legg til `"ws://localhost:3000",` i `connect-src` variabel i `sp.js` fil.

## Kjøre applikasjonen med Docker:
0. Autentiser deg i Naisdevice hvis du skal bruke NAVs dekoratør.
1. Start container runtime (f.eks docker desktop eller colima)
2. Kjør `docker build . -t min-ia` fra rotmappen
3. Kjør `docker run -p 3000:3000 --env-file=./server/.env.example --env-file=./client/.env.local min-ia` fra rotmappen.
4. For å stoppe, kjør `docker kill <id>`, hvor id-en hentes ved å kjøre `docker ps`
