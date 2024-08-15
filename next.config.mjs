/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "plus.kipris.or.kr",
        port: "",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
