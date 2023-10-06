module.exports = {
  root: true,
  extends: ["@orderbook/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/**", "packages/*/**"],
    },
  },
};
