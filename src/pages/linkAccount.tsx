import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsAddressInExtension } from "../modules/user/mainAccount";
import {
  selectIsMainAddressRegistered,
  selectIsUserSignedIn,
  selectUsingAccount,
} from "../modules/user/profile";

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
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const { linkedMainAddress } = useReduxSelector(selectUsingAccount);
  const isRegistered = useReduxSelector(selectIsMainAddressRegistered(linkedMainAddress));
  const hasSelectedAccount = useReduxSelector(selectIsAddressInExtension(linkedMainAddress));

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
