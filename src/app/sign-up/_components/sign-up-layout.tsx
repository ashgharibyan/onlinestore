"use client";

import { Button, Container, Group, Title } from "@mantine/core";
import React from "react";
import NextLink from "next/link";
import SignUpForm from "./sign-up-form";

export default function SignUpLayout() {
  return (
    <Container py="xl">
      <Group justify="space-between" align="center" py="lg">
        <Title order={1}>Sign Up</Title>

        <Group>
          <Button component={NextLink} href={"/"}>
            Home
          </Button>
          <Button component={NextLink} href={"/login"}>
            Log In
          </Button>
        </Group>
      </Group>
      <SignUpForm />
    </Container>
  );
}
