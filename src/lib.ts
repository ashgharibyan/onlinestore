import { cookies } from "next/headers";
import { type JwtPayload } from "jsonwebtoken";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface MyJwtPayload extends JwtPayload {
  username: string;
}
const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3600 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const decrypted = (await decrypt(session)) as MyJwtPayload;
  return decrypted;
}

export async function isAuthenticated(request: NextRequest) {
  const session = cookies().get("session")?.value;
  if (!session) return false;

  try {
    await decrypt(session);
    return true;
  } catch (error) {
    console.log("--------", error);
  }
}
