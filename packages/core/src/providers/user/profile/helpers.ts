import { UserAccount } from "./types";

export const getMainAddresssLinkedToTradingAccount = (
  tradeaddress: string,
  userAccounts: UserAccount[],
) => {
  const account = userAccounts?.find(
    ({ tradeAddress }) =>
      tradeAddress?.toLowerCase() === tradeaddress?.toLowerCase(),
  );
  return account ? account.mainAddress : "";
};

export const transformAddress = (address: string, size = 8) => {
  const firstPart = address?.slice(0, size);
  const lastPart = address?.slice(address?.length - size);

  return `${firstPart ?? ""}...${lastPart ?? ""}`;
};
