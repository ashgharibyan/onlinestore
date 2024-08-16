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
import React from "react";
import NextLink from "next/link";

export default function MostExpensiveItems(props: {
  mostExpensiveItems?: (
    | { title: string; category: string; price: number }
    | undefined
  )[];
}) {
  return (
    <Container mt="xl">
      <Group justify="space-between" align="center">
        <Title>Most Expensive Items in Each Category</Title>
        <Button component={NextLink} href="/dashboard/" variant="light">
          Go Back
        </Button>
      </Group>
      <Text c="dimmed">List the most expensive items in each category</Text>
      <Container mt="lg">
        {props.mostExpensiveItems?.map((item, index) => (
          <List key={index} mt="lg">
            <ListItem>
              {item?.title} - in &quot;{item?.category}&quot; category - priced
              at ${item?.price}
            </ListItem>
          </List>
        ))}
      </Container>
    </Container>
  );
}
