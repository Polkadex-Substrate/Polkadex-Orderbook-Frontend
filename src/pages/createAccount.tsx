import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsAddressInExtension } from "../modules/user/extensionWallet";
import { selectRegisterTradeAccountSuccess } from "../modules/user/tradeWallet";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

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
  const {
    authInfo: { isAuthenticated: hasUser },
    selectedAccount: currentAccount,
  } = useProfile();
  const profileState = useProfile();
  const hasSelectedAccount = useReduxSelector(
    selectIsAddressInExtension(currentAccount.mainAddress)
  );
  const isRegistered =
    currentAccount.mainAddress &&
    profileState.userData.mainAccounts.includes(currentAccount.mainAddress);

  const success = useReduxSelector(selectRegisterTradeAccountSuccess);

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount || success,
    [hasUser, isRegistered, hasSelectedAccount, success]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/settings");
  }, [shouldRedirect, router]);

  if (shouldRedirect) return <div />;

  return <CreateAccountTemplate />;
};

export default CreateAccount;
