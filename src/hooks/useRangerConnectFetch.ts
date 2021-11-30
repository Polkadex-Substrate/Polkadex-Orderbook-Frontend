import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import keyring from "@polkadot/ui-keyring";

import {
  selectRanger,
  selectShouldRangerConnect,
  rangerConnectFetch,
} from "@polkadex/orderbook-modules";

export const useRangerConnectFetch = () => {
  const dispatch = useDispatch();
  const shouldFetch = useSelector(selectShouldRangerConnect);
  const { connected } = useSelector(selectRanger);

  useEffect(() => {
    if (!connected && shouldFetch) dispatch(rangerConnectFetch());
  }, [shouldFetch, connected, dispatch]);
  return { connected };
};
