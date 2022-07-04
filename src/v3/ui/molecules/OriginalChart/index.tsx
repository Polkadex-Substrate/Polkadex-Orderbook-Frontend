import React, { useEffect, useMemo, useRef } from "react";
import { init, dispose } from "klinecharts";
import { useDispatch } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";

import { tools, options } from "./options";
import * as S from "./styles";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  klineFetch,
  klineSubscribe,
  selectCurrentDarkTheme,
  selectCurrentMarket,
  selectKline,
  selectLastKline,
  selectKlineLoading,
  KlineEvent,
} from "@polkadex/orderbook-modules";
import {
  Icon,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { fillKlineMissingData } from "@polkadex/orderbook/helpers/fillKlineMissingData";

export const getRamdom = (min = 3000, max = 5000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const OriginalChart = ({ chart, resolution }) => {
  const dispatch = useDispatch();
  const target = useRef(null);

  const isDarkTheme = useReduxSelector(selectCurrentDarkTheme);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const klines = useReduxSelector(selectKline);
  const lastKline = useReduxSelector(selectLastKline);
  const isLoading = useReduxSelector(selectKlineLoading);
  const klinesFilled = useMemo(() => {
    return fillKlineMissingData(klines, getResolutionInMilliSeconds(resolution));
  }, [klines, resolution]);
  console.log("klinesFilled", klinesFilled);
  useEffect(() => {
    if (currentMarket?.m) {
      dispatch(
        klineFetch({
          market: currentMarket.m,
          resolution: resolution,
          from: new Date(27588600),
          to: getTimeFromResolution(resolution, new Date()),
        })
      );
      dispatch(klineSubscribe({ market: currentMarket.m, interval: resolution }));
    }
  }, [currentMarket, dispatch, resolution]);

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
    chart?.current.applyNewData(klinesFilled);

    // Fill data
    return () => {
      dispose("original-chart");
    };
  }, [chart, klines, isDarkTheme]);

  useEffect(() => {
    /**
     * @description Add more historical data.
     *
     * @param {dataList} dataList KLineData array
     * @param {boolean} more - tells the chart if there are more historical data, it can be defaulted, the default is true
     */
    if (lastKline?.kline) chart.current.updateData(lastKline.kline);
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
              size="medium"
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

const getTimeFromResolution = (resolution: string, date: Date) => {
  const resolutionMilliSeconds = getResolutionInMilliSeconds(resolution);
  const bucketTime = Math.floor(date.getTime() / resolutionMilliSeconds);
  const date_ = new Date(bucketTime * resolutionMilliSeconds);
  return date_;
};

const getResolutionInMilliSeconds = (resolution: string): number => {
  switch (resolution) {
    case "1m":
      return 60000;
    case "5m":
      return 300000;
    case "15m":
      return 900000;
    case "30m":
      return 1800000;
    case "1h":
      return 3600000;
    case "2h":
      return 7200000;
    case "4h":
      return 14400000;
    case "1d":
      return 86400000;
    case "1w":
      return 604800000;
    default:
      return 1;
  }
};
export default OriginalChart;
