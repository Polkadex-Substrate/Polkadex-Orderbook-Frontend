import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useReduxSelector } from "../hooks/useReduxSelector";
import {
  selectCurrentMainAccount,
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

  if (!hasUser || isRegistered || !hasSelectedAccount) {
    router?.push("/accountManager");
    return <div />;
  }
  return <LinkAccountTemplate />;
};

export default LinkAccount;
