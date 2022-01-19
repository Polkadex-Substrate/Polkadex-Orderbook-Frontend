const path = require('path');

module.exports = {
  "stories": [
    "../src/**/stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next-router"
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, "..", "src"), "node_modules"];
    config.resolve.alias = {
      ...config.resolve.alias,
      "@orderbook/v1/atoms": path.resolve(__dirname, "../src/vs/ui/atoms"),
      "@orderbook/v1/molecules": path.resolve(__dirname, "../src/vs/ui/molecules"),
      "@orderbook/v1/organisms": path.resolve(__dirname, "../src/vs/ui/organisms"),
      "@orderbook/v1/templates": path.resolve(__dirname, "../src/vs/ui/templates"),
      "@polkadex/orderbook-ui/atoms": path.resolve(__dirname, "../src/ui/atoms"),
      "@polkadex/orderbook-ui/molecules": path.resolve(__dirname, "../src/ui/molecules"),
      "@polkadex/orderbook-ui/organisms": path.resolve(__dirname, "../src/ui/organisms"),
      "@polkadex/orderbook-ui/templates": path.resolve(__dirname, "../src/ui/templates"),
      "@polkadex/orderbook-modules": path.resolve(__dirname, "../src/modules"),
      "@polkadex/web-constants": path.resolve(__dirname, "../src/constants"),
      "@polkadex/orderbook-hooks": path.resolve(__dirname, "../src/hooks"),
      "@polkadex/web-helpers": path.resolve(__dirname, "../src/helpers"),
      "@polkadex/orderbook-config": path.resolve(__dirname, "../src/config"),
      "@polkadex/orderbook": path.resolve(__dirname, "../src"),
      "lib": path.resolve(__dirname, "../src/lib"),
    }
    return config;
  }
}
