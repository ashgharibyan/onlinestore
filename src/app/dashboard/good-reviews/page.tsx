import React from "react";
import GoodReviewsLayout from "./_components/good-reviews-layout";
import { api } from "@/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const allUsers = await api.user.getAllUsers();

  if (!allUsers) {
    return <div>Loading...</div>;
  }

  if (allUsers.length === 0) {
    return <div>No users are registered</div>;
  }

  const { username } = searchParams;

  if (username) {
    const items = await api.item.goodReviews({ username: username });

    if (!items) {
      return <div>Loading...</div>;
    }

    if (items.length === 0) {
      return <div>No items have good reviews</div>;
    }

    return <GoodReviewsLayout allUsers={allUsers} items={items} />;
  }

  return <GoodReviewsLayout allUsers={allUsers} />;
}
