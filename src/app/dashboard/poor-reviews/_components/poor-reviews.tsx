"use client";

import {
  Button,
  Container,
  Group,
  List,
  ListItem,
  Text,
  Title,
} from "@mantine/core";
import { type ReviewOptions } from "@prisma/client";
import React from "react";
import NextLink from "next/link";

type propType = {
  username: string;
  reviews: {
    review: ReviewOptions;
  }[];
};

export default function PoorReviews(props: { poorReviewers?: propType[] }) {
  return (
    <Container mt="xl">
      <Group justify="space-between" align="center">
        <Title>Poor Reviewers</Title>
        <Button component={NextLink} href="/dashboard/" variant="light">
          Go Back
        </Button>
      </Group>
      <Text c="dimmed">
        Display all the users who posted some reviews, but each of them is POOR
      </Text>
      {props.poorReviewers?.length ? (
        <Title mt="xl" order={3}>
          Users
        </Title>
      ) : (
        <Text mt="xl">No Poor Reviewers</Text>
      )}
      {props.poorReviewers?.map((poorReviewer) => (
        <List key={poorReviewer.username}>
          <ListItem>{poorReviewer.username}</ListItem>
        </List>
      ))}
    </Container>
  );
}
