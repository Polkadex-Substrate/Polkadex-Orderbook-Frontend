import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  AssetsProvider,
  BalancesProvider,
  TransactionsProvider,
  DepositProvider,
  WithdrawsProvider,
} from "@orderbook/core/providers";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
    authInfo: { isAuthenticated },
    auth: { isLoading },
  } = useProfile();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router?.push("/trading/");
  }, [isLoading, isAuthenticated, router]);

  if (!isAuthenticated || disabled || isLoading) return <div />;
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "transfer",
      ])),
    },
  };
}
