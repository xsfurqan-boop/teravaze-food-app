import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.indolj.io", // Allow FoodsInn images
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/restaurant/:id',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
