import { call, put, select } from "redux-saga/effects";

import { sendError } from "../../../";
import { marketsData, marketsError, MarketsFetch, setCurrentMarketIfUnset } from "../actions";
import { Market, MarketQueryResult } from "..";
import { IPublicAsset, selectAllAssets } from "../../assets";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllMarkets } from "@polkadex/orderbook/graphql/queries";
import { POLKADEX_ASSET } from "@polkadex/web-constants";

export function* marketsFetchSaga(_action: MarketsFetch) {
  try {
    const allAssets: IPublicAsset[] = yield select(selectAllAssets);
    if (allAssets.length > 0) {
      const markets = yield call(fetchMarkets, allAssets);
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
const fetchMarkets = async (assets: IPublicAsset[]): Promise<Market[]> => {
  const res: any = await sendQueryToAppSync({ query: getAllMarkets });
  const pairs: MarketQueryResult[] = res.data.getAllMarkets.items;
  const markets = pairs.map(async (pair: MarketQueryResult): Promise<Market> => {
    const [baseAsset, quoteAsset] = pair.market.split("-");
    const [baseName, baseSymbol, baseAssetId] = findAsset(assets, baseAsset);
    const [quoteName, quoteSymbol, quoteAssetId] = findAsset(assets, quoteAsset);

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

const findAsset = (assets: IPublicAsset[], id: string) => {
  if (isAssetPDEX(id)) {
    const { name, symbol, assetId: asset_id } = POLKADEX_ASSET;
    return [name, symbol, asset_id];
  }
  const asset = assets.find(({ asset_id }) => asset_id === id);
  if (asset) return [asset.name, asset.symbol, asset.asset_id];
  else return ["", "", ""];
};
