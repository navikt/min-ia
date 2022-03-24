# Min IA

Landingsside for selvbetjente IA-tjenester

# Kjøre lokalt med hot-reload
- Rename filen `.env.example` -> `.env`
- Naviger til `/server`
- Installer avhengigheter: `yarn`
- Kjør opp applikasjon: `yarn dev`
- Naviger til `../client`
- Installer avhengigheter: `yarn`
- Kjør opp applikasjon: `yarn dev`
- Åpne applikasjonen på `http://localhost:3000/min-ia`


# TODO: Finne en måte å få hot-reload på både client og server :)

# Kjøre applikasjonen med Docker:
1. Start container runtime (f.eks docker desktop eller colima)
2. Kjør `docker-compose -f docker-compose.yml -f docker-compose-local.yml up` fra rotmappa
5. For å stoppe, kjør `docker stop <id>`, hvor id-en kan finner ved å kjøre `docker list`
