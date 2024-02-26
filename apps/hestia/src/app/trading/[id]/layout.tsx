"use client";

import { ReactNode } from "react";

import { SizeProvider } from "@/components/trading/provider";

export default function Layout({ children }: { children: ReactNode }) {
  return <SizeProvider>{children}</SizeProvider>;
}
