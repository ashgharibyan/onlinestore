"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Table,
  type TableData,
  Title,
} from "@mantine/core";
import NextLink from "next/link";
import { type Item } from "@prisma/client";
import SearchForm from "./search-form";
export default function Itemslayout(props: { allItems: Item[] }) {
  const singleItemLinkButton = (item_id: number) => (
    <Button
      component={NextLink}
      href={`/dashboard/items/${item_id}`}
      variant="light"
    >
      Open Item
    </Button>
  );

  const tableData: TableData = {
    head: [
      "Title",
      "Description",
      "Category",
      "Price",
      "Created By",
      "Actions",
    ],
    body: props.allItems.map((item) => [
      item.title,
      item.description,
      item.category,
      "$ " + item.price,
      item.userUsername,
      singleItemLinkButton(item.id),
    ]),
  };

  return (
    <Container mt="lg">
      <Group justify="space-between" align="center">
        <Title>Items</Title>

        <Flex gap="lg">
          <Button component={NextLink} href="/dashboard" variant="light">
            Back to Dashboard
          </Button>
          <Button
            component={NextLink}
            href="/dashboard/items/new"
            variant="light"
          >
            Create new item
          </Button>
        </Flex>
      </Group>

      <SearchForm />

      {props.allItems.length === 0 ? (
        <Box>
          <Title order={4}>No Items. Please create one.</Title>
          <Button
            component={NextLink}
            href="/dashboard/items/new"
            variant="light"
            mt={10}
          >
            Create new item
          </Button>
        </Box>
      ) : (
        <Table data={tableData} mt="lg" />
      )}
    </Container>
  );
}
