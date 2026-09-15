FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:663477aa9109a3d7b9ebfa34f19d6fd1c4706775b1436603b2dea4f4a1eb7364

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
COPY --chown=node:node .next/cache ./.next/cache

EXPOSE 3000

CMD ["server.js"]