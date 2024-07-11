"use client";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import React from "react";

type signupInputFormTypes = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export default function SignUpForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },

    validate: {
      username: hasLength(
        { min: 2, max: 10 },
        "Username must be 2-20 characters long"
      ),
      email: isEmail("Invalid email"),
      first_name: hasLength(
        { min: 2, max: 20 },
        "First Name must be 2-20 characters long"
      ),
      last_name: hasLength(
        { min: 2, max: 20 },
        "Last Name must be 2-20 characters long"
      ),
      password: (value) => {
        if (!value) {
          return "Password is required";
        }

        if (!/[0-9]/.test(value)) {
          return "Password must include a number";
        }

        if (!/[a-z]/.test(value)) {
          return "Password must include a lowercase letter";
        }

        if (!/[A-Z]/.test(value)) {
          return "Password must include an uppercase letter";
        }

        if (value.length < 8) {
          return "Password must be at least 8 characters long";
        }
      },
    },
  });

  const handleFormSubmit = (values: signupInputFormTypes) => {
    console.log(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
      <TextInput
        label="Username"
        placeholder="Input a username"
        name="username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />
      <TextInput
        label="Email"
        placeholder="Input a email"
        name="email"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        description="Password must include a number, a lowercase and uppercase letter, and be at least 8 characters long"
        placeholder="Input a password"
        name="password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <TextInput
        label="First Name"
        placeholder="Input a first name"
        name="first_name"
        key={form.key("first_name")}
        {...form.getInputProps("first_name")}
      />
      <TextInput
        label="Last Name"
        placeholder="Input a last name"
        name="last_name"
        key={form.key("last_name")}
        {...form.getInputProps("last_name")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
