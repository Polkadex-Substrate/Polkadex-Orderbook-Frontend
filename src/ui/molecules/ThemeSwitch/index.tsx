import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

import { changeColorTheme, selectCurrentColorTheme } from "@polkadex/orderbook-modules";
import { Icon } from "@polkadex/orderbook-ui/molecules";

export const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const color = useSelector(selectCurrentColorTheme);

  return (
    <S.Wrapper>
      <Icon
        name={color === "dark" ? "Moon" : "Sun"}
        background="none"
        size="large"
        onClick={() => dispatch(changeColorTheme(color === "dark" ? "light" : "dark"))}
      />
    </S.Wrapper>
  );
};
