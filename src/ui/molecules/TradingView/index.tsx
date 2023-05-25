import { useEffect, useRef } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";

import {
  ChartingLibraryWidgetOptions,
  DatafeedConfiguration,
  LanguageCode,
  LibrarySymbolInfo,
  ResolutionString,
  widget,
} from "../../../../public/static/charting_library";

// import datafeed from "./datafeed";
import * as S from "./styles";
import { makeApiRequest, generateSymbol, parseFullSymbol } from "./helpers";

import { useKlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/useKlineProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

// import { Spinner } from "@polkadex/orderbook-ui/molecules";
// import { useKlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/useKlineProvider";
// import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
// import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

// export const TradingView = ({ resolution, ranges }) => {
//   const [data, setData] = useState([]);
//   const [volumeData, setVolumeData] = useState([]);
//   const [currentData, setCurrentData] = useState<CurrentDataType>();
//   const {
//     data: klines,
//     loading: isLoading,
//     onHandleKlineFetch,
//     onFetchKlineChannel,
//   } = useKlineProvider();

//   const { currentMarket } = useMarketsProvider();
//   const settingsState = useSettingsProvider();
//   const isDarkTheme = settingsState.theme === "dark";

//   useEffect(() => {
//     setData(
//       klines.map((data) => {
//         return {
//           time: data.timestamp / 1000,
//           open: data.open,
//           close: data.close,
//           high: data.high,
//           low: data.low,
//         };
//       })
//     );
//     setVolumeData(
//       klines.map((data) => {
//         return {
//           time: data.timestamp / 1000,
//           value: data.volume,
//         };
//       })
//     );
//   }, [klines]);

//   useEffect(() => {
//     if (currentMarket?.m) {
//       onHandleKlineFetch({
//         market: currentMarket.m,
//         resolution: resolution,
//         from: ranges.startDate,
//         to: ranges.endDate,
//       });

//       onFetchKlineChannel({ market: currentMarket.m, interval: resolution });
//     }
//   }, [currentMarket?.m, onFetchKlineChannel, onHandleKlineFetch, resolution, ranges]);

//   const colors = useMemo(
//     () => ({
//       background: {
//         type: ColorType.Solid,
//         color: isDarkTheme ? "#2E303C" : "#EEF0F6",
//       },
//       textColor: isDarkTheme ? "white" : "#000000",
//     }),
//     [isDarkTheme]
//   );

//   const chartContainerRef =
//     useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

//   useEffect(() => {
//     const handleResize = () => {
//       chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
//     };

//     const chart = createChart(chartContainerRef.current, {
//       grid: {
//         vertLines: { color: "transparent" },
//         horzLines: { color: "transparent" },
//       },
//       width: chartContainerRef?.current?.clientWidth,
//       height: 440,
//     });

//     chart.applyOptions({
//       layout: { ...colors },
//       crosshair: {
//         mode: CrosshairMode.Normal,
//       },
//     });

//     const candleSeries = chart.addCandlestickSeries({
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });
//     candleSeries.setData(data);

//     candleSeries.priceScale().applyOptions({
//       scaleMargins: {
//         top: 0,
//         bottom: 0.2,
//       },
//     });

//     const volumeSeries = chart.addHistogramSeries({
//       color: "#26a69a",
//       priceFormat: {
//         type: "volume",
//       },
//       priceScaleId: "Trading View Polkadex",
//     });

//     volumeSeries.priceScale().applyOptions({
//       scaleMargins: {
//         top: 0.8,
//         bottom: 0,
//       },
//     });

//     volumeSeries.setData(volumeData);

//     chart.subscribeCrosshairMove((param) => {
//       if (param.point === undefined || !param.time || param.point.x < 0 || param.point.y < 0) {
//         console.log("Outside the chart");
//       } else {
//         const dateStr = param.time;
//         const volumeData = param.seriesData.get(volumeSeries);
//         const candleData = param.seriesData.get(candleSeries);
//         const date = new Date(parseInt(dateStr.toString()) * 1000).toLocaleString();
//         setCurrentData({
//           timestamp: date,
//           volume: volumeData.value,
//           open: candleData.open,
//           close: candleData.close,
//           low: candleData.low,
//           high: candleData.high,
//         });
//       }
//     });

//     chart.timeScale().fitContent();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);

//       chart.remove();
//     };
//   }, [data, volumeData, colors]);

//   return (
//     <S.Wrapper ref={chartContainerRef}>
//       <S.ToolTip>
//         <span>Time: {currentData?.timestamp}</span>
//         <span>Open: {currentData?.open}</span>
//         <span>Close: {currentData?.close}</span>
//         <span>High: {currentData?.high}</span>
//         <span>Low: {currentData?.low}</span>
//         <span>Volume: {currentData?.volume}</span>
//       </S.ToolTip>
//       <S.Container id="original-chart" />
//       {isLoading && (
//         <S.LoadingWrapper>
//           <S.LoadingeMessage>
//             <Spinner />
//           </S.LoadingeMessage>
//         </S.LoadingWrapper>
//       )}
//     </S.Wrapper>
//   );
// };
// import { subscribeOnStream, unsubscribeFromStream } from "./streaming";

const lastBarsCache = new Map();

// DatafeedConfiguration implementation
const configurationData: DatafeedConfiguration = {
  // Represents the resolutions for bars supported by your datafeed
  // supported_resolutions: ["1D", "1W", "1M"],

  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    // {
    //   value: "Bitfinex",
    //   name: "Bitfinex",
    //   desc: "Bitfinex",
    // },
    // {
    //   value: "Kraken",
    //   // Filter name
    //   name: "Kraken",
    //   // Full exchange name displayed in the filter popup
    //   desc: "Kraken bitcoin exchange",
    // },
    {
      value: "Polkadex",
      name: "Polkadex",
      desc: "Polkadex",
    },
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [
    {
      name: "crypto",
      value: "crypto",
    },
  ],
};

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
  // const data = await makeApiRequest("data/v3/all/exchanges");
  const allSymbols = [
    {
      description: "PDEX/CUSDT",
      exchange: "Polkadex",
      full_name: "Polkadex:PDEX/CUSDT",
      symbol: "PDEX/CUSDT",
      type: "crypto",
    },
  ];

  // for (const exchange of configurationData.exchanges) {
  //   const pairs = data.Data[exchange.value].pairs;

  //   for (const leftPairPart of Object.keys(pairs)) {
  //     const symbols = pairs[leftPairPart].map((rightPairPart) => {
  //       const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
  //       return {
  //         symbol: symbol.short,
  //         full_name: symbol.full,
  //         description: symbol.short,
  //         exchange: exchange.value,
  //         type: "crypto",
  //       };
  //     });
  //     allSymbols = [...allSymbols, ...symbols];
  //   }
  // }
  console.log(allSymbols, "all symbols");
  return allSymbols;
}

export const TradingView = () => {
  const {
    data: klines,
    interval: klineInterval,
    last: lastKline,
    loading: isLoading,
    onHandleKlineFetch,
    onFetchKlineChannel,
  } = useKlineProvider();
  const { currentMarket } = useMarketsProvider();

  console.log(klines, "klines prov");

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      datafeed: {
        onReady(callback) {
          console.log("[onReady]: Method call");
          setTimeout(() => callback(configurationData));
        },
        async searchSymbols(userInput, exchange, symbolType, onResult) {
          console.log("[searchSymbols]: Method call");
          const symbols = await getAllSymbols();
          const newSymbols = symbols.filter((symbol) => {
            const isExchangeValid = exchange === "" || symbol.exchange === exchange;
            const isFullSymbolContainsInput =
              symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
            return isExchangeValid && isFullSymbolContainsInput;
          });
          onResult(newSymbols);
        },
        async resolveSymbol(symbolName, onResolve, onError, extension) {
          console.log("[resolveSymbol]: Method call", symbolName);
          const symbols = await getAllSymbols();
          const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
          if (!symbolItem) {
            console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
            onError("cannot resolve symbol");
            return;
          }
          // Symbol information object
          const symbolInfo: LibrarySymbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: "24x7",
            timezone: "Etc/UTC",
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: false,
            has_no_volume: true,
            has_weekly_and_monthly: false,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: "streaming",
          };

          console.log("[resolveSymbol]: Symbol resolved", symbolName);
          onResolve(symbolInfo);
        },
        getBars(symbolInfo, resolution, periodParams, onResult, onError) {
          const { from, to, firstDataRequest } = periodParams;
          console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
          // const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
          // const urlParameters = {
          //   e: parsedSymbol.exchange,
          //   fsym: parsedSymbol.fromSymbol,
          //   tsym: parsedSymbol.toSymbol,
          //   toTs: to,
          //   limit: 2000,
          // };
          // const query = Object.keys(urlParameters)
          //   .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
          //   .join("&");
          try {
            // const data = await makeApiRequest(`data/histoday?${query}`);

            onHandleKlineFetch({
              market: currentMarket.m,
              resolution: resolution,
              from: new Date(from * 1000),
              to: new Date(to * 1000),
            });

            if (klines.length === 0) {
              // "noData" should be set if there is no data in the requested period
              onResult([], {
                noData: true,
              });
              return;
            }
            console.log(
              {
                market: currentMarket.m,
                resolution: resolution,
                from: new Date(from * 1000),
                to: new Date(to * 1000),
              },
              "sample data"
            );

            const bars = klines.map((bar) => {
              // if (bar.timestamp >= from && bar.timestamp < to) {
              return {
                time: bar.timestamp,
                low: bar.low,
                high: bar.high,
                open: bar.open,
                close: bar.close,
                volume: bar.volume,
              };
              // }
            });
            if (firstDataRequest) {
              lastBarsCache.set(symbolInfo.full_name, {
                ...bars[bars.length - 1],
              });
            }
            if (bars.length < 1) {
              onResult([], { noData: true });
            } else {
              onResult(bars, { noData: false });
            }
            console.log(`[getBars]: returned ${bars.length} bar(s)`);
          } catch (error) {
            console.log("[getBars]: Get error", error);
            onError(error);
          }
        },
        // subscribeBars(
        //   symbolInfo,
        //   resolution,
        //   onTick,
        //   listenerGuid,
        //   onResetCacheNeededCallback
        // ) {
        //   console.log("[subscribeBars]: Method call with subscriberUID:", listenerGuid);
        // },
        // unsubscribeBars(listenerGuid) {
        //   console.log("[unsubscribeBars]: Method call with subscriberUID:", listenerGuid);
        // },
      },

      theme: "Dark",
      interval: "1D" as ResolutionString,
      library_path: "/static/charting_library/",
      locale: "en",
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      additional_symbol_info_fields: [{ title: "Bitcoin", propertyName: "BTC" }],
      container: chartContainerRef.current,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],

      symbol: "Polkadex:PDEX/CUSDT", // Default symbol
    };

    console.log(widgetOptions, "widgetOptions");

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [currentMarket.m, onHandleKlineFetch, klines]);

  return <S.Wrapper ref={chartContainerRef}></S.Wrapper>;
};
