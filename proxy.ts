import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/sign-in", "/unauthorized"];
const API_AUTH_PREFIX = "/api/auth";

/**
 * TalentOS Proxy (Next.js 16 — renamed from middleware)
 * Route protection via session cookie check.
 * Full auth validation is done server-side in layouts.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth API routes
  if (pathname.startsWith(API_AUTH_PREFIX)) return NextResponse.next();
  if (pathname.startsWith("/api/errors")) return NextResponse.next();

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isSignIn = pathname === "/sign-in";

  // Check NextAuth session cookie
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ??
    request.cookies.get("__Secure-authjs.session-token")?.value;
  const isTest = process.env.NODE_ENV !== "production" && request.headers.get("x-talentos-test") === "1";
  const isLoggedIn = !!sessionToken;

  // Authenticated → away from sign-in (only for real sessions, not test header)
  if (isSignIn && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Unauthenticated → to sign-in (non-API, non-public)
  if (!isPublicPath && !isLoggedIn && !isTest && !pathname.startsWith("/api/")) {
    const callbackUrl = encodeURIComponent(pathname + request.nextUrl.search);
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  // Unauthenticated → 401 JSON for protected APIs
  if (
    pathname.startsWith("/api/") &&
    !pathname.startsWith(API_AUTH_PREFIX) &&
    !isLoggedIn &&
    !isTest
  ) {
    return NextResponse.json(
      {
        code: "ERR_UNAUTHORIZED",
        message: "Authentication required.",
        httpStatus: 401,
        requestId: crypto.randomUUID(),
        retryable: false,
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|avatars/|images/|backgrounds/).*)",
  ],
};
