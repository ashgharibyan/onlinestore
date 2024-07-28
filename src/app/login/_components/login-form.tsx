"use client";
import { login } from "@/actions/auth/login";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

export default function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form action={() => login(form.getValues())}>
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
