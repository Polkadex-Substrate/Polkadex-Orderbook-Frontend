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
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";
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

  const {
    authInfo: { isAuthenticated },
    auth: { isLoading },
  } = useProfile();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router?.push("/trading/");
  }, [isLoading, isAuthenticated, router]);

  if (!isAuthenticated || isLoading) return <div />;
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

const translations = ["molecules", "organisms", "common", "transfer"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
