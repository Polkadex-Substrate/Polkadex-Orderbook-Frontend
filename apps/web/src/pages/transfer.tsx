import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
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
const DepositProvider = dynamic(
  () => import("@orderbook/core/providers").then((mod) => mod.DepositProvider),
  {
    ssr: false,
  }
);
const WithdrawsProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then((mod) => mod.WithdrawsProvider),
  {
    ssr: false,
  }
);
const Transfer = () => {
  return (
    <DepositProvider>
      <WithdrawsProvider>
        <TransferTemplate />
      </WithdrawsProvider>
    </DepositProvider>
  );
};

export default Transfer;

const translations = ["molecules", "organisms", "common", "transfer"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
