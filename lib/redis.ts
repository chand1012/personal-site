import Redis from "ioredis";

const redisUri = process.env.REDIS_URI || "redis://localhost:6379";

// Log connection info (mask password if present)
const maskedUri = redisUri.replace(/:([^@]+)@/, ":***@");
console.log(`[Redis] Connecting to: ${maskedUri}`);

const redis = new Redis(redisUri, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 2000);
    console.log(`[Redis] Retry attempt ${times}, waiting ${delay}ms`);
    return delay;
  },
  reconnectOnError(err) {
    console.log(`[Redis] Reconnect on error: ${err.message}`);
    return true;
  },
});

// Connection event listeners for debugging
redis.on("connect", () => {
  console.log("[Redis] Connected to server");
});

redis.on("ready", () => {
  console.log("[Redis] Ready to accept commands");
});

redis.on("error", (err) => {
  console.error("[Redis] Error:", err.message);
  if (err.stack) {
    console.error("[Redis] Stack:", err.stack);
  }
});

redis.on("close", () => {
  console.log("[Redis] Connection closed");
});

redis.on("reconnecting", () => {
  console.log("[Redis] Reconnecting...");
});

redis.on("end", () => {
  console.log("[Redis] Connection ended");
});

export default redis;
