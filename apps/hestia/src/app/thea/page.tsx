"use client";

import dynamic from "next/dynamic";
import { RedirectType, permanentRedirect } from "next/navigation";

import { defaultConfig } from "@/config";
const { defaultTheaSourceChain, defaultTheaDestinationChain } = defaultConfig;
const Template = dynamic(
  () => import("@/components/thea/template").then((mod) => mod.Template),
  {
    ssr: false,
  }
);

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const hasParams = !!Object.keys(searchParams ?? {}).length;
  if (!hasParams)
    permanentRedirect(
      `/thea?from=${defaultTheaSourceChain}&to=${defaultTheaDestinationChain}`,
      "push" as RedirectType
    );

  return <Template />;
}
