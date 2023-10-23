import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  selectIsAddressInExtension,
} from "@orderbook/core/providers/user/extensionWallet";
import {
  AssetsProvider,
  BalancesProvider,
  WithdrawsProvider,
  TransactionsProvider,
} from "@orderbook/core/providers";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const WithdrawTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Withdraw").then(
      (mod) => mod.WithdrawTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Withdraw = () => {
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
        <WithdrawsProvider>
          <TransactionsProvider>
            <WithdrawTemplate />
          </TransactionsProvider>
        </WithdrawsProvider>
      </BalancesProvider>
    </AssetsProvider>
  );
};

export default Withdraw;

const translations = ["common", "withdraw", "organisms", "molecules"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
