import { signAndSendExtrinsic, ExtrinsicResponse } from "@polkadex/web-helpers";
import { InjectedAccount, selectPolkadotWalletApi } from "@polkadex/orderbook-modules";

import { useReduxSelector } from ".";

export const useExtrinsics = (mainAccount: InjectedAccount) => {
  const api = useReduxSelector(selectPolkadotWalletApi);

  const getInjectorFromExtension = async () => {
    const { web3FromSource } = await import("@polkadot/extension-dapp");
    const injector = await web3FromSource(mainAccount.meta.source);
    return injector;
  };

  const sendOcexRegisterExtrinsic = async (): Promise<ExtrinsicResponse> => {
    const injector = await getInjectorFromExtension();
    const extrinsic = api.tx.polkadexOcex.register(mainAccount.address);
    const resp = await signAndSendExtrinsic(extrinsic, injector, mainAccount.address);
    return resp;
  };
  const sendOcexAddProxyExtrinsic = async (
    proxyAddress: string
  ): Promise<ExtrinsicResponse> => {
    const injector = await getInjectorFromExtension();
    const extrinsic = api.tx.polkadexOcex.addProxy(mainAccount.address, proxyAddress);
    const resp = signAndSendExtrinsic(extrinsic, injector, mainAccount.address);
    return resp;
  };
  const sendOcexDepositExtrinsic = async (asset): Promise<ExtrinsicResponse> => {
    const injector = await getInjectorFromExtension();
    const extrinsic = api.tx.polkadexOcex.deposit(
      mainAccount.address,
      { [asset]: null },
      500000
    );
    const resp = signAndSendExtrinsic(extrinsic, injector, mainAccount.address);
    return resp;
  };
  return {
    sendOcexRegisterExtrinsic,
    sendOcexAddProxyExtrinsic,
    sendOcexDepositExtrinsic,
  };
};
