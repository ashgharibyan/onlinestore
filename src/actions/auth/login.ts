"use server";

import { encrypt } from "@/lib";
import { api } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: { username: string; password: string }) {
  const user = await api.user.login({
    username: formData.username,
    password: formData.password,
  });

  if (!user) {
    throw new Error("Failed to login");
  }

  const session = await encrypt(user);

  // Save the session in a cookie
  cookies().set("session", session, { httpOnly: true });

  redirect("/dashboard");
}
