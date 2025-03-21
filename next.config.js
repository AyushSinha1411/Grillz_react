/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production deployment even with ESLint errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 