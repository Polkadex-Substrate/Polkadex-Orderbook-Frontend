import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";

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
  const extensionWalletState = useExtensionWallet();

  const isRegistered = mainAddress && profileState.userData.mainAccounts.includes(mainAddress);

  const hasSelectedAccount =
    mainAddress &&
    extensionWalletState.allAccounts?.some(({ account }) => account?.address === mainAddress);

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount,
    [hasUser, isRegistered, hasSelectedAccount]
  );

  useEffect(() => {
    if (!hasUser) router?.push("/accountManager/");
  }, [hasUser, router]);
  if (shouldRedirect) return <div />;

  return <DepositTemplate />;
};

export default Deposit;
