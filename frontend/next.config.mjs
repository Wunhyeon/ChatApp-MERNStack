/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: "github.com", protocol: "https" },
      { hostname: "avatars.githubusercontent.com", protocol: "https" },
      { hostname: "icon-library.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
