import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis connection
// Placeholder values prevent crashes during rapid prototyping
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://placeholder.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "placeholder",
});

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */ 
  prefix: "@zeno/ratelimit",
});
