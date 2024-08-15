"use cleint";

import { Container, Title } from "@mantine/core";
import React from "react";

type categorizedUsersType = {
  username: string;
  items: {
    title: string;
    category: string;
    created_at: Date;
  }[];
};
export default function TwoCategoriesList(props: {
  categorizedUsers: categorizedUsersType[];
}) {
  return (
    <Container mt="xl">
      <Title order={3}>
        Users who listed two items in the same day with different categories
      </Title>
      {props.categorizedUsers.map((user) => (
        <Title key={user.username} order={4}>
          - {user.username}
        </Title>
      ))}
    </Container>
  );
}
