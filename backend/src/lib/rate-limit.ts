const memoryStore = new Map<string, number[]>();

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // seconds until limit resets
}

/**
 * Enforce sliding-window rate limiting on a per-IP basis.
 */
export async function rateLimit(
  ip: string,
  action: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  // If Redis environment variables are configured in the future,
  // this function can be easily swapped to run:
  // redis.eval(luaScript, [key], [limit, windowMs])
  
  const key = `${action}:${ip}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  let timestamps = memoryStore.get(key) || [];

  // Remove timestamps outside the sliding window
  timestamps = timestamps.filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    const oldestTimestamp = timestamps[0] || now;
    const resetSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      reset: resetSeconds,
    };
  }

  timestamps.push(now);
  memoryStore.set(key, timestamps);

  return {
    success: true,
    limit,
    remaining: limit - timestamps.length,
    reset: windowSeconds,
  };
}
