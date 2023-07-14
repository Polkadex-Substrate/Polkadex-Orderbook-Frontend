import { useTranslation } from "react-i18next";

import * as T from "./types";

import { AvailableMessage, Navigation, Switcher } from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@polkadex/orderbook/hooks";

export const Appearance = ({ navigateBack }: T.Props) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`appearance.${key}`);

  const { isDarkTheme, changeTheme } = useAppearance();
  return (
    <Navigation title={t("appearance")} onBack={navigateBack}>
      <Switcher
        title={t("darkMode.title")}
        description={t("darkMode.description")}
        isActive={isDarkTheme}
        onChange={changeTheme}
      />
      <AvailableMessage message="Soon">
        <Switcher
          title={t("classicMode.title")}
          icon="Computer"
          description={t("classicMode.description")}
        />
      </AvailableMessage>
    </Navigation>
  );
};
