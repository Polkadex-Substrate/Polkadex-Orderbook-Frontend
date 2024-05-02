import { useQuery } from "@tanstack/react-query";
import { GDriveExternalAccountStore } from "@polkadex/local-wallets";
import keyring from "@polkadot/ui-keyring";

import { useSettingsProvider } from "../providers/public/settings";
import { QUERY_KEYS } from "../constants";

export const useGoogleTradingAccounts = ({
  GoogleDrive,
  gDriveReady,
}: {
  GoogleDrive: GDriveExternalAccountStore;
  gDriveReady: boolean;
}) => {
  const { onHandleError } = useSettingsProvider();
  return useQuery({
    queryKey: QUERY_KEYS.googleAccounts(),
    enabled: gDriveReady,
    initialData: [],
    queryFn: async () => {
      const accounts = await GoogleDrive.getAll();
      return accounts.map((account) => keyring.createFromJson(account));
    },
    onError: (error: { message: string }) => {
      onHandleError(error?.message ?? error);
    },
  });
};
