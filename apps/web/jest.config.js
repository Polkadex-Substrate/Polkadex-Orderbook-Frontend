import { join } from "path";

import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export const coverageProvider = "v8";
export const collectCoverageFrom = [
  "**/*.{js,jsx,ts,tsx}",
  "!**/*.d.ts",
  "!**/node_modules/**",
  "!<rootDir>/out/**",
  "!<rootDir>/.next/**",
  "!<rootDir>/*.config.js",
  "!<rootDir>/coverage/**",
];
export const moduleDirectories = ["node_modules", "src"];
export const modulePaths = ["node_modules", "<rootDir>/src"];
export const moduleNameMapper = {
  // Handle CSS imports (with CSS modules)
  // https://jestjs.io/docs/webpack#mocking-css-modules
  "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

  // Handle CSS imports (without CSS modules)
  "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

  // Handle image imports
  // https://jestjs.io/docs/webpack#handling-static-assets
  "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`,

  // Handle module aliases
  "^@/components/(.*)$": "<rootDir>/components/$1",
  "@polkadex/web-constants/(.*)": "<rootDir>/src/constants/$1",
  ...pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join("<rootDir>", compilerOptions.baseUrl),
  }),
};
export const testPathIgnorePatterns = [
  "<rootDir>/node_modules/",
  "<rootDir>/.next/",
];
export const testEnvironment = "jsdom";
export const transform = {
  // Use babel-jest to transpile tests with the next/babel preset
  // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
};
export const transformIgnorePatterns = ["/node_modules/.pnpm/(?!lodash-es)"];
