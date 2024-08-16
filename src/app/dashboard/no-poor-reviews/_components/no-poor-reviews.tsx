"use client";

import {
  Box,
  Button,
  Card,
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
  items: {
    reviews: {
      review: ReviewOptions;
    }[];
    title: string;
  }[];
};

export default function NoPoorReviews(props: { noPoorReviews?: propType[] }) {
  return (
    <Container mt="xl">
      <Group justify="space-between" align="center">
        <Title>No Poor Reviews</Title>
        <Button component={NextLink} href="/dashboard/" variant="light">
          Go Back
        </Button>
      </Group>
      <Text c="dimmed">
        Display those users such that each item they posted so far never
        received any POOR reviews.
      </Text>
      {props.noPoorReviews?.length === 0 && (
        <Text mt="xl">No No Poor Reviewers</Text>
      )}
      {props.noPoorReviews?.map((noPoorReviewer) => (
        <Card key={noPoorReviewer.username} shadow="xs" padding="md" mt="lg">
          <Title order={3}>User: {noPoorReviewer.username}</Title>
          {noPoorReviewer.items.map((item) => (
            <Box key={item.title} mt="lg">
              <Title order={5}>Item: {item.title}</Title>
              <List>
                {item.reviews.length === 0 ? (
                  <Text>No reviews</Text>
                ) : (
                  item.reviews.map((review) => (
                    <ListItem key={review.review}>{review.review}</ListItem>
                  ))
                )}
              </List>
            </Box>
          ))}
        </Card>
      ))}
    </Container>
  );
}
