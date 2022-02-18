import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import {
  Market,
  selectCurrentMarket,
  selectMarkets,
  selectCurrentMarketTickers,
  setCurrentMarket,
  defaultTickers,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
export type InitialMarkets = {
  last: string | number;
  volume: string | number;
  price_change_percent: string;
  price_change_percent_num: number;
} & Market;

export function useMarkets() {
  const [fieldValue, setFieldValue] = useState({
    searchFieldValue: "",
    marketsTabsSelected: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const marketTickets = useReduxSelector(selectCurrentMarketTickers);
  const markets = useReduxSelector(selectMarkets);
  const currentMarket = useReduxSelector(selectCurrentMarket);

  /**
   * @description Get the single market information for the current market
   *
   * @param {string} e - Get default value for the market
   * @returns - The single market information
   */

  // const getTickerValue = (value: DefaultTickers) =>
  //   (marketTickers[currentMarket?.id] || defaultTickers)[value];

  // const bidUnit = currentMarket?.quote_unit?.toUpperCase();
  // const isPositive = /\+/.test(getTickerValue("price_change_percent"));

  /**
   * Filter markets by tokens name
   *
   * @param {string} e -  Search field value
   */
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFieldValue({ ...fieldValue, searchFieldValue: e.target.value });

  /**
   * Select Tab by pair name
   *
   * @param {string} e -  Search field value
   */
  const handleMarketsTabsSelected = (value: string) =>
    setFieldValue({ ...fieldValue, marketsTabsSelected: value });

  /**
   * @description Change to selected market
   *
   * @param {string} e -  Search field value
   * @returns {void} dispatch setCurrentMarket action
   */
  const handleChangeMarket = (e: string): void => {
    const marketToSet = markets.find((el) => el.name === e);
    if (marketToSet) {
      router.push(`${marketToSet.id}`, undefined, { shallow: true });
      dispatch(setCurrentMarket(marketToSet));
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
      return {
        ...item,
        last: (marketTickets || defaultTickers).last,
        volume: (marketTickets || defaultTickers).volume,
        price_change_percent: (marketTickets || defaultTickers).price_change_percent,
        price_change_percent_num: Number.parseFloat(
          (marketTickets || defaultTickers).price_change_percent
        ),
      };
    });
    const allTicketsFilters = allTickets.reduce((pv, cv) => {
      const [quote] = cv.name.toLowerCase().split("/");
      if (
        cv.id.toLowerCase().includes(fieldValue.searchFieldValue.toLowerCase()) &&
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
    marketTokens,
    marketTickers,
    fieldValue,
    currentTickerName: currentMarket?.name,
    currentTickerImg: currentMarket?.tokenTickerName,
  };
}
