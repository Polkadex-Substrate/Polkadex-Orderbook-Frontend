import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";
import axios from "axios";

function parseData(parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
}

const parseDate = timeParse("%Y-%m-%d");

export const coinMarketCapInstance = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  headers: {
    "X-CMC_PRO_API_KEY": "7c817121-6529-46a4-8bda-098b5d574c82",
  },
});

export function fakeGetGraphData() {
  const promiseMSFT = fetch(
    "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
  )
    .then((response) => response.text())
    .then((data) => tsvParse(data, parseData(parseDate)));
  return promiseMSFT;
}

export const fakeOrderBook = [
  {
    id: 1,
    date: new Date("2020-02-02"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.007982,
    amount: 0.001434,
    total: 0.895782,
  },
  {
    id: 2,
    date: new Date("2020-03-03"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.013567,
    amount: 0.002579,
    total: 0.187532,
  },
  {
    id: 3,
    date: new Date("2020-04-04"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.005422,
    amount: 0.001343,
    total: 0.054256,
  },
  {
    id: 4,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.0021345,
    amount: 0.0064678,
    total: 1.65568,
  },
  {
    id: 5,
    date: new Date("2020-05-05"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.0157535,
    amount: 0.0267642,
    total: 2.62844,
  },
  {
    id: 3,
    date: new Date("2020-06-06"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.005422,
    amount: 0.001343,
    total: 0.054256,
  },
  {
    id: 3,
    date: new Date("2020-07-07"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.005422,
    amount: 0.001343,
    total: 0.054256,
  },
  {
    id: 3,
    date: new Date("2020-08-08"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.005422,
    amount: 0.001343,
    total: 0.054256,
  },
  {
    id: 3,
    date: new Date("2020-09-09"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.005422,
    amount: 0.001343,
    total: 0.054256,
  },
  {
    id: 4,
    date: new Date("2020-10-10"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.0021345,
    amount: 0.0064678,
    total: 1.65568,
  },
  {
    id: 5,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.0157535,
    amount: 0.0267642,
    total: 2.62844,
  },
];

export const fakeTransactionsOrders = [
  {
    id: 1,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.00798219,
    fee: 0.000129,
    total: 0.001434442,
    status: true,
  },
  {
    id: 2,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.013567863,
    fee: 0.00034,
    total: 0.002579643,
    status: false,
  },
  {
    id: 3,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.00542224,
    fee: 0.0000202,
    total: 0.001343441,
    status: false,
  },
  {
    id: 4,
    date: new Date("2020-01-01"),
    pair: "BTC",
    coin: "DOT",
    side: "buy",
    price: 0.002134564,
    fee: 0.000143,
    total: 0.006467852,
    status: true,
  },
  {
    id: 5,
    date: new Date("2020-01-01"),
    pair: "BTC",
    coin: "DOGE",
    side: "buy",
    price: 0.015753518,
    fee: 0.000521,
    total: 0.026764236,
    status: true,
  },
];
