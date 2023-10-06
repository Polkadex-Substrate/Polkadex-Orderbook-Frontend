import { useTranslation } from "react-i18next";
import {
  AvailableMessage,
  Navigation,
  Switcher,
} from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@orderbook/core/hooks";

import * as T from "./types";

export const Appearance = ({ navigateBack }: T.Props) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`appearance.${key}`);

  const { isDarkTheme, changeTheme } = useAppearance();
  return (
    <Navigation title={t("title")} onBack={navigateBack}>
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
