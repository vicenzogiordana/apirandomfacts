import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/200/300',
        search: '',
      },
    ],
  },
};

// export default nextConfig; // Removed as nextConfig is not defined
