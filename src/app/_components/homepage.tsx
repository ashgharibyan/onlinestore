"use client";

import React from "react";
import SignUpForm from "./sign-up-form";
import { Container, Title } from "@mantine/core";

export default function Homepage() {
  return (
    <Container>
      <Title my="xl">Sign Up</Title>
      <SignUpForm />
    </Container>
  );
}
