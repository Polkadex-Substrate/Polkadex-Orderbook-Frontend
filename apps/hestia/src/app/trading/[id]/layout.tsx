"use client";

import { OrdersProvider } from "@orderbook/core/providers";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <OrdersProvider>{children}</OrdersProvider>;
}
