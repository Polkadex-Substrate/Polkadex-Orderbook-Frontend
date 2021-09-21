import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

import { Icon } from "src/ui/components/Icon";
import { changeColorTheme, selectCurrentColorTheme } from "src/modules";

export const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const color = useSelector(selectCurrentColorTheme);
  return (
    <S.Wrapper>
      <button
        aria-label="Change to dark mode"
        title="Change to dark mode"
        type="button"
        onClick={() => dispatch(changeColorTheme("dark"))}
      >
        <Icon icon="Moon" isActive={color === "dark"} />
      </button>
      <button
        aria-label="Change to light mode"
        title="Change to light mode"
        type="button"
        onClick={() => dispatch(changeColorTheme("light"))}
      >
        <Icon
          icon="Sun"
          background="transparent"
          isActive={color === "light"}
        />
      </button>
    </S.Wrapper>
  );
};
