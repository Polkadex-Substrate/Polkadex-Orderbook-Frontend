/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@orderbook/core"],
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 120,
  webpack(config, { _, isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@orderbook/core/*": path.resolve(__dirname, "../../packages/core/src/*"),
    };
    if (isServer) {
      config.externals.push("_http_common");
    }
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  env: {
    POLKADEX_CHAIN:
      process.env.POLKADEX_CHAIN || "wss://blockchain.polkadex.trade",
    GOOGLE_ANALYTICS:
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-PWZK8JEFLX",
    ANALYZE: process.env.NEXT_PUBLIC_ANALYZE || "false",
    API_REGION: process.env.API_REGION,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID,
    USER_POOL_ID: process.env.USER_POOL_ID,
    USER_WEB_CLIENT_ID: process.env.USER_WEB_CLIENT_ID,
    LANDING_PAGE: process.env.LANDING_PAGE,
    SIGNUP_DISABLED: process.env.SIGNUP_DISABLED,
    PIN_POINT_CLIENT_ID: process.env.PIN_POINT_CLIENT_ID,
    MAINTENACE_MODE: process.env.MAINTENACE_MODE,
    SHOW_SHUTDOWN_POPUP: process.env.SHOW_SHUTDOWN_POPUP,
    UNDER_MAINTENACE: process.env.UNDER_MAINTENACE,
    MAIN_URL: process.env.MAIN_URL,
    BLOCKED_ASSETS: process.env.BLOCKED_ASSETS,
  },
};

module.exports = nextConfig;
