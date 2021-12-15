import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { rabbitmqChannelFetch } from "../modules/public/rabbitmqChannel";

import { polkadotWalletFetch, rangerConnectFetch } from "@polkadex/orderbook-modules";

export const useKeyringInitalize = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    //dispatch(rangerConnectFetch());
    dispatch(rabbitmqChannelFetch());
    if (shouldFetch && !error) dispatch(polkadotWalletFetch());
  }, [dispatch, shouldFetch, error]);
  return { loading, error, shouldFetch };
};
