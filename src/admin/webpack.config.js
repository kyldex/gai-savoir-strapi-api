"use strict";

// Temporary fix : DefinePlugin seems not to be part anymore of the Strapi webpack config.
// We have to require it, instead of using below `webpack.DefinePlugin`, we use `DefinePlugin`.
// See https://github.com/strapi/strapi/issues/20340#issuecomment-2144514250
const { DefinePlugin } = require("webpack");

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(
    new DefinePlugin({
      STRAPI_ADMIN_CLIENT_FRONTEND_URL: JSON.stringify(process.env.STRAPI_ADMIN_CLIENT_FRONTEND_URL),
      STRAPI_ADMIN_CLIENT_PREVIEW_SECRET: JSON.stringify(process.env.STRAPI_ADMIN_CLIENT_PREVIEW_SECRET),
    })
  );
  return config;
};
