import { Request, Response, NextFunction } from "express";
import { rateLimit } from "./rate-limit";
import { Logger } from "./logger";
import { handleApiResponseError } from "./errors";

export interface SecureRouteConfig {
  action: string;
  rateLimitLimit?: number;
  rateLimitWindow?: number;
  cache?: string;
}

export class NextHeaders {
  private headers: Record<string, string> = {};

  constructor(expressHeaders: any) {
    Object.entries(expressHeaders).forEach(([k, v]) => {
      this.headers[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : String(v || "");
    });
  }

  get(name: string): string | null {
    return this.headers[name.toLowerCase()] || null;
  }
}

export class NextRequest {
  public method: string;
  public url: string;
  public headers: NextHeaders;
  public nextUrl: {
    pathname: string;
    searchParams: URLSearchParams;
  };
  private body: any;

  constructor(expressReq: Request) {
    this.method = expressReq.method;
    this.url = expressReq.protocol + "://" + expressReq.get("host") + expressReq.originalUrl;
    this.headers = new NextHeaders(expressReq.headers);
    this.nextUrl = {
      pathname: expressReq.path,
      searchParams: new URLSearchParams(expressReq.query as any),
    };
    this.body = expressReq.body;
  }

  async json() {
    return this.body;
  }
}

export class NextResponse {
  public body: any;
  public status: number;
  public headers: Map<string, string>;

  constructor(body: any, init?: { status?: number; headers?: Record<string, string> | any }) {
    this.body = body;
    this.status = init?.status ?? 200;
    this.headers = new Map();
    if (init?.headers) {
      if (typeof init.headers.forEach === "function") {
        init.headers.forEach((v: string, k: string) => this.headers.set(k, v));
      } else {
        Object.entries(init.headers).forEach(([k, v]) => this.headers.set(k, String(v)));
      }
    }
  }

  static json(body: any, init?: { status?: number; headers?: Record<string, string> }) {
    return new NextResponse(body, init);
  }

  static redirect(url: string | URL, init?: { status?: number; headers?: Record<string, string> }) {
    const redirectUrl = typeof url === "string" ? url : url.toString();
    const headers = { Location: redirectUrl, ...init?.headers };
    return new NextResponse(null, { status: init?.status ?? 302, headers });
  }
}

/**
 * Express compatibility route wrapper that emulates Next.js API Routes.
 */
export function secureRoute(
  config: SecureRouteConfig,
  handler: (req: NextRequest, session: any, context: { params: any }) => Promise<NextResponse>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestId = crypto.randomUUID();
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "127.0.0.1";

    try {
      // 1. Logging incoming request
      Logger.info({
        requestId,
        ip,
        action: `${req.method} ${config.action}`,
        message: `Incoming Express API request to ${req.path}`,
      });

      // 2. Rate Limiting
      const limit = config.rateLimitLimit ?? 60;
      const windowSeconds = config.rateLimitWindow ?? 60;
      const rlResult = await rateLimit(ip, config.action, limit, windowSeconds);

      res.setHeader("X-RateLimit-Limit", limit.toString());
      res.setHeader("X-RateLimit-Remaining", rlResult.remaining.toString());
      res.setHeader("X-RateLimit-Reset", rlResult.reset.toString());

      if (!rlResult.success) {
        Logger.warn({
          requestId,
          ip,
          action: config.action,
          message: `Rate limit exceeded for IP: ${ip}`,
        });
        return res.status(429).json({
          error: "Too Many Requests",
          code: "RATE_LIMIT_EXCEEDED",
          retryAfter: rlResult.reset,
        });
      }

      // 3. Convert Express request to NextRequest mock
      const nextReq = new NextRequest(req);

      // 4. Session authentication (populated by auth middleware)
      const session = (req as any).user ? { user: (req as any).user } : null;

      // 5. Context parameter passing (Express URL params map directly)
      const context = { params: req.params };

      // 6. Execute core handler
      const nextRes = await handler(nextReq, session, context);

      // 7. Write headers and return JSON
      nextRes.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      return res.status(nextRes.status).json(nextRes.body);

    } catch (error) {
      Logger.error(
        {
          requestId,
          ip,
          action: config.action,
          message: "Internal API handler exception in Express router",
        },
        error
      );

      // Let backend's standard error handler structure wrap the response
      const errorRes = handleApiResponseError(error);
      return res.status(errorRes.status).json(errorRes.body);
    }
  };
}
