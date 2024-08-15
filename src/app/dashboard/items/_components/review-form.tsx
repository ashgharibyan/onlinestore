"use client";
import { api } from "@/trpc/react";
import {
  Button,
  Container,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ReviewOptions } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type ReviewFormType = {
  review: string;
  description: string;
};

const ReviewOptionsArray = Object.values(ReviewOptions);

export default function ReviewForm(props: { itemId: number }) {
  const router = useRouter();
  const [errors, setErrors] = React.useState<string>();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      review: "",
      description: "",
    },
  });

  const createReview = api.review.create.useMutation({
    onSuccess: (data) => {
      console.log("Successfully created review", data);
      router.refresh();
    },
    onError: (err) => {
      console.log("Error creating review", err);
      setErrors(err.shape?.message);
    },
  });

  const handleSubmit = (data: ReviewFormType) => {
    console.log("data in handleSubmit", data);
    setErrors(undefined);

    createReview.mutate({
      review: data.review as ReviewOptions,
      description: data.description,
      itemId: props.itemId,
    });
  };

  return (
    <Container mt="lg">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Select
          label="Review"
          placeholder="Item review"
          name="review"
          data={ReviewOptionsArray}
          key={form.key("review")}
          {...form.getInputProps("review")}
        />
        <TextInput
          label="Description"
          placeholder="Item description"
          name="description"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Add Review</Button>
        </Group>
      </form>
      {errors && <Text c={"red"}>{errors}</Text>}
    </Container>
  );
}
