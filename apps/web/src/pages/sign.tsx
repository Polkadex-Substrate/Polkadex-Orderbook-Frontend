import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAuth } from "@orderbook/core/providers/user/auth";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

import { useDisabledPages } from "@/hooks";

const SignTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Sign").then(
      (mod) => mod.SignTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
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
