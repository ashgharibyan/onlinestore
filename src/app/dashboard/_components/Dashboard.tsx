"use client";

import { logout } from "@/actions/auth/logout";
import { Button } from "@mantine/core";
import { type User } from "@prisma/client";
import React from "react";

export default function Dashboard(props: { user: User }) {
  const { user } = props;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Your email is {user.email ? user.email : "not set"}</p>

      <p>First Name: {user.first_name} </p>
      <p>Last Name: {user.last_name}</p>

      <Button
        onClick={async () => {
          await logout();
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
