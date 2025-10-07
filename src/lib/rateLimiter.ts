import Redis from 'ioredis';

const LIMIT = 5;
const DURATION = 60;

let redis: Redis | null = null;
function getRedis() {
  if (!redis) {
    const redisUrl = process.env.REDIS_SERVER!;
    redis = new Redis(redisUrl);
  }
  return redis;
}

// A basic configurable rate limiter

export default async function rateLimiter(
  request: Request,
  limit = LIMIT,
  duration = DURATION
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const key = `rate-limit:${ip}`;

  const client = getRedis();
  const current = await client.incr(key);
  if (current === 1) {
    await client.expire(key, duration);
  }
  if (current > limit) {
    return new Response('Too many requests', { status: 429 });
  }

  // Return if not rate limited
  return;
}
