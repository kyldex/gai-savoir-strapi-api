"use strict";

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(
    new webpack.DefinePlugin({
      STRAPI_ADMIN_CLIENT_FRONTEND_URL: JSON.stringify(process.env.STRAPI_ADMIN_CLIENT_FRONTEND_URL),
      STRAPI_ADMIN_CLIENT_PREVIEW_SECRET: JSON.stringify(process.env.STRAPI_ADMIN_CLIENT_PREVIEW_SECRET),
    })
  );
  return config;
};
