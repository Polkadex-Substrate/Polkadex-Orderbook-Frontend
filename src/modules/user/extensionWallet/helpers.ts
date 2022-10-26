import { ExtensionAccount } from "../../types";

export const userMainAccountDetails = (
  userMainAccount: string,
  extensionMainAccount: ExtensionAccount[]
) =>
  extensionMainAccount?.find(
    ({ account }) => account.address?.toLowerCase() === userMainAccount?.toLowerCase()
  );
