import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectIsAddressInExtension,
} from "@polkadex/orderbook-modules";

import { DepositProvider } from "@polkadex/orderbook/providers/user/depositProvider/provider";
import { toast } from "react-toastify";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";


const DepositTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Deposit").then((mod) => mod.DepositTemplate),
  {
    ssr: false,
  }
);

const Deposit = () => {
  const router = useRouter();
  const {
    authInfo: { isAuthenticated: hasUser },
    selectedAccount: { mainAddress },
  } = useProfile();
  const profileState = useProfile();
  const isRegistered = mainAddress && profileState.userData.mainAccounts.includes(mainAddress);
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
    <DepositProvider onError={(v) => toast.error(v)} onNotification={(v) => toast.info(v)}>
      <DepositTemplate />
    </DepositProvider>
  );
};

export default Deposit;
