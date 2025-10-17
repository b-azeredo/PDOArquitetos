export const performanceConfig = {
  // Image optimization
  images: {
    domains: ['pdo-arquitetos.pt', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Font optimization
  fonts: {
    preload: ['GeistSans', 'GeistMono', 'Nanum Gothic Coding'],
  },

  // Critical CSS
  criticalCSS: ['/styles/critical.css'],

  // Preload resources
  preload: [
    {
      href: '/herovideo.mp4',
      as: 'video',
      type: 'video/mp4',
    },
    {
      href: 'https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png',
      as: 'image',
      type: 'image/png',
    },
  ],

  // Service Worker
  serviceWorker: {
    enabled: true,
    scope: '/',
    updateViaCache: 'none',
  },

  // Compression
  compression: {
    gzip: true,
    brotli: true,
  },

  // Caching
  caching: {
    static: '1y',
    images: '1y',
    fonts: '1y',
    api: '1h',
  },
}
