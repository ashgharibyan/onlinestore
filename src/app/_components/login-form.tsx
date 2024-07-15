"use client";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

type loginInputFormTypes = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleFormSubmit = (values: loginInputFormTypes) => {
    console.log(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
      <TextInput
        label="Username"
        placeholder="Input your username"
        name="username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />

      <PasswordInput
        label="Password"
        placeholder="Input your password"
        name="password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Log In</Button>
      </Group>
    </form>
  );
}
