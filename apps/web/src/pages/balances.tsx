import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AssetsProvider, BalancesProvider } from "@orderbook/core/providers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

import { useDisabledPages } from "@/hooks";

const BalancesTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Balances").then(
      (mod) => mod.BalancesTemplate,
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);
const Balances = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();

  const {
    authInfo: { isAuthenticated: hasUser },
    auth: { isLoading },
  } = useProfile();

  if (!isLoading && !hasUser) router?.push("/trading/");

  if (!hasUser || disabled || isLoading) return <div />;
  return (
    <AssetsProvider>
      <BalancesProvider>
        <BalancesTemplate />
      </BalancesProvider>
    </AssetsProvider>
  );
};

export default Balances;
