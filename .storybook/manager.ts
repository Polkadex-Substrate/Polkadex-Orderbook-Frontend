import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const darkTheme = create({
  base: "dark",
  colorPrimary: "#E6007A",
  brandTitle: "Polkadex Orderbook",
  brandUrl: "https://polkadex.trade",
  brandImage: "https://dsc.cloud/0ebce1/polkadex.svg",
  //Styles
  textColor: "#ffffff",
  inputTextColor: "#ffffff",
  barTextColor: "#ffffff",
});

addons.setConfig({
  theme: darkTheme,
});
