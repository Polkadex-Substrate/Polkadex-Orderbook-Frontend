import * as mutation from "@polkadex/orderbook/graphql/mutations";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export const getNewClientId = () => {
  // 32 byte Uint8Array of random string with "webapp-" prefix
  const clientOrderId = new Uint8Array(32);
  clientOrderId.set(new TextEncoder().encode("webapp-"));
  for (let i = 9; i < 32; i++) {
    clientOrderId[i] = Math.floor(Math.random() * 256);
  }
  return clientOrderId;
};

export const executePlaceOrder = async (orderPayload: any[], proxyAddress: string) => {
  const payloadStr = JSON.stringify({ PlaceOrder: orderPayload });
  const res = await sendQueryToAppSync({
    query: mutation.place_order,
    variables: { input: { payload: payloadStr } },
    token: proxyAddress,
  });

  return res;
};

export const parseError = (msg: unknown) => {
  if (typeof msg === "string") {
    return msg;
  } else {
    return JSON.stringify(msg);
  }
};

export const executeCancelOrder = async (cancelOrderPayload, proxyAddress: string) => {
  const payload = JSON.stringify({ CancelOrder: cancelOrderPayload });
  const res = await sendQueryToAppSync({
    query: mutation.cancel_order,
    variables: { input: { payload } },
    token: proxyAddress,
  });
  return res;
};
