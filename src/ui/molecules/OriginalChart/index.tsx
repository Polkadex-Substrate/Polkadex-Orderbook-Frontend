import React, { useEffect, useRef } from "react";
import { dispose, init } from "klinecharts";
import useResizeObserver from "@react-hook/resize-observer";

import { options, tools } from "./options";
import * as S from "./styles";

import {
  Icon,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { useKlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/useKlineProvider";

export const getRamdom = (min = 3000, max = 5000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const OriginalChart = ({ chart, resolution }) => {
  const target = useRef(null);

  const settingsState = useSettingsProvider();

  const isDarkTheme = settingsState.theme === "dark";
  const { currentMarket } = useMarketsProvider();
  const {
    data: klines,
    interval: klineInterval,
    last: lastKline,
    loading: isLoading,
    onHandleKlineFetch,
    onFetchKlineChannel,
  } = useKlineProvider();
  // const klines = useReduxSelector(selectKline);
  // const klineInterval = useReduxSelector(selectKlineInterval);
  // const lastKline = useReduxSelector(selectLastKline);
  // const isLoading = useReduxSelector(selectKlineLoading);
  useEffect(() => {
    if (currentMarket?.m) {
      onHandleKlineFetch({
        market: currentMarket.m,
        resolution: resolution,
        from: new Date(new Date(new Date().setHours(new Date().getHours() - 24))),
        to: new Date(),
      });

      onFetchKlineChannel({ market: currentMarket.m, interval: resolution });
    }
  }, [currentMarket, onFetchKlineChannel, onHandleKlineFetch, resolution]);

  useEffect(() => {
    chart.current = init("original-chart", options(isDarkTheme));

    /**
     * @description Create sub technical indicator VOL
     *
     * @param {string | TechnicalIndicator } value KLineData array
     * @param {boolean} isStack - tells the chart if there are more historical data, it can be defaulted, the default is true
     * @param {PaneOptions} options
     */
    chart?.current?.createTechnicalIndicator("VOL", false, {
      id: "VOL",
    });

    /**
     * @description Add new data, this method will clear the chart data, no need to call the clearData method.
     *
     * @param {T.Props[]} dataList KLineData array
     * @param {boolean} more - tells the chart if there are more historical data, it can be defaulted, the default is true
     */
    chart?.current.applyNewData(klines);

    // Fill data
    return () => {
      dispose("original-chart");
    };
  }, [chart, klines, klineInterval, isDarkTheme]);

  useEffect(() => {
    /**
     * @description Add new kline data.
     *
     * @param {dataList} dataList KLineData array
     * @param {boolean} more - tells the chart if there are more historical data, it can be defaulted, the default is true
     */
    if (lastKline?.kline) {
      // console.log("lastkline", lastKline?.kline);
      chart.current.updateData(lastKline.kline);
    }
  }, [chart, lastKline]);

  useEffect(() => {
    chart.current.setStyleOptions(options(isDarkTheme));
  }, [isDarkTheme, chart]);

  useResizeObserver(target, () => chart?.current?.resize());

  return (
    <S.Wrapper ref={target}>
      <S.Tools>
        {tools.map(({ key, iconName, toolName }) => (
          <Tooltip key={key}>
            <TooltipHeader>
              <Icon
                name={iconName}
                stroke="text"
                size="large"
                onClick={() => chart.current.createShape(key)}
              />
            </TooltipHeader>
            <TooltipContent position="left" priority="high">
              <p style={{ whiteSpace: "nowrap" }}> {toolName}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipHeader>
            <Icon
              name="Trash"
              stroke="text"
              size="large"
              onClick={() => chart.current.removeShape()}
            />
          </TooltipHeader>
          <TooltipContent position="left" priority="high">
            <p style={{ whiteSpace: "nowrap" }}> Clear</p>
          </TooltipContent>
        </Tooltip>
      </S.Tools>
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
