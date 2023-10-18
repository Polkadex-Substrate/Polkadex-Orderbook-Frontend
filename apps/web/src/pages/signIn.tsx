import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const SignInTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/SignIn").then(
      (mod) => mod.SignInTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const SignIn = () => {
  const router = useRouter();

  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  if (hasUser) router.push("/trading");

  return <SignInTemplate />;
};

export default SignIn;

const translations = ["molecules", "organisms", "common", "signin"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
