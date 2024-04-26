import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { u8aToHex } from "@polkadot/util";

export type SignatureEnumSr25519 = {
  Sr25519: string;
};
export const signPayload = (
  userKeyring: KeyringPair,
  payload: Codec
): SignatureEnumSr25519 => {
  const signatureU8 = userKeyring.sign(payload.toU8a(), { withType: true });
  const signature = u8aToHex(signatureU8);
  return {
    Sr25519: signature.slice(2),
  };
};
