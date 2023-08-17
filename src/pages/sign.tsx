import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useDisabledPages } from "../hooks/useDisabledPages";
import { useAuth } from "../providers/user/auth";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";

const SignTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Sign").then((mod) => mod.SignTemplate),
  {
    ssr: false,
  }
);
const Sign = () => {
  const { disabled } = useDisabledPages();
  const router = useRouter();

  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  const { userConfirmed } = useAuth();

  if (hasUser && userConfirmed) router.push("/trading");

  if (disabled) return <div />;

  return <SignTemplate />;
};

export default Sign;
