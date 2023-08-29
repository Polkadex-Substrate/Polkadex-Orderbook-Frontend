import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useDisabledPages } from "../hooks/useDisabledPages";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

const SignInTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/SignIn").then((mod) => mod.SignInTemplate),
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
