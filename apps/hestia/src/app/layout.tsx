"use client";

import "@/styles/globals.scss";
import "@polkadex/ux/dist/index.css";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import classNames from "classnames";
import dynamic from "next/dynamic";

const DynamicProviders = dynamic(
  () =>
    import("@/components/ui/DynamicProviders").then(
      (mod) => mod.DynamicProviders
    ),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href={"/manifest.json"} />
        <link rel={"apple-touch-icon"} href={"/icon.png"} />
      </head>
      <body
        className={classNames(
          "flex flex-col max-h-screen min-h-screen mx-auto overflow-x-hidden",
          GeistSans.className
        )}
      >
        <DynamicProviders>{children}</DynamicProviders>
      </body>
    </html>
  );
}
