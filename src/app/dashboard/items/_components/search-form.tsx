"use client";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Sort from "./sort";

export default function SearchForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string>();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      searchTerm: "",
    },
  });

  const handleSubmit = (data: { searchTerm: string }) => {
    console.log("data in handleSubmit", data);
    setErrors(undefined);
    router.push(`/dashboard/items?searchTerm=${data.searchTerm}`);
  };

  return (
    <Box mt="lg">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <TextInput
          label="Search"
          placeholder="Search"
          name="searchTerm"
          key={form.key("searchTerm")}
          {...form.getInputProps("searchTerm")}
        />

        <Group justify="flex-end" mt="md">
          <Sort />
          <Button type="submit">Search</Button>
        </Group>
      </form>
      {errors && <Text c={"red"}>{errors}</Text>}
    </Box>
  );
}
