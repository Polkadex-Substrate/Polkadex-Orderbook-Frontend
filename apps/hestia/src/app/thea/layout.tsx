"use client";

import { TheaProvider } from "@orderbook/core/providers";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <TheaProvider>{children}</TheaProvider>;
}
