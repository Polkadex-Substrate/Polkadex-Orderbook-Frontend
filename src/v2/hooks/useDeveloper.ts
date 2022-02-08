import { useDispatch } from "react-redux";
import { useState } from "react";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  balancesFetch,
  logoutFetch,
  selectHasUser,
  selectSignInError,
  selectSignInLoading,
  selectUserInfo,
  signIn,
} from "@polkadex/orderbook-modules";
import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";

type CommomState = {
  success?: boolean;
  loading?: boolean;
  error?: string;
};

type Funds = { value?: string } & CommomState;
type ConnectWallet = { address: string; password: string };
const option: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};
export function useDeveloper() {
  const dispatch = useDispatch();
  const user = useReduxSelector(selectUserInfo);
  const hasUser = useReduxSelector(selectHasUser);

  const walletLoading = useReduxSelector(selectSignInLoading);
  const walletError = useReduxSelector(selectSignInError);

  const [funds, setFunds] = useState<Funds>({
    success: false,
    loading: false,
    error: "",
    value: "100.0",
  });

  const [connectWallet, setConnectWallet] = useState<ConnectWallet>({
    address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    password: "0000",
  });
  /**
   * @description Request funds
   */
  const requestFunds = async (): Promise<void> => {
    setFunds((funds) => ({ ...funds, loading: true }));
    try {
      const payloads = [
        { account: user.address, asset: 1, amount: funds.value },
        { account: user.address, asset: 0, amount: funds.value },
      ];

      const response: any = await Promise.all(
        payloads.map(async (payload) => {
          const signature = await signMessage(user.keyringPair, JSON.stringify(payload));
          const data = {
            signature: {
              Sr25519: signature.trim().slice(2),
            },
            payload,
          };
          return await API.post(option)("/test_deposit", data);
        })
      );
      if (response[0].Fine && response[1].Fine) {
        dispatch(balancesFetch());
        setFunds((funds) => ({ ...funds, success: true }));
      }
    } catch (error) {
      setFunds((funds) => ({ ...funds, error: error.message }));
    }
    setFunds((funds) => ({ ...funds, loading: false }));
  };

  /**
   * @description Connect test wallet
   */
  const connectTestWallet = () =>
    dispatch(signIn(connectWallet.address, connectWallet.password));

  const disconnectTestWallet = () => dispatch(logoutFetch());
  return {
    hasUser,
    funds: {
      requestFunds: user ? requestFunds : undefined,
      ...funds,
    },
    wallet: {
      connectTestWallet: hasUser ? disconnectTestWallet : connectTestWallet,
      loading: walletLoading,
      error: walletError?.message[0],
      success: hasUser,
      ...connectWallet,
    },
  };
}
