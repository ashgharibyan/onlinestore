"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import React from "react";
import LoginForm from "./login-form";
import NextLink from "next/link";

export default function LoginLayout() {
  return (
    <Container py="lx">
      <Group justify="space-between" align="center" py="lg">
        <Title order={1}>Login</Title>

        <Group>
          <Button component={NextLink} href={"/"}>
            Home
          </Button>
          <Button component={NextLink} href={"/sign-up"}>
            Sign Up
          </Button>
        </Group>
      </Group>
      <Text pb="xl">Enter your username and password to login</Text>
      <LoginForm />
    </Container>
  );
}
