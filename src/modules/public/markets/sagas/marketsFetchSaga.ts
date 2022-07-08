import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";

import { sendError } from "../../../";
import { marketsData, marketsError, MarketsFetch, setCurrentMarketIfUnset } from "../actions";
import { Market } from "..";
import { selectRangerApi, selectRangerIsReady } from "../../ranger";

import { UNIT_BN } from "@polkadex/web-constants";

export function* marketsFetchSaga(action: MarketsFetch) {
  try {
    const api = yield select(selectRangerApi);
    const isApi = yield select(selectRangerIsReady);
    if (isApi) {
      const markets = yield call(fetchMarkets, api);
      yield put(marketsData(markets));
      yield put(setCurrentMarketIfUnset(markets[0]));
    }
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
const fetchMarkets = async (api: ApiPromise): Promise<Market[]> => {
  const tradingPairEntries = await api.query.ocex.tradingPairs.entries();

  const tradingPairs = tradingPairEntries.map(
    ([
      {
        args: [key],
      },
      val,
    ]) => {
      const data: any = val.toJSON();
      return {
        assetId: key.toString(),
        ...data,
      };
    }
  );

  const markets = tradingPairs.map(async (tradingPair): Promise<Market> => {
    const [baseName, baseSymbol, baseAssetId] = await fetchAssetData(
      api,
      tradingPair.baseAsset
    );
    const [quoteName, quoteSymbol, quoteAssetId] = await fetchAssetData(
      api,
      tradingPair.quoteAsset
    );
    // TODO: amount and price precision needs to be fetched from the api

    const mId = `${baseAssetId === "-1" ? "PDEX" : baseAssetId}-${
      quoteAssetId === "-1" ? "PDEX" : quoteAssetId
    }`;

    return {
      id: baseSymbol + quoteSymbol,
      name: baseSymbol + "/" + quoteSymbol,
      m: mId,
      assetIdArray: [baseAssetId, quoteAssetId],
      base_ticker: baseSymbol,
      quote_ticker: quoteSymbol,
      base_unit: baseName,
      quote_unit: quoteName,
      amount_precision: 5,
      price_precision: 5,
      min_price: new BigNumber(tradingPair.minimumTradeAmount).div(UNIT_BN),
      max_price: new BigNumber(tradingPair.maximumTradeAmount).div(UNIT_BN),
      min_amount: new BigNumber(tradingPair.minimumWithdrawalAmount).div(UNIT_BN),
      tokenTickerName: baseSymbol,
    };
  });
  return Promise.all(markets);
};

const fetchAssetData = async (
  api: ApiPromise,
  asset: Record<string, number | null>
): Promise<string[]> => {
  if (Object.hasOwnProperty.call(asset, "polkadex")) {
    return ["POLKADEX", "PDEX", "-1"];
  }
  const assetMetadata: any = await (await api.query.assets.metadata(asset.asset)).toHuman();
  return [assetMetadata.name, assetMetadata.symbol, asset.asset.toString()];
};
