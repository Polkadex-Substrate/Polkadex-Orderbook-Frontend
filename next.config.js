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
    POLKADEX_HOST_URL:
      process.env.NEXT_PUBLIC_POLKADEX_HOST_URL || "https://ramen-1.polkadex.trade:443/api",
    INFLUX_DB_URL:
      process.env.NEXT_PUBLIC_INFLUX_DB_URL ||
      "https://ec2-3-101-117-26.us-west-1.polkadex.trade/api",
    POLKADEX_FEATURE: process.env.POLKADEX_FEATURE || "signUp",
    INFLUX_DB_TOKEN: process.env.INFLUX_DB_TOKEN || process.env.DEV_INFLUX_DB_TOKEN,
    RMQ_KEY: process.env.RMQ_KEY || process.env.DEV_RMQ_KEY,
    RMQ_USERNAME: process.env.RMQ_USERNAME || process.env.DEV_RMQ_USERNAME,
  },
};
