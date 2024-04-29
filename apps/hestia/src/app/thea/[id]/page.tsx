"use client";
// import type { Metadata } from "next";

import dynamic from "next/dynamic";
const Template = dynamic(
  () => import("@/components/thea/template").then((mod) => mod.Template),
  {
    ssr: false,
  }
);

export default function Page({ params }: { params: { id: string } }) {
  return <Template id={params.id} />;
}
