"use client";
import { api } from "@/trpc/react";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

type loginInputFormTypes = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const loginUser = api.user.login.useMutation({
    onSuccess: (data) => {
      console.log("data", data);
      // const { token } = data;
      // localStorage.setItem("token", token);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  const handleFormSubmit = (values: loginInputFormTypes) => {
    console.log(values);
    try {
      loginUser.mutate(values);
    } catch (error) {
      console.error("Error: ", error);
    }

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
