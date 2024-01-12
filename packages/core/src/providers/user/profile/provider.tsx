import { useCallback, useEffect, useState } from "react";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import {
  useUserAccounts,
  useExtensionAccounts,
} from "@polkadex/react-providers";
import { getMainAccountLinkedToProxy } from "@orderbook/core/providers/user/profile/helpers";
import { useProxyAccounts } from "@orderbook/core/hooks";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";

import * as LOCAL_STORE from "./localstore";
import { Provider } from "./context";
import * as T from "./types";

export const ProfileProvider: T.ProfileComponent = ({ children }) => {
  const [activeAccount, setActiveAccount] = useState<T.UserAddressTuple>({
    mainAddress: "",
    tradeAddress: "",
  });
  const [favoriteMarkets, setFavoriteMarkets] = useState<string[]>([]);
  const [isBannerShown, setIsBannerShown] = useState<boolean>(false);
  const [selectedExtension, setSelectedExtension] = useState<
    (typeof ExtensionsArray)[0] | null
  >(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { localAddresses } = useUserAccounts();
  const { onHandleError } = useSettingsProvider();
  const { extensionAccounts } = useExtensionAccounts();

  // sync all tradeAddresses state with extension
  const { allProxiesAccounts: allAccounts } =
    useProxyAccounts(extensionAccounts);

  const onUserSelectTradingAddress = async ({
    tradeAddress,
    isNew,
  }: {
    tradeAddress: string;
    isNew?: boolean;
  }) => {
    const _tradeAddress = localAddresses.find(
      (address) => address === tradeAddress
    );
    if (!_tradeAddress && !isNew) {
      // TODO: move error to translation
      onHandleError("Invalid trade Address");
      return;
    }
    const maxAttempts = 15;
    // TODO: Temp solution, backend issue
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const mainAddress = await getMainAccountLinkedToProxy(tradeAddress);
        if (!mainAddress)
          // TODO: move error to translation
          throw new Error("No main account linked to this trade address");

        LOCAL_STORE.setLastUsedAccount({ mainAddress, tradeAddress });
        setActiveAccount({ mainAddress, tradeAddress });
        break;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
      }
      if (attempt < maxAttempts)
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  };

  const onUserSelectMainAddress = async ({ mainAddress: string }) => {
    const mainAccount = extensionAccounts.find((acc) => acc.address === string);
    if (!mainAccount) {
      onHandleError("Invalid main Address");
      return;
    }
    LOCAL_STORE.setLastUsedAccount({
      tradeAddress: "", // TODO: we can set this the first local account linked to this main account
      mainAddress: mainAccount.address,
    });
    setActiveAccount({ tradeAddress: "", mainAddress: mainAccount.address });
  };

  const onUserResetMainAddress = () => {
    setActiveAccount((prev) => {
      LOCAL_STORE.setLastUsedAccount({ ...prev, mainAddress: "" });
      return { ...prev, mainAddress: "" };
    });
  };

  const onUserResetTradingAddress = () => {
    setActiveAccount((prev) => {
      LOCAL_STORE.setLastUsedAccount({ ...prev, tradeAddress: "" });
      return { ...prev, tradeAddress: "" };
    });
  };

  const onUserLogout = () => {
    LOCAL_STORE.setLastUsedAccount({ mainAddress: "", tradeAddress: "" });
    setActiveAccount({ mainAddress: "", tradeAddress: "" });
  };

  const onUserChangeInitBanner = (payload = false) => {
    setIsBannerShown(payload);
  };

  const onUserSetAvatar = (payload?: string) => {
    setAvatar(payload || null);
    payload && LOCAL_STORE.setAvatar(payload);
  };

  const onResetSelectedExtension = () => {
    setSelectedExtension(null);
  };

  const onUserFavoriteMarketPush = (payload: string) => {
    const shouldInclude = !favoriteMarkets.includes(payload);
    const newFavoriteMarkets = shouldInclude
      ? [...favoriteMarkets, payload]
      : favoriteMarkets.filter((favoriteMarket) => favoriteMarket !== payload);
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

  // Select extension if user is logged in
  useEffect(() => {
    if (activeAccount?.mainAddress) {
      const sourceExtension = extensionAccounts?.find(
        (acc) => acc.address === activeAccount?.mainAddress
      )?.source;
      const extension = ExtensionsArray?.find(
        (value) => value.id === sourceExtension
      );
      extension && setSelectedExtension(extension);
    }
  }, [activeAccount?.mainAddress, extensionAccounts, selectedExtension]);

  const getSigner = useCallback(
    (address: string) => {
      return extensionAccounts.find((acc) => acc.address === address)?.signer;
    },
    [extensionAccounts]
  );

  return (
    <Provider
      value={{
        onUserSelectTradingAddress,
        selectedAddresses: activeAccount,
        onUserSelectMainAddress,
        selectedExtension,
        setSelectedExtension,
        allAccounts,
        favoriteMarkets,
        isBannerShown,
        getSigner, // TODO: to be moved to extension provider
        avatar,
        onResetSelectedExtension,
        onUserLogout,
        onUserResetMainAddress,
        onUserResetTradingAddress,
        onUserChangeInitBanner,
        onUserSetAvatar,
        onUserFavoriteMarketPush,
      }}
    >
      {children}
    </Provider>
  );
};
