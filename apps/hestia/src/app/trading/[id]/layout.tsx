"use client";

import {
  SubscriptionProvider,
  OrdersProvider,
} from "@orderbook/core/providers";
import { ReactNode } from "react";

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
