const path = require('path');

module.exports = {
  "stories": [
    "../src/**/stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next-router",
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, "..", "src"), "node_modules"];
    config.resolve.alias = {
      ...config.resolve.alias,
      "@orderbook-ui/v2/atoms": path.resolve(__dirname, "../src/v2/ui/atoms"),
      "@orderbook-ui/v2/molecules": path.resolve(__dirname, "../src/v2/ui/molecules"),
      "@orderbook-ui/v2/organisms": path.resolve(__dirname, "../src/v2/ui/organisms"),
      "@orderbook-ui/v2/templates": path.resolve(__dirname, "../src/v2/ui/templates"),
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
      "src": path.resolve(__dirname, "../src"),
    }
    return config;
  }
}
