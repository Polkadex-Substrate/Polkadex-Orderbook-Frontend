import { web3FromSource } from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";

import { InjectedAccount } from "src/modules/user/polkadotWallet";

export interface ISignPayload {
  main_address: string;
  proxy_address: string;
}
export const signMessageUsingMain = async (
  account: InjectedAccount,
  payload: ISignPayload
): Promise<string> => {
  const injector = await web3FromSource(account.meta.source);
  const message = JSON.stringify(payload);
  const signRaw = injector?.signer?.signRaw;
  if (signRaw) {
    // after making sure that signRaw is defined
    // we can use it to sign our message
    const { signature } = await signRaw({
      address: account.address,
      data: stringToHex(message),
      type: "bytes",
    });
    return signature;
  } else {
    throw new Error("signRaw is not defined");
  }
};
