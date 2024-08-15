"use client";
import { Button, Container, Group, Select, Text, Title } from "@mantine/core";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function GoodReviewsForm(props: { allUsers: User[] }) {
  const [value, setValue] = useState<string | null>("");
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const allUsernamesData = props.allUsers.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  const handleSubmit = () => {
    console.log("Submitted", value);
    setError(null);
    if (!value) {
      setError("Please select a username");
      return;
    }

    router.push(`/dashboard/good-reviews?username=${value}`);
  };

  return (
    <Container my="lg" p={0}>
      <Title order={5} mt={35} my="lg">
        Please select a user to search if they have items that are only
        Excellent or Good Reviews
      </Title>
      <Group>
        <Select
          data={allUsernamesData}
          value={value}
          onChange={setValue}
          clearable
          allowDeselect={false}
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
