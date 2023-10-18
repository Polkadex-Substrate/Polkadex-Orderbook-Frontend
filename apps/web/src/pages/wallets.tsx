import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const WalletsTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Wallets").then(
      (mod) => mod.WalletsTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Wallets = () => {
  const router = useRouter();

  const {
    authInfo: { isAuthenticated: hasUser },
    auth: { isLoading },
  } = useProfile();

  if (!isLoading && !hasUser) router?.push("/trading/");

  if (!hasUser) return <div />;
  return <WalletsTemplate />;
};

export default Wallets;

const translations = ["molecules", "organisms", "common", "settings"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
