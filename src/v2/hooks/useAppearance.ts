import { useDispatch } from "react-redux";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { changeColorTheme, selectCurrentDarkTheme } from "@polkadex/orderbook-modules";

export function useAppearance() {
  const dispatch = useDispatch();
  const isDarkTheme = useReduxSelector(selectCurrentDarkTheme);
  const changeTheme = () => dispatch(changeColorTheme(isDarkTheme ? "light" : "dark"));

  return {
    isDarkTheme,
    changeTheme,
  };
}
