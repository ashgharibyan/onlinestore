import { getSession } from "@/lib";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";
import Dashboard from "./_components/Dashboard";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  const user = await api.user.getByUsername({ username: session.username });

  if (!user) {
    return redirect("/login");
  }

  return <Dashboard user={user} />;
}
