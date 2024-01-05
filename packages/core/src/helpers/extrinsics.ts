import {
  ExtrinsicResult,
  signAndSendExtrinsic,
} from "@orderbook/core/helpers/signAndSendExtrinsic";
import { Signer } from "@polkadot/types/types";
import { ApiPromise } from "@polkadot/api";

export const addProxyToAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true
  );
  return res;
};

export const removeProxyFromAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true
  );
  return res;
};
