import { useReducer } from "react";
import { Provider } from "./context";
import { tradeWalletReducer, initialState } from "./reducer";
import { KeyringPair } from "@polkadot/keyring/types";
import keyring from "@polkadot/ui-keyring";
import { transformAddress } from "../profile/helpers";
import FileSaver from "file-saver";
import { isReady } from "@polkadot/wasm-crypto";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";

import * as T from "./types";
import * as A from "./actions";
import { TradeAccount } from "../../types";
import { useProfile } from "../profile";
import { useNativeApi } from "../../public/nativeApi";
import { useExtensionWallet } from "../extensionWallet";
import { mnemonicGenerate } from "@polkadot/util-crypto";

export const TradeWalletProvider: T.TradeWalletComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(tradeWalletReducer, initialState);
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const extensionWalletState = useExtensionWallet();

  // Actions
  const onExportTradeAccount = (payload: A.ExportTradeAccountFetch["payload"]) => {
    const { address, password = "" } = payload;
    const selectedAccount: KeyringPair = state.allBrowserAccounts.find(
      (account) => account?.address?.toLowerCase() === address?.toLowerCase()
    );

    try {
      const pairToJson = keyring.backupAccount(selectedAccount, password);
      selectedAccount.lock();

      const blob = new Blob([JSON.stringify(pairToJson)], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(
        blob,
        `${selectedAccount?.meta?.name}-${transformAddress(selectedAccount?.address)}.json`
      );
    } catch (error) {
      onError("Cannot export this account due to Incorrect Password");
    } finally {
      dispatch(A.exportTradeAccountData());
    }
  };

  const onImportTradeAccountJson = (payload: A.ImportTradeAccountJsonFetch["payload"]) => {
    const { file, password } = payload;
    let tradeAddress = "";
    try {
      const modifiedFile = file;
      const pair = keyring.restoreAccount(modifiedFile, password);
      tradeAddress = pair?.address;
      dispatch(A.tradeAccountPush({ pair }));
      dispatch(
        A.registerTradeAccountData({
          account: {
            name: String(pair.meta?.name),
            address: tradeAddress,
          },
        })
      );
      dispatch(A.importTradeAccountData());
      profileState.onUserSelectAccount({ tradeAddress });
    } catch (error) {
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      dispatch(A.registerTradeAccountError(error));
      onError("Cannot import account. Invalid password or file");
    }
  };

  const onImportTradeAccount = (payload: A.ImportTradeAccountFetch["payload"]) => {
    const { mnemonic, name, password } = payload;
    let tradeAddress = "";
    try {
      const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
        name: name,
      });
      tradeAddress = pair?.address;
      dispatch(A.tradeAccountPush({ pair }));
      setTimeout(() => {
        dispatch(
          A.registerTradeAccountData({
            mnemonic,
            account: {
              name,
              address: tradeAddress,
            },
          })
        );
        dispatch(A.importTradeAccountData());
      }, 2000);
    } catch (error) {
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      if (typeof onError === "function")
        onError("Can not import account. Please check your mnemonic");
      dispatch(A.tradeAccountsError(error));
    }
  };

  const onLoadTradeAccounts = async () => {
    try {
      await loadKeyring();
      const allBrowserAccounts: TradeAccount[] = await getAllTradeAccountsInBrowser();
      dispatch(A.tradeAccountsData({ allAccounts: allBrowserAccounts }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
    }
  };

  async function loadKeyring() {
    const { cryptoWaitReady } = await import("@polkadot/util-crypto");
    if (!isReady()) await cryptoWaitReady();
  }

  async function getAllTradeAccountsInBrowser(): Promise<TradeAccount[]> {
    await loadKeyring();
    const allAccounts = keyring.getPairs();
    return allAccounts;
  }

  const onTradeAccountUpdate = (payload: A.TradeAccountUpdate["payload"]) => {
    try {
      const { proxy, main } = payload;
      profileState.onUserSelectAccount({
        tradeAddress: proxy,
      });
      onNotification("Trade account added");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const onRegisterTradeAccount = async (payload: A.RegisterTradeAccountFetch["payload"]) => {
    let tradeAddress: string;
    try {
      const api = nativeApiState.api;
      const controllerWallets = extensionWalletState.allAccounts;
      const { password, name, address } = payload;
      const mnemonic = mnemonicGenerate();
      const { account, signer } = controllerWallets.find(
        ({ account }) => account.address === address
      );
      const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
        name,
      });
      tradeAddress = pair.address;
      const res = await addProxyToAccount(api, tradeAddress, signer, account?.address);

      if (res.isSuccess) {
        dispatch(A.tradeAccountPush({ pair }));

        profileState.onUserProfileAccountPush({ tradeAddress, mainAddress: address });
        setTimeout(() => {
          dispatch(
            A.registerTradeAccountData({
              mnemonic,
              account: {
                name,
                address: tradeAddress,
              },
            })
          );
        }, 2000);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const addProxyToAccount = async (
    api: ApiPromise,
    proxyAddress: string,
    signer: Signer,
    mainAddress: string
  ): Promise<ExtrinsicResult> => {
    const ext = api.tx.ocex.addProxyAccount(proxyAddress);
    const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
    return res;
  };

  const onRemoveProxyAccountFromChain = async (
    payload: A.RemoveProxyAccountFromChainFetch["payload"]
  ) => {
    try {
      const profileState = useProfile();
      const nativeApiState = useNativeApi();
      const api: ApiPromise = nativeApiState.api;
      const { address: tradeAddress } = payload;
      const linkedMainAddress =
        tradeAddress &&
        profileState.userData?.userAccounts?.find(
          ({ tradeAddress }) => tradeAddress === tradeAddress
        )?.mainAddress;

      if (!linkedMainAddress) {
        throw new Error("Invalid trade address.");
      }
      const { account, signer } =
        linkedMainAddress &&
        extensionWalletState.allAccounts?.find(
          ({ account }) => account?.address?.toLowerCase() === linkedMainAddress?.toLowerCase()
        );

      if (!account?.address) {
        throw new Error("Please select a funding account!");
      }
      if (api.isConnected && account?.address) {
        const res = await removeProxyFromAccount(api, tradeAddress, signer, account.address);
        if (res.isSuccess) {
          onNotification(
            "Congratulations!Your trade account has been removed from the chain!"
          );
          dispatch(A.previewAccountModalCancel());
          dispatch(A.removeProxyAccountFromChainData({ address: payload.address }));
          dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
          profileState.onUserProfileTradeAccountDelete(tradeAddress);
        } else {
          throw new Error(res.message);
        }
      }
    } catch (error) {
      dispatch(A.removeProxyAccountFromChainData({ address: payload.address }));
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const removeProxyFromAccount = async (
    api: ApiPromise,
    proxyAddress: string,
    signer: Signer,
    mainAddress: string
  ): Promise<ExtrinsicResult> => {
    const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
    const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
    return res;
  };

  const onRegisterTradeAccountReset = () => {
    dispatch(A.registerTradeAccountReset());
  };

  const onRegisterTradeAccountData = (payload: T.RegisterTradeAccountData) => {
    dispatch(A.registerTradeAccountData(payload));
  };

  const onRemoveTradeAccountFromBrowser = (address: string) => {
    dispatch(A.removeTradeAccountFromBrowser({ address }));
  };

  const onUnlockTradeAccount = (payload: A.UnlockTradeAccount["payload"]) => {
    dispatch(A.unlockTradeAccount(payload));
  };

  const onTradeAccountPush = (payload: A.TradeAccountPush["payload"]) => {
    dispatch(A.tradeAccountPush(payload));
  };

  const onRegisterAccountModalActive = (
    payload?: A.RegisterTradeAccountModalActive["payload"]
  ) => {
    dispatch(A.registerAccountModalActive(payload));
  };

  const onRegisterAccountModalCancel = () => {
    dispatch(A.registerAccountModalCancel());
  };

  const onPreviewAccountModalActive = (
    payload?: A.PreviewTradeAccountModalActive["payload"]
  ) => {
    dispatch(A.previewAccountModalActive(payload));
  };

  const onPreviewAccountModalCancel = () => {
    dispatch(A.previewAccountModalCancel());
  };

  const onExportTradeAccountActive = () => {
    dispatch(A.exportTradeAccountActive());
  };

  return (
    <Provider
      value={{
        ...state,
        onExportTradeAccount,
        onImportTradeAccountJson,
        onImportTradeAccount,
        onLoadTradeAccounts,
        onTradeAccountUpdate,
        onRegisterTradeAccount,
        onRemoveProxyAccountFromChain,
        onRegisterTradeAccountReset,
        onRegisterTradeAccountData,
        onRemoveTradeAccountFromBrowser,
        onUnlockTradeAccount,
        onTradeAccountPush,
        onRegisterAccountModalActive,
        onRegisterAccountModalCancel,
        onPreviewAccountModalActive,
        onPreviewAccountModalCancel,
        onExportTradeAccountActive,
      }}>
      {children}
    </Provider>
  );
};
