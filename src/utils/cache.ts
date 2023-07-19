import NodeCache from "node-cache";

const SECONDS_PER_MINUTE = 60;
const TTL = SECONDS_PER_MINUTE * 1;

// Refresh cache every 5 min
export const cache = new NodeCache({
  stdTTL: TTL,
  checkperiod: SECONDS_PER_MINUTE,
});
