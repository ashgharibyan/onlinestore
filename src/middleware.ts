import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib";

const signInRoutes = ["/", "/login", "/sign-up"];
const apiPrefix = "/api";

export async function middleware(request: NextRequest) {
  const isLogged = await isAuthenticated(request);

  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiPrefix);
  const isSignInRoute = signInRoutes.includes(request.nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (!isLogged && !isSignInRoute)
    return NextResponse.redirect(new URL("/", request.nextUrl));
  if (isLogged && isSignInRoute)
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
