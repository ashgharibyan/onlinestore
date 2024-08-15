"use client";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";

export default function GoodReviewsForm() {
  const [value, setValue] = useState<Date | null>(null);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log("Submitted", value);
    setError(null);
    if (!value) {
      setError("Please select a date");
      return;
    }

    const dateString = value.toISOString().split("T")[0];

    router.push(`/dashboard/most-listed?date=${dateString}`);
  };

  return (
    <Container my="lg" p={0}>
      <Title order={5} mt={35} my="lg">
        Please select a date to search
      </Title>
      <Group align="center">
        <DateInput
          value={value}
          onChange={setValue}
          placeholder="Date input"
          clearable
          required
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Group>
      {error && (
        <Text mt="lg" c="red">
          {error}
        </Text>
      )}
    </Container>
  );
}
