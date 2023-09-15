import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

import { useDisabledPages } from "@/hooks";

const WalletsTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Wallets").then(
      (mod) => mod.WalletsTemplate,
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);
const Wallets = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();

  const {
    authInfo: { isAuthenticated: hasUser },
    auth: { isLoading },
  } = useProfile();

  if (!isLoading && !hasUser) router?.push("/trading/");

  if (!hasUser || disabled) return <div />;
  return <WalletsTemplate />;
};

export default Wallets;
