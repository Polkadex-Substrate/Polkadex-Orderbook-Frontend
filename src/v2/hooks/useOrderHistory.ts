import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { sortOrdersDescendingTime } from "../helpers/sortOrderDescendingTime";

import {
  selectCurrentMarket,
  selectOrdersHistory,
  userOrdersHistoryFetch,
  selectHasUser,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useOrderHistory() {
  const dispatch = useDispatch();

  const orderlist = useReduxSelector(selectOrdersHistory);
  const list = sortOrdersDescendingTime(orderlist).map((order) => ({
    ...order,
    timestamp: (parseFloat(order.timestamp) * 1000).toFixed(0),
  }));

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectHasUser);

  const trades = useMemo(() => {
    const acc = list.reduce((acc, item) => {
      item.trade_history
        .split(",")
        .filter((str) => str !== "")
        .forEach((trade) => {
          const [price, qty, timestamp] = trade.split("-");
          const unixtime = (parseFloat(timestamp) * 1000).toString();
          acc.push({
            order_id: item.txid,
            base_asset_type: item.base_asset_type,
            quote_asset_type: item.quote_asset_type,
            order_side: item.order_side,
            order_type: item.order_type,
            price,
            qty,
            timestamp: unixtime,
          });
        });
      return acc;
    }, []);
    return acc.sort((a, b) => b.timestamp - a.timestamp);
  }, [list]);

  useEffect(() => {
    if (userLoggedIn) dispatch(userOrdersHistoryFetch());
  }, [userLoggedIn, dispatch]);

  return {
    orders: list,
    trades,
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
  };
}
