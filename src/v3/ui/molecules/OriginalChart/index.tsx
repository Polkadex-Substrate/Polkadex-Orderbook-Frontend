import React, { useEffect } from "react";
import { init, dispose } from "klinecharts";

import { options } from "./options";
import * as S from "./styles";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentDarkTheme } from "@polkadex/orderbook-modules";

const OriginalChart = ({ chart }) => {
  const isDarkTheme = useReduxSelector(selectCurrentDarkTheme);
  // Generate Ramdom numbers
  const getRamdom = (min = 3000, max = 5000) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    chart.current = init("original-chart", options());

    /**
     * @description Create sub technical indicator VOL
     *
     * @param {string | TechnicalIndicator } value KLineData array
     * @param {boolean} isStack - tells the chart if there are more historical data, it can be defaulted, the default is true
     * @param {PaneOptions} options
     */
    chart.current.createTechnicalIndicator({ name: "VOL" }, false);

    /**
     * @description Add new data, this method will clear the chart data, no need to call the clearData method.
     *
     * @param {T.Props[]} dataList KLineData array
     * @param {boolean} more - tells the chart if there are more historical data, it can be defaulted, the default is true
     */
    chart?.current.applyNewData([
      {
        close: getRamdom(),
        high: getRamdom(),
        low: getRamdom(),
        open: getRamdom(),
        timestamp: new Date().getTime(),
        volume: getRamdom(),
      },
    ]);

    // Fill data
    return () => {
      dispose("original-chart");
    };
  }, [chart]);

  useEffect(() => {
    const clearData = setInterval(() => {
      /**
       * @description Add more historical data.
       *
       * @param {dataList} dataList KLineData array
       * @param {boolean} more - tells the chart if there are more historical data, it can be defaulted, the default is true
       */
      chart.current.updateData({
        close: getRamdom(),
        high: getRamdom(),
        low: getRamdom(),
        open: getRamdom(),
        timestamp: new Date().getTime(),
        volume: getRamdom(10, 100),
      });
    }, 1000);
    return () => {
      process.browser && window.clearTimeout(clearData);
    };
  }, [chart]);

  useEffect(() => {
    chart.current.setStyleOptions(options(isDarkTheme));
  }, [isDarkTheme, chart]);

  return <S.Wrapper id="original-chart" />;
};

export default OriginalChart;
