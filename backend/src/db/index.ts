import { PrismaClient } from "@prisma/client";


export const slowQueriesLog: { query: string; duration: number; timestamp: string }[] = [];

const primaryClient = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "warn" }
  ],
}) as any;

primaryClient.$on("query", (e: any) => {
  if (e.duration >= 100) {
    slowQueriesLog.push({
      query: e.query,
      duration: e.duration,
      timestamp: new Date().toISOString()
    });
    if (slowQueriesLog.length > 50) slowQueriesLog.shift();
  }
});

const replicaUrl = process.env.DATABASE_REPLICA_URL;
const replicaClient = replicaUrl
  ? (new PrismaClient({
      datasources: { db: { url: replicaUrl } },
      log: [
        { emit: "event", level: "query" },
        { emit: "stdout", level: "error" },
        { emit: "stdout", level: "warn" }
      ],
    }) as any)
  : null;

if (replicaClient) {
  replicaClient.$on("query", (e: any) => {
    if (e.duration >= 100) {
      slowQueriesLog.push({
        query: `[REPLICA] ${e.query}`,
        duration: e.duration,
        timestamp: new Date().toISOString()
      });
      if (slowQueriesLog.length > 50) slowQueriesLog.shift();
    }
  });
}

const READ_METHODS = ["findUnique", "findFirst", "findMany", "count", "aggregate", "groupBy", "findRaw", "queryRaw"];

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

let circuitState: CircuitState = "CLOSED";
let failureCount = 0;
let successCount = 0;
let lastStateTransition = Date.now();
const TRANSITION_TIMEOUT = 30000; // 30 seconds

export function getReplicaStatus() {
  if (circuitState === "OPEN" && Date.now() - lastStateTransition > TRANSITION_TIMEOUT) {
    circuitState = "HALF_OPEN";
    lastStateTransition = Date.now();
    successCount = 0;
  }
  return {
    configured: !!replicaUrl,
    hasReplica: !!replicaUrl,
    circuitState,
    failureCount
  };
}

function getClientForOperation(methodName: string): PrismaClient {
  if (!replicaClient) {
    return primaryClient;
  }

  getReplicaStatus();

  if (circuitState === "OPEN") {
    return primaryClient;
  }

  if (READ_METHODS.includes(methodName)) {
    return replicaClient;
  }

  return primaryClient;
}

function handleReplicaSuccess() {
  if (circuitState === "HALF_OPEN") {
    successCount++;
    if (successCount >= 3) {
      circuitState = "CLOSED";
      failureCount = 0;
      lastStateTransition = Date.now();
    }
  }
}

function handleReplicaFailure() {
  failureCount++;
  if (circuitState === "CLOSED" && failureCount >= 5) {
    circuitState = "OPEN";
    lastStateTransition = Date.now();
  } else if (circuitState === "HALF_OPEN") {
    circuitState = "OPEN";
    lastStateTransition = Date.now();
  }
}

// Proxied client that routes reads to replica and handles fallback
export const db = new Proxy(primaryClient, {
  get(target, prop, receiver) {
    if (prop === "getReplicaStatus") {
      return getReplicaStatus;
    }
    if (typeof prop === "string" && prop.startsWith("$")) {
      return Reflect.get(target, prop, receiver);
    }

    const model = Reflect.get(target, prop, receiver);
    if (!model || typeof model !== "object") {
      return model;
    }

    return new Proxy(model, {
      get(modelTarget, methodProp) {
        const originalMethod = Reflect.get(modelTarget, methodProp);
        if (typeof originalMethod !== "function") {
          return originalMethod;
        }

        return async function (...args: any[]) {
          const methodName = String(methodProp);
          const client = getClientForOperation(methodName);

          if (client === replicaClient) {
            try {
              const replicaModel = (replicaClient as any)[prop];
              const result = await replicaModel[methodProp](...args);
              handleReplicaSuccess();
              return result;
            } catch (err) {
              console.warn("Read replica query failed, falling back to primary:", err);
              handleReplicaFailure();
              const primaryModel = (primaryClient as any)[prop];
              return await primaryModel[methodProp](...args);
            }
          } else {
            return await originalMethod.apply(modelTarget, args);
          }
        };
      }
    });
  }
}) as unknown as PrismaClient & { getReplicaStatus: typeof getReplicaStatus };



export default db;
