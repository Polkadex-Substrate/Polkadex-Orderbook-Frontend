import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useTradeWallet } from "../providers/user/tradeWallet";
import { useDisabledPages } from "../hooks/useDisabledPages";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { selectIsAddressInExtension } from "@polkadex/orderbook/providers/user/extensionWallet/helper";

const CreateAccountTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/CreateAccount").then(
      (mod) => mod.CreateAccountTemplate
    ),
  {
    ssr: false,
  }
);
const CreateAccount = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();

  const {
    authInfo: { isAuthenticated: hasUser },
    selectedAccount: currentAccount,
  } = useProfile();
  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();

  const hasSelectedAccount = selectIsAddressInExtension(
    currentAccount.mainAddress,
    extensionWalletState.allAccounts
  );

  const isRegistered =
    currentAccount.mainAddress &&
    profileState.userData?.mainAccounts?.includes(currentAccount.mainAddress);

  const success = tradeWalletState.registerAccountSuccess;

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount || success,
    [hasUser, isRegistered, hasSelectedAccount, success]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/settings");
  }, [shouldRedirect, router]);

  if (shouldRedirect || disabled) return <div />;

  return <CreateAccountTemplate />;
};

export default CreateAccount;
