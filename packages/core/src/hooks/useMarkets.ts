import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { Market } from "@orderbook/core/utils/orderbookService";
import { getCurrentMarket, setToStorage } from "@orderbook/core/helpers";
import { defaultConfig } from "@orderbook/core/config";

import { LOCAL_STORAGE_ID, defaultTicker } from "../constants";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

import { useTickers } from "./useTickers";

export type InitialMarkets = {
  last: string | number;
  volume: string | number;
  price_change_percent: string;
  price_change_percent_num: number;
  isFavourite?: boolean;
} & Market;

export function useMarkets(market?: string) {
  const [fieldValue, setFieldValue] = useState({
    searchFieldValue: "",
    marketsTabsSelected: "All",
    showFavourite: false,
  });

  const router = useRouter();
  const { markets: data, isReady } = useOrderbookService();
  const { favoriteMarkets, onUserFavoriteMarketPush } = useProfile();
  const { tickers: allMarketTickers } = useTickers(market);

  const markets = useMemo(() => {
    return data?.filter(
      (market) =>
        !defaultConfig.blockedAssets.some(
          (item) => item === market.baseAsset.id
        ) &&
        !defaultConfig.blockedAssets.some(
          (item) => item === market.quoteAsset.id
        )
    );
  }, [data]);

  const currentMarket = useMemo(
    () => (market ? getCurrentMarket(markets, market) : undefined),
    [market, markets]
  );

  /**
   * @description Get the single market information for the current market
   *
   * @param {string} e - Get default value for the market
   * @returns - The single market information
   */

  /**
   * Filter markets by tokens name
   *
   * @param {string} e -  Search field value
   */
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue({ ...fieldValue, searchFieldValue: e.target.value });
  };

  const handleSelectedFavorite = (id: string) => {
    // this should dispatch an action to make store favorites to the dynamo db
    onUserFavoriteMarketPush(id.trim());
  };

  /**
   * Select Tab by pair name
   *
   * @param {string} e -  Search field value
   */
  const handleMarketsTabsSelected = (value: string) =>
    setFieldValue({ ...fieldValue, marketsTabsSelected: value });

  const handleShowFavourite = () =>
    setFieldValue({ ...fieldValue, showFavourite: !fieldValue.showFavourite });

  /**
   * @description Change to selected market
   *
   * @param {string} e -  Search field value
   * @returns {void} dispatch setCurrentMarket action
   */
  const handleChangeMarket = useCallback(
    (e: string, onClose: () => void): void => {
      const marketToSet = markets?.find((el) => el.name === e);
      if (marketToSet) {
        setToStorage(
          LOCAL_STORAGE_ID.DEFAULT_MARKET,
          JSON.stringify({
            id: marketToSet.id,
            name: `${
              marketToSet.baseAsset.ticker + marketToSet.quoteAsset.ticker
            }`,
          })
        );

        router.push(
          `${marketToSet.baseAsset.ticker + marketToSet.quoteAsset.ticker}`,
          undefined,
          {
            shallow: true,
          }
        );

        onClose();
      }
    },
    [markets, router]
  );

  /**
   * @description Return the tickers based on the current market id
   *
   * @returns {InitialMarkets[]} dispatch setCurrentMarket action
   */
  const marketTokens = (): InitialMarkets[] => {
    const initialMarkets: InitialMarkets[] = [];
    const allTickets = markets.map((item) => {
      const ticker = allMarketTickers.find((val) => val.market === item.id);
      return {
        ...item,
        last: (ticker || defaultTicker).close,
        volume: (ticker || defaultTicker).quoteVolume,
        price_change_percent: (
          ticker || defaultTicker
        ).priceChangePercent24Hr?.toString(),
        price_change_percent_num: Number.parseFloat(
          String((ticker || defaultTicker).priceChangePercent24Hr)
        ),
        isFavourite: favoriteMarkets.includes(item.id),
      };
    });
    const allFavoriteFilters = allTickets.filter((value) =>
      fieldValue.showFavourite
        ? value.isFavourite === fieldValue.showFavourite
        : value
    );
    return allFavoriteFilters.reduce((pv, cv) => {
      const names = cv.name.toLowerCase().split("/");
      if (
        cv.name
          .toLowerCase()
          .includes(fieldValue.searchFieldValue.toLowerCase()) &&
        (fieldValue.marketsTabsSelected === "" ||
          fieldValue.marketsTabsSelected.toLowerCase() === names[1] ||
          fieldValue.marketsTabsSelected.toLowerCase() === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, initialMarkets);
  };

  /**
   * @description Return the market tickers
   *
   * @returns {string[]} Tickers name
   */
  // TODO: Add ticker types, ex. Fiat, Zones, Alts
  const marketTickers = markets.reduce(
    (pv: string[], cv: Market) => {
      const [, quote] = cv.name.split("/");
      if (pv.indexOf(quote) === -1) {
        pv.push(quote);
      }
      return pv;
    },
    ["All"]
  );

  return {
    handleFieldChange,
    handleMarketsTabsSelected,
    handleChangeMarket,
    handleShowFavourite,
    marketTokens,
    handleSelectedFavorite,
    marketTickers,
    fieldValue,
    currentTickerName: currentMarket?.name,
    currentTickerImg: currentMarket?.baseAsset.ticker,
    id: currentMarket?.id,

    list: markets,
    loading: !isReady,
  };
}
