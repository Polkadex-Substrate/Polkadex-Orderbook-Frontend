import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";

import * as queries from "../../../graphql/queries";
import * as subscriptions from "../../../graphql/subscriptions";
import { IPublicAsset } from "../assetsProvider";
import { useAssetsProvider } from "../assetsProvider/useAssetsProvider";
import { useSettingsProvider } from "../settings";

import * as A from "./actions";
import { Provider } from "./context";
import { initialMarketsState, marketsReducer } from "./reducer";
import {
  Market,
  MarketQueryResult,
  MarketsComponent,
  Ticker,
  TickerQueryResult,
} from "./types";

import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { convertToTicker } from "@polkadex/orderbook/helpers/convertToTicker";
import { POLKADEX_ASSET, READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { getAllMarkets } from "@polkadex/orderbook/graphql/queries";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export const MarketsProvider: MarketsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(marketsReducer, initialMarketsState);
  const { list: allAssets } = useAssetsProvider();
  const { onHandleError } = useSettingsProvider();

  const fetchMarkets = useCallback(async (assets: IPublicAsset[]): Promise<Market[]> => {
    const res = await sendQueryToAppSync({ query: getAllMarkets });
    const pairs: MarketQueryResult[] = res.data.getAllMarkets.items;
    const markets = pairs?.map(async (pair: MarketQueryResult): Promise<Market> => {
      const [baseAsset, quoteAsset] = pair.market.split("-");
      const { ticker: baseSymbol } = findAsset(assets, baseAsset);
      const { ticker: quoteSymbol } = findAsset(assets, quoteAsset);

      return {
        id: pair.market,
        name: baseSymbol + "/" + quoteSymbol,
        m: pair.market,
        base_ticker: baseSymbol,
        quote_ticker: quoteSymbol,
        baseAssetId: baseAsset,
        quoteAssetId: quoteAsset,
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
    return await Promise.all(markets);
  }, []);

  const onMarketsFetch = useCallback(
    async (allAssets: IPublicAsset[]) => {
      dispatch(A.marketsFetch());
      try {
        if (allAssets.length > 0) {
          const markets = await fetchMarkets(allAssets);

          dispatch(A.marketsData(markets));
          dispatch(A.setCurrentMarketIfUnset(markets[0]));
        }
      } catch (error) {
        console.log(error, "error in fetching markets");
        onHandleError(error?.message ?? error);
        dispatch(A.marketsError(error));
      }
    },
    [fetchMarkets, onHandleError]
  );

  const findAsset = (
    assets: IPublicAsset[],
    id: string
  ): { name: string; ticker: string; assetId: string } => {
    if (isAssetPDEX(id)) {
      const { name, symbol, assetId } = POLKADEX_ASSET;
      return { name, ticker: symbol, assetId };
    }
    const asset = assets?.find(({ assetId }) => assetId === id);
    if (asset?.name && asset?.symbol && asset?.assetId)
      return {
        name: asset.name,
        ticker: asset.symbol,
        assetId: asset.assetId,
      };
    else throw new Error("cannot find asset id");
  };

  const fetchMarketTickers = useCallback(async (): Promise<Ticker[]> => {
    // TODO: check sendQueryToAppSync market variable
    const to = new Date().toISOString();
    // tickers are fetched for the last 24 hours
    const from = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
    const res: any = await sendQueryToAppSync({
      query: queries.getAllMarketTickers,
      variables: { from, to },
    });
    const tickersRaw: TickerQueryResult[] = res.data.getAllMarketTickers.items;
    const tickers: Ticker[] = tickersRaw?.map((elem) => {
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
  }, []);

  const onMarketTickersFetch = useCallback(async () => {
    dispatch(A.marketsTickersFetch());
    try {
      const tickers = await fetchMarketTickers();

      dispatch(A.marketsTickersData(tickers));
    } catch (error) {
      console.error("Market tickers fetch error", error?.errors);
      onHandleError(`Market tickers fetch error`);
    }
  }, [onHandleError, fetchMarketTickers]);

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

  const setCurrentMarket = (market: Market) => {
    dispatch(A.setCurrentMarket(market));
  };

  useEffect(() => {
    if (allAssets.length > 0 && state.list.length === 0) {
      onMarketsFetch(allAssets);
      onMarketTickersFetch();
    }
  }, [allAssets, state.list, onMarketsFetch, onMarketTickersFetch]);

  return (
    <Provider
      value={{
        ...state,
        onMarketsFetch,
        onMarketTickersFetch,
        setCurrentMarket,
      }}>
      {children}
    </Provider>
  );
};
