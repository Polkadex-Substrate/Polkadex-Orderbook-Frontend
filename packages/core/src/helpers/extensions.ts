import { ExtensionAccount } from "@polkadex/react-providers";
import { Signer } from "@polkadot/types/types";
import { ApiPromise } from "@polkadot/api";
import {
  AddToTxQueue,
  ExtrinsicResult,
  signAndSendExtrinsic,
} from "@orderbook/core/helpers";

export const getFundingAccountDetail = (
  userMainAccount: string,
  extensionMainAccount: ExtensionAccount[]
) =>
  extensionMainAccount?.find(
    (account) =>
      account.address?.toLowerCase() === userMainAccount?.toLowerCase()
  );

export const registerMainAccount = async (
  addToTxQueue: AddToTxQueue,
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string,
  assetId?: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    addToTxQueue,
    api,
    ext,
    { signer },
    mainAddress,
    true,
    assetId
  );
  return res;
};
