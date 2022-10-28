import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import cookie from "cookie";

import {
  Market,
  selectCurrentMarket,
  selectMarkets,
  setCurrentMarket,
  defaultTickers,
  selectMarketTickers,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
export type InitialMarkets = {
  last: string | number;
  volume: string | number;
  price_change_percent: string;
  price_change_percent_num: number;
  isFavourite?: boolean;
} & Market;

export function useMarkets(onClose: () => void) {
  const [fieldValue, setFieldValue] = useState({
    searchFieldValue: "",
    marketsTabsSelected: "All",
    showFavourite: false,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const allMarketTickers = useReduxSelector(selectMarketTickers);
  const markets = useReduxSelector(selectMarkets);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const cookieData = cookie.parse(document.cookie);

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
    console.log({
      searchFieldValue: e.target.value
    });

    setFieldValue({ ...fieldValue, searchFieldValue: e.target.value });
  }


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
  const handleChangeMarket = (e: string): void => {
    const marketToSet = markets.find((el) => el.name === e);
    if (marketToSet) {
      router.push(`${marketToSet.base_ticker + marketToSet.quote_ticker}`, undefined, { shallow: true });
      dispatch(setCurrentMarket(marketToSet));
      onClose();
    }
  };

  /**
   * @description Return the tickers based on the current market id
   *
   * @returns {InitialMarkets[]} dispatch setCurrentMarket action
   */
  const marketTokens = (): InitialMarkets[] => {
    const initialMarkets: InitialMarkets[] = [];
    const allTickets = markets.map((item) => {
      const ticker = allMarketTickers.find((val) => val.m === item.m);
      return {
        ...item,
        last: (ticker || defaultTickers).close,
        volume: (ticker || defaultTickers).volumeBase24hr,
        price_change_percent: (ticker || defaultTickers).priceChangePercent24Hr,
        price_change_percent_num: Number.parseFloat(
          (ticker || defaultTickers).priceChangePercent24Hr
        ),
        isFavourite: cookieData?.favouriteMarkets?.includes(item.id),
      };
    });
    const allFavoriteFilters = allTickets.filter((value) =>
      fieldValue.showFavourite ? value.isFavourite === fieldValue.showFavourite : value
    );
    const allTicketsFilters = allFavoriteFilters.reduce((pv, cv) => {
      const [_, quote] = cv.name.toLowerCase().split("/");
      if (
        cv.name.toLowerCase().includes(fieldValue.searchFieldValue.toLowerCase()) &&
        (fieldValue.marketsTabsSelected === "" ||
          fieldValue.marketsTabsSelected.toLowerCase() === quote ||
          fieldValue.marketsTabsSelected.toLowerCase() === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, initialMarkets);

    return allTicketsFilters;
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
    marketTickers,
    fieldValue,
    currentTickerName: currentMarket?.name,
    currentTickerImg: currentMarket?.tokenTickerName,
  };
}
