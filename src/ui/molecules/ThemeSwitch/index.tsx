import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

import { Icon } from "src/ui";
import { changeColorTheme, selectCurrentColorTheme } from "src/modules";

export const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const color = useSelector(selectCurrentColorTheme);

  return (
    <S.Wrapper>
      <Icon
        icon={color === "dark" ? "Moon" : "Sun"}
        background="none"
        onClick={() => dispatch(changeColorTheme(color === "dark" ? "light" : "dark"))}
      />
    </S.Wrapper>
  );
};
