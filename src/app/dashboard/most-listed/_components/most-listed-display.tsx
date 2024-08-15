"use client";

import React from "react";
import { Card, Container, Text, Title } from "@mantine/core";

type MostListedPropType = {
  username: string;
  count: number;
};

export default function MostListedDisplay(props: {
  usersWithMostListedItems: MostListedPropType[];
}) {
  return (
    <Container p={0}>
      <Title order={5}>User(s) with most listed items on selected date</Title>
      <Container>
        {props.usersWithMostListedItems.map((user) => (
          <Card key={user.username}>
            <Title order={5}>{user.username}</Title>
            <Text>Count: {user.count}</Text>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
