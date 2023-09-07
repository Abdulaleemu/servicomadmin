/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASEURL: "http://localhost:2000/api/v1/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
