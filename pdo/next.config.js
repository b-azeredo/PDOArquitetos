import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import redirects from './redirects.js'

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts')

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase body size limit for file uploads
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  // Configure API routes for larger file uploads
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      // Allow images from the same domain
      ...(NEXT_PUBLIC_SERVER_URL ? [new URL(NEXT_PUBLIC_SERVER_URL)] : []).map((url) => ({
        hostname: url.hostname,
        protocol: url.protocol.replace(':', ''),
      })),
      // Allow common image domains
      {
        hostname: '*.vercel.app',
        protocol: 'https',
      },
      {
        hostname: 'blob.vercel-storage.com',
        protocol: 'https',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
      },
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      // Allow API routes for media
      ...(NEXT_PUBLIC_SERVER_URL ? [new URL(NEXT_PUBLIC_SERVER_URL)] : []).map((url) => ({
        hostname: url.hostname,
        protocol: url.protocol.replace(':', ''),
        pathname: '/api/media/**',
      })),
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  // SEO and Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
