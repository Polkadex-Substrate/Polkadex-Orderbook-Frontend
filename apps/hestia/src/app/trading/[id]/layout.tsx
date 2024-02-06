"use client";

import { SubscriptionProvider } from "@orderbook/core/providers";
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
      {children}
    </SubscriptionProvider>
  );
}
