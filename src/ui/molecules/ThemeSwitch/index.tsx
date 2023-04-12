import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const ThemeSwitch = () => {
  const { onChangeColorTheme, color } = useSettingsProvider();

  return (
    <S.Wrapper>
      <Icon
        name={color === "dark" ? "Moon" : "Sun"}
        background="none"
        size="large"
        onClick={() => onChangeColorTheme(color === "dark" ? "light" : "dark")}
      />
    </S.Wrapper>
  );
};
