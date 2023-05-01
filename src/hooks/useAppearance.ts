import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export function useAppearance() {
  const { onChangeTheme, theme } = useSettingsProvider();
  const isDarkTheme = theme === "dark";
  const changeTheme = () => {
    onChangeTheme(isDarkTheme ? "light" : "dark");
  };
  return {
    isDarkTheme,
    changeTheme,
  };
}
