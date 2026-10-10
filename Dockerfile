FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:93a8b934908f9cdff9045b1f66343a56769e4aeb951ce7810028ba1f0a51f421

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
COPY --chown=node:node .next/cache ./.next/cache

EXPOSE 3000

CMD ["server.js"]