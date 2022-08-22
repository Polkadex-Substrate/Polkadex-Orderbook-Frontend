import { stringToHex } from "@polkadot/util";

export const signWithExtension = async (message: string, injector, address: string) => {
  const signRaw = injector?.signer?.signRaw;
  if (signRaw) {
    const { signature } = await signRaw({
      address: address,
      data: stringToHex(message),
      type: "bytes",
    });
    return signature;
  } else throw new Error("could not find injectected account");
};
