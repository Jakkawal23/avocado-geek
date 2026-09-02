/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // No external image hosting configured yet — content authors can add
    // remotePatterns here once they host real photos. Local files under
    // /public work out of the box.
    remotePatterns: [],
  },
};

export default nextConfig;
