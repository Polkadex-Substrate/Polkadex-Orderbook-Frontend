// TODO: Check if we're using this component anywhere, otherwise delete it

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import * as S from "./styles";

export const ThemeSwitch = () => {
  const { onChangeTheme, theme } = useSettingsProvider();

  return (
    <S.Wrapper>
      <Icon
        name={theme === "dark" ? "Moon" : "Sun"}
        background="none"
        size="large"
        onClick={() => onChangeTheme(theme === "dark" ? "light" : "dark")}
      />
    </S.Wrapper>
  );
};
