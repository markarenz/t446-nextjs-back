/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/pages',
        destination: '/pages/1',
        permanent: true
      }
    ];
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    USER_ADMIN: process.env.USER_ADMIN,
    USER_ADMIN_PW: process.env.USER_ADMIN_PW,
    USER_HISTORIAN: process.env.USER_HISTORIAN,
    USER_HISTORIAN_PW: process.env.USER_HISTORIAN_PW,
    MONGODB_URI: process.env.MONGODB_URI
  }
};

module.exports = nextConfig;
