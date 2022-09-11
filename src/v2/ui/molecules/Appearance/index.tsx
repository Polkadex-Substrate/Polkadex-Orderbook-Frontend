import * as T from "./types";

import { AvailableMessage, Navigation, Switcher } from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@polkadex/orderbook/hooks";

export const Appearance = ({ navigateBack }: T.Props) => {
  const { isDarkTheme, changeTheme } = useAppearance();
  return (
    <Navigation title="Appearance" onBack={navigateBack}>
      <Switcher
        title="Dark Mode"
        description="Adjust the appearance to reduce  glare and give your eyes a break."
        isActive={isDarkTheme}
        onChange={changeTheme}
      />
      <AvailableMessage message="Soon">
        <Switcher
          title="Classic Mode"
          icon="Computer"
          description="The layout of the classic version is quite similar to other exchanges."
        />
      </AvailableMessage>
    </Navigation>
  );
};
