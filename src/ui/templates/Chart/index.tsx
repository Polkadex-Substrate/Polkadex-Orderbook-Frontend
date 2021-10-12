import { useEffect, useRef } from "react";

import * as S from "./styles";
import useCustomChart from "./useCustomChart";
export const Chart = () => {
  // const CustomChartRef = useRef();
  // const {
  //   markets,
  //   currentMarket,
  //   tvWidget,
  //   colorTheme,
  //   setChart,
  //   datafeed,
  //   updateChart,
  //   chartRebuild,
  //   handleRebuildChart,
  //   kline,
  //   widgetParams,
  // } = useCustomChart(CustomChartRef);
  // useEffect(() => {
  //   if (currentMarket) {
  //     setChart(markets, currentMarket, colorTheme);
  //   }
  //   return () => {
  //     if (tvWidget) {
  //       try {
  //         tvWidget.remove();
  //       } catch (error) {
  //         console.log(`TradingChart unmount failed: ${error}`);
  //       }
  //     }
  //   };
  // }, []);
  // useEffect(() => {
  //   if (currentMarket && colorTheme) {
  //     setChart(markets, currentMarket, colorTheme);
  //   }
  //   if (!currentMarket || currentMarket.id) {
  //     if (currentMarket && currentMarket.id && tvWidget) {
  //       updateChart(currentMarket);
  //     } else {
  //       setChart(markets, currentMarket, colorTheme);
  //     }
  //   }
  //   if (kline) {
  //     datafeed.onRealtimeCallback(kline);
  //   }
  //   if (chartRebuild) {
  //     handleRebuildChart();
  //   }
  // }, [currentMarket, colorTheme]);
  // return (
  //   <S.Wrapper>
  //     <div id={widgetParams.containerId} className="pg-trading-chart" />
  //   </S.Wrapper>
  // );
};
