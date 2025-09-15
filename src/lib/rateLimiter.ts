import Redis from 'ioredis';

const redisUrl = process.env.REDIS_SERVER!;
const redis = new Redis(redisUrl);

const LIMIT = 5; // requests
const DURATION = 60; // seconds

// A basic configurable rate limiter

export default async function rateLimiter(
  request: Request,
  limit = LIMIT,
  duration = DURATION
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const key = `rate-limit:${ip}`;

  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, duration);
  }
  if (current > limit) {
    return new Response('Too many requests', { status: 429 });
  }

  // Return if not rate limited
  return;
}
