"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import React from "react";
import GoodReviewsForm from "./good-reviews-form";
import NextLink from "next/link";
import { type ReviewOptions, type User } from "@prisma/client";
import GoodReviewsDisplay from "./good-reviews-display";

type propType = {
  id: number;
  created_at: Date;
  title: string;
  description: string;
  category: string;
  price: number;
  userUsername: string;
  reviews: {
    id: number;
    created_at: Date;
    review: ReviewOptions;
    description: string;
    itemId: number;
    userUsername: string;
  }[];
};

export default function GoodReviewsLayout(props: {
  allUsers: User[];
  items?: propType[];
}) {
  return (
    <Container mt="xl">
      <Group justify="space-between" align="center">
        <Title>Excellent or Good</Title>
        <Button component={NextLink} href="/dashboard/" variant="light">
          Go Back
        </Button>
      </Group>
      <Text c="dimmed">
        List all the items posted by user X, such that all the comments are
        Excellent or Good for these items
      </Text>
      <GoodReviewsForm allUsers={props.allUsers} />
      {props.items && <GoodReviewsDisplay items={props.items} />}
    </Container>
  );
}
