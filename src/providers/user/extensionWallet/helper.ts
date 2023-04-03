import { ExtensionAccount } from "@polkadex/orderbook/providers/types";
import * as T from "./types";

export const userMainAccountDetails = (
  userMainAccount: string,
  extensionMainAccount: ExtensionAccount[]
) =>
  extensionMainAccount?.find(
    ({ account }) => account.address?.toLowerCase() === userMainAccount?.toLowerCase()
  );

export const selectIsAddressInExtension = (
  address: string,
  allAccounts: T.ExtensionWalletState["allAccounts"]
): boolean => {
  return address && allAccounts?.some(({ account }) => account?.address === address);
};
