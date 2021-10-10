module.exports = {
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
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:9002",
    RANGER_HOST_URL: process.env.NEXT_PUBLIC_RANGER_HOST_URL || "http://localhost:9002",
    PROXY_URL: process.env.PROXY_URL || "http://localhost:90020",
    PROXY_WS_URL: process.env.PROXY_WS_URL || "http://localhost:9002",
    POLKADEX_WS: process.env.POLKADEX_WS || "wss://openfinex.polkadex.trade",
  },
};
