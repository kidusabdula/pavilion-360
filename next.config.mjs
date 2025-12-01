/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Suppress source map warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
    ]
    return config
  },
}

export default nextConfig