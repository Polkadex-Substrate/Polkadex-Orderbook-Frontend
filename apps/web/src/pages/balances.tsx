import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AssetsProvider, BalancesProvider } from "@orderbook/core/providers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useDisabledPages } from "@/hooks";

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
        <BalancesTemplate />
      </BalancesProvider>
    </AssetsProvider>
  );
};

export default Balances;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "balances",
      ])),
    },
  };
}
