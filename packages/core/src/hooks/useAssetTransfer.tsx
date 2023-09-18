import { useMutation } from "react-query";
import { Signer } from "@polkadot/types/types";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { isAssetPDEX, signAndSendExtrinsic } from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useExtensionWallet } from "@orderbook/core/providers/user/extensionWallet";

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
      const mainAccount = selectMainAccount(wallet.selectedAccount.mainAddress);
      const tx = isAssetPDEX(asset)
        ? apiState.api.tx.balances.transfer(dest, amount)
        : apiState.api.tx.assets.transfer(asset, dest, amount);

      // TODO: Fix types or Handle Error...
      if (!mainAccount?.signer || mainAccount?.account) return;

      return await signAndSendExtrinsic(
        apiState.api,
        tx,
        mainAccount.signer,
        mainAccount.account.address
      );
    }
  });
};
