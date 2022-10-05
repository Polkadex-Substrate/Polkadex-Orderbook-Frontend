import { useDispatch } from "react-redux";
import { useState } from "react";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  balancesFetch,
  logOutFetch,
  notificationPush,
  selectNotifications,
  selectBrowserTradeAccounts,
  selectSignInError,
  selectSignInLoading,
  signInFetch,
  selectHasSelectedAccount,
} from "@polkadex/orderbook-modules";
import { signMessage } from "@polkadex/web-helpers";

type CommomState = {
  success?: boolean;
  loading?: boolean;
  error?: string;
};

type Funds = { amount?: string } & CommomState;
type ConnectWallet = { address: string; password: string };
type Notifications = { repeatNumber: number; repeatTime: number };

// TODO: REMOVED IN PRODUCTION
export function useDeveloper() {
  const dispatch = useDispatch();
  const hasUser = useReduxSelector(selectHasSelectedAccount);
  const notifications = useReduxSelector(selectNotifications);
  const accounts = useReduxSelector(selectBrowserTradeAccounts);

  const walletLoading = useReduxSelector(selectSignInLoading);
  const walletError = useReduxSelector(selectSignInError);

  const [funds, setFunds] = useState<Funds>({
    success: false,
    loading: false,
    error: "",
    amount: "100.0",
  });

  const [connectWallet, setConnectWallet] = useState<ConnectWallet>({
    address: "Choose an option",
    password: "",
  });

  const [notification, selectNotification] = useState<Notifications>({
    repeatNumber: 2,
    repeatTime: 2,
  });
  /**
   * @description Request funds
   */
  const requestFunds = async (): Promise<void> => {
    setFunds((funds) => ({ ...funds, loading: true }));
    try {
      const payloads = [
        { account: user?.address, asset: 1, amount: funds.amount },
        { account: user?.address, asset: 0, amount: funds.amount },
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
          // return await API.post(option)("/test_deposit", data);
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
   *
   * @returns {void} Dispatch Sign In action
   */
  const connectTestWallet = () => {};

  /**
   * @description Disconnect Wallet
   *
   * @returns {void} Dispatch Logout action
   */
  const disconnectTestWallet = () => dispatch(logOutFetch());

  /**
   * @description Create a new notification
   *
   * @returns {void} Dispatch notification Push  action
   */
  const sendNotification = (): void => {
    let num = 0;
    const interval = setInterval(() => {
      dispatch(
        notificationPush({
          type: "Loading",
          message: {
            title: `Notification Title ${num}`,
            description: `Notification Description ${num}`,
          },
        })
      );
      num++;
      if (num === notification.repeatNumber) clearInterval(interval);
    }, notification.repeatTime * 1000);
  };

  return {
    hasUser,
    funds: {
      requestFunds: user ? requestFunds : undefined,
      onChange: (e) => setFunds({ ...funds, [e.target.name]: e.target.value }),
      ...funds,
    },
    wallet: {
      connectTestWallet: hasUser ? disconnectTestWallet : connectTestWallet,
      loading: walletLoading,
      error: walletError?.message[0],
      success: hasUser,
      options: accounts?.length ? accounts : [],
      onChange: (e) => setConnectWallet({ ...connectWallet, [e.target.name]: e.target.value }),
      ...connectWallet,
    },
    notifications: {
      sendNotification,
      loading: false,
      success: !!notifications.length,
      onChange: (e) =>
        selectNotification({ ...notification, [e.target.name]: e.target.value }),
      ...notification,
    },
  };
}
