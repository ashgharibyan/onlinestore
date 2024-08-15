"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import React from "react";
import NextLink from "next/link";
import MostListedForm from "./most-listed-form";
import MostListedDisplay from "./most-listed-display";

type MostListedPropType = {
  username: string;
  count: number;
};

export default function MostListedLayout(props: {
  usersWithMostListedItems?: MostListedPropType[];
}) {
  return (
    <Container mt="xl">
      <Group justify="space-between" align="center">
        <Title>Most Listed Items On a Day</Title>
        <Button component={NextLink} href="/dashboard/" variant="light">
          Go Back
        </Button>
      </Group>
      <Text c="dimmed">
        List the users who posted the most number of items on 7/4/2024; if there
        is a tie, list all the users who have a tie
      </Text>
      <MostListedForm />
      {props.usersWithMostListedItems && (
        <MostListedDisplay
          usersWithMostListedItems={props.usersWithMostListedItems}
        />
      )}
    </Container>
  );
}
