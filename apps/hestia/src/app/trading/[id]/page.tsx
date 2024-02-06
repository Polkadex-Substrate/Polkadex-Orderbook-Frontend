"use client";
// import type { Metadata } from "next";

import dynamic from "next/dynamic";
const Template = dynamic(
  () => import("@/components/trading/template").then((mod) => mod.Template),
  {
    ssr: false,
  }
);
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const id = params.id;
//   // const test = await appsyncOrderbookService.init();
//   // console.log(test, appsyncOrderbookService.isReady());

//   // const ticker = await appsyncOrderbookService.query.getTicker(id);
//   const title = ` ${id} | Polkadex Orderbook`;
//   return { title };
// }
export default function Page({ params }: { params: { id: string } }) {
  return <Template id={params.id} />;
}
