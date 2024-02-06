// TODO: Replace expand and screenshot button style

"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import { Tabs } from "@polkadex/ux";

import { Header } from "./header";
import { useTradingView } from "./useTradingView";

const TVChartContainer = dynamic(
  () => import("./tradingView").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

export const Graph = ({ id }: { id: string }) => {
  const {
    activeResolution,
    onChangeResolution,
    tvWidget,
    widgetOptions,
    onChartReady,
    isChartReady,
    onChangeFullScreen,
    onScreenshot,
  } = useTradingView({ id });

  return (
    <>
      <Script src="/datafeeds/udf/dist/bundle.js" strategy="lazyOnload" />
      <Tabs defaultValue="tradingView" className="flex flex-1">
        <div className="flex flex-1 flex-col">
          <Header
            activeResolution={activeResolution}
            onChangeResolution={onChangeResolution}
            onChangeFullScreen={onChangeFullScreen}
            onScreenshot={onScreenshot}
          />
          <Tabs.Content value="tradingView">
            <div className="flex flex-1 h-full">
              <TVChartContainer
                tvWidget={tvWidget}
                widgetOptions={widgetOptions}
                isChartReady={isChartReady}
                onChartReady={onChartReady}
                id={id}
              />
            </div>
          </Tabs.Content>
        </div>
      </Tabs>
    </>
  );
};
