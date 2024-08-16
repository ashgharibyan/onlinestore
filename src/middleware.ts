import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib";

const signInRoutes = ["/", "/login", "/sign-up"];
const apiPrefix = "/api";

export async function middleware(request: NextRequest) {
  const { authenticated, expired } = await isAuthenticated(request);

  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiPrefix);
  const isSignInRoute = signInRoutes.includes(request.nextUrl.pathname);

  if (expired) {
    // Redirect to a route that deletes the cookie and then redirects to login
    if (!isSignInRoute && !isApiAuthRoute) {
      return NextResponse.redirect(new URL("/api/auth/logout", request.url));
    }
  }

  if (isApiAuthRoute) {
    return;
  }
  if (!authenticated && !isSignInRoute)
    return NextResponse.redirect(new URL("/", request.nextUrl));
  if (authenticated && isSignInRoute)
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
