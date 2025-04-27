/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "gogocdn.net",
      "res.cloudinary.com",
    ],
    deviceSizes: [1080, 1920],
  },
  async rewrites() {
    return [
      {
        source: "/script.analytics.js",
        destination: "https://cloud.umami.is/script.js",
      },
    ];
  },
};

module.exports = nextConfig;
