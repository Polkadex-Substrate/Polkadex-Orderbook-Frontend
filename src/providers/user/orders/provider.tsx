import { useReducer } from "react";
import { Provider } from "./context";
import { initialState, ordersReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { select } from "redux-saga/effects";

import { selectRangerApi, selectTradeAccount } from "@polkadex/orderbook/modules/index";
import { UserAccount } from "@polkadex/orderbook/providers/user/profile/types";
import * as mutation from "@polkadex/orderbook/graphql/mutations";

import {
  createOrderPayload,
  createCancelOrderPayloadSigned,
} from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { TradeAccount } from "@polkadex/orderbook/modules/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const OrdersProvider: T.OrdersComponent = ({ onError, onNotification, children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);
  const profileState = useProfile();

  // Actions
  const onPlaceOrders = async (payload: A.OrderExecuteFetch["payload"]) => {
    try {
      const { side, price, order_type, amount, symbol } = payload;
      const account: UserAccount = profileState.selectedAccount;
      const address = account.tradeAddress;
      const mainAddress = account.mainAddress;
      const keyringPair: TradeAccount = yield select(selectTradeAccount(address));
      const timestamp = getNonce();
      const api = yield select(selectRangerApi);
      const client_order_id = getNewClientId();
      if (address !== "" && keyringPair && api) {
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
        console.info("placed order: ", res);
        if (res.data.place_order) {
          onNotification("Order placed");
          dispatch(A.orderExecuteData());
          dispatch(A.orderExecuteDataDelete());
        }
      }
    } catch (error) {
      console.error("Order Error: ", error);
      dispatch(A.orderExecuteDataDelete());
      const msg =
        typeof error.message === "string" ? error.message : error?.errors[0]?.message;
      const errorText = parseError(msg);
      console.log("msg: ", msg);
      // ignore market liquidity error as there will always be a small qty which cannot be filled
      // due to the step size of the configuration. Its expected even-though order-book throws error
      if (errorText.includes("MarketLiquidityError")) {
        onNotification("Market order placed");
        return;
      }
      onError("Order failed");
    }
  };

  const onCancelOrder = async (payload: A.OrderCancelFetch["payload"]) => {
    try {
      const profileState = useProfile();
      const { orderId, base, quote } = payload;
      const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
      const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;
      const api = yield select(selectRangerApi);
      const account: UserAccount = profileState.selectedAccount;
      const address = account.tradeAddress;
      const keyringPair: TradeAccount = yield select(selectTradeAccount(address));
      if (keyringPair.isLocked) throw new Error("Please unlock your account with password");
      if (address !== "" && keyringPair) {
        const { order_id, account, pair, signature } = createCancelOrderPayloadSigned(
          api,
          keyringPair,
          orderId,
          baseAsset,
          quoteAsset
        );
        const res = await executeCancelOrder([order_id, account, pair, signature], address);
        console.info("cancelled order: ", res);
        dispatch(A.orderCancelData());
        onNotification(`Order cancelled of OrderID: ${orderId}`);
        setTimeout(() => {
          dispatch(A.orderCancelDataDelete());
        }, 1000);
      }
    } catch (error) {
      console.error("cancel order error: ", error);
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      dispatch(A.orderCancelError(error));
    }
  };

  const getNewClientId = () => {
    // 32 byte Uint8Array of random string with "webapp-" prefix
    const client_order_id = new Uint8Array(32);
    client_order_id.set(new TextEncoder().encode("webapp-"));
    for (let i = 9; i < 32; i++) {
      client_order_id[i] = Math.floor(Math.random() * 256);
    }
    return client_order_id;
  };

  const executePlaceOrder = async (orderPayload: any[], proxyAddress: string) => {
    const payloadStr = JSON.stringify({ PlaceOrder: orderPayload });
    console.log("payload: ", payloadStr);
    const res = await sendQueryToAppSync({
      query: mutation.place_order,
      variables: { input: { payload: payloadStr } },
      token: proxyAddress,
    });

    return res;
  };

  const parseError = (msg: any) => {
    if (typeof msg === "string") {
      return msg;
    } else {
      return JSON.stringify(msg);
    }
  };

  const isAssetPDEX = (assetId: string | null | undefined | number): boolean =>
    assetId === "-1" ||
    assetId === null ||
    assetId === -1 ||
    assetId === "POLKADEX" ||
    assetId === "PDEX" ||
    assetId === "polkadex";

  const executeCancelOrder = async (cancelOrderPayload, proxyAddress: string) => {
    const payload = JSON.stringify({ CancelOrder: cancelOrderPayload });
    const res = await sendQueryToAppSync({
      query: mutation.cancel_order,
      variables: { input: { payload } },
      token: proxyAddress,
    });
    return res;
  };

  return (
    <Provider
      value={{
        ...state,
        onPlaceOrders,
        onCancelOrder,
      }}>
      {children}
    </Provider>
  );
};
