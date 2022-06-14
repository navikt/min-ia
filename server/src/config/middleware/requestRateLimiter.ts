import RateLimit from "express-rate-limit";

export const requestRateLimiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20000,
});
