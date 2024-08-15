import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  cookies().delete("session");
  const targetUrl = new URL(
    "/login",
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  );

  return NextResponse.redirect(targetUrl);
}
