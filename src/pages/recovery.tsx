import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  useEffect(() => {
    if (!hasUser) router.push("/settings");
  }, [router, hasUser]);

  if (!hasUser) return <div />;
  return <RecoveryTemplate />;
};

export default Recovery;
