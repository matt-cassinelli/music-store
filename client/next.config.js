/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: "export", // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  images: { unoptimized: true },
  env: {
    contactEmail: "enquiries@link-tp.com",
  },
  // assetPrefix: './',
};

// const withPWA = require('next-pwa')
