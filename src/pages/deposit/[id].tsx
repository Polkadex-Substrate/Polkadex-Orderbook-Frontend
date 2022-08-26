import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectIsCurrentAccountRegistered,
  selectIsCurrentMainAccountInWallet,
  selectIsUserSignedIn,
} from "@polkadex/orderbook-modules";

const DepositTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Deposit").then((mod) => mod.DepositTemplate),
  {
    ssr: false,
  }
);

const Deposit = () => {
  const router = useRouter();
  const isRegistered = useReduxSelector(selectIsCurrentAccountRegistered);
  const hasUser = useReduxSelector(selectIsUserSignedIn);
  const hasSelectedAccount = useReduxSelector(selectIsCurrentMainAccountInWallet);

  if (!hasUser || !isRegistered || !hasSelectedAccount) {
    router?.push("/accountManager");
    return <div />;
  }

  return <DepositTemplate />;
};

export default Deposit;
