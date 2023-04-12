import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export function useAppearance() {
  const { onChangeColorTheme, color } = useSettingsProvider();
  const isDarkTheme = color === "dark";
  const changeTheme = () => onChangeColorTheme(isDarkTheme ? "light" : "dark");

  return {
    isDarkTheme,
    changeTheme,
  };
}
