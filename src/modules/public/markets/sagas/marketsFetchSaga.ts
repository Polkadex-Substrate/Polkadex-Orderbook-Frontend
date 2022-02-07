import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { marketsData, marketsError, MarketsFetch, setCurrentMarketIfUnset } from "../actions";
import { Market } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const tickersOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};
// TODO: remove mockData and update endpoint when we have a markets endpoint available
export function* marketsFetchSaga(action: MarketsFetch) {
  try {
    const payload = action.payload;
    const request =
      payload && payload.type ? `/public/markets?type=${payload.type}` : "/public/markets";

    const markets = mockData();
    yield put(marketsData(markets));
    yield put(setCurrentMarketIfUnset(markets[0]));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: marketsError,
        },
      })
    );
  }
}
const mockData = (): Market[] => [
  {
    id: "pdgsdx",
    name: "PDG/SDX",
    symbolArray: [0, 1],
    base_unit: "PolkaDoge",
    quote_unit: "ShibaDex",
    state: "hidden",
    amount_precision: 5,
    price_precision: 7,
    min_price: "0.0000001",
    max_price: "0",
    min_amount: "0.00001",
    tokenTickerName: "Agi",
  },
];
