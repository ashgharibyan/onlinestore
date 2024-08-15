"use client";
import { api } from "@/trpc/react";
import {
  Button,
  Container,
  Group,
  NumberInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NextLink from "next/link";

type SearchType = {
  category1: string;
  category2: string;
};

export default function TwoCategoriesForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string>();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      category1: "",
      category2: "",
    },
    validate: (values) => {
      if (!values.category1) {
        return { category1: "Category 1 is required" };
      }
      if (!values.category2) {
        return { category2: "Category 2 is required   " };
      }
      if (values.category1 === values.category2) {
        return { category2: "Category 2 must be different from Category 1" };
      }
      return {};
    },
  });

  const handleSubmit = (data: SearchType) => {
    console.log("data in handleSubmit", data);
    setErrors(undefined);
    router.push(
      `/dashboard/two-categories?category1=${data.category1}&category2=${data.category2}`
    );
    form.reset();
  };

  return (
    <Container mt="lg">
      <Group justify="space-between" align="center">
        <Title pt="lg">Custom Search</Title>

        <Button component={NextLink} href="/dashboard/" variant="light">
          Go Back
        </Button>
      </Group>
      <Text c="dimmed" pb="lg">
        List the users who posted at least two items that were posted on the
        same day, one has a category of X, and another has a category of Y
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <TextInput
          label="Category 1"
          placeholder="First Category"
          name="category1"
          key={form.key("category1")}
          {...form.getInputProps("category1")}
        />
        <TextInput
          label="Category 2"
          placeholder="Second Category"
          name="category2"
          key={form.key("category2")}
          {...form.getInputProps("category2")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Search</Button>
        </Group>
      </form>

      {errors && <Text c={"red"}>{errors}</Text>}
    </Container>
  );
}
