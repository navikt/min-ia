FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:1f2360dca173912327817bc7834ea6f9bcbd877d1eade11d7f51ef29afc96564

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
COPY --chown=node:node .next/cache ./.next/cache

EXPOSE 3000

CMD ["server.js"]