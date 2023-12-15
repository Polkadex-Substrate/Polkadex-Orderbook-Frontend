import { Keyring } from "@polkadot/api";

export const getAddressFromMnemonic = (mnemonic: string) => {
  const keyring = new Keyring({ type: "sr25519", ss58Format: 88 });
  const pair = keyring.createFromUri(mnemonic);
  return pair.address;
};
