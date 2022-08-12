/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([
  [withBundleAnalyzer],
  {
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
          ],
        },
      ];
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true,
    },
    target: "experimental-serverless-trace",
    staticPageGenerationTimeout: 120,
    optimization: {
      mergeDuplicateChunks: true,
    },

    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    webpack: (config, { _, isServer }) => {
      if (isServer) {
        config.externals.push("_http_common");
      }

      return config;
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    env: {
      ENCLAVE_URL: process.env.ENCLAVE_URL || "wss://sgx.polkadex.trade:443",
      POLKADEX_CHAIN: process.env.POLKADEX_CHAIN || "wss://blockchain.polkadex.trade",
      GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "G-PWZK8JEFLX",
      ANALYZE: process.env.NEXT_PUBLIC_ANALYZE || "false",
    },
  },
]);
