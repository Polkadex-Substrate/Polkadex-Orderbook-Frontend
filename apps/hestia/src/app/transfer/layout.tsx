"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

import { SizeProvider } from "@/components/transfer/provider";

const WithdrawsProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then((mod) => mod.WithdrawsProvider),
  { ssr: false }
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SizeProvider>
      <WithdrawsProvider>{children}</WithdrawsProvider>
    </SizeProvider>
  );
}
