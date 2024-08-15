import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { type Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Online Store",
  description: "Comp 440 Project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
