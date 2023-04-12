import { useSelector } from "react-redux";

import * as S from "./styles";

import { selectCurrentColorTheme } from "@polkadex/orderbook-modules";
import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const ThemeSwitch = () => {
  const { onChangeColorTheme } = useSettingsProvider();
  const color = useSelector(selectCurrentColorTheme);

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
