import { ColorThemeState } from "@polkadex/web-modules";

import { RootState } from "../..";

export const selectCurrentColorTheme = (state: RootState): ColorThemeState["color"] =>
  state.public.colorTheme.color;

export const selectCurrentDarkTheme = (state: RootState): boolean =>
  state.public.colorTheme.color === "dark";
