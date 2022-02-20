// TODO: Fix change colorTheme & Mobile version

import * as React from "react";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import {
  IChartingLibraryWidget,
  LanguageCode,
} from "../../../../public/charting_library/charting_library.min";

import { CurrentKlineSubscription, dataFeedObject, print } from "./api";
import { widgetOptions, widgetParams } from "./config";
import { getTradingChartTimezone } from "./timezones";

import { stdTimezoneOffset, periodStringToMinutes } from "@polkadex/web-helpers";
import {
  KlineState,
  klineSubscribe,
  klineUnsubscribe,
  klineUpdatePeriod,
  klineUpdateTimeRange,
  Market,
  MarketsState,
  RootState,
  selectChartRebuildState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectKline,
  selectMarkets,
  selectCurrentMarketTickers,
} from "@polkadex/orderbook-modules";

interface ReduxProps {
  markets: Market[];
  colorTheme: string;
  chartRebuild: boolean;
  currentMarket?: Market;
  tickers: MarketsState["tickers"];
  kline: KlineState;
}

interface DispatchProps {
  subscribeKline: typeof klineSubscribe;
  unSubscribeKline: typeof klineUnsubscribe;
  klineUpdateTimeRange: typeof klineUpdateTimeRange;
  klineUpdatePeriod: typeof klineUpdatePeriod;
}

type Props = ReduxProps & DispatchProps;

const currentTimeOffset = new Date().getTimezoneOffset();
const clockPeriod = currentTimeOffset === stdTimezoneOffset(new Date()) ? "STD" : "DST";

export class TradingChartComponent extends React.PureComponent<Props> {
  public currentKlineSubscription: CurrentKlineSubscription = {};
  public tvWidget: IChartingLibraryWidget | null = null;

  private datafeed = dataFeedObject(this, this.props.markets);

  // eslint-disable-next-line react/no-deprecated
  public componentWillReceiveProps(next: Props) {
    if (next.currentMarket && next.colorTheme && next.colorTheme !== this.props.colorTheme) {
      this.setChart(next.markets, next.currentMarket, next.colorTheme);
    }

    if (
      next.currentMarket &&
      (!this.props.currentMarket || next.currentMarket.id !== this.props.currentMarket.id)
    ) {
      if (this.props.currentMarket && this.props.currentMarket.id && this.tvWidget) {
        this.updateChart(next.currentMarket);
      } else {
        this.setChart(next.markets, next.currentMarket, next.colorTheme);
      }
    }
    if (next.kline && next.kline !== this.props.kline) {
      this.datafeed.onRealtimeCallback(next.kline);
    }

    if (next.chartRebuild !== this.props.chartRebuild) {
      this.handleRebuildChart();
    }
  }

  public async componentDidMount() {
    const { colorTheme, currentMarket, markets } = this.props;

    if (currentMarket) {
      this.setChart(markets, currentMarket, colorTheme);
    }
  }

  public componentWillUnmount() {
    if (this.tvWidget) {
      try {
        this.tvWidget.remove();
      } catch (error) {
        window.console.log(`TradingChart unmount failed: ${error}`);
      }
    }
  }

  public render() {
    return (
      <div
        id={widgetParams.containerId}
        style={{
          background: "transparent",
          height: "100%",
          width: "100%",
        }}
        className="pg-trading-chart"
      />
    );
  }

  private setChart = async (markets: Market[], currentMarket: Market, colorTheme: string) => {
    const { kline } = this.props;

    const isMobileDevice = false;
    this.datafeed = dataFeedObject(this, markets);

    const { widget } = await import(
      "../../../../public/charting_library/charting_library.min"
    );

    const disabledFeatures = {
      disabled_features: isMobileDevice
        ? [
            "border_around_the_chart",
            "chart_property_page_background",
            "chart_property_page_scales",
            "chart_property_page_style",
            "chart_property_page_timezone_sessions",
            "chart_property_page_trading",
            "compare_symbol",
            "control_bar",
            "countdown",
            "create_volume_indicator_by_default",
            "display_market_status",
            "edit_buttons_in_legend",
            "go_to_date",
            "header_chart_type",
            "header_compare",
            "header_indicators",
            "header_saveload",
            "header_screenshot",
            "header_symbol_search",
            "header_undo_redo",
            "header_widget_dom_node",
            "hide_last_na_study_output",
            "hide_left_toolbar_by_default",
            "left_toolbar",
            "legend_context_menu",
            "main_series_scale_menu",
            "pane_context_menu",
            "show_chart_property_page",
            "study_dialog_search_control",
            "symbol_info",
            "timeframes_toolbar",
            "timezone_menu",
            "volume_force_overlay",
          ]
        : ["header_symbol_search", "use_localstorage_for_settings"],
    };

    const defaultWidgetOptions = {
      symbol: this.props.currentMarket.id,
      datafeed: this.datafeed,
      interval: widgetParams.interval,
      container_id: widgetParams.containerId,
      locale: "en" as LanguageCode,
      timezone: getTradingChartTimezone(currentTimeOffset, clockPeriod),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line new-cap
    this.tvWidget = new widget({
      ...defaultWidgetOptions,
      ...widgetOptions(colorTheme),
      ...disabledFeatures,
    });

    if (this.props.kline.period) {
      widgetParams.interval = String(periodStringToMinutes(this.props.kline.period));
    }

    let previousRange = { from: 0, to: 0 };
    if (kline.range.from !== 0 && kline.range.to !== 0) {
      previousRange = this.props.kline.range;
    }

    let previousResolution = "";
    if (kline.period) {
      previousResolution = kline.period;
    }

    this.tvWidget.onChartReady(() => {
      this.tvWidget!.activeChart().setSymbol(currentMarket.id, () => {
        print("Symbol set", currentMarket.id);
      });

      if (previousRange.from !== 0 && previousRange.to !== 0) {
        this.tvWidget!.activeChart().setVisibleRange(previousRange);
      }

      if (previousResolution) {
        this.tvWidget!.activeChart().setResolution(
          String(periodStringToMinutes(previousResolution)),
          () => {
            print("Resolution set", previousResolution);
          }
        );
      }
    });
  };

  private updateChart = (currentMarket: Market) => {
    if (this.tvWidget) {
      let symbolSet = false;
      const UPDATE_TIMEOUT = 3000;

      const callUpdateChart = () => {
        return new Promise((resolve, reject) => {
          this.tvWidget.onChartReady(() => {
            this.tvWidget!.activeChart().setSymbol(currentMarket.id, () => {
              symbolSet = true;
              resolve("Symbol set");
            });
          });

          setTimeout(() => {
            resolve("Symbol failed to set");
          }, UPDATE_TIMEOUT);
        });
      };

      callUpdateChart().then((res) => {
        print(res, currentMarket.id);

        if (!symbolSet) {
          print("Rebuild chart", currentMarket.id);
          this.handleRebuildChart(currentMarket);
        }
      });
    }
  };

  private handleRebuildChart = (nextMarket?: Market) => {
    const { colorTheme, currentMarket, markets } = this.props;

    if (this.tvWidget && currentMarket) {
      try {
        this.tvWidget.remove();
      } catch (error) {
        window.console.log(`TradingChart unmount failed (Rebuild chart): ${error}`);
      }

      this.setChart(markets, nextMarket || currentMarket, colorTheme);
    }
  };
}

const reduxProps: MapStateToProps<ReduxProps, Record<string, unknown>, RootState> = (
  state
) => ({
  markets: selectMarkets(state),
  colorTheme: selectCurrentColorTheme(state),
  chartRebuild: selectChartRebuildState(state),
  currentMarket: selectCurrentMarket(state),
  tickers: selectCurrentMarketTickers(state),
  kline: selectKline(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, Record<string, unknown>> = (
  dispatch
) => ({
  klineUpdateTimeRange: (payload) => dispatch(klineUpdateTimeRange(payload)),
  subscribeKline: (payload) => dispatch(klineSubscribe(payload)),
  unSubscribeKline: (payload) => dispatch(klineUnsubscribe(payload)),
  klineUpdatePeriod: (payload) => dispatch(klineUpdatePeriod(payload)),
});

export const TradingChart = connect<
  ReduxProps,
  DispatchProps,
  Record<string, unknown>,
  RootState
>(
  reduxProps,
  mapDispatchProps
)(TradingChartComponent);
