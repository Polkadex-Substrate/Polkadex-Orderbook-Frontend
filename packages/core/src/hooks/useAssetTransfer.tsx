import { useMutation } from "react-query";
import { Signer } from "@polkadot/types/types";

import { useNativeApi } from "@/providers/public/nativeApi";
import { isAssetPDEX, signAndSendExtrinsic } from "@/helpers";
import { useProfile } from "@/providers/user/profile";
import { useExtensionWallet } from "@/providers/user/extensionWallet";

interface AssetTransferParams {
  asset: string;
  dest: string;
  amount: string;
  signer: Signer;
}

export const useAssetTransfer = () => {
  const apiState = useNativeApi();
  const { selectMainAccount } = useExtensionWallet();
  const wallet = useProfile();
  return useMutation(async ({ asset, dest, amount }: AssetTransferParams) => {
    if (apiState.api && wallet.selectedAccount) {
      const { account, signer } = selectMainAccount(
        wallet.selectedAccount.mainAddress
      );
      let tx;
      if (isAssetPDEX(asset)) {
        tx = apiState.api.tx.balances.transfer(dest, amount);
      } else {
        tx = apiState.api.tx.assets.transfer(asset, dest, amount);
      }
      return await signAndSendExtrinsic(
        apiState.api,
        tx,
        signer,
        account.address
      );
    }
  });
};
