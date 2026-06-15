FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:79d45b732c0d5c2428361ccb935b5d307c90e20223942023acf7873eca8d3a98

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
COPY --chown=node:node .next/cache ./.next/cache

EXPOSE 3000

CMD ["server.js"]