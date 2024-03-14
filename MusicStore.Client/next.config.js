/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: "export", // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  env: {
    title: "Music Store",
    contactEmail: "enquiries@acme.com",
  },
};
