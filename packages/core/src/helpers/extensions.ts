import { ExtensionAccount } from "@polkadex/react-providers";

export const getFundingAccountDetail = (
  userMainAccount: string,
  extensionMainAccount: ExtensionAccount[]
) =>
  extensionMainAccount?.find(
    (account) =>
      account.address?.toLowerCase() === userMainAccount?.toLowerCase()
  );
