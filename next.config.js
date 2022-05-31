// TODO: Fix eslint and typescript build errors
module.exports = {
  compiler: {
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
  target: "experimental-serverless-trace",
  env: {
    API_PATH: process.env.API_PATH || "http://localhost:3000/api",
    DATABASE_URL: process.env.DATABASE_URL,
    INFLUX_DB_URL: process.env.INFLUX_DB_URL || "https://ramen-1.polkadex.trade/api",
    API2_PATH: process.env.API2_PATH || "https://ramen-1.polkadex.trade/api/",
    POLKADEX_FEATURE: process.env.POLKADEX_FEATURE,
    INFLUX_DB_TOKEN: process.env.INFLUX_DB_TOKEN,
    RMQ_KEY: process.env.RMQ_KEY,
    RMQ_USERNAME: process.env.RMQ_USERNAME,
    ENCLAVE_URL: process.env.ENCLAVE_URL || "wss://sgx.polkadex.trade:443",
    POLKADEX_CHAIN: process.env.POLKADEX_CHAIN || "wss://ramen-1.polkadex.trade:443",
  },
};
