import { RecentTradesData } from "@polkadex/orderbook/modules/public/recentTrades/actions";
import { getIsDecreasingArray } from "@polkadex/web-helpers";
import { RecentTradesPush } from "./actions";
import { recentTradesReducer } from "./reducer";

const stateData = {
  list: [],
  loading: false,
};
const actionData: RecentTradesData[] = [
  {
    type: "recentTrades/DATA",
    payload: [
      {
        amount: "0.25",
        market_id: "PDEX-1",
        price: "12",
        timestamp: 1678452252277,
      },
      {
        amount: "0.25",
        market_id: "PDEX-1",
        price: "12",
        timestamp: 1678452609042,
      },
      {
        amount: "1",
        market_id: "PDEX-1",
        price: "10",
        timestamp: 1678452307235,
      },
    ],
  },
];
test("RECENT_TRADES_DATA", () => {
  expect(recentTradesReducer(stateData, actionData[0])).toStrictEqual({
    currentTrade: {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452609042,
    },
    lastTrade: { amount: "1", market_id: "PDEX-1", price: "10", timestamp: 1678452307235 },
    list: [
      {
        amount: "0.25",
        market_id: "PDEX-1",
        price: "12",
        timestamp: 1678452609042,
      },
      {
        amount: "1",
        market_id: "PDEX-1",
        price: "10",
        timestamp: 1678452307235,
      },
      {
        amount: "0.25",
        market_id: "PDEX-1",
        price: "12",
        timestamp: 1678452252277,
      },
    ],
    loading: false,
  });
});

const statePush = {
  list: [
    {
      amount: "1",
      market_id: "PDEX-1",
      price: "10",
      timestamp: 1678452123291,
    },
    {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452609042,
    },
    {
      amount: "1",
      market_id: "PDEX-1",
      price: "10",
      timestamp: 1678452307235,
    },
    {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452252277,
    },
  ],
  loading: false,
};
const actionPush: RecentTradesPush = {
  type: "recentTrades/PUSH",
  payload: {
    amount: "12",
    market_id: "PDEX-1",
    price: "13",
    timestamp: 1678452123299,
  },
};
test("RECENT_TRADES_PUSH", () => {
  expect(recentTradesReducer(statePush, actionPush)).toStrictEqual({
    list: [
      {
        amount: "12",
        market_id: "PDEX-1",
        price: "13",
        timestamp: 1678452123299,
      },
      {
        amount: "1",
        market_id: "PDEX-1",
        price: "10",
        timestamp: 1678452123291,
      },
      {
        amount: "0.25",
        market_id: "PDEX-1",
        price: "12",
        timestamp: 1678452609042,
      },
      {
        amount: "1",
        market_id: "PDEX-1",
        price: "10",
        timestamp: 1678452307235,
      },
      {
        amount: "0.25",
        market_id: "PDEX-1",
        price: "12",
        timestamp: 1678452252277,
      },
    ],
    loading: false,
  });
});
