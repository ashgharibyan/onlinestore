"use client";

import React from "react";
import { type ReviewOptions } from "@prisma/client";
import { Card, Container, List, ListItem, Text, Title } from "@mantine/core";

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

export default function GoodReviewsDisplay(props: { items: propType[] }) {
  return (
    <Container p={0}>
      <Title order={3}>Good Reviews Display</Title>
      <Container>
        {props.items.map((item) => (
          <Card key={item.id}>
            <Title order={5}>{item.title}</Title>
            <Text>Reviews</Text>
            <List>
              {item.reviews.length === 0 && <li>No reviews</li>}
              {item.reviews.map((review) => (
                <ListItem key={review.id}>
                  <Text>
                    {review.review} - From: {review.userUsername}
                  </Text>
                  <Text></Text>
                </ListItem>
              ))}
            </List>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
