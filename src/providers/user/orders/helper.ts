import * as mutation from "@polkadex/orderbook/graphql/mutations";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export const getNewClientId = () => {
  // 32 byte Uint8Array of random string with "webapp-" prefix
  const client_order_id = new Uint8Array(32);
  client_order_id.set(new TextEncoder().encode("webapp-"));
  for (let i = 9; i < 32; i++) {
    client_order_id[i] = Math.floor(Math.random() * 256);
  }
  return client_order_id;
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

export const parseError = (msg: any) => {
  if (typeof msg === "string") {
    return msg;
  } else {
    return JSON.stringify(msg);
  }
};

export const isAssetPDEX = (assetId: string | null | undefined | number): boolean =>
  assetId === "-1" ||
  assetId === null ||
  assetId === -1 ||
  assetId === "POLKADEX" ||
  assetId === "PDEX" ||
  assetId === "polkadex";

export const executeCancelOrder = async (cancelOrderPayload, proxyAddress: string) => {
  const payload = JSON.stringify({ CancelOrder: cancelOrderPayload });
  const res = await sendQueryToAppSync({
    query: mutation.cancel_order,
    variables: { input: { payload } },
    token: proxyAddress,
  });
  return res;
};
