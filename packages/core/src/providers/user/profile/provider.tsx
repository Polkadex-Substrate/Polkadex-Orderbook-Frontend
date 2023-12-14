import { useCallback, useEffect, useState } from "react";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import {
  useUserAccounts,
  useExtensionAccounts,
} from "@polkadex/react-providers";
import {
  getAllProxyAccounts,
  getMainAccountLinkedToProxy,
} from "@orderbook/core/providers/user/profile/helpers";

import * as LOCAL_STORE from "./localstore";
import { Provider } from "./context";
import * as T from "./types";
import { UserAccount } from "./types";
export const ProfileProvider: T.ProfileComponent = ({ children }) => {
  const [activeAccount, setActiveAccount] = useState<T.UserAccount>({
    mainAddress: "",
    tradeAddress: "",
  });
  const [allAccounts, setAllAccounts] = useState<UserAccount[]>([]);
  const [favoriteMarkets, setFavoriteMarkets] = useState<string[]>([]);
  const [isBannerShown, setIsBannerShown] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { userAddresses } = useUserAccounts();
  const { onHandleError } = useSettingsProvider();
  const { extensionAccounts } = useExtensionAccounts();

  const onUserSelectAccount = async ({ tradeAddress: string }) => {
    const tradeAddress = userAddresses.find((address) => address === string);
    if (!tradeAddress) {
      // TODO: move error to translation
      onHandleError("Invalid trade Address");
      return;
    }
    const mainAddress = await getMainAccountLinkedToProxy(tradeAddress);
    if (!mainAddress) {
      // TODO: move error to translation
      onHandleError("No main account linked to this trade address");
    }
    LOCAL_STORE.setLastUsedAccount({ mainAddress, tradeAddress });
    setActiveAccount({ mainAddress, tradeAddress });
  };

  const onUserLogout = () => {
    setActiveAccount({ mainAddress: "", tradeAddress: "" });
  };

  const onUserChangeInitBanner = (payload = false) => {
    setIsBannerShown(payload);
  };

  const onUserSetAvatar = (payload?: string) => {
    setAvatar(payload || null);
    payload && LOCAL_STORE.setAvatar(payload);
  };

  const onUserFavoriteMarketPush = (payload: string) => {
    if (favoriteMarkets.includes(payload)) return;
    const newFavoriteMarkets = [...favoriteMarkets, payload];
    // remove duplicates
    setFavoriteMarkets(newFavoriteMarkets);
    LOCAL_STORE.setFavoriteMarkets(newFavoriteMarkets);
  };

  // sync state with localstorage
  useEffect(() => {
    const lastUsedAccount = LOCAL_STORE.getLastUsedAccount();
    if (lastUsedAccount) {
      setActiveAccount(lastUsedAccount);
    }
    const favoriteMarkets = LOCAL_STORE.getFavoriteMarkets();
    if (favoriteMarkets) {
      setFavoriteMarkets(favoriteMarkets);
    }
    const avatar = LOCAL_STORE.getAvatar();
    if (avatar) {
      setAvatar(avatar);
    }
  }, []);

  // sync all tradeAddresses state with extension
  useEffect(() => {
    getAllProxyAccounts(extensionAccounts.map(({ address }) => address)).then(
      (accounts) => {
        setAllAccounts(accounts);
      }
    );
  }, [extensionAccounts]);

  const getSigner = useCallback(
    (address: string) => {
      return extensionAccounts.find((acc) => acc.address === address)?.signer;
    },
    [extensionAccounts]
  );

  return (
    <Provider
      value={{
        onUserSelectAccount,
        selectedAddresses: activeAccount,
        allAccounts,
        favoriteMarkets,
        isBannerShown,
        getSigner, // TODO: to be moved to extension provider
        avatar,
        onUserLogout,
        onUserChangeInitBanner,
        onUserSetAvatar,
        onUserFavoriteMarketPush,
      }}
    >
      {children}
    </Provider>
  );
};
