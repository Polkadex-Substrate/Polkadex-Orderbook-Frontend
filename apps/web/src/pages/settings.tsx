import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProfile } from "@orderbook/core/providers/user/profile";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

import { useDisabledPages } from "@/hooks";

const SettingsTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Settings").then(
      (mod) => mod.SettingsTemplate,
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);
const Settings = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();

  const {
    authInfo: { isAuthenticated: hasUser },
    auth: { isLoading },
  } = useProfile();

  if (!isLoading && !hasUser) router?.push("/trading/");

  if (!hasUser || disabled) return <div />;
  return <SettingsTemplate />;
};

export default Settings;
