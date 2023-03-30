import { useEffect, useReducer } from "react";
import * as queries from "../../../graphql/queries";

import * as A from "./actions";
import { Provider } from "./context";
import { initialMarketsState, marketsReducer } from "./reducer";
import { isAssetPDEX, selectAllAssets } from "@polkadex/orderbook/modules/public/assets";
import {
  Market,
  MarketQueryResult,
  MarketsComponent,
  Ticker,
  TickerQueryResult,
} from "./types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllMarkets } from "@polkadex/orderbook/graphql/queries";
import { POLKADEX_ASSET, READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { API } from "aws-amplify";
import * as subscriptions from "../../../graphql/subscriptions";
import { convertToTicker } from "@polkadex/orderbook/helpers/convertToTicker";
import { IPublicAsset } from "../assetsProvider";
import { useAssetsProvider } from "../assetsProvider/useAssetsProvider";
export const MarketsProvider: MarketsComponent = ({ onError, onNotification, children }) => {
  const [state, dispatch] = useReducer(marketsReducer, initialMarketsState);

  const marketsFetch = async (allAssets: IPublicAsset[]) => {
    try {
      if (allAssets.length > 0) {
        const markets = await fetchMarkets(allAssets);
        console.log(markets, "markets");

        dispatch(A.marketsData(markets));
        dispatch(A.setCurrentMarketIfUnset(markets[0]));
      }
    } catch (error) {
      console.log(error, "error in fetching markets");
      onError(`error in fetching markets `);
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
      const { name, symbol, assetId } = POLKADEX_ASSET;
      return [name, symbol, assetId];
    }
    const asset = assets.find(({ assetId }) => assetId === id);
    if (asset) return [asset.name, asset.symbol, asset.assetId];
    else return ["", "", ""];
  };

  const marketTickersFetch = async () => {
    try {
      const tickers = await fetchMarketTickers();

      dispatch(A.marketsTickersData(tickers));
    } catch (error) {
      console.error("Market tickers fetch error", error);
      onError(`error in fetching tickers `);
    }
  };

  const fetchMarketTickers = async (): Promise<Ticker[]> => {
    // TODO: check sendQueryToAppSync market variable
    const res: any = await sendQueryToAppSync({ query: queries.getAllMarketTickers });

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

  const getMarkets = () => {
    return state.list;
  };

  const getCurrentMarket = () => {
    return state.currentMarket;
  };

  const setCurrentMarket = (market: Market) => {
    dispatch(A.setCurrentMarket(market));
  };

  const dispatchMarketFetch = () => {
    dispatch(A.marketsFetch());
  };

  const isMarketLoading = () => {
    return state.loading;
  };

  const getMarketsTimestamp = () => {
    return state.timestamp;
  };

  const { selectAllAssets } = useAssetsProvider();
  const allAssets: IPublicAsset[] = selectAllAssets();

  useEffect(() => {
    console.log(state.list, "lenght");
    if (allAssets.length > 0 && state.list.length === 0) {
      marketsFetch(allAssets);
      marketTickersFetch();
    }
  }, [allAssets]);

  return (
    <Provider
      value={{
        ...state,
        marketsFetch,
        marketTickersFetch,
        getMarkets,
        getCurrentMarket,
        setCurrentMarket,
        dispatchMarketFetch,
        isMarketLoading,
        getMarketsTimestamp,
      }}>
      {children}
    </Provider>
  );
};
