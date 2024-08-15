"use client";

import { Container, Title } from "@mantine/core";
import React from "react";
import TwoCategoriesForm from "./two-categories-form";
import TwoCategoriesList from "./two-categories-list";

type categorizedUsersType = {
  username: string;
  items: {
    title: string;
    category: string;
    created_at: Date;
  }[];
};

export default function TwoCategoriesLayout(props: {
  categorizedUsers?: categorizedUsersType[];
}) {
  return (
    <Container>
      <TwoCategoriesForm />
      {props.categorizedUsers && props.categorizedUsers?.length > 0 ? (
        <TwoCategoriesList categorizedUsers={props.categorizedUsers} />
      ) : (
        <Container mt="xl">
          <Title order={3}>
            No users who listed two items in the same day with different
            categories
          </Title>
        </Container>
      )}
    </Container>
  );
}
