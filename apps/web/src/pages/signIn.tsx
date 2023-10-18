import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useDisabledPages } from "@/hooks";

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
  const { disabled } = useDisabledPages();

  const router = useRouter();

  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  if (hasUser) router.push("/trading");

  if (disabled) return <div />;

  return <SignInTemplate />;
};

export default SignIn;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "signin",
      ])),
    },
  };
}
