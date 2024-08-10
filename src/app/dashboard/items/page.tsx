import React from "react";
import Itemslayout from "./_components/Itemslayout";
import { api } from "@/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { searchTerm, sort } = searchParams;
  console.log("searchTerm", searchTerm);
  console.log("sort", sort);

  const allItems = await api.item.getAll({
    category: searchTerm ? searchTerm : "",
    sort,
  });

  if (!allItems) {
    return (
      <div>
        <h1>No Items. Please create one.</h1>
        <a href="/dashboard/items/new">Create Item</a>
      </div>
    );
  }

  return <Itemslayout allItems={allItems} />;
}
