import React from "react";
import PoorReviews from "./_components/poor-reviews";
import { api } from "@/trpc/server";

export default async function Page() {
  const poorReviewers = await api.user.poorReviewers();
  console.log("poor reviewers ------ ", poorReviewers);

  if (!poorReviewers) {
    return <PoorReviews />;
  }

  return <PoorReviews poorReviewers={poorReviewers} />;
}
