import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useReduxSelector } from "../hooks/useReduxSelector";

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

  // if (!hasUser) {
  //   router?.push("/sign");
  //   return <div />;
  // }
  return <AccountManagerTemplate />;
};

export default AccountManager;
