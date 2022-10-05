import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import {
  selectIsAddressInExtension,
  selectIsMainAddressRegistered,
  selectIsUserSignedIn,
  selectUsingAccount,
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
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const { linkedMainAddress } = useReduxSelector(selectUsingAccount);
  const isRegistered = useReduxSelector(selectIsMainAddressRegistered(linkedMainAddress));
  const hasSelectedAccount = useReduxSelector(selectIsAddressInExtension(linkedMainAddress));

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
