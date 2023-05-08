/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'image.tmdb.org',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'gogocdn.net',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
