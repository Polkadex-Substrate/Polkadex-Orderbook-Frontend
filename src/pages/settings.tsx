import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsUserSignedIn } from "../modules/user/profile";

const SettingsTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Settings").then((mod) => mod.SettingsTemplate),
  {
    ssr: false,
  }
);
const Settings = () => {
  const router = useRouter();
  const hasUser = useReduxSelector(selectIsUserSignedIn);

  useEffect(() => {
    if (!hasUser) router?.push("/trading/");
  }, [hasUser, router]);

  if (!hasUser) return <div />;
  return <SettingsTemplate />;
};

export default Settings;
