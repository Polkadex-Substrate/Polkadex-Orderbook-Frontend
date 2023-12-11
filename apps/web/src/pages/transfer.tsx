import dynamic from "next/dynamic";
import { DepositProvider, WithdrawsProvider } from "@orderbook/core/providers";
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
