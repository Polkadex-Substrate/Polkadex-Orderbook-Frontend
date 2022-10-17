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

  return `${firstPart}...${lastPart}`;
};

export const saveTradeAccountsToLocalCache = (account: {
  tradeAddress: string;
  mainAddress: string;
}) => {
  const id = "userTradingAccounts";
  const userTradingAccounts = window.localStorage.getItem(id);
  if (userTradingAccounts) {
    const userTradingAccJson: Array<{ tradeAddress: string; mainAddress: string; isActive: boolean }> =
      JSON.parse(userTradingAccounts);
    let isTradingAccountPresent = null;
    userTradingAccJson.forEach((acc) => {
      if (acc.tradeAddress.toLowerCase() === account.tradeAddress.toLowerCase()) {
        isTradingAccountPresent = true;
        acc.isActive = true;
      } else {
        acc.isActive = false;
      }
    });
    if (!isTradingAccountPresent) {
      userTradingAccJson.unshift({ ...account, isActive: true });
    }
    userTradingAccJson.splice(3);
  }

  window.localStorage.setItem(
    id,
    userTradingAccounts ? JSON.stringify(userTradingAccounts) : "[]"
  );
};
