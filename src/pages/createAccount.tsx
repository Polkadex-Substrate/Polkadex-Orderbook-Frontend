import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsAddressInExtension } from "../modules/user/extensionWallet";
import {
  selectIsMainAddressRegistered,
  selectIsUserSignedIn,
  selectUsingAccount,
} from "../modules/user/profile";
import { selectRegisterTradeAccountSuccess } from "../modules/user/tradeWallet";

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
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const currentAccount = useReduxSelector(selectUsingAccount);
  const hasSelectedAccount = useReduxSelector(
    selectIsAddressInExtension(currentAccount.linkedMainAddress)
  );
  const isRegistered = useReduxSelector(
    selectIsMainAddressRegistered(currentAccount.linkedMainAddress)
  );
  const success = useReduxSelector(selectRegisterTradeAccountSuccess);

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount || success,
    [hasUser, isRegistered, hasSelectedAccount, success]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/accountManager");
  }, [shouldRedirect, router]);

  if (shouldRedirect) return <div />;

  return <CreateAccountTemplate />;
};

export default CreateAccount;
