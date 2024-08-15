"use client";

import { logout } from "@/actions/auth/logout";
import { Button, Container, Group } from "@mantine/core";
import { type User } from "@prisma/client";
import React from "react";
import NextLink from "next/link";

export default function Dashboard(props: { user: User }) {
  const { user } = props;

  return (
    <Container>
      <h1>Welcome, {user.username}!</h1>
      <p>Your email is {user.email ? user.email : "not set"}</p>

      <p>First Name: {user.first_name} </p>
      <p>Last Name: {user.last_name}</p>

      <Group>
        <Button component={NextLink} href={"/dashboard/items"}>
          Items
        </Button>
        <Button component={NextLink} href={"/dashboard/two-categories"}>
          Two Categories
        </Button>
        <Button
          onClick={async () => {
            await logout();
          }}
        >
          Log Out
        </Button>
      </Group>
    </Container>
  );
}
