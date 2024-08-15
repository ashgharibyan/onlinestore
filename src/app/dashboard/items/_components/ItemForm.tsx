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

type ItemType = {
  title: string;
  description: string;
  category: string;
  price: number;
};

export default function ItemForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string>();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
    },
  });

  const createItem = api.item.create.useMutation({
    onSuccess: (data) => {
      console.log("Successfully created item", data);
      router.push(`/dashboard`);
    },
    onError: (err) => {
      console.log("Error creating item", err);

      setErrors(err.shape?.message);
    },
  });

  const handleSubmit = (data: ItemType) => {
    console.log("data in handleSubmit", data);
    setErrors(undefined);

    createItem.mutate({
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
    });
  };

  return (
    <Container mt="lg">
      <Group justify="space-between" align="center">
        <Title py="lg">Create Item</Title>
        <Button component={NextLink} href="/dashboard/items" variant="light">
          Go Back
        </Button>
      </Group>
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <TextInput
          label="Title"
          placeholder="Item title"
          name="title"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          placeholder="Item description"
          name="description"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <TextInput
          label="Category"
          placeholder="Item category"
          name="category"
          key={form.key("category")}
          {...form.getInputProps("category")}
        />
        <NumberInput
          label="Price"
          placeholder="Item price"
          name="price"
          prefix="$"
          key={form.key("price")}
          {...form.getInputProps("price")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Create Item</Button>
        </Group>
      </form>

      {errors && <Text c={"red"}>{errors}</Text>}
    </Container>
  );
}
