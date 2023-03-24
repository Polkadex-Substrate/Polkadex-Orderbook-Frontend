import { useEffect, useReducer } from "react";
import * as queries from "../../../graphql/queries";

import * as A from "./actions";
import { Provider } from "./context";
import { initialMarketsState, marketsReducer } from "./reducer";
import {
  IPublicAsset,
  isAssetPDEX,
  selectAllAssets,
} from "@polkadex/orderbook/modules/public/assets";
import { Market, MarketQueryResult, Ticker, TickerQueryResult } from "./types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllMarkets } from "@polkadex/orderbook/graphql/queries";
import { POLKADEX_ASSET, READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { API } from "aws-amplify";
import * as subscriptions from "../../../graphql/subscriptions";
import { convertToTicker } from "@polkadex/orderbook/helpers/convertToTicker";
export const MarketsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketsReducer, initialMarketsState);

  const marketsFetch = async (allAssets: IPublicAsset[]) => {
    console.log("marketsFetch", allAssets);

    try {
      if (allAssets.length > 0) {
        const markets = await fetchMarkets(allAssets);
        dispatch(A.marketsData(markets));
        dispatch(A.setCurrentMarketIfUnset(markets[0]));
      }
    } catch (error) {
      console.log(error, "error in fetching markets");
    }
  };

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
      const { name, symbol, asset_id } = POLKADEX_ASSET;
      return [name, symbol, asset_id];
    }
    const asset = assets.find(({ asset_id }) => asset_id === id);
    if (asset) return [asset.name, asset.symbol, asset.asset_id];
    else return ["", "", ""];
  };

  const marketTickersFetch = async () => {
    console.log("ruchi");

    try {
      const tickers = await fetchMarketTickers();

      dispatch(A.marketsTickersData(tickers));
    } catch (error) {
      console.log(error, "ruchi");

      console.error("Market tickers fetch error", error);
    }
  };

  const fetchMarketTickers = async (): Promise<Ticker[]> => {
    console.log("call func");

    // TODO: check sendQueryToAppSync market variable
    const res: any = await sendQueryToAppSync({ query: queries.getAllMarketTickers });
    console.log(res, "res");

    const tickersRaw: TickerQueryResult[] = res.data.getAllMarketTickers.items;
    const tickers: Ticker[] = tickersRaw.map((elem) => {
      const priceChange = Number(elem.c) - Number(elem.o);
      const priceChangePercent = (priceChange / Number(elem.o)) * 100;
      return {
        m: elem.m,
        priceChange24Hr: priceChange,
        priceChangePercent24Hr: priceChangePercent,
        open: elem.o,
        close: elem.c,
        high: elem.h,
        low: elem.l,
        volumeBase24hr: elem.vb,
        volumeQuote24Hr: elem.vq,
      };
    });
    return tickers;
  };

  const market = state.currentMarket;
  useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: market?.m + "-ticker" },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        const data_parsed: TickerQueryResult = JSON.parse(
          data.value.data.websocket_streams.data
        );

        const ticker_data: Ticker = convertToTicker(data_parsed, market.m);
        dispatch(A.marketsTickersChannelData(ticker_data));
      },
      error: (err) => {
        console.warn(err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [market?.m]);

  return (
    <Provider
      value={{
        ...state,
        marketsFetch,
        marketTickersFetch,
      }}>
      {children}
    </Provider>
  );
};
