import { UseQueryResult, useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import { KeyringPair } from "@polkadot/keyring/types";

import { useProfile } from "../providers/user/profile";
import { sleep } from "../helpers";

export type ImportFromGoogleAccount = {
  account: KeyringPair;
  password: string;
};

export const useImportGoogleAccount = ({
  onRemoveTempGoogleAccount,
  onRefetchGoogleDriveAccounts,
}: {
  onRemoveTempGoogleAccount: (e: string) => void;
  onRefetchGoogleDriveAccounts: UseQueryResult["refetch"];
}) => {
  const { wallet } = useUserAccounts();

  const { mutateAsync, status, error, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ account, password }: ImportFromGoogleAccount) => {
      const { pair } = wallet.add(account, password);
      await sleep(2000);
      await onRefetchGoogleDriveAccounts();
      onRemoveTempGoogleAccount(pair.address);
    },
    onError: (e) => console.log("Error", e),
  });

  return {
    mutateAsync,
    status,
    error,
    isLoading,
    isSuccess,
  };
};
