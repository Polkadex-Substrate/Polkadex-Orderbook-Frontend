import { UserAccount } from "./types";

export const getMainAddresssLinkedToTradingAccount = (
  trade_address: string,
  userAccounts: UserAccount[]
) => {
  const account = userAccounts.find(
    ({ tradeAddress }) => tradeAddress?.toLowerCase() === trade_address?.toLowerCase()
  );
  return account ? account.mainAddress : "";
};

export const transformAddress = (address: string, size = 8) => {
  const firstPart = address?.slice(0, size);
  const lastPart = address?.slice(address?.length - size);

  return `${firstPart ?? ""}...${lastPart ?? ""}`;
};
