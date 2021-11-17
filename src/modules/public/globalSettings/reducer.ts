import { CHANGE_COLOR_THEME } from "./constants";

export interface ColorThemeState {
  color: string;
}

const currentColorTheme: string =
  (process.browser && localStorage.getItem("colorTheme")) || "dark";

export const initialChangeColorThemeState: ColorThemeState = {
  color: currentColorTheme,
};

export const changeColorThemeReducer = (state = initialChangeColorThemeState, action) => {
  switch (action.type) {
    case CHANGE_COLOR_THEME:
      process.browser && localStorage.setItem("colorTheme", action.payload);
      return {
        ...state,
        color: action.payload,
      };

    default:
      return state;
  }
};
