"use client";

import { OrdersProvider } from "@orderbook/core/providers";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SubscriptionProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then((mod) => mod.SubscriptionProvider),
  { ssr: false }
);

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  return (
    <SubscriptionProvider marketId={params.id ?? "DOTUSDT"}>
      <OrdersProvider>{children}</OrdersProvider>
    </SubscriptionProvider>
  );
}
