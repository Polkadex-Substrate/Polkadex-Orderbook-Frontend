import keyring from "@polkadot/ui-keyring";

import { getIsTradeAccountPasswordProtected } from "@polkadex/orderbook/helpers/localStorageHelpers";

export const unlockAccountIfNotLocked = (address: string) => {
  const isProtected = getIsTradeAccountPasswordProtected(address);
  if (!isProtected) {
    const pair = keyring.getPair(address);
    pair.unlock("");
  }
};
