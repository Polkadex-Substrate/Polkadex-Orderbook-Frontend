import { stringToHex } from "@polkadot/util";

import { InjectedAccount } from "src/modules/user/polkadotWallet";

export const signMessageUsingMainAccount = async (
  account: InjectedAccount,
  payload: string
): Promise<string> => {
  const { web3FromSource } = await import("@polkadot/extension-dapp");
  const injector = await web3FromSource(account.meta.source);
  const signRaw = injector?.signer?.signRaw;
  if (signRaw) {
    // after making sure that signRaw is defined
    // we can use it to sign our message
    const { signature } = await signRaw({
      address: account.address,
      data: stringToHex(payload),
      type: "bytes",
    });
    return signature;
  } else {
    throw new Error("signRaw is not defined");
  }
};
