import { useReducer } from "react";
import {
  signPayload,
  isAssetPDEX,
  createCancelOrderPayloadSigned,
  createOrderPayload,
  getNonce,
} from "@orderbook/core/helpers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { useProfile, UserAccount } from "../profile";
import { selectTradeAccount } from "../tradeWallet";
import { useWalletProvider } from "../walletProvider";

import * as A from "./actions";
import * as T from "./types";
import { initialState, ordersReducer } from "./reducer";
import {
  executeCancelOrder,
  executePlaceOrder,
  getNewClientId,
  parseError,
} from "./helper";
import { Provider } from "./context";

type UserActionLambdaResp = {
  is_success: boolean;
  body: string;
};

export const OrdersProvider: T.OrdersComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);
  const profileState = useProfile();
  const { localTradingAccounts: allBrowserAccounts } = useWalletProvider();
  const nativeApiState = useNativeApi();
  const settingsState = useSettingsProvider();

  // Actions
  const onPlaceOrders = async (payload: A.OrderExecuteFetch["payload"]) => {
    try {
      const { side, price, order_type: orderType, amount, symbol } = payload;
      const account: UserAccount = profileState.selectedAccount;
      const address = account.tradeAddress;
      const mainAddress = account.mainAddress;
      const keyringPair = selectTradeAccount(address, allBrowserAccounts || []);
      const timestamp = getNonce();
      const isApiConnected = nativeApiState.connected;
      const api = nativeApiState.api;
      const clientOrderId = getNewClientId();
      if (address !== "" && keyringPair && api && isApiConnected) {
        const order = createOrderPayload(
          api,
          address,
          orderType,
          side,
          symbol[0],
          symbol[1],
          amount,
          price,
          timestamp,
          clientOrderId,
          mainAddress
        );
        const signature = signPayload(api, keyringPair, order);
        const res = await executePlaceOrder([order, signature], address);
        if (res.data.place_order) {
          const resp: UserActionLambdaResp = JSON.parse(res.data.place_order);
          if (!resp.is_success) {
            dispatch(A.orderExecuteDataDelete());
            settingsState.onHandleNotification({
              type: "Error",
              message: `Order failed: ${resp.body}`,
            });
            return;
          }
          settingsState.onHandleNotification({
            type: "Success",
            message: "Order Placed",
          });
        }
        dispatch(A.orderExecuteData());
        dispatch(A.orderExecuteDataDelete());
      }
    } catch (error) {
      dispatch(A.orderExecuteDataDelete());
      const msg =
        typeof error.message === "string"
          ? error.message
          : error?.errors[0]?.message;
      const errorText = parseError(msg);
      // ignore market liquidity error as there will always be a small qty which cannot be filled
      // due to the step size of the configuration. Its expected even-though order-book throws error
      if (errorText.includes("MarketLiquidityError")) {
        settingsState.onHandleNotification({
          type: "Success",
          message: "Market order placed",
        });
        return;
      }
      settingsState.onHandleNotification({
        type: "Error",
        message: `Order failed: ${errorText}`,
      });
    }
  };

  const onCancelOrder = async (payload: A.OrderCancelFetch["payload"]) => {
    try {
      dispatch(A.orderCancelFetch(payload));
      const { orderId, base, quote } = payload;
      const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
      const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;
      const api = nativeApiState.api;
      const account: UserAccount = profileState.selectedAccount;
      const { tradeAddress, mainAddress } = account;
      const keyringPair = selectTradeAccount(
        tradeAddress,
        allBrowserAccounts || []
      );
      if (keyringPair?.isLocked)
        throw new Error("Please unlock your account with password");
      if (tradeAddress !== "" && keyringPair && api) {
        const { pair, signature } = createCancelOrderPayloadSigned(
          api,
          keyringPair,
          orderId,
          baseAsset,
          quoteAsset
        );
        await executeCancelOrder(
          [orderId, mainAddress, tradeAddress, pair, signature],
          tradeAddress
        );
        dispatch(A.orderCancelData());

        settingsState.onHandleNotification({
          type: "Success",
          message: `Order cancelled: ${orderId}`,
        });

        setTimeout(() => {
          dispatch(A.orderCancelDataDelete());
        }, 1000);
      }
    } catch (error) {
      settingsState.onHandleError(error?.message ?? error);
      dispatch(A.orderCancelError(error));
    }
  };

  const onSetCurrentPrice = (payload: A.SetCurrentPrice["payload"]) => {
    dispatch(A.setCurrentPrice(payload));
  };

  const onSetCurrentAmount = (payload: A.SetAmount["payload"]) => {
    dispatch(A.setAmount(payload));
  };

  return (
    <Provider
      value={{
        ...state,
        onPlaceOrders,
        onCancelOrder,
        onSetCurrentPrice,
        onSetCurrentAmount,
      }}
    >
      {children}
    </Provider>
  );
};
