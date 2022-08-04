import { put } from "redux-saga/effects";

import { OrderUpdateEvent, orderUpdateEventData } from "../actions";
import { SetOrder } from "../types";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { OrderCommon } from "@polkadex/orderbook/modules/types";

export function* orderUpdatesSaga(action: OrderUpdateEvent) {
  try {
    const order = processOrderData(action.payload);
    yield put(orderUpdateEventData(order));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (order updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function processOrderData(eventData: SetOrder): OrderCommon {
  return {
    main_account: eventData.user,
    id: eventData.id.toString(),
    client_order_id: eventData.client_order_id,
    time: new Date().toISOString(),
    m: eventData.event_id.toString(), // marketid
    side: eventData.side,
    order_type: eventData.order_type,
    status: eventData.status,
    price: eventData.price.toString(),
    qty: eventData.qty.toString(),
    avg_filled_price: eventData.avg_filled_price.toString(),
    filled_quantity: eventData.filled_quantity.toString(),
    fee: eventData.fee.toString(),
  };
}
