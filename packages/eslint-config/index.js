module.exports = {
  env: {
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "prettier",
    "react-hooks",
  ],
  rules: {
    "import/first": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "es5",
      },
    ],
    "standard/no-callback-literal": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "space-before-function-paren": "off",
    camelcase: "off",
    "@typescript-eslint/ban-type": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/no-unknown-property": "off",
  },
};
