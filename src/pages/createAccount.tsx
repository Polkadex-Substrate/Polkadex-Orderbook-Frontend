import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import {
  selectIsCurrentAccountRegistered,
  selectIsCurrentMainAccountInWallet,
} from "../modules/user/mainAccount";
import { selectIsUserSignedIn } from "../modules/user/profile";
import { selectRegisterTradeAccountSuccess } from "../modules/user/tradeAccount";

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
  const isRegistered = useReduxSelector(selectIsCurrentAccountRegistered);
  const hasSelectedAccount = useReduxSelector(selectIsCurrentMainAccountInWallet);
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
