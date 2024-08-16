import React from "react";
import MostExpensiveItems from "./_components/most-expensive-items";
import { api } from "@/trpc/server";

export default async function Page() {
  const mostExpensiveItems = await api.item.mostExpensive();

  console.log("mostExpensiveItems ---- ", mostExpensiveItems);

  if (!mostExpensiveItems) {
    return <MostExpensiveItems />;
  }

  return <MostExpensiveItems mostExpensiveItems={mostExpensiveItems} />;
}
