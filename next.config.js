// TODO: Fix eslint and typescript build errors
module.exports = {
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL || "http://openfinex.polkadex.trade:8000",
    RANGER_HOST_URL:
      process.env.NEXT_PUBLIC_RANGER_HOST_URL || "http://openfinex.polkadex.trade:8001",
    PROXY_URL: process.env.NEXT_PUBLIC_PROXY_URL || "http://openfinex.polkadex.trade:15000",
    PROXY_WS_URL:
      process.env.NEXT_PUBLIC_PROXY_WS_URL || "http://openfinex.polkadex.trade:7070",
    POLKADEX_WS: process.env.NEXT_PUBLIC_POLKADEX_WS || "wss://openfinex.polkadex.trade",
    POLKADEX_HOST_URL:
      process.env.NEXT_PUBLIC_POLKADEX_HOST_URL || "https://ramen-1.polkadex.trade:443/api",
    INFLUX_DB_URL:
      process.env.NEXT_PUBLIC_INFLUX_DB_URL ||
      "https://ec2-3-101-117-26.us-west-1.polkadex.trade",
  },
};
