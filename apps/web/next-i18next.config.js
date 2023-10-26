/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("path").resolve("./public/locales")
      : "/locales",
};
