import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { rabbitmqChannelFetch } from "../modules/public/rabbitmqChannel";
import { marketsFetchSaga } from "../modules/public/markets/sagas/marketsFetchSaga";
import { updateTickerWithTrade } from "../helpers/updateTickerWithTrade";

import { useReduxSelector } from ".";

import {
  balanceChannelFetch,
  balancesFetch,
  currentTickerFetch,
  currentTickersUpdate,
  orderBookFetch,
  polkadotWalletFetch,
  selectCurrentMarket,
  selectCurrentMarketTickers,
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
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);
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
      const updatedTicker = updateTickerWithTrade(currentTrade, currentTicker);
      dispatch(currentTickersUpdate(updatedTicker));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade, dispatch, lastTrade]);
};
