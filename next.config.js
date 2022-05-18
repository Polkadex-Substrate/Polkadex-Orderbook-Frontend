// TODO: Fix eslint and typescript build errors
module.exports = {
  experimental: { granularChunks: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization.splitChunks.cacheGroups = {};
    config.optimization.minimize = true;
    return config;
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  eslint: {
    // !! WARN !!
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    POLKADEX_HOST_URL:
      process.env.POLKADEX_HOST_URL || "https://ramen-1.polkadex.trade:443/api",
    API_PATH: process.env.API_PATH || "http://localhost:3000/api",
    INFLUX_DB_URL:
      process.env.INFLUX_DB_URL || "https://ec2-3-101-117-26.us-west-1.polkadex.trade/api",
    POLKADEX_FEATURE: process.env.POLKADEX_FEATURE || "signUp",
    INFLUX_DB_TOKEN: process.env.INFLUX_DB_TOKEN,
    RMQ_KEY: process.env.RMQ_KEY,
    RMQ_USERNAME: process.env.RMQ_USERNAME,
    ENCLAVE_URL: process.env.ENCLAVE_URL || "wss://sgx.polkadex.trade:443",
    POLKADEX_CHAIN: process.env.POLKADEX_CHAIN || "ws://127.0.0.1:9944",
  },
};
