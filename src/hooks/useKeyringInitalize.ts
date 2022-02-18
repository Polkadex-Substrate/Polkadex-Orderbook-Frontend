import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { rabbitmqChannelFetch } from "../modules/public/rabbitmqChannel";
import { marketsFetchSaga } from "../modules/public/markets/sagas/marketsFetchSaga";

import { useReduxSelector } from ".";

import {
  balanceChannelFetch,
  balancesFetch,
  currentTickerFetch,
  orderBookFetch,
  polkadotWalletFetch,
  selectCurrentMarket,
  selectHasUser,
} from "@polkadex/orderbook-modules";

export const useKeyringInitalize = () => {
  const dispatch = useDispatch();
  const hasUser = useReduxSelector(selectHasUser);
  const market = useReduxSelector(selectCurrentMarket);
  // basic initialization
  useEffect(() => {
    dispatch(rabbitmqChannelFetch());
    dispatch(polkadotWalletFetch());
  }, [dispatch]);

  // intitialize market dependent events
  useEffect(() => {
    if (market) {
      const tickerMarketId = `${market.symbolArray[0]}-${market.symbolArray[1]}`;
      // dispatch(rangerConnectFetch());
      dispatch(orderBookFetch(market));
      dispatch(currentTickerFetch({ marketId: tickerMarketId }));
    }
  }, [dispatch, market]);

  // initialize user specific sagas
  useEffect(() => {
    if (hasUser) {
      if (hasUser) {
        dispatch(balancesFetch());
        dispatch(balanceChannelFetch());
      }
    }
  }, [dispatch, hasUser]);
};
