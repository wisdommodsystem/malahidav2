/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID,
  },
}

module.exports = nextConfig

