import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";
import { getCorsHeaders, handleOptionsRequest } from "@/lib/cors";
import { Logger } from "@/lib/logger";
import { handleApiResponseError } from "@/lib/errors";

interface SecureRouteConfig {
  action: string;
  rateLimitLimit?: number;
  rateLimitWindow?: number;
}

/**
 * Higher-order function to secure Next.js API routes.
 * Enforces CORS, rate-limiting, structured JSON logs, Request ID injection, and error handling.
 */
export function secureRoute(
  config: SecureRouteConfig,
  handler: (req: NextRequest, session: any, context: { params: any }) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: any) => {
    // 1. CORS Preflight check
    if (req.method === "OPTIONS") {
      return handleOptionsRequest(req);
    }

    const headers = getCorsHeaders(req);
    const requestId = crypto.randomUUID();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    try {
      // 2. Logging incoming request
      Logger.info({
        requestId,
        ip,
        action: `${req.method} ${config.action}`,
        message: `Incoming API request to ${req.nextUrl.pathname}`,
      });

      // 3. Rate Limiting
      const limit = config.rateLimitLimit ?? 60; // defaults to 60 requests
      const windowSeconds = config.rateLimitWindow ?? 60; // per 60 seconds
      const rlResult = await rateLimit(ip, config.action, limit, windowSeconds);

      // Append rate-limiting headers
      const updatedHeaders = {
        ...headers,
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": rlResult.remaining.toString(),
        "X-RateLimit-Reset": rlResult.reset.toString(),
      };

      if (!rlResult.success) {
        Logger.warn({
          requestId,
          ip,
          action: config.action,
          message: `Rate limit exceeded for IP: ${ip}`,
        });
        return NextResponse.json(
          {
            error: "Too Many Requests",
            code: "RATE_LIMIT_EXCEEDED",
            retryAfter: rlResult.reset,
          },
          { status: 429, headers: updatedHeaders }
        );
      }

      // 4. Session authentication
      const session = await auth();

      // 5. Execute core handler
      const res = await handler(req, session, context);

      // 6. Set response headers
      for (const [key, value] of Object.entries(updatedHeaders)) {
        res.headers.set(key, value);
      }

      return res;
    } catch (error) {
      Logger.error(
        {
          requestId,
          ip,
          action: config.action,
          message: "Internal API handler exception",
        },
        error
      );

      const errorRes = handleApiResponseError(error);
      for (const [key, value] of Object.entries(headers)) {
        errorRes.headers.set(key, value);
      }
      return errorRes;
    }
  };
}
