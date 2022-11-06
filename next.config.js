/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };
  //   return config;
  // },
  env: {
    USER_ADMIN: process.env.USER_ADMIN,
    USER_ADMIN_PW: process.env.USER_ADMIN_PW,
    USER_HISTORIAN: process.env.USER_HISTORIAN,
    USER_HISTORIAN_PW: process.env.USER_HISTORIAN_PW,
    MONGODB_URI: process.env.MONGODB_URI,
    ENC_SALT: process.env.ENC_SALT
  }
};

module.exports = nextConfig;
