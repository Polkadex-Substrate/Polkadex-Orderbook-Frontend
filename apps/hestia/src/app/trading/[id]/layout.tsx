"use client";

import { OrdersProvider } from "@orderbook/core/providers";
import { ReactNode } from "react";

import { SizeProvider } from "@/components/trading/provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OrdersProvider>
      <SizeProvider>{children}</SizeProvider>
    </OrdersProvider>
  );
}
