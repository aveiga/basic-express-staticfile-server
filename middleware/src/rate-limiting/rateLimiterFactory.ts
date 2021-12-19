import redis from "redis";
import { RateLimiterRedis, RateLimiterMemory } from "rate-limiter-flexible";
import {
  TooManyRequestsError,
  errorHandler,
} from "../error-handling/errorHandler.js";

export function generateRateLimiter(points, duration) {
  let rateLimiter = null;

  if (process.env.NODE_ENV === "DEV") {
    rateLimiter = new RateLimiterMemory({ points: points, duration: duration });
  } else {
    const redisClient = redis.createClient({
      host: "redis",
      port: 6379,
      enable_offline_queue: false,
    });

    rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "middleware",
      points: points,
      duration: duration,
    });
  }

  return (req, res, next) => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        errorHandler(new TooManyRequestsError(req), req, res, next);
      });
  };
}
