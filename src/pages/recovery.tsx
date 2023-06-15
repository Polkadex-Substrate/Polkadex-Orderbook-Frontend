import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useDisabledPages } from "../hooks/useDisabledPages";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";

const RecoveryTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Recovery").then((mod) => mod.RecoveryTemplate),
  {
    ssr: false,
  }
);

const Recovery = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();
  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  useEffect(() => {
    if (!hasUser) router.push("/settings");
  }, [router, hasUser]);

  if (!hasUser || disabled) return <div />;
  return <RecoveryTemplate />;
};

export default Recovery;
