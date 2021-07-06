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
        aria-label={`Change to ${themeSelect} mode`}
        title={`Change to ${themeSelect} mode`}
        type="button"
        onClick={() => dispatch(changeColorTheme(themeSelect === 'dark' ? 'light' : 'dark'))}
      >
        <CustomIcon icon={themeSelect === 'dark' ? 'Moon' : 'Sun'} background="none" />
      </button>
    </S.Wrapper>
  );
};
