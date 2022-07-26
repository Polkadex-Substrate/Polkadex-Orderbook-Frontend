import { ApiPromise } from "@polkadot/api";
import { API } from "aws-amplify";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { findUserByProxyAccount } from "@polkadex/orderbook/graphql/queries";

export const getMainAddrFromUserByProxyAccountRes = (s: string) => {
  /*
    eg of "s" := "{main_account=proxy-esoaqNF2F77yp1q5PxUdghRiCNnbHHLVkhmqh7E6pBoBMX4Jx, item_type=eso5pshyDhzejRpiVmq7qwCnFZGXxDZY28XSbMVpbC9Junpaw}"
    here, item_type is the main_account address.
  */
  const n = s.length;
  // slice "{ }" values from the ends
  s = s.slice(2, n - 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, b] = s.split(",");
  const main_addr = b.split("=")[1];
  return main_addr;
};

export const checkIfMainAccountExists = async (api: ApiPromise, address: string) => {
  const res = await api.query.ocex.accounts(address);
  const resJson = res.toJSON();
  return resJson !== null;
};

export const addProxyToAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};

export const registerAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};

export const checkIfProxyAccountRegistered = async (address: string) => {
  const res: any = await API.graphql({
    query: findUserByProxyAccount,
    variables: { proxy_account: address },
  });
  if (res.data?.findUserByProxyAccount.items.length === 0) {
    throw new Error("This proxy account has not been registered yet!");
  }
  const queryResStr = res.data?.findUserByProxyAccount.items[0];
  const main_addr = getMainAddrFromUserByProxyAccountRes(queryResStr);
  if (!main_addr) {
    throw new Error("This proxy account has not been registered yet!");
  }
};
