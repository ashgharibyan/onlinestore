"use client";

import { Group, Select, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Sort() {
  const dataOptions = ["None", "Price High to Low", "Price Low to High"];
  const router = useRouter();
  const [value, setValue] = useState<string | null>("None");

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const handleOnChange = (val: string | null) => {
    setValue(val);

    if (val === "None") {
      router.push(`/dashboard/items?searchTerm=${searchTerm}`);
      return;
    }

    const sortVal = val === "Price High to Low" ? "desc" : "asc";
    router.push(`/dashboard/items?searchTerm=${searchTerm}&sort=${sortVal}`);
  };

  return (
    <Group>
      <Text>Sort By:</Text>
      <Select
        data={dataOptions}
        defaultValue={value}
        value={value}
        onChange={(e) => handleOnChange(e)}
        clearable={false}
        allowDeselect={false}
      />
    </Group>
  );
}
