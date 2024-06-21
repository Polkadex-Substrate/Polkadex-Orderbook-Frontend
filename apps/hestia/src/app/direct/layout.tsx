"use client";

import { DirectDepositProvider } from "@orderbook/core/providers";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <DirectDepositProvider>{children}</DirectDepositProvider>;
}
