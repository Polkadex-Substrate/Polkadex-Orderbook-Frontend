import { stringToU8a, u8aToHex } from "@polkadot/util";
import { KeyringPair } from "@polkadot/keyring/types";

export const signMessage = async (
  userKeyring: KeyringPair,
  payload: string
): Promise<string> => {
  const message = stringToU8a(payload);
  const signature = userKeyring.sign(message);
  return u8aToHex(signature);
};
