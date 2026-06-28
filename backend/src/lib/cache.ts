import Redis from "ioredis";

class CacheService {
  private redis: Redis | null = null;
  private memoryCache = new Map<string, { value: any; expiresAt: number }>();

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      try {
        this.redis = new Redis(redisUrl, {
          maxRetriesPerRequest: 3,
          enableReadyCheck: true,
        });
        this.redis.on("error", (err) => {
          console.warn("Redis client error, fallback to memory cache:", err);
        });
      } catch (e) {
        console.warn("Could not connect to Redis, fallback to memory cache:", e);
      }
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.redis) {
      try {
        const val = await this.redis.get(key);
        return val ? (JSON.parse(val) as T) : null;
      } catch (e) {
        console.warn("Redis get error:", e);
      }
    }
    const item = this.memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.memoryCache.delete(key);
      return null;
    }
    return item.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    if (this.redis) {
      try {
        await this.redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
        return;
      } catch (e) {
        console.warn("Redis set error:", e);
      }
    }
    this.memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    if (this.redis) {
      try {
        await this.redis.del(key);
        return;
      } catch (e) {
        console.warn("Redis del error:", e);
      }
    }
    this.memoryCache.delete(key);
  }
}

export const cacheService = new CacheService();
