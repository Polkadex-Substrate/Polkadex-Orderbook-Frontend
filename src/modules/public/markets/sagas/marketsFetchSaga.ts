import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";

import { sendError } from "../../../";
import { marketsData, marketsError, MarketsFetch, setCurrentMarketIfUnset } from "../actions";
import { Market, MarketQueryResult } from "..";
import { selectRangerApi, selectRangerIsReady } from "../../ranger";
import { isAssetPDEX } from "../../assets";

import { UNIT_BN } from "@polkadex/web-constants";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllMarkets } from "@polkadex/orderbook/graphql/queries";

export function* marketsFetchSaga(action: MarketsFetch) {
  try {
    const api = yield select(selectRangerApi);
    const isApi = yield select(selectRangerIsReady);
    if (isApi) {
      const markets = yield call(fetchMarkets, api);
      console.log("markets fetched", markets);
      yield put(marketsData(markets));
      yield put(setCurrentMarketIfUnset(markets[0]));
    }
  } catch (error) {
    console.log("error in fetch market", error);
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
const fetchMarkets = async (api: ApiPromise): Promise<Market[]> => {
  const res: any = await sendQueryToAppSync(getAllMarkets);
  const pairs: MarketQueryResult[] = res.data.getAllMarkets.items;

  const markets = pairs.map(async (pair: MarketQueryResult): Promise<Market> => {
    const [baseAsset, quoteAsset] = pair.market.split("-");
    const [baseName, baseSymbol, baseAssetId] = await fetchAssetData(api, baseAsset);
    const [quoteName, quoteSymbol, quoteAssetId] = await fetchAssetData(api, quoteAsset);

    return {
      id: pair.market,
      name: baseSymbol + "/" + quoteSymbol,
      m: pair.market,
      assetIdArray: [baseAssetId, quoteAssetId],
      base_ticker: baseSymbol,
      quote_ticker: quoteSymbol,
      base_unit: baseAsset,
      quote_unit: quoteAsset,
      base_precision: Number(pair.quote_asset_precision),
      quote_precision: Number(pair.quote_asset_precision),
      min_price: Number(pair.min_order_price),
      max_price: Number(pair.max_order_price),
      min_amount: Number(pair.min_order_qty),
      max_amount: Number(pair.max_order_qty),
      tokenTickerName: baseSymbol,
      price_tick_size: Number(pair.price_tick_size),
      qty_step_size: Number(pair.qty_step_size),
    };
  });
  return Promise.all(markets);
};

const fetchAssetData = async (api: ApiPromise, asset: string): Promise<string[]> => {
  if (isAssetPDEX(asset)) {
    return ["POLKADEX", "PDEX", "-1"];
  }
  const assetMetadata: any = await (await api.query.assets.metadata(asset)).toHuman();
  return [assetMetadata.name, assetMetadata.symbol, asset.toString()];
};
