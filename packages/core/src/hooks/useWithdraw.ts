import { useMutation } from "@tanstack/react-query";
import { useNativeApi } from "@orderbook/core/providers/public//nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  createWithdrawSigningPayload,
  signPayload,
} from "@orderbook/core/helpers";
import {
  useExtensionAccounts,
  useUserAccounts,
} from "@polkadex/react-providers";
import { KeyringPair } from "@polkadot/keyring/types";
import { Codec } from "@polkadot/types/types";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";
import { appsyncOrderbookService } from "../utils/orderbookService";

type WithdrawArgs = {
  asset: string;
  amount: string | number;
};

export const useWithdraw = () => {
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const { wallet } = useUserAccounts();
  const { isReady } = useOrderbookService();
  const { extensionAccounts } = useExtensionAccounts();

  const mainAccountSigner = extensionAccounts.find(
    (account) => account.address === mainAddress
  )?.signer;

  const { mutateAsync, status } = useMutation({
    mutationFn: async ({ asset, amount }: WithdrawArgs) => {
      if (!isReady) throw new Error("Orderbook service not initialized");

      if (!api || !api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const keyringPair = wallet.getPair(tradeAddress);
      const isTradingAccountPresent =
        tradeAddress?.trim().length === 0 || !keyringPair;
      if (!mainAccountSigner && isTradingAccountPresent)
        throw new Error("Invalid Trading Account");

      const isSignedByExtension = !isTradingAccountPresent;
      const payload = { asset_id: { asset }, amount };

      const signingPayload = createWithdrawSigningPayload(
        {
          asset,
          amount,
        },
        api,
        isSignedByExtension
      );
      let signature: { Sr25519: string };
      if (isSignedByExtension) {
        const result = await mainAccountSigner.signRaw({
          data: JSON.stringify(signingPayload),
          address: mainAddress,
        });
        signature = { Sr25519: result.signature.slice(2) };
      } else {
        signature = signPayload(
          keyringPair as KeyringPair,
          signingPayload as Codec
        );
      }
      const proxy = isSignedByExtension ? mainAddress : tradeAddress;
      await appsyncOrderbookService.operation.withdraw({
        address: proxy,
        payload: [mainAddress, proxy, payload, signature],
      });
    },
    onError: (error) => {
      const errorMessage = (error as Error).message ?? (error as string);
      onHandleError(errorMessage);
    },
    onSuccess: () =>
      onHandleAlert(
        "Your withdrawal is being processed and will be available for you to claim in a few minutes"
      ),
  });

  return { mutateAsync, loading: status === "loading" };
};
