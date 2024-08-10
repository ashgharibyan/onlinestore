"use client";

import { Button, Paper, Text, Title } from "@mantine/core";
import { type Item } from "@prisma/client";
import React from "react";

import NextLink from "next/link";
export default function SingleItem(props: { item: Item }) {
  return (
    <Paper p="md" shadow="md" radius="md" mt="md">
      <Title order={3}>{props.item.title}</Title>
      <Text>{props.item.description}</Text>
      <Text>{props.item.category}</Text>

      <Button
        component={NextLink}
        href={`/dashboard/items/${props.item.id}`}
        variant="light"
        mt="xs"
      >
        Open Item
      </Button>
    </Paper>
  );
}
