import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentDarkTheme } from "@polkadex/orderbook-modules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export function useAppearance() {
  const { onChangeColorTheme } = useSettingsProvider();
  const isDarkTheme = useReduxSelector(selectCurrentDarkTheme);
  const changeTheme = () => onChangeColorTheme(isDarkTheme ? "light" : "dark");

  return {
    isDarkTheme,
    changeTheme,
  };
}
