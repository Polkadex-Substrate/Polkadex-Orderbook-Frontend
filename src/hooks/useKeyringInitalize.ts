import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { rabbitmqChannelFetch } from "../modules/public/rabbitmqChannel";

import { useReduxSelector } from ".";

import {
  balanceChannelFetch,
  balancesFetch,
  polkadotWalletFetch,
  selectHasUser,
} from "@polkadex/orderbook-modules";

export const useKeyringInitalize = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [error, setError] = useState("");
  const hasUser = useReduxSelector(selectHasUser);

  // basic initialization
  useEffect(() => {
    // dispatch(rangerConnectFetch());
    dispatch(rabbitmqChannelFetch());
    if (shouldFetch && !error) dispatch(polkadotWalletFetch());
  }, [dispatch, shouldFetch, error]);

  // initialize user specific sagas
  useEffect(() => {
    if (hasUser) {
      if (hasUser) {
        dispatch(balancesFetch());
        dispatch(balanceChannelFetch());
      }
    }
  }, [dispatch, hasUser]);

  return { loading, error, shouldFetch };
};
