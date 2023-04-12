import { useReducer } from "react";

import { selectTradeAccount } from "../tradeWallet/helper";
import { useNativeApi } from "../../public/nativeApi";

import { parseError, executePlaceOrder, getNewClientId, executeCancelOrder } from "./helper";
import { Provider } from "./context";
import { initialState, ordersReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

import { UserAccount } from "@polkadex/orderbook/providers/user/profile/types";
import {
  createOrderPayload,
  createCancelOrderPayloadSigned,
} from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { TradeAccount } from "@polkadex/orderbook/modules/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const OrdersProvider: T.OrdersComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);
  const profileState = useProfile();
  const tradeWalletState = useTradeWallet();
  const nativeApiState = useNativeApi();
  const settingsState = useSettingsProvider();

  // Actions
  const onPlaceOrders = async (payload: A.OrderExecuteFetch["payload"]) => {
    try {
      const { side, price, order_type, amount, symbol } = payload;
      const account: UserAccount = profileState.selectedAccount;
      const address = account.tradeAddress;
      const mainAddress = account.mainAddress;
      const keyringPair: TradeAccount = selectTradeAccount(
        address,
        tradeWalletState.allBrowserAccounts
      );
      const timestamp = getNonce();
      const isApiConnected = nativeApiState.connected;
      const api = nativeApiState.api;
      const client_order_id = getNewClientId();
      if (address !== "" && keyringPair && api && isApiConnected) {
        const order = createOrderPayload(
          api,
          address,
          order_type,
          side,
          symbol[0],
          symbol[1],
          amount,
          price,
          timestamp,
          client_order_id,
          mainAddress
        );
        const signature = signPayload(api, keyringPair, order);
        const res = await executePlaceOrder([order, signature], address);
        if (res.data.place_order) {
          settingsState.onHandleNotification({
            type: "SuccessAlert",
            message: {
              title: "Order Placed",
            },
            time: new Date().getTime(),
          });
        }
        dispatch(A.orderExecuteData());
        dispatch(A.orderExecuteDataDelete());
      }
    } catch (error) {
      dispatch(A.orderExecuteDataDelete());
      const msg =
        typeof error.message === "string" ? error.message : error?.errors[0]?.message;
      const errorText = parseError(msg);
      // ignore market liquidity error as there will always be a small qty which cannot be filled
      // due to the step size of the configuration. Its expected even-though order-book throws error
      if (errorText.includes("MarketLiquidityError")) {
        settingsState.onHandleNotification({
          type: "SuccessAlert",
          message: {
            title: "Market order placed",
          },
          time: new Date().getTime(),
        });
        return;
      }
      settingsState.onHandleNotification({
        type: "ErrorAlert",
        message: {
          title: "Order failed",
          description: errorText,
        },
        time: new Date().getTime(),
      });
    }
  };

  const onCancelOrder = async (payload: A.OrderCancelFetch["payload"]) => {
    try {
      const { orderId, base, quote } = payload;
      const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
      const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;
      const api = nativeApiState.api;
      const account: UserAccount = profileState.selectedAccount;
      const address = account.tradeAddress;
      const keyringPair: TradeAccount = selectTradeAccount(
        address,
        tradeWalletState.allBrowserAccounts
      );
      if (keyringPair.isLocked) throw new Error("Please unlock your account with password");
      if (address !== "" && keyringPair) {
        const { order_id, account, pair, signature } = createCancelOrderPayloadSigned(
          api,
          keyringPair,
          orderId,
          baseAsset,
          quoteAsset
        );
        await executeCancelOrder([order_id, account, pair, signature], address);
        dispatch(A.orderCancelData());

        settingsState.onHandleNotification({
          type: "SuccessAlert",
          message: {
            title: "Order cancelled",
            description: `OrderId: ${orderId}`,
          },
          time: new Date().getTime(),
        });

        setTimeout(() => {
          dispatch(A.orderCancelDataDelete());
        }, 1000);
      }
    } catch (error) {
      settingsState.onHandleError({
        error,
        processingType: "alert",
      });
      dispatch(A.orderCancelError(error));
    }
  };

  const onSetCurrentPrice = (payload: A.SetCurrentPrice["payload"]) => {
    dispatch(A.setCurrentPrice(payload));
  };

  return (
    <Provider
      value={{
        ...state,
        onPlaceOrders,
        onCancelOrder,
        onSetCurrentPrice,
      }}>
      {children}
    </Provider>
  );
};
