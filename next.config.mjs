/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.kipris.or.kr",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
