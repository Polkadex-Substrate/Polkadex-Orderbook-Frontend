import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import {
  selectIsCurrentAccountRegistered,
  selectIsCurrentMainAccountInWallet,
  selectIsUserSignedIn,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

const WithdrawTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Withdraw").then((mod) => mod.WithdrawTemplate),
  {
    ssr: false,
  }
);
const Withdraw = () => {
  const router = useRouter();
  const isRegistered = useReduxSelector(selectIsCurrentAccountRegistered);
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const hasSelectedAccount = useReduxSelector(selectIsCurrentMainAccountInWallet);

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount,
    [hasUser, isRegistered, hasSelectedAccount]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/accountManager");
  }, [router, shouldRedirect]);

  if (shouldRedirect) return <div />;

  return <WithdrawTemplate />;
};

export default Withdraw;
