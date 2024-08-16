import React from "react";
import NoPoorReviews from "./_components/no-poor-reviews";
import { api } from "@/trpc/server";

export default async function page() {
  const noPoorReviews = await api.user.noPoorReviews();

  console.log("no poor reviews ------ ", noPoorReviews);

  if (!noPoorReviews) {
    return <NoPoorReviews />;
  }

  return <NoPoorReviews noPoorReviews={noPoorReviews} />;
}
