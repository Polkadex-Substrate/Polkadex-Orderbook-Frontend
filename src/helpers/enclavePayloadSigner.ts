import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { u8aToHex } from "@polkadot/util";

export type SignedOrderPayload = {
  Sr25519: string;
};
export const signPayload = (
  api: ApiPromise,
  userKeyring: KeyringPair,
  payload: Codec
): SignedOrderPayload => {
  const signatureU8 = userKeyring.sign(payload.toU8a(), { withType: true });
  const signature = u8aToHex(signatureU8);
  const multiSignature: any = api.createType("MultiSignature", signature);
  const multisignature = {
    Sr25519: multiSignature.toJSON().sr25519.slice(2),
  };
  return multisignature;
};
