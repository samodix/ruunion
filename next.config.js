/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/ruunion/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ruunion-test-v1-f98f20.ingress-comporellon.ewp.live",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
