import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { rabbitmqChannelFetch } from "../modules/public/rabbitmqChannel";
import { marketsFetchSaga } from "../modules/public/markets/sagas/marketsFetchSaga";

import { useReduxSelector } from ".";

import {
  balanceChannelFetch,
  balancesFetch,
  currentTickerFetch,
  currentTickersUpdate,
  orderBookFetch,
  polkadotWalletFetch,
  selectCurrentMarket,
  selectCurrentTrade,
  selectHasUser,
  selectLastRecentTrade,
} from "@polkadex/orderbook-modules";

export const useAppDaemon = () => {
  const dispatch = useDispatch();
  const hasUser = useReduxSelector(selectHasUser);
  const market = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTrade);
  const lastTrade = useReduxSelector(selectLastRecentTrade);

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

  // intiatilize trade specific events
  useEffect(() => {
    if (currentTrade && lastTrade) {
      dispatch(currentTickersUpdate({ last: currentTrade.price }));
    }
  }, [currentTrade, dispatch, lastTrade]);
};
