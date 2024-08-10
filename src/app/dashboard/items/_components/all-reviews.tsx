"use client";

import React from "react";
import { type ItemWithReviews } from "../[item_id]/single-item-page";
import { Paper, Text } from "@mantine/core";

export default function AllReviews(props: { item: ItemWithReviews }) {
  const { reviews } = props.item;

  return (
    <>
      {reviews.map((review) => (
        <Paper p="md" shadow="md" mt="md" key={review.id}>
          <Text>Review: {review.review}</Text>
          <Text>Comment: {review.description}</Text>
          <Text>By: {review.userUsername}</Text>
        </Paper>
      ))}
    </>
  );
}
