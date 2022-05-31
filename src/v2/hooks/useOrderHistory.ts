import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import {
  selectCurrentMarket,
  selectOrdersHistory,
  userOrdersHistoryFetch,
  selectHasUser,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useOrderHistory() {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectOrdersHistory);

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectHasUser);

  const trades = useMemo(() => {
    const acc = list.reduce((acc, item) => {
      item.trade_history
        .split(",")
        .filter((str) => str !== "")
        .forEach((trade) => {
          const [price, qty, timestamp] = trade.split("-");
          const unixtime = new Date(timestamp).getTime();
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
    if (userLoggedIn && currentMarket) dispatch(userOrdersHistoryFetch());
  }, [userLoggedIn, currentMarket, dispatch]);

  return {
    orders: list,
    trades,
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
  };
}
