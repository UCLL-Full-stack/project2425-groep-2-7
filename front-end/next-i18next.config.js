const { i18n } = require("next-i18next");

module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
};
