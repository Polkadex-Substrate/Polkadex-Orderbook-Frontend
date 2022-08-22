import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsCurrentAccountRegistered } from "../modules/user/mainAccount";
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

  if (!hasUser || isRegistered) {
    router?.push("/accountManager");
    return <div />;
  }
  return <LinkAccountTemplate />;
};

export default LinkAccount;
