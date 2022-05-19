import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { rabbitmqChannelFetch } from "../modules/public/rabbitmqChannel";
import { enclaveRpcClientFetch } from "../modules/public/enclaveRpcClient";

import {
  polkadotWalletFetch,
  extensionWalletFetch,
  rangerConnectFetch,
} from "@polkadex/orderbook-modules";

export const useAppDaemon = () => {
  const dispatch = useDispatch();

  // basic initialization
  useEffect(() => {
    dispatch(enclaveRpcClientFetch());
    dispatch(rangerConnectFetch());
    dispatch(rabbitmqChannelFetch());
    dispatch(polkadotWalletFetch());
    dispatch(extensionWalletFetch());
  }, [dispatch]);
};
