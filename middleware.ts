import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, readSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoginRoute = pathname === "/login";

  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await readSession(sessionToken);

  if (!session && !isLoginRoute) {
    const loginUrl = new URL("/login", request.url);
    const nextPath = `${pathname}${search}`;

    if (nextPath && nextPath !== "/") {
      loginUrl.searchParams.set("next", nextPath);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff|woff2)$).*)",
  ],
};
