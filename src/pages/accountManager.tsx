import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsUserSignedIn } from "../modules/user/profile";

const AccountManagerTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/AccountManager").then(
      (mod) => mod.AccountManagerTemplate
    ),
  {
    ssr: false,
  }
);
const AccountManager = () => {
  const router = useRouter();
  const hasUser = useReduxSelector(selectIsUserSignedIn);

  useEffect(() => {
    if (!hasUser) router?.push("/trading/");
  }, [hasUser, router]);

  if (!hasUser) return <div />;
  return <AccountManagerTemplate />;
};

export default AccountManager;
