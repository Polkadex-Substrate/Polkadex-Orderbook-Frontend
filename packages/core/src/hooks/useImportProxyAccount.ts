import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import { DecodedFile } from "@orderbook/frontend/src/ui/templates/ConnectWallet/importTradingAccount";

import { useProfile } from "../providers/user/profile";

export type ImportFromFile = {
  file: DecodedFile;
  password: string;
};
export const useImportProxyAccount = () => {
  const { wallet } = useUserAccounts();
  const { onUserSelectTradingAddress } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({ file, password }: ImportFromFile) => {
      const pair = wallet.import(file as any, password);
      onUserSelectTradingAddress({ tradeAddress: pair.address });
    },
    onError: (e) => console.log("Error", e),
  });

  return {
    mutateAsync,
    status,
    error,
  };
};