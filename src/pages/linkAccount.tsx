import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectExtensionAccountSelected } from "../modules/user/extensionWallet";
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
  const { mainAddress } = useReduxSelector(selectUsingAccount);
  const isRegistered = useReduxSelector(selectIsMainAddressRegistered(mainAddress));
  const selectedExtensionAccount = useReduxSelector(selectExtensionAccountSelected);

  const shouldRedirect = useMemo(
    () => !hasUser || isRegistered || !selectedExtensionAccount,
    [hasUser, isRegistered, selectedExtensionAccount]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/settings");
  }, [router, shouldRedirect]);

  if (shouldRedirect) return <div />;

  return <LinkAccountTemplate />;
};

export default LinkAccount;
