import React from "react";
import TwoCategoriesLayout from "./_components/two-categories-layout";
import { api } from "@/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { category1, category2 } = searchParams;

  if (!category1 || !category2) {
    return <TwoCategoriesLayout />;
  }

  const categorizedUsers = await api.user.twoCategories({
    category1: category1,
    category2: category2,
  });

  return <TwoCategoriesLayout categorizedUsers={categorizedUsers} />;
}
