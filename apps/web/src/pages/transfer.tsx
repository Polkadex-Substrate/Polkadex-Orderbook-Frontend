import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  useExtensionWallet,
  selectIsAddressInExtension,
} from "@orderbook/core/providers/user/extensionWallet";
import {
  AssetsProvider,
  BalancesProvider,
  TransactionsProvider,
  DepositProvider,
  WithdrawsProvider,
} from "@orderbook/core/providers";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { useProfile } from "@orderbook/core/providers/user/profile";

import { useDisabledPages } from "@/hooks";
const TransferTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Transfer").then(
      (mod) => mod.TransferTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

const Transfer = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();

  const {
    authInfo: { isAuthenticated: hasUser },
    auth: { isLoading },
    selectedAccount: { mainAddress },
  } = useProfile();
  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();

  const isRegistered =
    mainAddress && profileState.userData?.mainAccounts?.includes(mainAddress);

  const hasSelectedAccount = selectIsAddressInExtension(
    mainAddress,
    extensionWalletState.allAccounts
  );

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount,
    [hasUser, isRegistered, hasSelectedAccount]
  );

  if (!isLoading && !hasUser) router?.push("/trading");

  if (shouldRedirect || disabled) return <div />;
  return (
    <AssetsProvider>
      <BalancesProvider>
        <TransactionsProvider>
          <DepositProvider>
            <WithdrawsProvider>
              <TransferTemplate />
            </WithdrawsProvider>
          </DepositProvider>
        </TransactionsProvider>
      </BalancesProvider>
    </AssetsProvider>
  );
};

export default Transfer;
