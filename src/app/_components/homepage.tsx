"use client";

import React from "react";
import { Button, Container, Divider, Group, Title } from "@mantine/core";
import NextLink from "next/link";
export default function Homepage() {
  return (
    <Container>
      <Title my="xl" order={1}>
        Welcome to the Online Store
      </Title>
      <Divider my="xl" />
      <Group>
        <Button component={NextLink} href={"/login"}>
          Login
        </Button>
        <Button component={NextLink} href={"/sign-up"}>
          Sign Up
        </Button>
      </Group>
    </Container>
  );
}
