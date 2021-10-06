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
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL || "http://openfinex.polkadex.trade:8000",
    RANGER_HOST_URL: process.env.NEXT_PUBLIC_RANGER_HOST_URL || "http://openfinex.polkadex.trade:8001",
    PROXY_URL: process.env.PROXY_URL || "http://openfinex.polkadex.trade:15000",
    PROXY_WS_URL: process.env.PROXY_WS_URL || "http://openfinex.polkadex.trade:7070",
    POLKADEX_WS: process.env.POLKADEX_WS || "wss://openfinex.polkadex.trade"
  },
};
