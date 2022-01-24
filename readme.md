# Min IA

Landingsside for selvbetjente IA-tjenester

__WIP__

# Kjøre opp lokalt
- Installere avhengigheter fra både `/client` og `/server`
- Rename filen `/server/.env.example` -> `/server/.env`
- Kjøre applikasjon: `yarn run dev` fra både `/server` og `/client`

# Kjøre applikasjonen med Docker:
1. Start container runtime (f.eks docker desktop eller colima)
2. Kjør `docker-compose -f docker-compose.yml -f docker-compose-local.yml up` fra rotmappa
5. For å stoppe, kjør `docker stop <id>`, hvor id-en kan finner ved å kjøre `docker list`