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
} from "@orderbook/core/providers";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const DepositTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Deposit").then(
      (mod) => mod.DepositTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

const Deposit = () => {
  const router = useRouter();

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

  if (shouldRedirect) return <div />;

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

const translations = ["common", "deposit", "organisms", "molecules"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
