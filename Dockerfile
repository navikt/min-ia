FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:5b2fe88f9018228f6381fac076e41cfb9b4131bbb4130b3bd20a798f5c0a190f

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
COPY --chown=node:node .next/cache ./.next/cache

EXPOSE 3000

CMD ["server.js"]