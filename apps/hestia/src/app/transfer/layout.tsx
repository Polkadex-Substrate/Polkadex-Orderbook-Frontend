"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const WithdrawsProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then((mod) => mod.WithdrawsProvider),
  { ssr: false }
);

export default function Layout({ children }: { children: ReactNode }) {
  return <WithdrawsProvider>{children}</WithdrawsProvider>;
}
