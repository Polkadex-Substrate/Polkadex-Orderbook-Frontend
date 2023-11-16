import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { useEffect } from "react";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const BalancesTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Balances").then(
      (mod) => mod.BalancesTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Balances = () => {
  const router = useRouter();

  const {
    authInfo: { isAuthenticated },
    auth: { isLoading },
  } = useProfile();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router?.push("/trading/");
  }, [isLoading, isAuthenticated, router]);

  if (!isAuthenticated || isLoading) return <div />;
  return <BalancesTemplate />;
};

export default Balances;

const translations = ["molecules", "organisms", "common", "balances"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
