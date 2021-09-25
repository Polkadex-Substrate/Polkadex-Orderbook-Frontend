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
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:8000",
    RANGER_HOST_URL: process.env.NEXT_PUBLIC_RANGER_HOST_URL || "localhost:8081",
    PROXY_URL: process.env.PROXY_URL || "http://localhost:7000",
    PROXY_WS_URL: process.env.PROXY_WS_URL || "http://localhost:7070",
  },
};
