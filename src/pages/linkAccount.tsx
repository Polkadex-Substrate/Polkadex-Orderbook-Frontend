import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import {
  selectIsCurrentAccountRegistered,
  selectIsCurrentMainAccountInWallet,
} from "../modules/user/mainAccount";
import { selectIsUserSignedIn } from "../modules/user/profile";

const LinkAccountTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/LinkAccount").then(
      (mod) => mod.LinkAccountTemplate
    ),
  {
    ssr: false,
  }
);
const LinkAccount = () => {
  const router = useRouter();
  const isRegistered = useReduxSelector(selectIsCurrentAccountRegistered);
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const hasSelectedAccount = useReduxSelector(selectIsCurrentMainAccountInWallet);

  const shouldRedirect = useMemo(
    () => !hasUser || isRegistered || !hasSelectedAccount,
    [hasUser, isRegistered, hasSelectedAccount]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/accountManager");
  }, [router, shouldRedirect]);

  if (shouldRedirect) return <div />;

  return <LinkAccountTemplate />;
};

export default LinkAccount;
