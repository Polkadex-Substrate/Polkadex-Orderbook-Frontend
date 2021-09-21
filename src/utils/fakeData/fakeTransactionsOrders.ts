const fakeTransactionsOrders = [
  {
    id: 1,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "sell",
    price: 0.00798219,
    fee: 0.000129,
    total: 0.001434442,
    status: true
  },
  {
    id: 2,
    date: new Date("2020-01-01"),
    pair: "DOT",
    coin: "BTC",
    side: "buy",
    price: 0.013567863,
    fee: 0.000340,
    total: 0.002579643,
    status: false
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
    status: false
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
    status: true
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
    status: true
  },
]


const initialState = {
  "id": 1,
  "name": "Bitcoin",
  "symbol": "BTC",
  "slug": "bitcoin",
  "num_market_pairs": 9191,
  "date_added": "2013-04-28T00:00:00.000Z",
  "tags": [
    "mineable",
    "pow",
    "sha-256",
    "store-of-value",
    "state-channels"
  ],
  "max_supply": 21000000,
  "circulating_supply": 18530387,
  "total_supply": 18530387,
  "platform": null,
  "cmc_rank": 1,
  "last_updated": "2020-10-31T11:50:02.000Z",
  "quote": {
    "USD": {
      "price": 13882.426203037483,
      "volume_24h": 32714795587.32121,
      "percent_change_1h": 0.83355575,
      "percent_change_24h": 4.71387887,
      "percent_change_7d": 6.98381798,
      "market_cap": 257246730041.22513,
      "last_updated": "2020-10-31T11:50:02.000Z"
    }
  }
}
const testPairs = [
  {
    id: 1,
    name: "BTC"
  },
  {
    id: 2,
    name: "USDT"
  },
  {
    id: 3,
    name: "DOT"
  },
  {
    id: 4,
    name: "ETH"
  },
]
export { fakeTransactionsOrders, initialState, testPairs}
