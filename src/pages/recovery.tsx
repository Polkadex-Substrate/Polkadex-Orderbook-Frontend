import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsUserSignedIn } from "../modules/user/profile";

const RecoveryTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Recovery").then((mod) => mod.RecoveryTemplate),
  {
    ssr: false,
  }
);

const Recovery = () => {
  const router = useRouter();
  const hasUser = useReduxSelector(selectIsUserSignedIn);

  useEffect(() => {
    if (!hasUser) router.push("/settings");
  }, [router, hasUser]);

  if (!hasUser) return <div />;
  return <RecoveryTemplate />;
};

export default Recovery;
