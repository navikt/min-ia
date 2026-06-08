FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:16ba163c021deb54b24ae19c168d4432dab34c86a782d171f0df4327a94d5f4b

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
RUN mkdir -p .next/cache
RUN chown -R nextjs:nodejs .next/cache

EXPOSE 3000

CMD ["server.js"]