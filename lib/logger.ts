export interface LogPayload {
  requestId?: string;
  ip?: string;
  userId?: string;
  action: string;
  message: string;
  metadata?: Record<string, any>;
}

export class Logger {
  private static sanitize(obj: any): any {
    if (!obj || typeof obj !== "object") return obj;

    const copy = { ...obj };
    const sensitiveKeys = ["password", "passwordHash", "token", "secret", "refresh_token", "access_token", "id_token"];

    for (const key of Object.keys(copy)) {
      if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
        copy[key] = "[MASKED]";
      } else if (typeof copy[key] === "object") {
        copy[key] = this.sanitize(copy[key]);
      }
    }
    return copy;
  }

  static info(payload: LogPayload) {
    const log = {
      level: "INFO",
      timestamp: new Date().toISOString(),
      ...payload,
      metadata: payload.metadata ? this.sanitize(payload.metadata) : undefined,
    };
    console.log(JSON.stringify(log));
  }

  static warn(payload: LogPayload) {
    const log = {
      level: "WARN",
      timestamp: new Date().toISOString(),
      ...payload,
      metadata: payload.metadata ? this.sanitize(payload.metadata) : undefined,
    };
    console.warn(JSON.stringify(log));
  }

  static error(payload: LogPayload, error?: any) {
    const log = {
      level: "ERROR",
      timestamp: new Date().toISOString(),
      ...payload,
      metadata: {
        ...payload.metadata,
        error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      },
    };
    console.error(JSON.stringify(this.sanitize(log)));
  }
}
