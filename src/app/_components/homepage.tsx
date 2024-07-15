"use client";

import React from "react";
import SignUpForm from "./sign-up-form";
import { Container, Divider, Title } from "@mantine/core";
import LoginForm from "./login-form";

export default function Homepage() {
  return (
    <Container>
      <Title my="xl" order={1}>
        Welcome to the Online Store
      </Title>
      <Divider my="xl" />
      <Title my="xl" order={2}>
        Sign Up
      </Title>
      <SignUpForm />

      <Divider my="xl" flex={1} />

      <Title my="xl" order={2}>
        Login
      </Title>
      <LoginForm />
    </Container>
  );
}
