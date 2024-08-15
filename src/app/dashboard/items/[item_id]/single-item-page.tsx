"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { type Review } from "@prisma/client";
import React from "react";
import ReviewForm from "../_components/review-form";
import AllReviews from "../_components/all-reviews";
import NextLink from "next/link";

export type ItemWithReviews = {
  id: number;
  created_at: Date;
  title: string;
  description: string;
  category: string;
  userUsername: string;
  reviews: Review[];
};

export default function SingleItemPage(props: {
  item: ItemWithReviews;
  username: string;
}) {
  const didUserReview = props.item.reviews.some(
    (review) => review.userUsername === props.username
  );

  const isUserOwner = props.item.userUsername === props.username;
  return (
    <Container mt="lg">
      <Group justify="space-between" align="center">
        <Title order={1}>{props.item.title}</Title>
        <Button component={NextLink} href={`/dashboard/items`}>
          Back to items
        </Button>
      </Group>
      <Text>{props.item.description}</Text>
      <Text>{props.item.category}</Text>
      <Text>By: {props.item.userUsername}</Text>

      <Divider m="xl" />

      <Title order={3}>All Reviews</Title>
      {props.item.reviews.length > 0 ? (
        <AllReviews item={props.item} />
      ) : (
        <Text>No reviews yet</Text>
      )}
      {!isUserOwner && !didUserReview && (
        <Box mt="lg">
          <Title order={4}>Leave a review</Title>
          <ReviewForm itemId={props.item.id} />
        </Box>
      )}
    </Container>
  );
}
