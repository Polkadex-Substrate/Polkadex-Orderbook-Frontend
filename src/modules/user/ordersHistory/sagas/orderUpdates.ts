import { put } from "redux-saga/effects";

import { OrderUpdateEvent, orderUpdateEventData } from "../actions";
import { SetOrder } from "../types";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { OrderCommon } from "@polkadex/orderbook/modules/types";
import { Utils } from "@polkadex/web-helpers";

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
  const base =
    eventData.pair.base_asset === "polkadex" ? "PDEX" : eventData.pair.base_asset.asset;
  const quote =
    eventData.pair.quote_asset === "polkadex" ? "PDEX" : eventData.pair.quote_asset.asset;
  return {
    main_account: eventData.user,
    id: eventData.id.toString(),
    client_order_id: eventData.client_order_id,
    time: new Date().toISOString(),
    m: `${base}-${quote}`, // marketid
    side: eventData.side,
    order_type: eventData.order_type,
    status: eventData.status,
    price: Utils.decimals.formatToNumber(eventData.price),
    qty: Utils.decimals.formatToNumber(eventData.qty),
    avg_filled_price: Utils.decimals.formatToString(eventData.avg_filled_price),
    filled_quantity: Utils.decimals.formatToString(eventData.filled_quantity),
    fee: Utils.decimals.formatToString(eventData.fee),
  };
}
