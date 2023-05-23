import { useEffect, useMemo, useRef, useState } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";

import * as S from "./styles";
import { CurrentDataType } from "./types";

import { Spinner } from "@polkadex/orderbook-ui/molecules";
import { useKlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/useKlineProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const TradingView = ({ resolution, ranges }) => {
  const [data, setData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [currentData, setCurrentData] = useState<CurrentDataType>();
  const {
    data: klines,
    loading: isLoading,
    onHandleKlineFetch,
    onFetchKlineChannel,
  } = useKlineProvider();

  const { currentMarket } = useMarketsProvider();
  const settingsState = useSettingsProvider();
  const isDarkTheme = settingsState.theme === "dark";

  useEffect(() => {
    setData(
      klines.map((data) => {
        return {
          time: data.timestamp / 1000,
          open: data.open,
          close: data.close,
          high: data.high,
          low: data.low,
        };
      })
    );
    setVolumeData(
      klines.map((data) => {
        return {
          time: data.timestamp / 1000,
          value: data.volume,
        };
      })
    );
  }, [klines]);

  useEffect(() => {
    if (currentMarket?.m) {
      onHandleKlineFetch({
        market: currentMarket.m,
        resolution: resolution,
        from: ranges.startDate,
        to: ranges.endDate,
      });

      onFetchKlineChannel({ market: currentMarket.m, interval: resolution });
    }
  }, [currentMarket?.m, onFetchKlineChannel, onHandleKlineFetch, resolution, ranges]);

  const colors = useMemo(
    () => ({
      background: {
        type: ColorType.Solid,
        color: isDarkTheme ? "#2E303C" : "#EEF0F6",
      },
      textColor: isDarkTheme ? "white" : "#000000",
    }),
    [isDarkTheme]
  );

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      grid: {
        vertLines: { color: "transparent" },
        horzLines: { color: "transparent" },
      },
      width: chartContainerRef?.current?.clientWidth,
      height: 440,
    });

    chart.applyOptions({
      layout: { ...colors },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candleSeries.setData(data);

    candleSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0,
        bottom: 0.2,
      },
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "Trading View Polkadex",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    volumeSeries.setData(volumeData);

    chart.subscribeCrosshairMove((param) => {
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.y < 0) {
        console.log("Outside the chart");
      } else {
        const dateStr = param.time;
        const volumeData = param.seriesData.get(volumeSeries);
        const candleData = param.seriesData.get(candleSeries);
        const date = new Date(parseInt(dateStr.toString()) * 1000).toLocaleString();
        setCurrentData({
          timestamp: date,
          volume: volumeData.value,
          open: candleData.open,
          close: candleData.close,
          low: candleData.low,
          high: candleData.high,
        });
      }
    });

    chart.timeScale().fitContent();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, volumeData, colors]);

  return (
    <S.Wrapper ref={chartContainerRef}>
      <S.ToolTip>
        <span>Time: {currentData?.timestamp}</span>
        <span>Open: {currentData?.open}</span>
        <span>Close: {currentData?.close}</span>
        <span>High: {currentData?.high}</span>
        <span>Low: {currentData?.low}</span>
        <span>Volume: {currentData?.volume}</span>
      </S.ToolTip>
      <S.Container id="original-chart" />
      {isLoading && (
        <S.LoadingWrapper>
          <S.LoadingeMessage>
            <Spinner />
          </S.LoadingeMessage>
        </S.LoadingWrapper>
      )}
    </S.Wrapper>
  );
};
