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

export const OriginalChart = ({ chart, resolution }) => {
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
     * @description Add new kline data.
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
  const msPerMin = 60000;
  switch (resolution) {
    case "1m":
      return msPerMin;
    case "5m":
      return msPerMin * 5;
    case "15m":
      return msPerMin * 15;
    case "30m":
      return msPerMin * 30;
    case "1h":
    case "1H":
      return msPerMin * 60;
    case "2h":
    case "2H":
      return msPerMin * 2 * 60;
    case "6h":
    case "6H":
      return msPerMin * 6 * 60;
    case "1d":
    case "1D":
      return msPerMin * 24 * 60;
    case "1w":
    case "1W":
      return msPerMin * 7 * 24 * 60;
    default:
      return 1;
  }
};
