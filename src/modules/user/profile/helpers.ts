import { UserAccount } from "./actions";

export const getMainAddresssLinkedToTradingAccount = (
  trade_address: string,
  userAccounts: UserAccount[]
) => {
  const account = userAccounts.find(
    ({ tradeAddress }) => tradeAddress?.toLowerCase() === trade_address?.toLowerCase()
  );
  return account ? account.mainAddress : "";
};

export const transformAddress = (address: string) => {
  const firstPart = address.substring(0, 12);
  const lastPart = address.substring(37, address.length);

  return `${firstPart}...${lastPart}`
}
