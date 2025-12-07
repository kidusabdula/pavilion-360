/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable source maps in production to avoid source map errors
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  // Configure turbopack
  turbopack: {
    resolveAlias: {},
  },
  webpack: (config, { isServer }) => {
    // Disable source maps for dependencies
    config.devtool = false

    // Suppress source map warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
      /Failed to parse source map/,
    ]

    return config
  },
}

export default nextConfig