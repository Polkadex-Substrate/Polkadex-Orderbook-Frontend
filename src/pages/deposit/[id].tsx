import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectIsMainAddressRegistered,
  selectIsAddressInExtension,
  selectIsUserSignedIn,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";
import { DepositProvider } from "@polkadex/orderbook/providers/user/depositProvider/provider";

const DepositTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Deposit").then((mod) => mod.DepositTemplate),
  {
    ssr: false,
  }
);

const Deposit = () => {
  const router = useRouter();
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const { mainAddress } = useReduxSelector(selectUsingAccount);
  const isRegistered = useReduxSelector(selectIsMainAddressRegistered(mainAddress));
  const hasSelectedAccount = useReduxSelector(selectIsAddressInExtension(mainAddress));

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount,
    [hasUser, isRegistered, hasSelectedAccount]
  );

  useEffect(() => {
    if (!hasUser) router?.push("/accountManager/");
  }, [hasUser, router]);
  if (shouldRedirect) return <div />;

  return (
    <DepositProvider>
      <DepositTemplate />
    </DepositProvider>
  );
};

export default Deposit;
