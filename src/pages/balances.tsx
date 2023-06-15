import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useDisabledPages } from "../hooks/useDisabledPages";

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
  } = useProfile();

  useEffect(() => {
    if (!hasUser) router?.push("/trading/");
  }, [hasUser, router]);

  if (!hasUser || disabled) return <div />;
  return <BalancesTemplate />;
};

export default Balances;
