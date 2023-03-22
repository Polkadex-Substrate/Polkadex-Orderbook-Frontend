import { useReducer } from "react";
import { Provider } from "./context";
import { initialState, ordersReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { call, put, select } from "redux-saga/effects";

import {
  orderExecuteDataDelete,
  orderExecuteData,
  OrderExecuteFetch,
  selectRangerApi,
  notificationPush,
  selectUsingAccount,
  selectTradeAccount,
  UserAccount,
} from "@polkadex/orderbook/modules/index";

import * as mutation from "@polkadex/orderbook/graphql/mutations";

import { createOrderPayload } from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const OrdersProvider: T.OrdersComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  const onOrdersExecute = (payload: A.OrderExecuteFetch["payload"]) => {
    try {
      const { side, price, order_type, amount, symbol } = payload;
      //   const account: UserAccount = yield select(selectUsingAccount);
      //   const address = account.tradeAddress;
      //   const mainAddress = account.mainAddress;
      //   const keyringPair: TradeAccount = yield select(selectTradeAccount(address));
      //   const timestamp = getNonce();
      //   const api = yield select(selectRangerApi);
      //   const client_order_id = getNewClientId();
      //   if (address !== "" && keyringPair && api) {
      //     const order = createOrderPayload(
      //       api,
      //       address,
      //       order_type,
      //       side,
      //       symbol[0],
      //       symbol[1],
      //       amount,
      //       price,
      //       timestamp,
      //       client_order_id,
      //       mainAddress
      //     );
      //     const signature = signPayload(api, keyringPair, order);
      //     const res = yield call(() => executePlaceOrder([order, signature], address));
      //     console.info("placed order: ", res);
      //     if (res.data.place_order) {
      //       yield put(
      //         notificationPush({
      //           type: "SuccessAlert",
      //           message: {
      //             title: "Order Placed",
      //           },
      //           time: new Date().getTime(),
      //         })
      //       );
      //     }
      //     yield put(orderExecuteData());
      //     yield put(orderExecuteDataDelete());
      //   }
    } catch (error) {
        console.error("order error: ", error);
      //   yield put(orderExecuteDataDelete());
      //   const msg =
      //     typeof error.message === "string" ? error.message : error?.errors[0]?.message;
      //   const errorText = parseError(msg);
      //   console.log("msg: ", msg);
      //   // ignore market liquidity error as there will always be a small qty which cannot be filled
      //   // due to the step size of the configuration. Its expected even-though order-book throws error
      //   if (errorText.includes("MarketLiquidityError")) {
      //     yield put(
      //       notificationPush({
      //         type: "SuccessAlert",
      //         message: {
      //           title: "Market order placed",
      //         },
      //         time: new Date().getTime(),
      //       })
      //     );
      //     return;
      //   }
      //   yield put(
      //     notificationPush({
      //       type: "ErrorAlert",
      //       message: {
      //         title: "Order failed",
      //         description: errorText,
      //       },
      //       time: new Date().getTime(),
      //     })
      //   );
    }
  };

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
