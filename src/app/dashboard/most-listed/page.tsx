import React from "react";
import MostListedLayout from "./_components/most-listed-layout";
import { api } from "@/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { date } = searchParams;

  console.log("date------", date);

  if (!date) {
    return <div>No Date Selected</div>;
  }

  const usersWithMostListedItems = await api.user.mostListed({ date });

  if (usersWithMostListedItems && usersWithMostListedItems.length > 0) {
    console.log("usersWithMostListedItems", usersWithMostListedItems);
    return (
      <MostListedLayout usersWithMostListedItems={usersWithMostListedItems} />
    );
  }

  // convert string to date, date is in this formar currently: "2024-08-07"

  return <MostListedLayout />;
}
