FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:0f0a6a7959d81a3d8bb447199b2dd9c60a9858ed36fdaaca9fa0427c0cdb4c6b

ENV PORT=3000 \
    NODE_ENV=production
# Disable additional cache mechanisms that might cause mkdir errors
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_CACHE=1
# Set cache directory to writable location
ENV NEXT_CACHE_DIR=/tmp/.next/cache

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]