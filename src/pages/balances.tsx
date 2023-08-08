import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useDisabledPages } from "../hooks/useDisabledPages";

import { AssetsProvider, BalancesProvider } from "@polkadex/orderbook/providers";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

const BalancesTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Balances").then((mod) => mod.BalancesTemplate),
  {
    ssr: false,
  }
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
