import { validatePriceStep } from "@polkadex/orderbook/helpers/filterPrice";
import {
  MarketsAction,
  marketsReducer,
  MarketsState,
} from "@polkadex/orderbook/providers/public/marketsProvider";

interface testCases {
  state: MarketsState;
  action: MarketsAction;
  output: MarketsState;
}

const cases: testCases[] = [
  {
    state: {
      list: [],
      filters: {},
      tickersTimestamp: 0,
      timestamp: 0,
      currentMarket: undefined,
      currentTicker: undefined,
      tickers: [],
      tickerLoading: false,
      loading: false,
      marketPrice: "0",
    },
    action: { type: "markets/FETCH" },
    output: {
      list: [],
      filters: {},
      tickersTimestamp: 0,
      timestamp: Math.floor(Date.now() / 1000),
      currentMarket: undefined,
      currentTicker: undefined,
      tickers: [],
      tickerLoading: false,
      loading: true,
      marketPrice: "0",
    },
  },

  {
    state: {
      list: [],
      filters: {},
      tickersTimestamp: 0,
      timestamp: 0,
      currentMarket: undefined,
      currentTicker: undefined,
      tickers: [],
      tickerLoading: false,
      loading: false,
      marketPrice: "0",
    },
    action: {
      type: "markets/DATA",
      payload: [
        {
          id: "PDEX-1",
          name: "PDEX/TDOT",
          m: "PDEX-1",
          assetIdArray: ["PDEX", "1"],
          base_ticker: "PDEX",
          quote_ticker: "TDOT",
          base_unit: "PDEX",
          quote_unit: "1",
          base_precision: 8,
          quote_precision: 8,
          min_price: 0.0001,
          max_price: 10000,
          min_amount: 0.001,
          max_amount: 10000,
          tokenTickerName: "PDEX",
          price_tick_size: 0.000001,
          qty_step_size: 0.001,
        },
      ],
    },
    output: {
      currentMarket: undefined,
      currentTicker: undefined,
      filters: { "PDEX-1": [] },
      list: [
        {
          assetIdArray: ["PDEX", "1"],
          base_precision: 8,
          base_ticker: "PDEX",
          base_unit: "PDEX",
          id: "PDEX-1",
          m: "PDEX-1",
          max_amount: 10000,
          max_price: 10000,
          min_amount: 0.001,
          min_price: 0.0001,

          name: "PDEX/TDOT",
          price_tick_size: 0.000001,
          qty_step_size: 0.001,
          quote_precision: 8,

          quote_ticker: "TDOT",
          quote_unit: "1",
          tokenTickerName: "PDEX",
        },
      ],
      loading: false,
      marketPrice: "0",
      tickers: [],

      tickersTimestamp: 0,
      timestamp: 0,

      tickerLoading: false,
    },
  },
];

test.each(cases)("markets reducer", ({ state, action, output }) => {
  expect(marketsReducer(state, action)).toStrictEqual(output);
});
