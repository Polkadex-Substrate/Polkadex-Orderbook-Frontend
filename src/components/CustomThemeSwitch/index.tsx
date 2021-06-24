import { CustomIcon } from "src/components/CustomIcon";
import React from "react";
import { useDispatch } from "react-redux";
import { changeColorTheme, selectCurrentColorTheme} from "src/modules"
import * as S from "./styles";
import { useReduxSelector } from "src/hooks";

export const CustomThemeSwitch = () => {
  const dispatch = useDispatch()
  const themeSelect = useReduxSelector(selectCurrentColorTheme)

  return (
    <S.Wrapper>
      <button
        aria-label="Change to dark mode"
        title="Change to dark mode"
        type="button"
        onClick={() => dispatch(changeColorTheme("dark"))}
      >
        <CustomIcon icon="Moon" isActive={themeSelect === 'dark' ? true : false} />
      </button>
      <button
        aria-label="Change to light mode"
        title="Change to light mode"
        type="button"
        onClick={() =>   dispatch(changeColorTheme("light"))}
      >
        <CustomIcon
          icon="Sun"
          background="transparent"
          isActive={themeSelect === 'light' ? true : false} 
        />
      </button>
    </S.Wrapper>
  );
};
