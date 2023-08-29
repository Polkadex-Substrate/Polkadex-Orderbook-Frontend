import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { DepositProvider } from "@polkadex/orderbook/providers/user/depositProvider/provider";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { selectIsAddressInExtension } from "@polkadex/orderbook/providers/user/extensionWallet/helper";
import { TransactionsProvider } from "@polkadex/orderbook/providers/user/transactionsProvider/provider";
import { AssetsProvider, BalancesProvider } from "@polkadex/orderbook/providers";
import { useDisabledPages } from "@polkadex/orderbook-hooks";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

const DepositTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Deposit").then((mod) => mod.DepositTemplate),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

const Deposit = () => {
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

  if (!isLoading && !hasUser) router?.push("/trading/");

  if (shouldRedirect || disabled) return <div />;

  return (
    <AssetsProvider>
      <BalancesProvider>
        <TransactionsProvider>
          <DepositProvider>
            <DepositTemplate />
          </DepositProvider>
        </TransactionsProvider>
      </BalancesProvider>
    </AssetsProvider>
  );
};

export default Deposit;
